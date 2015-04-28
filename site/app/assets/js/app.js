'use strict';


/************************************************************************************************
 * MODULE: APPWEB
 * 
 ************************************************************************************************/
var app = angular.module('app', ['angulartics', 'angulartics.google.analytics', 'ngStorage', 'directives', 'ui.bootstrap', 'ui.mask', 'ngRoute', 'ngCookies', 'ngSanitize', 'reCAPTCHA', 'external']);

app.constant("baseUrls", {
  directorys: {
    app:'app/', 
    pages: 'app/pages/',
    modals: 'app/pages/modals/',
    partials: 'app/pages/partials/',
    templates: {
      bootstrap: 'app/pages/template/bootstrap/',
      app: 'app/pages/template/'
    },
    images: 'assets/images/'
  }
});

app.config(function ($routeProvider, $locationProvider, $httpProvider, $analyticsProvider, servicesConfig, reCAPTCHAProvider, sessionInjector, $localStorage) {

    if(window.history && window.history.pushState){
      $locationProvider.html5Mode((servicesConfig.ambienteProd ? true : false));
    }
    //$locationProvider.html5Mode(true);

    var layoutLinks = servicesConfig.user.layout.links;
    var urlIndex;


    //CASO CONTENHA A TELA DE LOGIN VERIFICAR SE ELA É A DEFAULT, PARA ISSO CHEGAR O PARAMETRO 'pagedefault'
    if(layoutLinks.login){
      if(layoutLinks.login.pagedefault){
        urlIndex = layoutLinks.login.href;
      }else{
        urlIndex =  layoutLinks.index.href;  
      }
    }else{
      urlIndex =  layoutLinks.index.href;
    }

    /* Rotas principais*/
    $routeProvider
      .when('/', { redirectTo: urlIndex, access: { requiredLogin: false}})
      .otherwise({ redirectTo: urlIndex, access: { requiredLogin: false}});

    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.withCredentials = false;

    //AUTENTICAÇÂO EM TODAS AS CHAMADAS
    $httpProvider.interceptors.push('sessionInjector');    

    reCAPTCHAProvider.setPublicKey(servicesConfig.captcha.sitekey);
    reCAPTCHAProvider.setOptions({
        theme: 'clean',
        lang: 'pt'
    });

    //$analyticsProvider.virtualPageviews(false); //REMOVER O RASTREAMENTO AUTOMATICO DAS PAGINAS    
});


app.run(function ($rootScope, $location, $localStorage, $sessionStorage, servicesConfig, baseUrls, $http, urlafterlogin) {
    $rootScope.servicesConfig = servicesConfig;
    $rootScope.links = servicesConfig.user.links;
    $rootScope.site = servicesConfig.user;
    $rootScope.headerPartial = baseUrls.directorys.partials + "headerApp.html";
    $rootScope.footerPartial = baseUrls.directorys.partials + "footerApp.html";    
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {

      var layoutLinks = servicesConfig.user.layout.links;
      var urlLocation;

      /*
      if(layoutLinks.catalogo.urlparameter){
        console.log(layoutLinks.catalogo.href.split(':')[1], layoutLinks.catalogo.urlparameter)
        if(layoutLinks.catalogo.href.split(':')[1] == layoutLinks.catalogo.urlparameter){
          layoutLinks.catalogo.href = layoutLinks.catalogo.hreforigin +':'+ layoutLinks.catalogo.urlparameter;
                   
        }else{
          layoutLinks.catalogo.hreforigin = angular.copy(layoutLinks.catalogo.href);
          layoutLinks.catalogo.href = layoutLinks.catalogo.href +':'+ layoutLinks.catalogo.urlparameter;          

        }

        console.log(layoutLinks.catalogo.href); 
        layoutLinks.catalogo.urlparameter = false;
      }
      */

      //INSERÇÃO DO TOKEN NAS CHAMADAS PARA QUALQUER SERVIÇO
      //existe outra verificação dessa na autenticacao para chamar o usuario
      if ($localStorage.token) {
        $http.defaults.headers.common['token'] = $localStorage.token;
      }

      //LOGADO
      if ($localStorage.login) {
        
        //CASO O USUARIO TENTE ACESSA A TELA DE LOGIN QUANDO ESTIVER LOGADO JOGAR PARA A INDEX
        if($location.url() == layoutLinks.login.href){
            urlLocation = layoutLinks.index.href;            
          $location.path(urlLocation);
        }        

      //DESLOGADO
      }else{
        if(nextRoute.access.requiredLogin){
          //GUARDAR PAGINA PARA REDIRECIONAR APOS O LOGIN QUANDO A URL DESEJADA FOR UMA URL FECHADA (QUE PRECISA DE LOGIN)
          //CHECAR SE A TELA NÃO É A LOGIN          
          if($location.url() != layoutLinks.login.href){
            urlafterlogin.parameter(layoutLinks);
          }

          if($sessionStorage.urlafterlogin){
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
    });
});

app.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
      return $sce.trustAsResourceUrl(val);
    };
}]);

app.filter('closenav', ['$localStorage', function($localStorage) {
    return function(nav) {
      var navArray = [];
      nav.filter(function(element, index, array) {
        if(element.close){
          ($localStorage.user ? navArray.push(element): false);
        }else{
          navArray.push(element);
        }
      });
      return navArray;
    };
}]);





//VERIFICAR EM CADA CAMPO SE O VALOR DO PARAMETRO 'defaultHidden' É FALSO OU NAO EXISTE
//SOMENTE DEVE MOSTRA O CAMPO QUANDO 'defaultHidden' É FALSO OU NAO EXISTE
//CASO EXISTA NÃO MOSTRE
app.filter('hideShow', [function() {
    return function(val) {
      return val.filter(function(element, index, array) {
        return !element.defaultHidden;
      });
    };
}]);



