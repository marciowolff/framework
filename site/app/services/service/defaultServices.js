'use strict';

external.factory('defaultServices', ['$rootScope', '$resource', '$window', '$location', '$http', 'servicesConfig', 'baseUrls', 'breakParam', 'formatField', 'redirect', '$filter', 'authServices', '$timeout', 'urlSetParameter', function($rootScope, $resource, $window, $location, $http, servicesConfig, baseUrls, breakParam, formatField, redirect, $filter, authServices, $timeout, urlSetParameter) {
    var defaultServices = {
        _load: function(urlDestination, parameter){
            return $http({method: 'GET', url: servicesConfig.endpoints.hoot + urlDestination + (parameter ? parameter : '')})
        },
        _save: function(urlDestination, parameter){

            return $http({ method: 'POST', url: servicesConfig.endpoints.hoot + urlDestination, data: parameter})
        },
        _delete: function(urlDestination, parameter){
            return $http({ method: 'POST', url: servicesConfig.endpoints.hoot + urlDestination, data: parameter})
        },
        _del: $resource(servicesConfig.endpoints.people + ':personId', { personId: '@id' }),
        _edit: $resource(servicesConfig.endpoints.people + ':personId', { personId: '@id' }),
        msgdefault: {
            response : {
                status: "Fail",
                messages: {
                    message: [
                        {text: "Falha no serviço. Tente mais tarde!"}
                    ]
                }
            }
        },
        msgload: {
            response : {
                status: "Warning",
                messages: {
                    message: [
                        {text: "Aguarde..."}
                    ]
                }
            }
        },

        delet: function(btn, callback){
            var formValid = defaultServices.captureFields(btn.form, true),
                form = btn.form,
                msgSucess;  
            
            var serviceDelete = (btn.service ? btn.service.delet : btn.form.service.delet);        
            var deleteUrl;

            if(serviceDelete.url){
                deleteUrl = serviceDelete.url;                 
            }

            var dataDelete = {};
            var errorForm;

            var insertDataDelete = function(array){
                var nameItem;
                var value;
                angular.forEach(array, function(index, val){ 
                    if(val == 'name'){nameItem = index};
                    if(val == 'value' || val == 'lineValue'){value = index};
                });
                dataDelete[nameItem] = value;
            }


            //CAPTURAR CAMPO DO FORMULARIO OU LINHA NA TABELA
            if(serviceDelete.captureparameter){    
                var captureRoot = defaultServices.captureRoot(serviceDelete, serviceDelete);
                if(captureRoot){
                    insertDataDelete(captureRoot);
                }
            }


            for(var i = 0; i< formValid.response.content.length; i++){
                var item = formValid.response.content[i];

                for(var j=0; j<serviceDelete.parameters.length; j++){
                    var parameter = serviceDelete.parameters[j];

                    //CAPTURA PARAMETRO DO ROOTSCOPE OU DO FORMULARIO, LINHA CLICADA NA TABELA
                    if(parameter.captureparameter){
                        var captureRoot = defaultServices.captureRoot(form, parameter);
                        (captureRoot ? insertDataDelete(captureRoot) : errorForm = true);
                    }else{
                        if(parameter == item.name || parameter.name == item.name){
                            (item.value ? insertDataDelete(item) : errorForm = true);
                        }
                    }
                }
            }

            //ERRO POR FALTAR PARAMETRO
            if(errorForm){                
                form.msgs = {
                    response : {
                        status: "Fail",
                        messages: {
                            message: [
                                {text: "Não foi possível excluir. Por favor, tente mais tarde!"}
                            ]
                        }
                    }
                }
            }else{
                //DELETAR ITEM
                btn.disabled = true;
                
                var del = defaultServices._delete(deleteUrl, dataDelete).success(function(successData){
                    btn.disabled = false; //HABILITAR BOTAO PARA DELETAR NOVAMENTE
                    if(form.msg){
                        msgSucess = (form.msg.success ? form.msg.success : "Informações deletadas!");
                    }else{
                        msgSucess = "Informações deletadas!";
                    }

                    if(serviceDelete.reload){
                        defaultServices.reload(serviceDelete.reload);
                    }

                    form.msgs = {
                        response : {
                            status: "Ok",
                            messages: {
                                message: [
                                    {text: msgSucess}
                                ]
                            }
                        }
                    }

                    if(btn.url && !btn.openmodal){
                        redirect.url(btn.url, btn);
                    }

                    form.response = successData.response;

                    if (angular.isFunction(callback)) {
                        callback(form);
                    }

                }).error(function(errorData){
                    btn.disabled = false; //HABILITAR BOTAO PARA DELETAR NOVAMENTE
                    
                    if(btn.url && !btn.openmodal){
                        redirect.url(btn.url, btn);
                    }
                    //MSG DE ERRO                    
                    if(errorData.response){
                        form.msgs = errorData;                        
                    }else{
                        form.msgs = defaultServices.msgdefault;
                    }
                });
            }
        },

        //ENVIAR FORMULARIO (SALVAR OU EDITAR)
        save: function(btn, callback){        	
        	var formValid,
            	form = btn.form,
                msgSucess;

           	//HABILITAR BOTOES APOS SALVAR
            var disabledBtns = function(disabled){
                if(form.btns){
		          	for(var j=0;j < form.btns.length; j++){
                        form.btns[j].disabled = disabled;
		           	}
		        }
            }
            
            if(btn.topPagclick){
                $("body").animate({scrollTop: 0}, "slow");
            }

            //SALVAR OUTRO FORMULARIO
            //'saveOtherForm' NOME DO PARAMETRO QUE CONTENHA O FORMULARIO QUE DESEJA SALVAR
            //PRIMEIRO VALIDO SE O FORMULARIO ATUAL PRECISA SER VALIDADO, DEPOIS VALIDO O FORMULARIO DESEJADO E SALVO
        	if(btn.saveAfterForm){
        		var formThis = defaultServices.captureFields(btn.form);
                if($rootScope){                    
                    if($rootScope.formPrimary){
                        if(formThis.response.status == 'Ok' && $rootScope.formPrimary){
                            formValid = defaultServices.captureFields($rootScope.formPrimary.form);
                        }else{
                            formValid = formThis;
                        }
                    }else{
                        //PARA INSERIR O ERRO DENTRO DA MODAL É PRECISO QUE O 'formValid' SEJA O FORMULARIO DA MODAL 
                        //E NAO O FORMULARIO VALIDADO PARA QUE ASSIM O ERRO SEJA INSERIDO NA MODAL E NAO NO OUTRO FORMULARIO
                        formValid = formThis;
                    }
                }else{
                    formValid = formThis;
                }
        	}else{
                formValid = defaultServices.captureFields(btn.form);        		
        	}
            
            var serviceSend = (btn.service ? btn.service.send : btn.form.service.send);
            var sendUrl;
            if(serviceSend.url){
                //CAPTURAR PARAMETRO DO '$rootScope.user'
                if(serviceSend.parameter){
                    var filter = breakParam.breaks($rootScope.user, [serviceSend.parameter]);
                    sendUrl = serviceSend.url + (filter.length == 0 ? 0 : filter);
                }else{
                    sendUrl = serviceSend.url; 
                }
            }

            //DESABILITAR BOTOES APOS SALVAR
            disabledBtns(true);

            if (formValid.response.status == 'Ok') {
                var dataSend = {};
                //Diagramar data para envio correto

                if(serviceSend.createNewobj){
                    dataSend[serviceSend.createNewobj.name] = {};
                }
                for(var i = 0; i< formValid.response.content.length; i++){
                    var item = formValid.response.content[i];

                    var nameItem;
                    var value;
                    var insertNewObj = false;
                    
                    angular.forEach(item, function(index, val){ 
                        (val == 'name' ? nameItem = index : '');
                        (val == 'value' ? value = index : '');
                    });

                    if(serviceSend.createNewobj){
                        for(var j=0; j<serviceSend.createNewobj.fields.length;j++){
                            var field = serviceSend.createNewobj.fields[j];
                            if(field == nameItem){
                                insertNewObj = true;
                                var newObj = dataSend[serviceSend.createNewobj.name];
                                newObj[nameItem] = value;
                            }
                        }
                        
                        //INSERIR O CAMPO NO NOVO OBJETO E NA RAIZ DO ENVIO
                        (serviceSend.createNewobj.duplicateObj ? insertNewObj = false : '');
                    }

                    if(!insertNewObj){
                        dataSend[nameItem] = value;    
                    }
                }

                
                
                if(!btn.url && !btn.openmodal && !btn.msgIgnore){
                   form.msgs = defaultServices.msgload;
                }


                //EDITAR FORMULARIO - necessita enviar o parametro edit = true;
                if(form.edit && !form.removeEditSave){
                    dataSend.edit = true;
                }

                //CASO NAO CONTENHA URL
                if(serviceSend.notsave){
                    
                    //CAPTURAR VALOR DE UM CAMPO DO FORMULARIO
                    if(serviceSend.saveparameter){

                        //INSERIR PARAMETRORS NO '$rootScope.formsaved'
                        defaultServices.insertFormsaved(serviceSend.saveparameter, form, form);
                        
                        if(btn.url && !btn.openmodal){
                            redirect.url(btn.url, btn);
                        }

                        if(btn.openmodal){
                        	if (angular.isFunction(callback)) {
                        		//PROSSEGUIR A FUNCAO CASO SEJA PARA ABRIR A MODAL
                        		callback({ response : {status: 'Ok'}});	                            
	                        }
                        }
                    }

                    if(!serviceSend.url){
                        if(serviceSend.parameterclicked && $rootScope.objClicked){
                            //CAPTURAR VALOR DA AREA CLICADA
                            var filter;
                            if($rootScope.objClicked.length){
                            }else{
                                filter = $rootScope.objClicked[serviceSend.parameter];
                            }
                            //INSERIR URL DINAMICA
                            serviceSend.url = filter;
                        }
                    }

                    disabledBtns(false);
                }else{
                    var save = defaultServices._save(sendUrl + '.json', dataSend).success(function(successData){
                        
                        //HABILITAR BOTOES APOS SALVAR
                        $timeout(function(){
                            disabledBtns(false);
                        }, 1000);

                        if(successData.response.status == "Ok"){

                            if(form.msg){
                                msgSucess = (form.msg.success ? form.msg.success : "Informações salvas com sucesso!");
                            }else{
                                msgSucess = "Informações salvas com sucesso!";
                            }

                            if(btn.msgIgnore){
                                form.msgs = '';
                            }else{
                                form.msgs = {
                                    response : {
                                        status: "Ok",
                                        messages: {
                                            message: [
                                                {text: msgSucess}
                                            ]
                                        }
                                    }
                                }                                
                            }

                            //CAPTURAR VALOR DE UM CAMPO DO FORMULARIO
                            if(serviceSend.saveparameter){
                                //INSERIR PARAMETRORS NO '$rootScope.formsaved'
                                defaultServices.insertFormsaved(serviceSend.saveparameter, form, form);

                                if(btn.url && !btn.openmodal){
                                    redirect.url(btn.url, btn);
                                }
                            }

                            if(btn.clearform){
                                defaultServices.cleanForm(form);                        
                            }

                            //RECARREGAR USUARIO
                            if(serviceSend.personreload){
                                authServices.authenticate(true,'', '', true);
                            } 

                            if (angular.isFunction(callback)) {
                                //callback(data);
                                callback(formValid);

                                if(btn.url && !btn.openmodal){
                                    defaultServices.cleanForm(form); 
                                    redirect.url(btn.url, btn);
                                }
                            }else{
                                if(btn.url && !btn.openmodal){
                                    defaultServices.cleanForm(form); 
                                    redirect.url(btn.url, btn);
                                }
                            }
                                               
                            if(serviceSend.reload){
                                defaultServices.reload(serviceSend.reload);
                            }
                        
                        }else{

                            if(btn.msgIgnore){
                                form.msgs = '';
                            }else{
                                 //MSG DE ERRO                    
                                if(successData.response){
                                    form.msgs = successData;                        
                                }else{
                                    form.msgs = defaultServices.msgdefault;
                                }   
                            }
                        }                        

                    }).error(function(errorData){

                        //HABILITAR BOTOES APOS SALVAR
                        disabledBtns(false);

                        if(btn.msgIgnore){
                            form.msgs = '';
                        }else{
                            //MSG DE ERRO                    
                            if(errorData.response){
                                form.msgs = errorData;                        
                            }else{
                                form.msgs = defaultServices.msgdefault;
                            }
                        }

                    });
                }
            }else{
            	//HABILITAR BOTOES APOS SALVAR
                disabledBtns(false);
                defaultServices.errorForm(form, formValid, callback);
            }
        },

        //VARREAR RESULTADO
        fieldSet: function(result, callback){
            if(result.line){

                for(var i=0; i<result.line.length; i++){
                    var fields = result.line[i].field;

                    for(var j=0; j<fields.length;j++){
                        if(callback){
                            callback(fields[j]);
                        }
                    }       
                }
            }
        },

        //CAPTURAR PARAMETRO E JOGAR O '$rootScope.formsaved'
        insertFormsaved: function(saveparameter, serviceForm, formMsg){
            $rootScope.formsaved = [];

            for(var i=0; i<saveparameter.length; i++){
                var parameter = saveparameter[i];
                var captureForm;

                //PUXAR TODOS OS CAMPOS
                if(parameter == 'all'){
                	for(var j=0; j< serviceForm.detail.length; j++){
                    	var fieldset = serviceForm.detail[j].form;
                    	for(var l=0; l< fieldset.length; l++){
                        	var campos = fieldset[l].campos;
                    		
                    		if(campos.length > 0){	                    			
	                    		for(var a=0; a<campos.length;a++){
	                				$rootScope.formsaved.push(campos[a]);
	                    		}
                    		}else{
                    			$rootScope.formsaved.push(campos);
                    		}
                        }
                    }
                	
                }else{
					captureForm = defaultServices.captureForm(serviceForm, parameter, formMsg);
            		$rootScope.formsaved.push({name: parameter, value: captureForm});
                }

            }
        },

        /*
        CONSTRUÇÃO DA URL DE FILTRO PARA SER INSERIDA NA URL DE ORIGEM
        EXE: url de origem '/teste/0', url do filtro: '/periodo/0'
        ESSA FUNÇÃO CONSTROI A URL DO FILTRO E DEPOIS DEVE SER UNIFICADA ANTES DE CHAMAR O SERVICE
        PARA QUE FIQUE ASSIM: '/teste/0/periodo/0'
        */        
        filterHeader: function(serviceFilters, headerFilter, filterPag){

        	var insertParameterUrl = function(campo, objUrl){

                if(campo.lineValue){
                	campo.value = (campo.lineValue.id ? campo.lineValue.id : campo.lineValue);                    	
                }

                var valueDefault = (objUrl.valueDefault ? objUrl.valueDefault : '0');
                if(objUrl.parameterFilter){                    	
                    if(campo.name == objUrl.parameterFilter){
                    	//QUANDO FOR CLICADO NA PAGINACAO NOS PARAMETROS DOS FILTROS NAO DEVEM SER ATUALIZADOS CASO FOREM TROCADOS
                    	//'valueOrigin' garante que o parametro dos filtros seja o parametro filtrado antes de clicar na paginacao
                    	if(filterPag){
							campo.valueOrigin = (campo.valueOrigin ? campo.valueOrigin : valueDefault);
                    	}else{
                    		campo.valueOrigin = (campo.value ? campo.value : valueDefault);
                    	}
                   		return campo;
                    }
                }else{
                    var filter = breakParam.breaks($rootScope.user, [objUrl.parameter]);
                    //QUANDO FOR CLICADO NA PAGINACAO NOS PARAMETROS DOS FILTROS NAO DEVEM SER ATUALIZADOS CASO FOREM TROCADOS
                    //'valueOrigin' garante que o parametro dos filtros seja o parametro filtrado antes de clicar na paginacao
                    if(filterPag){
                    	campo.valueOrigin = (campo.valueOrigin ? campo.valueOrigin : valueDefault);
                	}else{
                		campo.valueOrigin = (filter ? filter : valueDefault);
                	}   
                	return campo;
                }                       
            }

            if(headerFilter.show){
                var camposFilter = defaultServices.captureFields(headerFilter, true);
                
                if(camposFilter){                    
                    if (camposFilter.response.status == 'Ok') {
                        var urlFilter = '';
                        var filter;
                        
                        for(var i = 0; i<serviceFilters.length; i++){
                            var servFilter = serviceFilters[i];
                            
                        	//CAMPOS DO FILTRO
                        	var campoHeaderForm = $filter('filter')(headerFilter.detail[0].form[0].campos, servFilter.parameterFilter)[0];
                        	
		                	//CAPTURAR VALOR DO FILTRO SELECIONADO
		                	filter = insertParameterUrl(campoHeaderForm, servFilter);
		                	if(filter){

			                	if(campoHeaderForm.name == filter.name){
			                		//INSERIR VALOR ORIGINAL DO CAMPO
			                		//para quando o usuario clicar na paginacao sem ter clicado no filtro,
			                		//assim quando clicar na paginacao o valor do filtro sera o original caso ele
			                		//tenha selecionado outro filtro
			                		if(!campoHeaderForm.valueOrigin){
                            			campoHeaderForm.valueOrigin = filter.value;                            	 			
                            		}                           	 		
                            	}                            	
                            	
                    			urlFilter = urlFilter + servFilter.url + filter.valueOrigin;                            	
		                	}			                
                        }

                        return urlFilter;                        
                    }
                }
            }
        },

        //BTN FILTER
        //FUNCAO QUE INSERI A URL DO FILTRO É A 'filterHeader'
        filterTable: function(obj, filterPag){
            var table = obj.form.table;
            
            table.result = {};
            if(filterPag){
            	filterPag = obj;	
            }else{
            	filterPag = false;
            }
            table.msgs = defaultServices.msgload;
            table.conditional = {};
            defaultServices.load(table, '', '', filterPag);
        },

        //BUSCAR
        search: function(obj, callback){
            var form = obj.form;
            var formValid = defaultServices.captureFields(form);
            var parameter;
            
            if(form.service.search){
                var service = form.service.search;
                form.msgs = '';

                if (formValid.response.status == 'Ok') { 

                    //LOOOP FIELDS
                    form = defaultServices.loopFiedsForm(form, function(data){
                        if(data.name == service.parameter){
                            (data.lineValue ? service.value = data.lineValue : '');
                        }
                    });
                    
                    defaultServices.reload(form.service.search.reload, form.service.search);
                    
                }else{
                    defaultServices.errorForm(form, formValid, callback);
                }
            }

        },

        loopFiedsForm: function(form, callback){
            for(var i=0; i<form.detail.length;i++){
                var formObj = form.detail[i].form;
                for(var j=0; j< formObj.length; j++){
                    var campos = formObj[j].campos;

                    for(var l=0; l<campos.length;l++){
                        var campo = campos[l];

                        if(callback){
                            callback(campo);
                        }
                    }
                }
            }

            return form;
        },

        load: function (obj, callback, search, filterPag) {
            var urlService, serv = (search ? search : obj.event ? obj : obj.urls || obj.url ? obj : obj.service.search ? obj.service.search : obj.service.call );
            
            var objAll = [];
            var objDefault = [];
            var clearObj = objDefault.push(obj)[0];

            var fnCall = function(service, multipleServices, index){

                if(obj.filter){
                    var validate = {}
                    validate.detail = obj.form.header.filter.detail;
                    validate.tplform = obj.form.tplform;
                    
                    var formValid = defaultServices.captureFields(validate);                
                    if(formValid.response.status == 'Ok'){
                        obj = obj.form.table;
                    }
                }

                if(service.parameter){
                    if(service.objresult == 'search'){
                        
                        if(service.value){
                            urlService = service.url + service.value;
                        }

                    }else{

                        //CAPTURAR PARAMETRO DO FORMULARIO ANTERIOR                    
                        if(service.captureparameter){    

                            //CAPTURAR CAMPO DO FORMULARIO
                            var captureRoot = defaultServices.captureRoot(service, service);
                            urlService = service.url + captureRoot.value;

                        }else{
                            
                            //CAPTURAR PARAMETRO DO '$rootScope.user'
                            var filter = breakParam.breaks($rootScope.user, [service.parameter]);
                            urlService = service.url + (filter.length == 0 ? 0 : filter);
                        }
                        
                    }

                //URLS
                }else if(service.urls){
                    urlService = '';
                    var urlComplete = true;
                    var filterMultiple;
                    for(var i = 0; i<service.urls.length; i++){
                        var url = service.urls[i];
                        var filter;
                        
                        if(url.parameterclicked){
                            //CAPTURAR VALOR DA AREA CLICADA
                            filter = defaultServices.captureClicked(url.parameter);                            

                        }else if(url.parameterform){
                            
                            //CAPTURAR VALOR DE UM CAMPO DO FORMULARIO
                            service.form = (service.form ? service.form : obj.form ? obj.form : obj);
                            filter = defaultServices.captureForm(service.form, url.parameter, (obj.form ? obj.form : obj), service.conditional, '');
                            if(filter.response){
                                var form = (obj.form ? obj.form : obj);
                                form.msgs = filter;
                                return obj.form; 
                            }else{
                                var form = (obj.form ? obj.form : obj);
                                form.msgs = '';                                
                                filter = (filter.value ? filter.value : filter);
                            }

                        }else if(url.parameterurl){
                        	//CAPTURAR VALOR DO PARAMETRO NA URL
                        	var setparameterurl = urlSetParameter.parameter(url.parameter);
                        	filter = (setparameterurl ? setparameterurl : 0);

                        }else if(url.captureparameter){

                            //CAPTURAR CAMPO DO FORMULARIO                        
                            var captureRoot = defaultServices.captureRoot(service, url);
                            if(captureRoot){
                                filter = captureRoot.value;                            
                            }else{
                                filter = 0;
                            }

                        //CAPTURAR PARAMETROS DO 'param' QUE ESTA DENTRO DO '$rootScope.objCliked'
                        }else if(url.setparamObj){
                        	if($rootScope.objClicked){
                        		if($rootScope.objClicked.params){
	                        		var captureParam = $filter('filter')($rootScope.objClicked.params, {id: url.parameter}, true)[0];
	                        		if(captureParam){
	                        			filter = captureParam.value;
	                        		}else{
	                        			filter = 0;
	                        		}
                        		}
                        	}

                        }else{
                            //CAPTURAR VALOR DO USUARIO

                            if(url.parameterType){
                                if(url.parameterType == 'string'){
                                    filter = url.parameter;
                                }
                            }else{

                                filter = breakParam.breaks($rootScope.user, [url.parameter]);

                                if(filter.length == 0){
                                    filter = 0;
                                }
                            }
                        }

                        urlService = urlService + url.url + filter; 
                    }
                
                }else{
                    urlService = service.url;                    
                }

                //INSERCAO DE FILTROS DO HEADER E PAGINACAO NA CONSTRUCAO DA URL
                urlService = defaultServices.filterInsert(obj, service, urlService, filterPag);
                if(urlService){
                	var loadServices = defaultServices._load(urlService +'.json').success(function(successData){                           
                        //SESSÃO EXPIRADA
                        if(successData.messages){
                        	authServices.logout('', successData);
                        	
                        }else{
                        	var successContent = successData.body.content;                   
                        	    
                        	//CASO TENHA MULTIPLAS CHAMADAS NAO APAGAR O ERROS
                        	(multipleServices ? '' : $rootScope.mainMsgs = '');
	                        
	                        //Não limpar a area quando for uma busca
	                        if(!successContent.header && !successContent.footer && !successContent.line && !multipleServices){
	                            obj.msgs = {response: (successData.response ? successData.response : defaultServices.msgdefault.response)};
	                        }else{
	                            obj.result = successData.body.content;

	                            //INSERCAO DOS PARAMETROS PARA A PAGINACAO APÓS O CARREGAMENTO DO SERVICE
								//*Estes mesmos parametros são inseridos na diretiva 'tplPagination', ou seja, qualquer alteracao deve ser feita aqui e lá!
								//Também é encontrado no 'tplInsert' na funcao callTpl(). Necessario para quando a condicional da paginacao é o proprio resultado
	                            var page = (successData.body.page ? successData.body.page : {});
	                            obj.page = page;
                            	obj.page.bigCurrentPage = page.pagenumber; //PAGINA ATUAL
                            	obj.page.bigTotalItems =  page.totalrecord; //QUANTIDADE DE ITEMS TOTAIS
		    
                            	if(obj.pagination){
                            		obj.page.totalItems = obj.pagination.totalItems;     
                            		obj.page.url = obj.pagination.url;
		    						obj.page.maxSize = obj.pagination.maxSize;
		    						obj.page.boundaryLinks = obj.pagination.boundaryLinks;
		    						obj.page.directionLinks = obj.pagination.directionLinks;
		    						obj.page.numPagesText = obj.pagination.numPagesText;

                            		obj.page.previoustext = obj.pagination.previoustext;
		    						obj.page.nexttext = obj.pagination.nexttext;
		    						obj.page.firsttext = obj.pagination.firsttext;
		    						obj.page.lasttext = obj.pagination.lasttext;
                            	}

	                            //CASO TENHA MULTIPLAS CHAMADAS NAO APAGAR O ERROS
	                            (multipleServices ? '' : obj.msgs = '');
	                        }

	                        var objaditional = obj.aditionals;                

	                        //DESABILITAR BOTOES DO FORMULARIO
	                        if(obj.formdisabled){
	                            if(obj.formdisabled.btns){
	                                defaultServices.disabledBtns(obj);
	                            }
	                        }

	                        if(service.filter){
	                            var filter = breakParam.breaks(obj.result, [service.filter])
	                            obj.result = {line: filter[0]};
	                        }

	                        //INSERCAO DE ELEMENTOS ADICIONAIS NO RESULTADO
	                        if(obj.titles && obj.result.header){
	                            if(obj.titles.length > 0){
	                                defaultServices.loopLine(obj.titles, obj.result.header, objaditional);
	                            }
	                        }
	                        if(obj.body && obj.result.line){

	                            if(obj.body.length > 0){
	                                defaultServices.loopLine(obj.body, obj.result.line, objaditional);                        
	                            }
	                        }

	                        //PARAMETRO PARA SUBSTITUIR VALOR DOS CAMPOS (ATUALIZAR CAMPO)                    
	                        if(objaditional && obj.result.line){
	                            if(objaditional.field || objaditional.disabled){
	                                defaultServices.loopLine('', obj.result.line, objaditional);                        
	                            }
	                             
	                            if(objaditional.setload){
	                                defaultServices.loopLine(obj.form.detail[0].form, obj.result.line, objaditional);
	                            }    
	                        }

	                        if(obj.footer && obj.result.footer){                        
	                            defaultServices.loopLine(obj.footer, obj.result.footer, objaditional);
	                        }

	                        //CHAMADA DE MULTIPLAS URLS
	                        if(multipleServices){

	                            //INSERIR O PRIMEIRO OBJETO QUE TENHA DADO SUCESSO. OS DEMAIS SERA INSERIDO NO '.result' DO PRIMEIRO OBJETO
	                            if(!objAll[0]){
	                                objAll.push(obj.result);
	                            }else{

	                                var resultAll = objAll[0];
	                                var resultObj = obj.result;

	                                //INSERIR HEADERS
	                                if(resultObj.header){
	                                    for(var j=0;j<resultObj.header.length;j++){
	                                        resultAll.header.push(resultObj.header[j]);
	                                    }
	                                }

	                                //INSERIR LINES
	                                if(resultObj.line){                                
	                                    (resultAll.line ? resultAll.line : resultAll.line = []);
	                                    for(var j=0;j<resultObj.line.length;j++){
	                                        resultAll.line.push(resultObj.line[j]);
	                                    }
	                                }

	                                //INSERIR FOOTERS
	                                if(resultObj.footer){
	                                    for(var j=0;j<resultObj.footer.length;j++){
	                                        resultAll.footer.push(resultObj.footer[j]);
	                                    }
	                                }
	                            }

	                            //ULTIMA CHAMADA EXECUTAR O CALLBACK E RETURNAR O 'OBJ'
	                            if(index == serv.urlsmultiple.length - 1){
	                                obj.result = objAll[0];

	                                if (angular.isFunction(callback)) {
	                                	callback(obj);	                                	
	                                }

	                                return obj;
	                            }


	                        //CHAMADA SIMPLES
	                        }else{

	                            if (angular.isFunction(callback)) {
	                                callback(obj);
	                            }

	                            return obj;
	                        }
                        }

                    }).error(function(errorData){
                    	if(obj.detail || obj.btns){
                            if(!clearObj){
                                clearObj = {};                                
                            }
                            clearObj.detail = [];
                            clearObj.btns = [];
                        }else{
                            clearObj = (obj.form ? obj.form : obj);
                        }                    

                        if(service.error){

                            if (angular.isFunction(callback)) {
                            	callback(clearObj);
                            }

                            $rootScope.mainMsgs = {response: (service.errordefault ? (errorData.response ? errorData.response : defaultServices.msgdefault.response) : defaultServices.msgdefault.response)};
                            $rootScope.mainMsgs.btns = service.btnserror;                    

                            
                            if(service.error.hidecontent && $rootScope.mainMsgs){
                                $rootScope.mainMsgs.errorcontent = true;    
                            }
                            

                            if(service.error.urlparametererror && $rootScope.mainMsgs){
                                $rootScope.mainMsgs.keep = true;
                                redirect.url(service.error.urlparametererror, service.error);
                            }
                        }else{
                            if(errorData){
                                if(errorData.response){
                                    if(errorData.response.messages.message[0].text){
                                        clearObj.msgs = errorData;
                                    }else{
                                        clearObj.msgs = defaultServices.msgdefault;    
                                    }
                                }else{
                                    clearObj.msgs = defaultServices.msgdefault;
                                }                            
                            }else{
                                clearObj.msgs = defaultServices.msgdefault;
                            }

                            if (angular.isFunction(callback)) {
                            	callback(clearObj);                            	
                            }
                        }

                        return clearObj;
                    });
                }
            }


            //CHAMADA PARA MULTIPLAS URLS OU SIMPLES
            if(serv.urlsmultiple){
                for(var i=0; i< serv.urlsmultiple.length; i++){
                    var serviceI = serv.urlsmultiple[i];
                    fnCall(serviceI, true, i);                    
                }
            }else{
                fnCall(serv);
            }
        },

        //CAPTURAR VALOR DA AREA CLICADA
        captureClicked: function(parameter){
            var filter;
            if($rootScope.objClicked){
                if(parameter){
                    filter = $filter('filter')($rootScope.objClicked, parameter, true);
                }else{
                    filter = $rootScope.objClicked;
                }

                filter = (filter.length > 0 ? filter[0] : filter);
                
                if(filter){
                    filter.value = (filter.lineValue ? filter.lineValue : filter.value);
                    if(filter.value){
                        filter = (filter.value.id ? filter.value.id : filter.value);
                    }else{
                        filter = 0;
                    }
                }else{
                    filter = 0;
                }
            }else{
                filter = 0;
            }

            return filter;
        },

                            

        filterInsert: function(obj, service, urlService, filterPag){
        	//INSERIR FILTRO DO HEADER E PAGINACAO NA URL
        	if(filterPag){
            	obj.footer = {pagination: filterPag.form.table.page};
            }
            

            if(service.headerfilter){                    
                //'headerFilter' É ENCONTRADO NO 'tpl-pag-table' COMO COMPLEMENTO DO 'tpl-insert'
                //NO 'tpl-insert' É ADICIONADO O 'headerFilter' NO '$scope.content'
	            if(obj.headerFilter){
                    var urlFilter = defaultServices.filterHeader(service.headerfilter, obj.headerFilter, (filterPag ? true : false));
                    (urlFilter ? urlService = urlService + urlFilter : '');
                }
            }
        	
            //INSERCAO DO FILTRO DE PAGINACAO
            if(obj.isPagination){
            	var page;

            	if(obj.footer.pagination || obj.page){
            		page = (obj.footer.pagination ? obj.footer.pagination : obj.page);	            		
            	}else{
            		page = obj.page;
            	}

            	if(page){
            		var totalItems = (page.totalItems ? page.totalItems : obj.pagination.totalItems);
            		if(filterPag){
            			if(totalItems){
	           				urlService = urlService + page.url + (page.bigCurrentPage ? page.bigCurrentPage : 1) + '/' + totalItems;
	            		}
            		}else{
            			if(totalItems){
	           				urlService = urlService + page.url + 1 + '/' + totalItems;
	            		}
            		}
            	}
            }
            return urlService;
        },

        captureRoot: function(service, btn){
            var filterRoot = breakParam.breaks($rootScope, [btn.captureparameter])[0];
            var filter;
            
            if(filterRoot){
                

                if(filterRoot.length > 0){
                    for(var i=0; i < filterRoot.length; i++){                    

                        if(filterRoot[i].name == btn.parameter){
                            filter = filterRoot[i];
                        }
                    }
                }else if(filterRoot.detail){
                    return defaultServices.captureForm(filterRoot, btn.parameter, filterRoot, '', btn.dataconstruct);

                }else{
                    filter = {};
                    angular.forEach(filterRoot, function(index, val){
                        if(val == btn.parameter){
                            filter.name = val;
                            filter.value = index;
                        }
                    });
                }

                if(filter){
                    return filter;
                }else{                    
                    if(service.error && !filterRoot.ignoreparameter){
                        if(service.error.urlparametererror){
                            redirect.url(service.error.urlparametererror, service.error);                             
                            return false;
                        }                            
                    }                    
                }

            }else{
                if(service.error){
                    if(service.error.urlparametererror){
                        redirect.url(service.error.urlparametererror, service.error);                             
                        return false;
                    }                            
                }
            }
        },

        //CAPTURAR VALOR DE UM CAMPO DO FORMULARIO
        captureForm: function(serviceForm, parameter, formMsg, conditional, dataconstruct){
            var msgObj = formMsg.msgs;
            var conditionalVal = [];
            var filter;

            if(serviceForm){
                for(var j=0; j< serviceForm.detail.length; j++){
                    var fieldset = serviceForm.detail[j].form;
                    for(var l=0; l< fieldset.length; l++){
                        var campo = fieldset[l].campos;
                        var filterCampo = $filter('filter')(campo, {name: parameter}, true)[0];                                    
                        
                        if(filterCampo){  
                            if(filterCampo.lineValue){
                                if(filterCampo.type =='date' && filterCampo.clearmask){
                                    filterCampo.lineValue = formatField.date(filterCampo.lineValue, false, true);
                                }else{
                                    if(!filterCampo.lineValue.id){
                                        filterCampo = defaultServices.clearfield(filterCampo);                                        
                                    }
                                }

                                if(dataconstruct){
                                    filter = filterCampo;
                                }else{
                                    filter = (filterCampo.lineValue.id ? filterCampo.lineValue.id : filterCampo.lineValue);
                                }

                            }else{
                                filter = 0;
                            }                                     
                        }

                        //CASO TENHA CONDICAO BUSCAR A CONDICAO
                        if(conditional){
                            //console.log(conditional)
                            for(var m=0; m < conditional.obj.length; m++){
                                var cond = conditional.obj[m];
                                var filterConditional = $filter('filter')(campo, {name: cond.parameter}, true)[0];
                            	if(filterConditional){
                                    var filterVal = breakParam.breaks(filterConditional, [cond.value], true)[0];
                                    if(filterVal){
                        				conditionalVal.push(filterVal);
                                    }else{
                                    	//CASO NAO CONTENHA VALOR RETORNO 'invalid' PARA INSERIR CLASSE DE ERROR NO CAMPO
                                    	filterConditional.invalid = true;                                    	
                                    }
                                }
                            }
                        }

                    }
                }             

                //CASO TENHA ALGUMA CONDICAO PARA EXECUTAR O CARREGAMENTO DA PAGINA
                //CASO O VALOR DE 'conditionalVal' SEJA 0 É PORQUE O CAMPO DA CONDICIONAL NAO CONSTA NO FORMULARIO
                //E POR ISSO SERÁ IGNORADO A CONDICIONAL E O SERVICO SERA EXECUTADO COMO SE NAO HOUVESSE A CONDICIONAL
                if(conditional && conditionalVal.length > 0){
                	if(conditionalVal.length == conditional.obj.length){
                        msgObj = '';
                    }else{
                        if(conditional.mgsalert){
                            msgObj = {
                                response: {
                                    status: "Warning",
                                    messages: {
                                        message: [
                                            {text: conditional.mgsalert}
                                        ]
                                    }
                                }
                            }                                        
                        }
                        return msgObj;
                    }
                }else{
                	if(conditional){                		
	                	if(conditional.mgsalert){
	                        msgObj = {
	                            response: {
	                                status: "Warning",
	                                messages: {
	                                    message: [
	                                        {text: conditional.mgsalert}
	                                    ]
	                                }
	                            }
	                        }
	                    }else{
	                    	 msgObj = '';
	                    }
	                    return msgObj;
                	}else{
                		 msgObj = '';
                	}
                }
                return filter;
            }
        },

        //FORMULARIO INVALIDO
        errorForm: function(form, formValid, callback){
            if(form.msg){

                //MSG DE ERRO
                if(form.msg.error && formValid.response.status == "Fail"){
                    formValid.response.messages = {
                        message: [
                            {text: form.msg.error}
                        ]
                    }    
                }

                //MSG DE AVISO
                if(form.msg.warning && formValid.response.status == "Warning"){
                    formValid.response.messages = {
                        message: [
                            {text: form.msg.warning}
                        ]
                    }    
                }
            }

            form.msgs = formValid;

            if (angular.isFunction(callback)) {
                //callback(data);
                return callback(formValid);
            }else{
	            return form;
            }

        },


        //DESABILITAR BOTOES DO FORMULARIO
        disabledBtns: function(obj){
            var btnFormDisabled = obj.formdisabled.btns;
            var btnObj = obj.btns;
            for(var i = 0; i<btnFormDisabled.length; i++){
                var btnDisabeld = btnFormDisabled[i];
                var filterBtn = $filter('filter')(btnObj, btnDisabeld.name, true)[0];
                if(filterBtn){
                    var locationSearch = ($rootScope.objClicked ? $rootScope.objClicked : obj.result.line);
                    var filterParameter;
                    if(btnDisabeld.parameter){
                        if(btnDisabeld.captureObj){
                            if(btnDisabeld.captureObj == 'this'){
                                
                                defaultServices.loopFiedsForm(obj, function(data){
                                    if(data.name == btnDisabeld.parameter){
                                        filterParameter = data;
                                    }
                                });
                            }
                        }else{
                            filterParameter = $filter('filter')(locationSearch, btnDisabeld.parameter, true)[0];
                        }
                        if(filterParameter){
                            //CASO TENHA O PARAMERO 'parametervalue' COMPARAR O VALOR DO FILTRO COM O PARAMETRO
                            //SE NAO DESABILITAR CASO CONTENHA O FILTRO       
                            //'$timeout' INSERIDO DEVIDO AO PARAMETRO 'defaltHidden' NAO TER FINALIZADO SUA FUNCAO PARA ADICIONA-LO OU NAO 
                            $timeout(function(){
                                if(!filterParameter.defaultHidden){
                                    if(btnDisabeld.parametervalue && !filterBtn.disabled){
                                        filterBtn.disabled = (filterParameter.value == btnDisabeld.parametervalue ? true : false);                                    
                                    }else{
                                        filterBtn.disabled = true;
                                    }
                                }
                            }, 100);
                        }                         
                    }else{
                        filterBtn.disabled = true;
                    }
                }
            }
        },

        reload: function(reloadContent, objSearch, callback){
            var placeReload;
            var idReload;

            //VARRER O ARRAY EM BUSCA DO PARAMETRO
            var inspectArray = function(obj, parameter){
                var result;

                angular.forEach(obj, function(index, val){
                    //BUSCAR PARAMETRO '.result'
                    if(parameter == 'result'){
                        if(index.result){
                            result = index;                            
                        }

                    //BUSCAR PARAMETRO '.id'
                    }else{
                        if(index.id){
                            if(index.id == parameter){
                                result = index;
                            }                        
                        }
                    }               
                });

                return result;
            }

            //LIMPAR RESULTADO ANTIGO PARA CHAMAR O SERVICE NOVAMENTE
            var reloadResult = function(obj){
                //Não limpar a area quando for uma busca
                if(!objSearch){
                    obj.result = {};
                    obj.page = {};
                    obj.msgs = defaultServices.msgload;
                    obj.conditional = {};
                }
                defaultServices.load(obj, callback, objSearch);
            }            
            
            for(var i = 0; i < reloadContent.length; i++){
                var search,
                    reload = reloadContent[i];

                placeReload = breakParam.breaks($rootScope.pageCurrent, [reload.place], true)[0];
                placeReload = (placeReload[0] ? placeReload[0] : placeReload);
                if(placeReload){
                    
                    if(reload.place == 'main'){
                        var mainSearch = $filter('filter')(placeReload, reload.id, true);
                        
                        if(mainSearch){
                            search = mainSearch.detail;                            
                        }
                    }else{
                        search = placeReload;
                    }
                    
                    if(reload.id){
                        var idReload = $filter('filter')(search, {id: reload.id}, true);

                        if(idReload){
                            idReload = (idReload[0] ? idReload[0] : idReload);
                            
                            //CASO TENHA '.result' limpar e chamar service
                            //Se nao procurar dentro do objeto
                            if(idReload.result){
                                reloadResult(idReload);                        
                            }else{
                                var inspectId, inspectResult;

                                inspectId = inspectArray(idReload, reload.id);
                                
                                if(inspectId){
                                    inspectResult = (inspectId.result ? inspectId : inspectArray(inspectId, 'result'));

                                    (inspectResult ? reloadResult(inspectResult): '');
                                }

                                if(reload.idContent){
                                    var inspectIdContent =  inspectArray(idReload, reload.idContent);
                                    var inspectResultContent;
                                    if(inspectIdContent){
                                        inspectResultContent = (inspectIdContent.result ? inspectIdContent : inspectArray(inspectIdContent, 'result'));

                                        (inspectResultContent ? reloadResult(inspectResultContent): '');
                                    }    
                                }
                            }
                        }
                    }
                }
            }
        },
        loopLine: function(element, objData, aditionals){
            var parameter;
            
            for(var i=0; i<objData.length; i++){
                var line = objData[i];

                if(aditionals){
                    //INSERIR ICONE NA LINHA
                    if(aditionals.iconLine){
                        
                        //ICONE DO TIPO EVEN/ODD 
                        if(aditionals.iconLine.type == 'odd'){
                            if(i%2 == 0){
                                line.iconline = aditionals.iconLine.icons[0];   
                            }else{
                                line.iconline = aditionals.iconLine.icons[1];
                            }
                        }

                        if(aditionals.iconLine.type == 'single'){
                            (aditionals.iconLine.icons[0] ? line.iconline = aditionals.iconLine.icons[0] : '');
                        }

                        if(aditionals.iconLine.type == 'default' || !aditionals.iconLine.type){
                            (aditionals.iconLine.icons[i] ? line.iconline = aditionals.iconLine.icons[i] : '');
                        }
                        
                    }
                }

                if(line.field){
                    for(var j=0; j<line.field.length; j++){
                        var field = line.field[j];
                        var title = element[j];
                        
                        if(aditionals){
                        	//INSERCAO DE ADICIONAIS (Paremetros que estão dentro do aditional.field) NOS CAMPOS
                            if(aditionals.field){
                                field.aditionals = aditionals.field;

                                angular.forEach(aditionals.field, function(index, val){
    				        		field[val] = index;	
    				        	});

                                //INSERIR PARAMETROS DINAMICOS
    				        	if(aditionals.field.insertDinamic){

    				        		var insertDinamic = function(fieldDestination){		        			
    					        		angular.forEach(fieldDestination, function(index, value){
    					        			angular.forEach(aditionals.field.insertDinamic, function(indexInsert, valueInsert){
    							          	
    							            	if(value == indexInsert){
    							              		fieldDestination[valueInsert] = index;
    							            	} 

    							            	if(angular.isObject(indexInsert)){
    							            		if(indexInsert.length > 0){
    							            			for(var i=0; i< indexInsert.length; i++){
    								            			var indexFor = indexInsert[i];
    								            			angular.forEach(indexFor, function(ind, val){
    									            			if(value == ind){
    									            				fieldDestination[valueInsert] = indexInsert;						            				
    											            	}						            			
    									            		});
    								            		}
    							            		}else{
    							            			angular.forEach(indexInsert, function(ind, val){
    								            			if(value == ind){
    								            				fieldDestination[valueInsert] = indexInsert;						            				
    										            	}						            			
    								            		});
    							            		}
    							            		
    							            	}
    							          	});
    							        });
    				        		}

    				        		//INSERIR PARAMETROS DINAMICOS DENTERO DE UM OBJETO QUE SEJA UM ARRAY
    				        		if(aditionals.field.insertDinamic.destination){
    				        			var fieldDestination = field[aditionals.field.insertDinamic.destination];
    				        			if(fieldDestination.length){
    				        				for(var i=0; i< fieldDestination.length;i++){
    				        					insertDinamic(fieldDestination[i]);
    				        				}
    				        			}else{
    				        				insertDinamic(fieldDestination);
    				        			}
    				        		}else{
    				        			insertDinamic(field);
    				        		}

    						    }
                            }



                            if(aditionals.disabled){
                                for(var l=0; l<aditionals.disabled.length; l++){
                                    var disabled= aditionals.disabled[l];
                                    if(disabled.name == field.name){
                                        field.disabled = true;
                                    }
                                }
                            }

                            //ATUALIZAR VALOR DO CAMPO
                            if(aditionals.setload){
                                for(var l=0; l< element.length;l++){
                                    var formField = element[l].campos[0];
                                    if(formField.name == field.name){
                                        if(formField.type == 'date'){
                                            formField.lineValue = formatField.date(field.value);
                                        }else{
                                            formField.lineValue = field.value;    
                                        }                                     
                                    }
                                }
                            } 
                            
                        }

                        if(title){
                            defaultServices.insertComplement(title, field);
                        }
                    }
                }
            }
        },
        insertComplement: function(element, destination){
        	angular.forEach(element, function(index, val){
        		if(destination[val]){
        			if(val != 'hidden' || val != 'required'){
        				destination[val] = index;
        			}
        		}else{
        			destination[val] = index;
        		}        		
        		
        	});            
            destination.value = (destination.value == null ?  '' : destination.value);

            if(destination.name == 'data'){
               destination.value = formatField.date(destination.value, (element.inverter ? element.inverter : false));
            }
        },

        clearfield: function(field){
        	if(field.lineValue){        		
	        	field.lineValue = String(field.lineValue);
	            //LIMPAR VALOR DO CEP PARA REMOVER A MASCARA
	            if(field.name == 'cep'){
	                field.lineValue = field.lineValue.replace(/[\-]/g,'');                
	            }

	            //LIMPAR VALOR DO CPF PARA REMOVER MASCARA
	            if(field.name == 'cpf'){
	                field.lineValue = field.lineValue.replace(/[\.-]/g,'');                
	            }

	            //LIMPAR VALOR PARA MANDAR SEM MASCARA
	            if(field.type == 'tel'){
	                field.lineValue = field.lineValue.replace(/[\-() ]/g,'');                
	            }

	            //LIMPAR VALOR PARA MANDAR PONTOS SEM PONTUAÇÃO
	            if(field.type == 'pontos'){                
	                field.lineValue = field.lineValue.replace(/[\.]/g,'');
	            }

	            //LIMPAR VALOR PARA MANDAR SEM VIRGULA E SEM O CIFRÃO
	            if(field.type == 'moeda'){   
	                field.lineValue = formatField.moeda(field.lineValue);
	                field.lineValue = field.lineValue.replace(/[\.]/g,'');
	                field.lineValue = field.lineValue.replace(/[\,]/g,'.');
	                field.lineValue = field.lineValue.replace('R$ ','');
	            }

	            //TROCAR VALOR DO CHECKBOX OU RADIO PARA 'S' OU 'N' PARA ENVIO CORRETO PARA O SERVICE
	            if(field.type == 'checkbox' || field.type == 'radio'){
	                field.lineValue = (field.checked == true ? "S" : "N");                             
	            }
        	}
            return field;
        },

        //VALIDAR FORMULARIO E CAPTURAR CAMPOS (SALVAR OU EDITAR)
        captureFields: function(contentForm, novalid){
            var errorForm = false,
            formSend = [];
            
            var insertFormSend = function(campo, valueCapture){
            	var campoThis;
            	campoThis = (valueCapture == 'lineValue' ? campo.lineValue : campo.value);
                if(!campo.inputHide){
                	var ignoreCapture = false;
                	if(campo.defaultHidden){
                		if(campo.hidden != false && campo.type != 'hidden'){
                			ignoreCapture = true;
                		}
                	}

                	if(!ignoreCapture){                		

                        if(campo.savetype){
                			switch(campo.savetype){
                				case 'number':
                					if(campo.type == 'select'){
                						campo.lineValueClear = campo.lineValue;
                                        campo.lineValueClear.id = Number(campo.lineValueClear.id);
                					}else{
                						if(campo.lineValueClear != null){
                                            campo.lineValueClear = Number(campo.lineValueClear);
                						}
                					}
                					break;
                			}
                        }
                        
                        //CAMPO LIMPO
                        if(campo.lineValueClear){                            
                            if(campoThis != campo.lineValueClear){
                                campoThis = campo.lineValueClear;
                            }
                        }

                		if(!campo.ignoresave){
                			switch(campo.type){
                				case 'select':
                					formSend.push({name: campo.name, value: (campoThis ? campoThis.id : 0)});
                					break;

                				case 'captcha':
                					defaultServices.getcaptcha(campo);
                					break;

                				case 'radio':
                					formSend.push({name: campo.name, value: (campoThis == true ? 'S' : 'N')});
                					break;

                				case 'checkbox':
                					formSend.push({name: campo.name, value: (campoThis == true ? 'S' : 'N')});
                					break;

                				default:

                					if(campo.name && campo.type != 'button'){
			                            var valCampo;

			                            //LIMPAR VALORES
			                            formSend.push({name: campo.name, value: campoThis});	                            
			                        }	
                					break;
                			}

                		}

	                     
                	}           
                }
            }

            //VALIDAR FORMULARIO
            var valid = function(field){
                if(contentForm.tplform){   
            		if(contentForm.tplform.$valid){
                        field.invalid = false;
                        if(field.required && field.hidden == false && field.nameTpl != 'image' || field.required && field.defaultHidden == false && field.nameTpl != 'image'){
                        	validLineValue(campo);
                        }else{
                            insertFormSend(campo, 'lineValue');	
                        }                                
                    }else{
                    	if(field.required && field.nameTpl != 'image'){
	                    	validLineValue(campo);
	                    }
                    }                               
                }else{
                    insertFormSend(campo);
                }
            }

            //VALIDAR SE EXISTE LINEVALUE
            var validLineValue = function(field){               
            	if(field.lineValue){
            		field.invalid = false;
            		insertFormSend(field, 'lineValue');             		
            	}else{
            		field.invalid = true;
            	}
            }


            var fieldsInvalid = [];
            var forms = (contentForm.detail ? contentForm.detail : contentForm);
            if(forms){
            	for(var a = 0; a < forms.length; a++){
                    var form = forms[a].form;
                    for(var i=0; i< form.length; i++){                
                      var linha = form[i];
                        for(var j=0; j < linha.campos.length; j++){
                            var campo = linha.campos[j];
                            if(campo.lineValue){                                
                                if(campo.type != 'select'){
                                    var clearVal = defaultServices.clearfield(angular.copy(campo));
                                    campo.lineValueClear = clearVal.lineValue;
                                }
                            }
                            
                            if(novalid){
                                campo.invalid = false;
                                insertFormSend(campo, 'lineValue');
                                                           
                            }else{
                            	valid(campo);
                            	if(campo.invalid){
                            		fieldsInvalid.push(campo);
                            	}
                            }
                        }
                    }
                }        
            }

            errorForm = (fieldsInvalid.length > 0 ? true : false);
            if(errorForm){
                return {
                    response : {
                        status: "Warning",
                        messages: {
                            message: [
                                {text: "Por favor, preencha os campos corretamente!"}
                            ]
                        }
                    }
                }

            }else{
                return {
                  response : {
                    status: "Ok",                    
                    content: formSend
                  }
                }
            }

        },

        cleanForm: function(form){
            form.detail = angular.copy(form.formdefault);
        },

        getcaptcha: function(campo){
            var payload = {
                secret: servicesConfig.captcha.secretkey,
                response: campo.captcha.response 
            }
            //console.log(payload, campo);
            $http({method: 'GET', url: 'https://www.google.com/recaptcha/api/siteverify', data: payload}).success(function (data) {
                //console.log(data)
                /*if (data.response.status == 'Ok') {                
                    $window.sessionStorage.token = data.token;
                    $window.sessionStorage.login = data.userName;

                    if(redirectLogin && redirectLogin != 'not'){
                        redirect.url(redirectLogin); 
                    }

                    return;
                }*/
            });
        },

        searchcep: function(btn, callback) {
            //BUSCAR CAMPO NO FORMULARIO
            var resultFilter;
            var filter = defaultServices.loopFiedsForm(btn.form, function(data){
                if(data.name == 'cep' || data.type == 'cep') {
                    resultFilter = data;
                }
            });

            if(resultFilter.lineValue) {
                $http({method: 'GET', url: servicesConfig.endpoints.hoot + 'cep/' + resultFilter.lineValue}).success(function (resultcep) {

                    defaultServices.loopFiedsForm(btn.form, function(data){
                        
                        //APAGAR CAMPOS NUMERO E COMPLEMENTO QUANDO É BUSCADO UM NOVO CEP
                        if(data.name == 'numero' || data.name == 'comp' || data.name == 'cartaoNumero' || data.name == 'cartaoComp') {
                            data.lineValue = ""; 
                        }

                        //JOGAR O RESULTADO NO 'destiny' que é montado no externalservice
                        for(var l=0;l<btn.insertResult.length; l++){
                            var insert = btn.insertResult[l];

                            if(insert.destiny == data.name){
                                angular.forEach(resultcep, function(index, val){ 
                                    data.modified = true; //PARA INSERIR CLASSE REFETENTE A MODIFICACAO
                                    if(insert.origin == val){
                                        if(data.type == 'select'){
                                            if(data.options){                                                
                                                var filter = $filter('filter')(data.options.obj, index)[0];
                                                data.lineValue = filter;      
                                            }

                                        }else{
                                            data.lineValue = index;
                                        }
                                    }
                                });

                                $timeout(function(){
                                   data.modified = false; 
                                }, 1500);                                      

                            }    
                        }
                    });

                });

                //BUSCA PELO GOOGLE
                //var geocoder = new google.maps.Geocoder();
                //var geocoderParams = { address: resultFilter.lineValue, region: 'BR'};

                //CHAMADA PARA DESCOBNRIR A LATITUDE E LONGITUDE DO ENDERECO
                /*geocoder.geocode(geocoderParams, function(data, status) {

                    if(status == 'OK') {
                        var lating = data[0].geometry.location;  

                        //CHAMADA PARA DESCOBRIR O ENDERECO COMPLETO
                        geocoder.geocode({'latLng': lating}, function(data, status) {

                            if(status == 'OK'){

                                var filter;
                                var postalCode = data[0].address_components;

                                if(callback){
                                    callback(btn);
                                }                      
                                
                                for(var j=0; j < postalCode.length; j++) {
                                    var item = postalCode[j];
                                    
                                    defaultServices.loopFiedsForm(btn.form, function(data){
                                        for(var l=0;l<btn.insertResult.length; l++){
                                            var insert = btn.insertResult[l];

                                            if(insert.destiny == data.name && insert.origin == item.types[0]){

                                                data.modified = true; //PARA INSERIR CLASSE REFETENTE A MODIFICACAO

                                                if(data.type == 'select' && data.options){
                                                    var value = (insert.long_name ? item.long_name : item.short_name);
                                                    var filter = $filter('filter')(data.options.obj, value)[0];
                                                    data.lineValue = filter;      

                                                }else{
                                                    data.lineValue = (insert.long_name ? item.long_name : item.short_name);                                            
                                                }

                                                $timeout(function(){
                                                   data.modified = false; 
                                                }, 1500);                                      

                                            }    
                                        }
                                    });
                                }
                            }
                        });    

                    }
                });*/

            }
        }       
    }
    return defaultServices;
}]);


