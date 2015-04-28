'use strict';

external.factory('sessionInjector', ['$localStorage', '$q', function ($localStorage, $q) {
    var session = {
        request: function (config) {
            config.headers = config.headers || {};
            if ($localStorage.token && $localStorage.user) {
                config.headers['token'] = $localStorage.token;
            }
            return config;
        },
 
        response: function (response) {
            return response || $q.when(response);
        }
    };
    return session;
}]);

external.factory('authServices', ['$sessionStorage', '$localStorage', '$rootScope', '$window', '$location',  '$http', 'servicesConfig', 'peopleServices', 'baseUrls', 'redirect', '$timeout', 'urlafterlogin', function($sessionStorage, $localStorage, $rootScope, $window, $location, $http, servicesConfig, peopleServices, baseUrls, redirect, $timeout, urlafterlogin) {
    var authServices = {
        _debug: false,
        _setAuthData: function (authData, callback) {},
        _authenticationChanged: function (newValue, oldValue) { },
        msgUserFail: {
            response : {
                status: "Fail",
                messages: {
                    message: [
                        {text: "Desculpe! Cliente não encontrado. Tente mais tarde!"}
                    ]
                }
            }
        },
        msgPointsFail: {
            response : {
                status: "Fail",
                messages: {
                    message: [
                        {text: "Desculpe! Pontuação não encontrada. Tente mais tarde!"}
                    ]
                }
            }
        },
        msgSessionFail: {
            response : {
                status: "Fail",
                expired: true,
                messages: {
                    message: [
                        {text: "Sessão expirada! Por favor, faça o login novamente!"}
                    ]
                }
            }
        },

        //**************************************************
        //* Executes operations after a successfull login
        //**************************************************
        authenticate: function (auth, pageCurrent, callback, reloadPerson) {
            //CARREGAR USUARIO
            if($localStorage.token){

                //INSERÇÃO DO TOKEN NAS CHAMADAS PARA QUALQUER SERVIÇO 
                $http.defaults.headers.common['token'] = $localStorage.token;

                if(!$localStorage.user && $localStorage.login || reloadPerson){ 

                    peopleServices.loadPerson($localStorage.login, function(data){
                        
                        $rootScope.user = data;                        
                        $rootScope.user.cpf = data.idUsuario;
                        $rootScope.user.cpfFormat = data.idUsuario.replace(/([0-9]{3})([0-9]{3})([0-9]{2}$)/g, ".$1.$2-$3");
                        $rootScope.user.href = servicesConfig.user.layout.links.perfil.href + data.idUsuario;

                        $localStorage.user = JSON.stringify($rootScope.user);

                        //CARREGAR PONTUACAO DO USUARIO
                        if (angular.isFunction(callback)) {
	                        authServices.points(callback(data));
	                    }else{
	                    	authServices.points();	
	                    }
                        
                        
                        return true;
                    }, function(data){
                        $rootScope.mainMsgs = {response: authServices.msgUserFail.response};                        
                        authServices.logout();
                        return false;
                    });

                }else if(!$localStorage.login){
                    $rootScope.mainMsgs = {response: authServices.msgUserFail.response};
                    authServices.logout();                
                }else{
                    $rootScope.user = JSON.parse($localStorage.user);

                    //CARREGAR PONTUACAO DO USUARIO
                    if (angular.isFunction(callback)) {
                        authServices.points(callback());
                    }else{
                    	authServices.points();	
                    }

                    return true;               
                }
            }else{
                if(auth){                
                    if($localStorage.user){
                        $rootScope.user = JSON.parse($localStorage.user);
                    }
                }

                if (angular.isFunction(callback)) {
                    callback();
                }                
            }
        },

        //**************************************************
        //* Returns Points user
        //************************************************** 
        points: function(callback){

            if(servicesConfig.endpoints.points && $localStorage.user){
                $rootScope.user.points = '';
                peopleServices.loadPoints($localStorage.login, function(data){  
                    var response = (data.response ? data.response : data);
                    
                    if(response.status == 'Ok'){
                        $rootScope.user.points = data.body.content.line[0].field[0];
                        $localStorage.user = JSON.stringify($rootScope.user);
                    }else{
                        authServices.logout('', response);
                    }

                    $timeout(function(){
                    	if (angular.isFunction(callback)) {
	                        callback;
	                    }
                    }, 500);
                    
                }, function(data){
                    $rootScope.mainMsgs = {response: authServices.msgPointsFail.response};
                    authServices.logout();
                });
            }
        },

        //**************************************************
        //* Returns the current user auth data
        //**************************************************        
        getUserData: function (cookieName) {            
        },

        //**************************************************
        //* Returns true if there is an authenticated user
        //**************************************************        
        isAuthenticated: function () {
            /*
            var authData = this.getAuthData();
            return (authData != null && authData.accountId != null);
            */
        },

        //**************************************************
        //* Logs de user in
        //**************************************************  

        login: function (user, redirectLogin, currentLocation) {
            var payload = { "userName": user[0].value, "passwd": user[1].value };

			/*return*/ 
            return $http({method: 'POST', url: servicesConfig.endpoints.auth, data: payload}).success(function (data) {

                $localStorage.token = data.token;
                $localStorage.login = data.userName;

                //REDIRECIONAR CASO O PARAMETRO 'redirectLogin' SEJA DIFERENTE DE 'not'
                //E A PAGINA QUE SERA REDIRECIONADA NAO SEJA IGUAL A TELA ATUAL  
                //*CONDICAO CONTINUA NA FUNCAO 'login' NO ARQUIVO 'app.js'        
                if(redirectLogin){

                	if(redirectLogin.parameters){
                		if(redirectLogin.urlafter != 'not' && currentLocation != redirectLogin.urlafter){
	                    	$rootScope.mainMsgs = '';
	                        redirect.url(redirectLogin.urlafter, '', redirectLogin);
	                    }
                	}else{
                		if(redirectLogin != 'not' && currentLocation != redirectLogin){
	                        
	                        $rootScope.mainMsgs = '';
	                        redirect.url(redirectLogin);                     
	                    }	
                	}

                                        
                }

            }).error(function (data) {
                var redirectNot = (redirectLogin != 'not' ? true : false);
                authServices.logout(redirectNot);
                return data;
            });			
        },

        //**************************************************
        //* Logs de user out
        //**************************************************        
        logout: function (redirectNot, sessionExpired) {
            //$rootScope.auth = null;
            $rootScope.user = null;
            delete $localStorage.token;
            delete $localStorage.login;
            delete $localStorage.user;
            delete $localStorage.menu;

            var urlLocation;
            var layoutLinks = servicesConfig.user.layout.links;
            
            //MENSAGEM DE SESSÃO EXPIRADA
            if(sessionExpired){
                //GUARDAR PAGINA PARA REDIRECIONAR APOS O LOGIN QUANDO A URL DESEJADA FOR UMA URL FECHADA (QUE PRECISA DE LOGIN)          
                //CHECAR SE A TELA NÃO É A LOGIN
                if($location.url() != layoutLinks.login.href){
                	urlafterlogin.parameter(layoutLinks);                    
                }

                if(sessionExpired.messages){                    
                    //INSERIR MENSAGEM DE ERRO
                    if(sessionExpired.messages.message[0].fieldName){
                        var fieldName = sessionExpired.messages.message[0].fieldName;
                        if(fieldName == 'expired'){
                            $rootScope.mainMsgs = {response: authServices.msgSessionFail.response};
                        }
                    }
                }
            }

            if(!redirectNot){
                //VERIFICAR SE A PAGINA DE LOGIN É A DEFAULT
                if($sessionStorage.urlafterlogin || sessionExpired){
                    if(layoutLinks.login){
                        urlLocation = layoutLinks.login.href;
                    }
                    
                }else{
                    
                    if(layoutLinks.login){
                        urlLocation = (layoutLinks.login.pagedefault ? layoutLinks.login.href : layoutLinks.index.href);
                    }else{
                        urlLocation = layoutLinks.index.href;
                    }
                }
                $location.path(urlLocation);
            }

        }
    };
    return authServices;
}]);