//GUARDAR PAGINA PARA APÓS O LOGIN
//QUANDO O USUARIO TENTAR ACESSAR UMA PAGINA QUE PRECISA ESTAR LOGADO, MAS ELE NAO ESTA
app.factory('urlafterlogin', ['$location', '$sessionStorage', 'urlSetParameter', function ($location, $sessionStorage, urlSetParameter) {
  var urlafterlogin = {
    parameter: function(layoutLinks){
      angular.forEach(layoutLinks, function(index, value){

        var captureurlParameter = index.href.split(':parameter');
        var urlCurrent;
        
        //URL COM PARAMETROS        
        if(captureurlParameter.length > 1){
          //captureurlParameter.length-1 é porque ao fazer o split no final acrescenta um 
          //vazio e para que nao conte este parametro foi preciso inserir o -1
          for(var i=0; i<captureurlParameter.length-1;i++){
            var setParam = urlSetParameter.parameter(captureurlParameter[i]);

            if(urlCurrent){
              urlCurrent = urlCurrent.replace(setParam, 'parameter');
            }else{
              urlCurrent = $location.url().replace(setParam, 'parameter');
            }
          }

          if(urlCurrent){
            if(index.href == urlCurrent){
              $sessionStorage.urlafterlogin = value;
              $sessionStorage.urlafterloginParameter = urlCurrent;
              $sessionStorage.urlafterloginOrigin = $location.url();
            }
          }
          
        //URL SIMPLES
        }else{
          if(index.href == $location.url()){
            $sessionStorage.urlafterlogin = value;
          }
        }
        //console.log(urlCurrent == $location.url(), urlCurrent, $location.url())
        
      });
    }
  }
  return urlafterlogin;
}]);

//CAPTURAR VALOR DO PARAMETRO NA URL
app.factory('urlSetParameter', ['$window', function ($window) {
  var urlSetParameter = {
    parameter: function(parameter, field){
      var url = $window.location.hash.split('#')[1];
      if($window.location.hash){
        url = $window.location.hash.split('#')[1];
      }else{
        url = $window.location.pathname.split('/')[1];
      }

      var re = new RegExp(parameter+':',"g");
      var setparameter = url.split(re)[1];
      (setparameter ? setparameter = setparameter.split('/')[0] : '');
      return setparameter;
    }
  }
  return urlSetParameter;
}]);

app.factory('colorModified', function(){

  return {
    modified: function(hex, percent){
      // strip the leading # if it's there
      var hex = hex.replace(/^\s*#|\s*$/g, '');
      // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
      if(hex.length == 3){
        hex = hex.replace(/(.)/g, '$1$1');
      }

      var r = parseInt(hex.substr(0, 2), 16),
          g = parseInt(hex.substr(2, 2), 16),
          b = parseInt(hex.substr(4, 2), 16);

      return '#' +
          ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
          ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
          ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);  
    }
  }
});


//QUEBRA DO ARRAY PARA CAPTURAR O NOME DO PARAMETRO
app.factory('breakParam', [function () {
  var breakParam = {
    breaks: function(obj, parameter, nocopy){
      var objCapture = [];
      if(parameter){        
        for(var i=0; i< parameter.length; i++){
          angular.forEach(obj, function(index, val){ 
            var insert = false;

            if(val == parameter[i] && !insert){
              insert = true;

              if(nocopy){
                objCapture.push(index);
              }else{
                objCapture.push(angular.copy(index));                
              }
            }
          });
        }
      }
      return objCapture;
    }
  }
  return breakParam;
}]);


//REDIRECIONAR PARA UMA DAS PAGINAS QUE ESTA NO SERVICE
app.factory('redirect', ['$window', '$location', 'servicesConfig', 'urlSetParameter', '$rootScope', function ($window, $location, servicesConfig, urlSetParameter, $rootScope) {
  var redirect = {
    url: function(page, btn, urlAfterLogin){
      var redirectParameter = function(url){
        var href = url.href;
        var allParameters = [];
        var captureurlParameter = href.split(':parameter');
        var verificParameter = captureurlParameter[0].split('/');
        //CAPTURAR O ULTIMO ELEMENTO DO PRIMEIRO ':parameter' - O RESTANTE É A URL COMUM, 
        //AQUI O OBJETIVO É CAPTURAR O PARAMETRO PARA INSERIR O VALOR NO LUGAR DO 'parameter'
        if(verificParameter.length > 2){
          captureurlParameter[0] = '/'+verificParameter[verificParameter.length-1];
        }
        var urlCurrent;        
        //captureurlParameter.length-1 é porque ao fazer o split no final acrescenta um 
        //vazio e para que nao conte este parametro foi preciso inserir o -1
        if(captureurlParameter.length > 1){                
          for(var i=0; i<captureurlParameter.length-1;i++){
            var parameterThis = captureurlParameter[i];
            var setParam = urlSetParameter.parameter(parameterThis);

            if(setParam && parameterThis+':parameter'){
              if(setParam != 'parameter'){
                var sethref = (urlCurrent ? urlCurrent : href);
                urlCurrent = sethref.replace(parameterThis+':parameter', parameterThis+':'+setParam);
                allParameters.push('ok');
              }
            }
          }
          //console.log('1');
          return $location.path((captureurlParameter.length-1 == allParameters.length ? urlCurrent : url.hrefDefault));

        }else{
          //console.log('2');
          return $location.path(href);
        }
      }

      //VOLTAR
      if(btn){
        if(btn.url == 'return'){
            $rootScope.objClicked = "";
            $rootScope.formPrimary = "";
            $window.history.back();
          return false;
        }
      }     

      angular.forEach(servicesConfig.user.layout.links, function(index, value){
        var validPage = (page ? value == page : btn ? btn.name ? btn.name : false : false);
        
        if(validPage){
        //btn.name é usado quando acontece o redirect na autenticação de uma pagina com a url incompleta (sem os parametros)

          //CAPTURAR PARAMETROS DA URL
          if(btn){
            if(btn.urlset){
              (!index.hreforigin ? index.hreforigin = angular.copy(index.href) : '');

              var constructionUrlDestination;
              var objBtn;
              var allParameters = [];
              var captureurlParameter = index.href.split(':parameter');

              for(var i=0;i<btn.urlset.length;i++){
                var urlset = btn.urlset[i];
                
                var re = new RegExp(urlset.parameter+':parameter',"g");
                if(!constructionUrlDestination){
                  constructionUrlDestination = index.hreforigin;
                }
                
                objBtn = (urlset.setvalue == 0 ? 0 : btn[urlset.setvalue] ? btn[urlset.setvalue] : btn.form[urlset.setvalue]);

                //O OBJETO É UM ARRAY, ENTAO DEVE SER INSERIDO ESTE PARAMETRO PARA QUE O ARRAY POSSA SER VARRIDO
                if(urlset.arrayset){

                  if(objBtn == 0){
                    allParameters.push('ok');                    
                  }else{
                    for(var i=0; i<objBtn.length; i++){
                      var objArr = objBtn[i];

                      if(objArr[urlset.arrayset.param] == urlset.arrayset.value){
                        allParameters.push('ok');
                        objBtn = objArr[urlset.arrayset.set];
                      }
                    }                    
                  }
                }else{
                  allParameters.push('ok');
                }
                constructionUrlDestination = constructionUrlDestination.replace(re, urlset.parameter+':'+ objBtn);                
              }

              var urldestination;
              if(allParameters.length == captureurlParameter.length -1){
                urldestination = constructionUrlDestination;
              }else{
                urldestination = index.hrefDefault;
              }
              //console.log('3');
              return $location.path(urldestination);

            }else{
              //CAPTURAR PARAMETRO SE JA EXISTIR NA TELA PARA QUE POSSA SER UDADO NA OUTRA TELA
              redirectParameter(index);
            }

          //URL COMPARAMETROS PARA REDIRECT APOS O LOGIN
          }else if(urlAfterLogin){
            //console.log('4');
            if(index.href == urlAfterLogin.parameters){
              return $location.path(urlAfterLogin.urlorigin);
            }
            
          }else{
            //CAPTURAR PARAMETRO SE JA EXISTIR NA TELA PARA QUE POSSA SER UDADO NA OUTRA TELA
            redirectParameter(index);
          }
        }
      });
    }
  }
  return redirect;
}]);

//INTERACAO COM O FORMULARIO - HABILITAR E HABILITAR CAMPOS, ESCONDER E VISUALIZAR....
app.factory('interactionField', ['defaultServices', 'modalCall', '$rootScope', function (defaultServices, modalCall, $rootScope) {
  var interactionField = {
    interaction: function(form, interaction){
      var result;    
      var fieldsValid = [];
      defaultServices.loopFiedsForm(form, function(data){
        for(var j=0; j<interaction.fields.length; j++){
          var fiedlInteraction = interaction.fields[j];
          //ACHAR CAMPOS DEPENDENTES
          if(data.name == fiedlInteraction) {                  
              if(data.lineValue){                
                fieldsValid.push(data);
              }                  
          }

          //ACHAR CAMPO DE INTERACAO
          if(data.name == interaction.field){
            result = angular.copy(data);
            if(fieldsValid.length == interaction.fields.length){

              switch(interaction.interaction){
                case 'disabled':
                  result.disabled = true;
                  break;

                case 'enable':
                  result.disabled = false;
                  break;

                case 'hide':
                  result.hide = true;
                  break;

                case 'show':
                  result.hide = false;
                  break;

                case 'openmodal':
                  defaultServices.insertFormsaved(interaction.fields, form, form);
                  modalCall.open(form, interaction.url);
                  break;
              }
            }else{
              
              //VERIFICAR SE A DEPENDENCIA EXISTE
              //SE NAO EXISTIR NAO SERA FEITO NADA NO CAMPO
              var contentDependece = false;
              defaultServices.loopFiedsForm(form, function(dataInteraction){
                if(!contentDependece){
                  if(dataInteraction.name == fiedlInteraction){
                    if(!dataInteraction.defaultHidden){
                    contentDependece = true;
                    }
                  }                  
                }
              });

               switch(interaction.interaction){
                case 'disabled':
                  result.disabled = (contentDependece ? false : true);
                  break;

                case 'enable':
                  result.disabled = (contentDependece ? true : false);
                  break;

                case 'hide':
                  result.hide = (contentDependece ? false : true);
                  break;

                case 'show':
                  result.hide = (contentDependece ? true : false);
                  break;
              }
            }
          }
        }
      });

      if(result){
        return result;
      }
    }
  }
  return interactionField;
}]);

//LINK PARA AREA DO SITE, CHAMADA DO SERVICE OU CHAMADA PARA FUNCAO
app.factory('linkLocation', ['redirect', 'defaultServices', 'modalCall', '$rootScope', 'callServiceField', '$location', function (redirect, defaultServices, modalCall, $rootScope, callServiceField, $location) {
  var linkLocation = {
    location: function(btn, scopeRoot, form, callback){
      var href = $(btn).attr('href');
      var fn, link, urlService;
      var modalValid = false;
      (form ? btn.form = form : '');

      //FUNCAO PARA QUANDO  O 'btn.form' FOR UM OBJETO E NAO UMA LISTA,
      //ENTAO DEVE CHECAR SE OS CAMPOS REQUIRIDOS ('btn.form.required') ESTAO PREENCHIDOS
      if(form){        
        if(form.required && form.tplform){
          if(!form.tplform.$valid){
            btn.form.invalid = true;
            return false;
          }
        }
      }

      //CHAMADA PARA SERVICOS
      var callFn = function(){
        fn = eval('defaultServices.'+ urlService);
        if(callback){
          fn((btn), callback);
        }else{
          fn((btn));          
        }
      };
      
      //CAPTURAR LINHA
      if(btn.captureline){
        $rootScope.objClicked = (form ? form : {});
        $rootScope.objClicked.formFieldHide = btn.formFieldHide;
      }


      //PARA LINKS QUE ESTAO DENTRO DE STRINGS 'href={link}'
      if(href){  
        if(href[0] == '{'){          
          href = href.split(',');
          link = href[0];
          link = link.split('{')[1];
          link = link.split('}')[0];
          
          //SE EXISTE PARAMETRO NA URL {link, parameter}
          if(href[1]){
            var parameter = href[1].split('}')[0];
            parameter = parameter.replace(' ', '');

            //SE O PARAMETRO FOR MODAL
            if(parameter == 'modal'){
              modalValid = true;
            }
          }

          //SE O PARAMETRO FOR IGUAL A 'MODAL' CHAMAR A FACTORY PARA ABRIR A MODAL
          if(modalValid){    
            modalCall.open(btn, link);
          }else{
            scopeRoot.$apply(function(){
              if($rootScope.mainMsgs){
                $rootScope.mainMsgs.keep = false; //REMOVER MENSAGENS GERAL QUE ESTAVAM NA TELA
              }
              redirect.url(link);
            });
          }
        }
      }

      if(btn.func){
        //IF PARA QUANDO VIER DO HEADER PQ O FN NAO VAI ENCONTRAR A FUNCAO (OUTRO SCOPE)        
        scopeRoot((btn));

      }else if(btn.filter){
        urlService = btn.name;
        callFn();

      }else if(btn.urldirect){
        $location.path(btn.url);  
      
      }else if(btn.service || form){

        if(btn.service){
          //BOTAO NO MEIO DO FORMULARIO (Esses parametros sao encontrados apenas nos formularios
          //sendo assim comprova que o botao esta no meio de um formulario)
          if(btn.type == 'button' && btn.nameTpl == 'button' && btn.size){
            if(btn.service.call && form){
              callServiceField.callService(btn.service.call, form);                
            }
          }else {

            if(btn.service.call){
              urlService = btn.service.call.objresult;
            }else if(btn.service){
              urlService = btn.name;
            }

            //CASO NAO TENHA urlService
            (urlService ? callFn() : redirect.url(btn.url, btn));
          }
        }else{
          urlService = btn.name;
          
          if(form){
            (form.service && urlService ? callFn() : redirect.url(btn.url, btn));
          }
        }

      }else{
        if($rootScope.mainMsgs){
          $rootScope.mainMsgs.keep = false; //REMOVER MENSAGENS GERAL QUE ESTAVAM NA TELA
        }
        redirect.url(btn.url, btn);
      }
    }
  }
  return linkLocation;
}]);


//CHAMADA PARA ABRIR O MODAL SEJA EM UM CLICK OU DIRETAMENTE
app.factory('modalCall', ['$rootScope', 'baseUrls', '$modal', function ($rootScope, baseUrls, $modal) {
  var modalCall = {
    open: function(scopeForm, refModal){
      var scope = angular.copy(scopeForm);
      angular.forEach($rootScope.site.layout.modals, function(index, value){
        if(value == refModal){
          scope.modal = index;         
        }   
      });

      if(scope.modalScope){
        if(scope.modalScope.formdisabled){
          scope.modal.content.formdisabled = scope.modalScope.formdisabled;          
        }
      }

      if(scope.modal){
        scope.modal.content.msgs = '';
        
        var copyModal = angular.copy(scope.modal);
        //necessario para que ele nao capture os itens da modal antiga, quando abrir a mesma modal para itens diferentes mas com a mesma modal
        
        var modalInstance = $modal.open({
              templateUrl: baseUrls.directorys.modals + 'modal.html',
              controller: scope.modal.ctrl,
              size: scope.modal.size,
              windowClass: 'modal ' + scope.modal.content.classe,
              backdrop: 'static',
              keyboard: false,
              resolve: {
                tplModal: function () {                 
                  return copyModal;
            }
          }
        });
      }
    }
  }
  return modalCall;
}]);

//SERVICE CALL NOS FIELDS - ATUALIZACAO DOS CAMPOS DO FORMULARIO
app.factory('callServiceField', ['defaultServices', '$timeout', 'resultScope', function (defaultServices, $timeout, resultScope) {
  var callField = {
    callService: function(eventField, form){     

      if(eventField.objresult){
        var fn = eval('defaultServices.'+eventField.objresult);        
        eventField.form = form;
        $timeout(function(){
          fn((eventField), function(data){    
            
            var callback = function(){
              if(eventField.edit){

                //ATUALIZAR DADOS DO FORMULARIO COM O RESULTADO DO SERVICE
                for(var j=0; j< form.detail.length; j++){
                  var detailForm = form.detail[j];
                  for (var l=0; l<detailForm.form.length; l++){
                    var formCampos = detailForm.form[l].campos;


                    for(var k=0; k< formCampos.length; k++){
                      if(eventField.urls || url){
                        resultScope.format(data.result, formCampos[k], eventField);
                      }else{
                        resultScope.format(data.result, formCampos[k], eventField);
                      }
                    }                                
                  }
                }
              }
            }

            if(!data.msgs){
              callback();
            }else{              
              if(data.msgs.response.status != "Fail"){
                callback();                
              }else{
                form.msgs = data.msgs;
              }              
            }

          });
        }, 200);
      }
        
    }
  }
  return callField;

}]);


//INVERTER O PARAMETRO PARA A VISUALIZACAO CORRETA NA TAG 'type=date' HTML5
app.factory('resultScope', ['$filter', 'formatField', 'breakParam', '$rootScope', 'defaultServices', function ($filter, formatField, breakParam, $rootScope, defaultServices) {
  var resultScope = {
    format: function(result, scopeContent, scopeForm){
      
      if(scopeContent.captureparameter){
        var captureRoot = defaultServices.captureRoot((scopeForm.service ? scopeForm.service : scopeForm.url || scopeForm.urls ? scopeForm : ''), scopeContent);
        if(captureRoot){
          scopeContent.lineValue = (captureRoot.value ? captureRoot.value : (scopeContent.defaultresult ? scopeContent.defaultresult : ''));
        } else{
          scopeContent.lineValue = (scopeContent.defaultresult ? scopeContent.defaultresult : '');
        }       
      }

      if(result && result.line){
        for(var i = 0; i < result.line.length; i++){
          var line = result.line[i];  

          if(line.field){            
            var filterValue = $filter('filter')(line.field, scopeContent.name, true)[0];
            if(filterValue){            
              angular.forEach(filterValue, function(filterIndex, filterVal){
                if(filterIndex != null){              
                  angular.forEach(scopeContent, function(contentIndex, contentVal){
                      var ignore = false;
                      
                      if(filterValue.ignoreParams){
                        for(var j=0; j<filterValue.ignoreParams.length; j++){
                          var ignoreParam = filterValue.ignoreParams[j];

                          if(ignoreParam == contentIndex || contentIndex == 'ignoreParams'){
                            ignore = true;
                          }
                        }
                      }

                      //IGNORAR PARAMETRO QUANDO FOR ADICIONAR OS PARAMETROS QUE NAO EXISTEM
                      if(!ignore){

                        if(filterVal == contentVal && scopeContent.addParamsResult){
                          if(filterVal != 'hidden'){
                            scopeContent[filterVal] = filterIndex;
                          }
                        }else{
                          //ADICIONAR PARAMETROS DO RESULTADO
                          
                          //FORCAR O PARAMETRO 'hidden' SER IGUAL AO DO SERVICO PORQUE NESTA FUNCAO PODE SER QUE A VISUALIZACAO DO FORMULARIO 
                          //SEJA INVERTIDA, OU SEJA, TODOS OS ITENS DO FORMULARIO QUE NAO EXISTIREM NO RESULTADO DO SERVICO DEVEM DESAPARECER 
                          if(filterVal == 'hidden' && !scopeContent.ignoreHidden){
                            if(!scopeContent[filterVal]){
                              scopeContent.defaultHidden = filterIndex;
                            }
                            
                          }

                          if(scopeContent.addParamsResult){                        
                            //FUNCAO PARA QUANDO NAO HOUVER O PARAMETRO NO CAMPO DO FORFULARIO, MAS NO SERVICO EXISTIR
                            //ENTÂO SERA INSERIDO NO CAMPO ESTE PARAMETRO
                            //O valor do parametro 'alias' DEVE SER INSERIDO NO 'labelName'
                            if(filterVal == 'alias'){
                              if(!scopeContent.labelName){
                                scopeContent.labelName = filterIndex;
                              }
                            }else{
                              if(!scopeContent[filterVal]){
                                if(filterVal != 'hidden'){
                                  scopeContent[filterVal] = filterIndex;
                                }
                              }
                            }
                          }           
                        }
                      }
                  });
                }
              });

              switch(scopeContent.type){
                case 'select':
                  if(!scopeContent.options){
                    scopeContent.options = {obj: filterValue.list}
                  }

                  if(filterValue.value){
                    var filterOptions = $filter('filter')(scopeContent.options.obj, filterValue.value, true);
                    if(filterOptions){
                      scopeContent.lineValue = filterOptions[0];                      
                    }

                  }else{
                    scopeContent.optionsSelecione = true;
                  }  
                  break;

                case 'date':
                  //INVERTER O PARAMETRO PARA A VISUALIZACAO CORRETA NA TAG 'type=date' HTML5
                  scopeContent.lineValue = formatField.date(filterValue.value, (scopeContent.nameTpl == 'inputtext' ? true : false));
                  break; 

                case 'checkbox':
                  scopeContent.lineValue = filterValue.value;
                  scopeContent.checked = (scopeContent.lineValue == 'S' ? true : false);
                  break; 

                default:

                  scopeContent.lineValue = filterValue.value;
                  break;                 
              }

              if(scopeContent.lineValue){
                scopeContent.invalid = false;              
              }

            }
          }
        }
      }
      return scopeContent;      
    }
  }
  return resultScope;
}])

String.prototype.splice = function(idx, rem, s) {
    return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
};

//INVERTER O PARAMETRO PARA A VISUALIZACAO CORRETA NA TAG 'type=date' HTML5
app.factory('formatField', ['$filter', function ($filter) {
  var format = {
    date: function(date, inverter, clear){
      if(angular.isObject(date)){
        date = date[0];
      }
      date = date.replace(/[\.]/g,'');
      var dateSplit = date.split(' ')[0];

      if(dateSplit){        
        if (isIE () ) {
          inverter = true;
        }

        if(!clear && inverter){
          dateSplit = dateSplit.split('-');
          if(dateSplit.length > 1){
            dateSplit = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
          }else{
            dateSplit = dateSplit[0];
          }
        }

        if(clear && !inverter){
          dateSplit = dateSplit.split('/');

          if(dateSplit.length == 1){
            dateSplit = dateSplit[0].split('-');
          }
          dateSplit = dateSplit[2] + dateSplit[1] + dateSplit[0];

        }
      }
      return dateSplit;
    },
    moeda: function(val, symbol){
      val = val.replace(/[\R$ ]/g,'');
      val = val.replace(/[\,]/g,'.');
      
      if(isNaN(val.replace(/[\.]/g,''))){
        return;
      }

      var cents; //CENTAVOS
      var centsPoint = val.split('.');
      
      //CAPTURAR OS CENTAVOS      
      if(centsPoint.length > 1){
        var lastCentsPoint = centsPoint[centsPoint.length - 1];
        
        for(var j=0; j<centsPoint.length - 1;j++){
          if(j == 0){
            val = centsPoint[j];
          }else{
            val = val + centsPoint[j];
          }
        }

        if(lastCentsPoint.length < 3){
          
          centsPoint = centsPoint[centsPoint.length - 1];          
          cents = (centsPoint.length == 1 ? centsPoint + '0' : centsPoint); //ACRESCENTAR 0 CASO O CENTAVOS CONTENHA APENAS UM NUMERO
        }        
      }

      if( val.length > 2)
        val = val.replace(/([0-9]{3})$/g, (val.length == 3 ? "$1" : ".$1"));
      if( val.length > 6)
        val = val.replace(/([0-9]{3}).([0-9]{3}$)/g, (val.length == 7 ? "$1.$2" : ".$1.$2"));

      if( val.length > 10)
        val = val.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}$)/g, (val.length == 11 ? "$1.$2.$3" : ".$1.$2.$3"));

      if( val.length > 14)
        val = val.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}).([0-9]{3}$)/g, (val.length == 15 ? "$1.$2.$3.$4" : ".$1.$2.$3.$4"));

      if( val.length > 18)
        val = val.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}).([0-9]{3}).([0-9]{3}$)/g, (val.length == 19 ? "1$1.$2.$3.$4.$5" : ".$1.$2.$3.$4.$5"));
  
      
      var result = (cents ? val + ',' + cents : val + ',00');
      return (symbol ? symbol + " " + result : result);
    },
    pontos: function(val){
      var valSplit = val.split('.');
      //FORMATACAO BASICA PARA INSERCAO DA MASCARA
      if(valSplit[1]){
        if(valSplit[1].length > 2){
          val = val.replace(/[\.]/g,'');
        }else{
          val = valSplit[0];
        }
      }
      
      if( val.length > 2)
        val = val.replace(/([0-9]{3})$/g, (val.length == 3 ? "$1" : ".$1"));
      
      if( val.length > 6)
        val = val.replace(/([0-9]{3}).([0-9]{3}$)/g, (val.length == 7 ? "$1.$2" : ".$1.$2"));

      if( val.length > 10)
        val = val.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}$)/g, (val.length == 11 ? "$1.$2.$3" : ".$1.$2.$3"));

      if( val.length > 14)
        val = val.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}).([0-9]{3}$)/g, (val.length == 15 ? "$1.$2.$3.$4" : ".$1.$2.$3.$4"));

      if( val.length > 18)
        val = val.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}).([0-9]{3}).([0-9]{3}$)/g, (val.length == 19 ? "$1.$2.$3.$4.$5" : ".$1.$2.$3.$4.$5"));

      return val;
    },
    olds: function(val, type){
      switch(type){
          case 'cpf': 
            val = val.replace(/[\.-]/g,'');
            var format = val.replace(/([0-9]{3})([0-9]{3})([0-9]{2}$)/g, ".$1.$2-$3");

            val = format;
            break;

          case 'tel':
            var format;
            val = val.replace(/[\() ]/g,'');
            if(val.length == 11){
              format = val.replace(/([0-9]{2})([0-9]{9}$)/g, "($1) $2"); 
            }else{
              format = val.replace(/([0-9]{2})([0-9]{8}$)/g, "($1) $2");
            }
            val = format;
            break;

          case 'rg':
            val = val.replace(/[\.-]/g,'');
            var format = val.replace(/([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{1}$)/g, "$1.$2.$3-$4");

            val = format;
            break;

          default:
            return val;
        }
      return val;
    }
  }
  return format;
}]);


//ADICIONAR A CLASSE 'ACTIVE' NO MENU CORRESPONDENTE
app.factory('activeNavigation', ['$rootScope', 'servicesConfig', 'urlSetParameter', '$filter', function ($rootScope, servicesConfig, urlSetParameter, $filter) {
  var activeNavigation = {
    active: function(nav){
      var layoutLinks;
      var setparameterurl;
      
      //CAPTURAR OBJETO REFERENTE AO LINK NO 'layout.links'
      angular.forEach(servicesConfig.user.layout.links, function(index, value){
        var urlOrigin = index.href.split(':')[0];
        if(urlOrigin === $rootScope.activeNavCurrent){            
          layoutLinks = index;          
        }
      });

      var parameternav = 'ref';

      if(layoutLinks){
        switch(nav.type){
          case 'navinterno': 

            if(nav.navinternaactiveaut){
              //CAPTURAR VALOR DO PARAMETRO NA URL
              setparameterurl = urlSetParameter.parameter(nav.navinternaactiveaut.parameterurl);
              parameternav = nav.navinternaactiveaut.parameterfiled;
              
              return (nav[parameternav] === setparameterurl ? 'active' : '');
            }else{
              return (nav[parameternav] === layoutLinks.navinternaactive ? 'active' : '');
            }
            break;

          case 'nav':

            if(nav.navactiveaut){
              //CAPTURAR VALOR DO PARAMETRO NA URL
              setparameterurl = urlSetParameter.parameter(nav.navactiveaut.parameterurl);
              parameternav = nav.navactiveaut.parameterfiled;
              
              return (nav[parameternav] === setparameterurl ? 'active' : '');
            }else{
              return (nav[parameternav] === layoutLinks.navactive ? 'active' : '');
            }
            break;

          case 'menu':
            if(nav.menuactiveaut){
              if(nav.menuactiveaut.length){
                var menuactive = [];

                //MULTIPLOS PARAMETROS NA URL
                for(var i=0; i<nav.menuactiveaut.length;i++){
                  var paramsActive = nav.menuactiveaut[i];

                  setparameterurl = urlSetParameter.parameter(paramsActive.parameterurl);
                  parameternav = paramsActive.parameterfiled;                   
                  
                  if(nav[parameternav] || parameternav == 0){
                    if(paramsActive.parameterfiled == "params"){
                      var captureParam = $filter('filter')(nav[parameternav], {id: paramsActive.paramsName}, true)[0];
                      
                      if(captureParam){
                        if(captureParam.value === setparameterurl){
                          menuactive.push('ok');
                        }
                      }
                    }else{
                      if(parameternav == 0){
                        if(parameternav === Number(setparameterurl)){
                          menuactive.push('ok');
                        }
                      }else{                        
                        if(nav[parameternav] === setparameterurl){
                          menuactive.push('ok');
                        }
                      }
                    }
                  }
                }

                return (nav.menuactiveaut.length == menuactive.length ? true : false);
              }else{    
                          
                //CAPTURAR VALOR DO PARAMETRO NA URL
                parameternav = nav.menuactiveaut.parameterfiled;
                setparameterurl = urlSetParameter.parameter(nav.menuactiveaut.parameterurl);

                return (nav[parameternav] === setparameterurl ? true : false);
              }
              
            }else{
              return (nav[parameternav] === layoutLinks.menuactive ? true : false);
            }
            break;

          default:
            return false;
        }
      }
      //console.log(nav.refhref, $rootScope.activeNavCurrent, nav.refhref === $rootScope.activeNavCurrent);
    }
  }
  return activeNavigation;
}]);


//AUTENTICACAO PAGINA ATUAL E MONTAGEM DA ESTRUTURA DA PAGINA CAPTURANDO INFOMACOES DO 'externalservice'
app.factory('authFn', ['$rootScope', '$window', 'authServices', 'defaultServices', 'breakParam', 'redirect', 'linkLocation', 'activeNavigation', '$localStorage', '$location', function ($rootScope, $window, authServices, defaultServices, breakParam, redirect, linkLocation, activeNavigation, $localStorage, $location) {
  var authFn = {
    auth: function($scope, layoutLinks){
      $("body").animate({scrollTop: 0}, "slow");
      //REDIRECT PARA QUANDO A URL DIGITADA NÃO ESTIVER COMPLETA, OU SEJA, SEM OS PARAMETROS NECESSÁRIOS
      if(layoutLinks.oldHref){
        if($location.path() == layoutLinks.oldHref){
          redirect.url(layoutLinks.href, layoutLinks);
        }
      }
      
      if($localStorage.setPagLogin && layoutLinks.name == "login"){
        if($rootScope.site.layout.links[$localStorage.setPagLogin]){
          var pageRedirect = $rootScope.site.layout.links[$localStorage.setPagLogin];
          redirect.url(pageRedirect.name, pageRedirect);
          return false;
          //$localStorage.setCookiePag = '';
        }
        //$localStorage.setCookiePag = $scope.pageServer.setCookiePag;
        //console.log('entrou aqui', layoutLinks);          
      }      

      //INSERIR CLASSE ATIVA NO MENU
      var url;
      if($window.location.hash){
        url = $window.location.hash.split('#')[1];
      }else{
        url = $window.location.pathname.split('/')[1];
      }
      url = url.split(':')[0];
      $rootScope.activeNavCurrent = url;
      $rootScope.pageServer = {layout: layoutLinks, externalServer: $scope.pageServer};

      authServices.authenticate(layoutLinks.pageClose, $scope.pageServer.content, function(){  
        var pageContent;
        if($scope.pageServer.content){          
          if($scope.pageServer.content.partial){
            pageContent = angular.copy(breakParam.breaks($rootScope.site.layout.partials, $scope.pageServer.content.partial)[0]);
          }else{
            pageContent = angular.copy($scope.pageServer.content);
          }
        }
        if($scope.pageServer.setPagLogin){
          $localStorage.setPagLogin = $scope.pageServer.setPagLogin;
          //console.log('entrou aqui', layoutLinks);          
        }

        $rootScope.pag = angular.copy($scope.pageServer.classe);
        $rootScope.pageCurrent = {};

        //ESCONDER AREAS
        if($scope.pageServer.hide){
          $rootScope.pageCurrent.hideheader = $scope.pageServer.hide.header;
          $rootScope.pageCurrent.headerlogin = $scope.pageServer.hide.headerlogin;
          $rootScope.pageCurrent.hidemenu = $scope.pageServer.hide.menu;
          $rootScope.pageCurrent.hidefooter = $scope.pageServer.hide.footer;
        }

        $rootScope.pageCurrent.header = angular.copy($rootScope.site.layout.header);
        
        $rootScope.pageCurrent.footer = angular.copy($rootScope.site.layout.footer);

        if($rootScope.pageCurrent.header.user){
          var user = $rootScope.pageCurrent.header.user;
          if(user.titleref){
            user.title = breakParam.breaks($rootScope.user, [user.titleref])[0];
          }
        }
        
        //$rootScope.pageCurrent.menu = $scope.menu;
        //$rootScope.pageCurrent.content = $scope.content;

        if($rootScope.pageCurrent.header.login){ 

          //MOSTRAR LOGIN CASO NAO CONTENHA NA PAGINA O PARAMETRO 'headerlogin'
          if($scope.pageServer.hide){
            if(!$scope.pageServer.hide.headerlogin){
              $rootScope.pageCurrent.header.login = angular.copy(breakParam.breaks($rootScope.site.layout.partials, ['login']));
            }

          }else{
            $rootScope.pageCurrent.header.login = angular.copy(breakParam.breaks($rootScope.site.layout.partials, ['login']));                        
          }
        }

        if($scope.pageServer.title){
         $rootScope.pageCurrent.pagTitle = angular.copy($scope.pageServer.title);
        }

        if($scope.pageServer.btnReturn){
          if($scope.pageServer.btnReturn.visibled){
            $rootScope.pageCurrent.btnReturn = angular.copy($scope.pageServer.btnReturn);            
          }
        }

        //VERIFICA SE O USUARIO ESTA LOGADO
        if(layoutLinks.pageClose){
          $rootScope.pageCurrent.menu = angular.copy(breakParam.breaks($rootScope.site.layout.partials, ($rootScope.user ? $scope.pageServer.menu : (!$rootScope.pageCurrent.header.login && $rootScope.site.layout.menu.login ? ['login'] : ''))));
        }else{
          $rootScope.pageCurrent.menu = angular.copy(breakParam.breaks($rootScope.site.layout.partials, $scope.pageServer.menu));
        }

        $rootScope.pageCurrent.nav = angular.copy(breakParam.breaks($rootScope.site.layout.partials, $scope.pageServer.nav));

        $rootScope.pageCurrent.banner = angular.copy(breakParam.breaks($rootScope.site.layout.banners, $scope.pageServer.banner));

        /*Essa checagem é para algumas paginas que nao tem o content. Ex: login*/
        if(pageContent){
          //CHAMADA DOS SERVICOS NAS PAGINAS
          //existe essa funcao na directiva 'tplinsert' para a chamada a partir dela
          $rootScope.pageCurrent.main = [];

          
          //SE HOUVER ERROR VERIFCICAR SE O ERRO DA TELA ANTERIOR DEVE CONTINUAR APARECENDO
          if($rootScope.mainMsgs){
            var expired;
            if($rootScope.mainMsgs.response){              
              expired = $rootScope.mainMsgs.response.expired;
            }
              
            // CHECAR MSG DE ERRO, PARA VER SE O 'expired' existe
            // Este erro vem do autService e é formatado pelo arquivo e não pelo retorno do serviço,
            // O unico que tem o expired é o de sessao expired nome da mensagem é msgSessionFail
            if(!expired){

              $rootScope.mainMsgs = ($rootScope.mainMsgs.keep ? $rootScope.mainMsgs : '');              
              if($rootScope.mainMsgs){
                $rootScope.mainMsgs.errorContent = false;              
              }
            }                        
          }


          if(pageContent.service){
            if(pageContent.service.call){
              var fn = eval('defaultServices.'+pageContent.service.call.objresult);
              fn((pageContent), function(){
                if(pageContent.detail){
                  pageContent.formdefault = angular.copy(pageContent.detail);
                }
                $scope.content = pageContent;
                $rootScope.pageCurrent.main[0] = pageContent;
              });              
            }else{
                $scope.content = pageContent;
                $rootScope.pageCurrent.main[0] = pageContent;
            }

          }else{
            
            $scope.content = pageContent;

            if(pageContent.length > 1){
              $rootScope.pageCurrent.main = pageContent;
            }else{
              $rootScope.pageCurrent.main[0] = pageContent;              
            }
          }

          if(pageContent.tpl == 'tpl-form'){
            pageContent.formdefault = angular.copy(pageContent.detail);
            $scope.content = pageContent;
            $rootScope.pageCurrent.main[0] = pageContent;
          }            
        }


        //REDIRECIONAR PAGINA CASO NA PAGINA EXISTIR 'redirectauth' e estiver logado
        //Ex: Cadastro que pode ir para o pergil
        if($scope.pageServer.redirectauth && $localStorage.user){
          redirect.url(($scope.pageServer.redirectauth == true ? $scope.pageServer.redirectlogin : $scope.pageServer.redirectauth));
        }

        //REDIRECT OU CHAMADA DE FUNCAO
        $scope.location = function(btn, form){
          var scopeRoot = '$scope.$parent';
          if(btn.func){
            var fn = eval(scopeRoot+'.'+btn.func);
            linkLocation.location(btn, fn, form);
          }else{
            linkLocation.location(btn, scopeRoot, form);
          }        
        }        

        $scope.activeNav = function(nav){
          return activeNavigation.active(nav);
        }
        return $scope;
      });
      
    }
  }
  return authFn;
}]);
  

var internalCtrl = function($scope, $rootScope, $localStorage, $sessionStorage, $location, authServices, defaultServices, redirect, authFn, activeNavigation, reCAPTCHA, $timeout){
  
  //MENU HEADER
  $scope.menuHeader = [
    {title: "Sair", href: "", click: "logout"}
  ];

  
  $scope.navlocation = function(nav){
    if($rootScope.mainMsgs){
      $rootScope.mainMsgs.keep = false; //REMOVER MENSAGENS GERAL QUE ESTAVAM NA TELA
    }

    //ATUALIZAR CONTEUDO DA PAGINA CASO SEJA CLICADO NO MESMO LINK QUE ESTA ATUALMENTE
    $rootScope.pageCurrent = {};

    var urldestination = ($rootScope.pageServer.layout.hrefDefault ? $rootScope.pageServer.layout.hrefDefault : $rootScope.pageServer.layout.href);
    if($location.path() == urldestination && nav.url == $rootScope.pageServer.layout.name){

      var page = {
        pageServer: $rootScope.pageServer.externalServer,
        pageClose: $rootScope.pageServer.layout.pageclose          
      }
      $timeout(function(){
        authFn.auth(page, $rootScope.pageServer.layout);
      }, 100);
    }else{
      redirect.url(nav.url, nav);
    }
    //$rootScope.activeNavCurrent = nav.ref;
  }

  //ESCONDER MENU LATERAL
  $rootScope.menuShow = true;
  $rootScope.showhideMenu = function(){
      $rootScope.menuShow = ($rootScope.menuShow ? false: true);
  }

  //AUTENTICACAO PARA MOSTRA A NAVEGACAO
  $scope.authNav = function(authentic){
    if(authentic){
      return ($rootScope.user ? true : false);
    }else{
      return true;
    }
  } 


  //LOGIN
  $scope.login = function (btn) {

    var clearParam = function(){
      $scope.sendLogin = false;
    }
    var formValid = defaultServices.captureFields(btn.form);
    if (formValid.response.status == 'Ok') {
      //'$scope.pageServer.redirectlogin' = CHECA SE O LOGIN FAZ REDIRECT 
      
      var currentLocation = $location.url();
      currentLocation = currentLocation.split('/')[1]; //URL DA PAGINA EX: '/home/teste/aqui/oi' pega o home
      
      var redirectLogin;
      
      //CHECAGEM PARA GUARDAR URL QUANDO A URL DESEJADA FOR UMA URL FECHADA E AINDA NÃO ESTIVER LOGADO
      if($sessionStorage.urlafterlogin){
        if($sessionStorage.urlafterloginParameter){
          redirectLogin = {
            urlafter: $sessionStorage.urlafterlogin,
            parameters: $sessionStorage.urlafterloginParameter,
            urlorigin: $sessionStorage.urlafterloginOrigin
          }
        }else{
          redirectLogin = $sessionStorage.urlafterlogin;  
        }
        
      }else{
        redirectLogin = ($scope.pageServer.redirectlogin ? $scope.pageServer.redirectlogin : btn.url);        
      }

      authServices.login(formValid.response.content, redirectLogin, currentLocation).success(function(){
        //ATUALIZAR A PAGINA CASO O PARAMETRO 'redirectLogin' SEJA IGUAL A 'not'
        //E A PAGINA QUE SERA REDIRECIONADA SEJA IGUAL A TELA ATUAL
        //*CONDICAO CONTINUA NA FUNCAO 'authServices.login' NO ARQUIVO 'authServices.js'
        if(redirectLogin.parameters){
          if(redirectLogin.urlafter != 'not' && currentLocation == redirectLogin.urlafter){
              //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
              authFn.auth($scope, true);
            }
        }else{
          if(redirectLogin != 'not' && currentLocation == redirectLogin){
                
            //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
            authFn.auth($scope, true);                
          } 
        }

        delete $sessionStorage.urlafterlogin;
        delete $sessionStorage.urlafterloginParameter;
        delete $sessionStorage.urlafterloginOrigin;

      }).error(function(data){
          btn.form.msgs = data;
          clearParam();
      });        
    }else{
      btn.form.msgs = formValid;
      clearParam();
      return false;
    }    
  }  

  //LOGOUT
  $scope.logout = function(){
    authServices.logout();
  };
  
};



var appCtrl = function($scope, $rootScope){
  	//$scope.location = function(btn){
  	//	console.log('entrou btn appCtrl', btn)
 	//   $location.path(btn.url);
  	//}
};