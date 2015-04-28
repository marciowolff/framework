/************************************************************************************************
 * MODULE: APPWEB-DIRECTIVES
 * 
 ************************************************************************************************/
var directives = angular.module('directives',['ngRoute']);


/*
* Analitics
*/
directives.directive('analytics', ['servicesConfig', function(servicesConfig) {
  	return {
    	restrict: 'A',
    	link: function(scope, iElement, iAttrs) {
	    	if(servicesConfig.analitics){
			    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			    	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	         	ga('create', servicesConfig.analitics, 'auto');
	    	}
	    }
  	};
}]);


/*
 * Moody Button	
 */
directives.directive('moodyClick', ['$parse', function($parse){
	var directiveDefinitionObject = {
        priority: 0,
        replace: false,
        transclude: false,
        restrict: 'A',
        link: function postLink(scope, iElement, iAttrs) {
            var fn = $parse(iAttrs.moodyClick);
            iElement.bind('click', function(event){
	           scope.$apply( function(){
		           var ok = fn(scope,{});
		           if(!ok) {
    		           $(iElement).effect("shake", { times:3, distance:8 }, 1000);
		           }
	           }); 
            });
        }
    };
    return directiveDefinitionObject;
}]);


directives.directive('loadIframe', ['$timeout', '$rootScope', 'defaultServices', '$localStorage', '$http', function($timeout, $rootScope, defaultServices, $localStorage, $http){
	var directiveDefinitionObject = {
        restrict: 'A',
        replace: true,
        scope: { 
        	loadIframe: '=',
        },
        link: function ($scope, iElement, iAttrs) {

        	$scope.content = $scope.loadIframe; 
        	$rootScope.mainMsgs = defaultServices.msgload;
        	$(iElement).height(1000);
    		
    		//ANTES DE CHAMAR A URL É PRECISO FAZER UMA CHAMADA PARA A URL PARA VER SE ESTA OK
    		//CASO ESTEJA OK AI INSERE O TEMPLATE COM O SRC CORRETO
    		//SE NAO, DEVE EXIBIR MENSAGEM DE ERRO GENERICA QUE ESTA DENTRO DO 'defaultServices'
        	$http({method: 'GET', url: $scope.content.url}).success(function(){
        		$rootScope.mainMsgs = '';
        		$(iElement).attr('src', $scope.content.url);
        	}).error(function(data){
        		$scope.content.url = '';
        		$rootScope.mainMsgs = defaultServices.msgdefault;
        	});
        	
        	//APOS O CARREGAMENTO NA TELA DO IFRAME, O CONTEUDO DO IFRAME DEVE TER INSERIO NO 'localStorage'
        	//DO BROWSER O PARAMETRO 'iframeHeight' QUE SERVE PARA REDIMENSIONAR A ALTURA DO IFRAME
        	iElement.on('load', function() {
        		var iframe = this;
    			$timeout(function(){
    				$(iElement).height($localStorage.iframeHeight);        				
    			}, 100);		
		    });
			
        },
        //template: '<div ng-include="contentTpl" ng-class="content.classe"></div>'
        template: '<iframe width="100%" frameborder="0" id="{{content.name}}" name="{{content.name}}" scrolling="no" height="" ng-class="content.classe" src=""></iframe>'
    };    
    return directiveDefinitionObject;

    	

}]);


//ATUALIZAR PONTUACAO DO USUARIO
//USADO PARA CHECAR SE NA SESSAO 'Local Storage' EXISTE O USUARIO, CASO NAO EXISTA DESLIGAR O USUARIO
directives.directive('points', ['$localStorage', 'authServices', 'baseUrls', '$rootScope', function($localStorage, authServices, baseUrls, $rootScope){
	var upadateUser = {
        restrict: 'A',
        transclude: true,
        replace: true,
        scope: {
        	pointsUser: '='
        },
        templateUrl: baseUrls.directorys.templates.app + "points.html",
        link: function ($scope, iElement, iAttrs) {
        	$scope.$watch('pointsUser', function(){
	        	$scope.pageCurrent = $rootScope.pageCurrent;
	        	$scope.user = $scope.pointsUser;
	        		if(!$localStorage.user){
	        			$scope.include = '';
	        			authServices.logout();
	        		}
	        	
        	});
        },
    };

    return upadateUser;
}]);


directives.directive('messages', ['baseUrls', 'linkLocation', function (baseUrls, linkLocation) {
	return {
		restrict: 'A',
		transclude: true,
		replace: true,
        scope: { 
        	msgs: '='
        },
        templateUrl: baseUrls.directorys.templates.app + "messages.html",
		link: function ($scope, $elm) {	
				
			$scope.addclass = function(status){
				return (status == "Fail" ? "alert-danger" :  status == "Ok" ? "alert-success" : "alert-warning");
			};

			//REDIRECT OU CHAMADA DE FUNCAO
        	$scope.location = function(btn, form){
        		var scopeRoot = '$scope.$parent.$parent.$parent';
        		if(btn.func){
        			var fn = eval(scopeRoot+'.'+btn.func);
       				linkLocation.location(btn, fn, form);
        		}else{
        			linkLocation.location(btn, scopeRoot, form);
        		}
        	}
		}
	};
}]);


directives.directive('breadcrumbResult', ['$filter', function($filter) {
  	return {
    	restrict: 'A',
    	scope: { 
        	breadcrumbResult: '=',
        	conditional: '=',
        },
    	link: function($scope, iElement, iAttrs) {
    		//CONDICIONAL PARA QUE OS CAMPOS ESTEJAM CARREGADOS E APOS ESSE CARREGAMENTO QUE EXECUTA O BREADCRUMB
	    	$scope.$watch('conditional', function(){

		    	//TEXTO COM O RESULTADO DO FILTRO
        		$scope.breadcrumbResult.txt = ( $scope.breadcrumbResult.txt ? $scope.breadcrumbResult.txt : 'Resultado Filtrado por:');
	    		$scope.breadcrumbResult.breadcrumb.result = '';

            	for(var i=0; i<$scope.breadcrumbResult.detail[0].form[0].campos.length; i++){
            		var campo = $scope.breadcrumbResult.detail[0].form[0].campos[i];

            		campo.breadcrumb = {};
            		//INSERCAO DE 'lineValue' NO SELECT
            		//NOS DEMAIS CAMPOS JÁ EXISTE O 'lineValue'
            		if(campo.type == 'select'){
            			if(campo.valueOrigin){
            				if(campo.valueOrigin == '0'){
            					campo.breadcrumb.text = 0;            					
            				}else{
	            				var filterOptions = $filter('filter')(campo.options.obj, {id: campo.valueOrigin})[0];
	            				campo.breadcrumb.text = filterOptions.description;
            				}
            			}
            		}

            		if(campo.breadcrumb.text){
           				var innerTxtResult = '<small>' + campo.labelName + ' ' + campo.breadcrumb.text + '</small>';
            			if($scope.breadcrumbResult.breadcrumb.result != innerTxtResult){
		            		$scope.breadcrumbResult.breadcrumb.result = $scope.breadcrumbResult.breadcrumb.result + innerTxtResult;
		            	}
            		}
            	}
	        	
        	});

	    }
  	};
}]);


//INSERIR ATTR SRC COM O CAMINHO DA IMAGEM
directives.directive('insertImg', ['baseUrls', '$rootScope', 'breakParam', function (baseUrls, $rootScope, breakParam) {
	return {
		restrict: 'A',
		scope: {
			insertImg: '=',
			directoryImg: '=',
			insertContent: '='
		},
		link: function($scope, $elm){
			var insertImage = function(image){
				var	setimg = (angular.isObject(image) ? true : false);
				var imageInsert = (setimg ? image[$scope.insertContent.imgset] : image);

				if($scope.directoryImg){
					$elm.attr('src', baseUrls.directorys.images + imageInsert);
				}else{
					$elm.attr('src', imageInsert);
				}					
			}

			if($scope.insertImg){
				if($scope.insertImg.parameterclicked){
					if($scope.insertImg.parameter)
						var parameter = $scope.insertImg.parameter;
						var filter = breakParam.breaks($rootScope.objClicked, [parameter]);
						insertImage(filter);
							
				}else{
					insertImage($scope.insertImg)
				}
				
			}

		}
	};
}]);

//ABERTURA DE URL EXTERNA
//CAPTURAR ULR DO SERVICO E INSERIR NO BOTAO COM A 'target="_blank"'
directives.directive('btnRedirectExternal', ['defaultServices', function (defaultServices) {
	return {
		restrict: 'A',
		scope: {
			btnRedirectExternal: '=',
			btnRedirectContent: '=',
		},
		link: function($scope, $elm){
			if($scope.btnRedirectExternal.urlexternal){

				$scope.$watch('btnRedirectContent.result', function(){
					if($scope.btnRedirectContent.result){						
						defaultServices.fieldSet($scope.btnRedirectContent.result, function(data){

							if(data.name == $scope.btnRedirectExternal.setReturnUrl){
								angular.element($elm).attr({'href': data.value, 'target': '_blank'});					           	
					        }
						});
					}
				});
			}
		}
	}
}]);



//FORMATAR MOEDA
directives.directive('formatMoeda', ['formatField', '$filter', function (formatField, $filter) {
	return {
		restrict: 'A',
		scope: {
			formatMoeda: '=',
			serviceForm: '=',
		},
		link: function ($scope, $elm, $iAttrs) {
			$scope.content = $scope.formatMoeda;
			
			var format = function(){
				var val = formatField.moeda($scope.content.lineValue);
				$scope.content.lineValue = val;	
			}

			if($scope.content.service){
				if($scope.content.service.events){
          			for(var i=0; i< $scope.content.service.events.length; i++){
          				var eventService = $scope.content.service.events[i];
          				$elm.bind(eventService.event, function(event){
          					callServiceField.callService(eventService, $scope.serviceForm);
          				});
          			}
          		}
			}

			if($scope.content.lineValue.length > 0){
				format();
			}

			$scope.$watch('formatMoeda.lineValue', function(){
				if($scope.content.formatreload){
					format();
				}
			});


			$elm.bind('focusout keyup', function(e){
				var val = formatField.moeda($(this).val());				
				$scope.$apply(function(){
					$scope.content.lineValue = val;
				});
			});	
		}
	};
}])

//INSERIR ATTR SRC COM O CAMINHO DA IMAGEM
directives.directive('linkBind', ['$timeout', '$rootScope', 'linkLocation', 'breakParam', 'redirect', 'formatField', function ($timeout, $rootScope, linkLocation, breakParam, redirect, formatField) {
	return {
		restrict: 'A',
		scope: {
			linkBind: '=',			
		},
		link: function($scope, $elm, $attr){
			var linkBindReload = false;
			var bindResult;
			var clickEvent = function(elm, link){
				//REDIRECT OU CHAMADA DE FUNCAO
				$timeout(function(){
					$scope.$apply(function(){

						$('a', elm).bind('click', function(e){
							if($(this).attr('href')[0] == '{'){
		        				e.preventDefault();
		        				linkLocation.location(this, $scope);
		        			}
						});				
					});

				}, 100);
			}

			var typeParameter = function(type, val){
				type = type.split(')')[0];				
				var fn = eval('formatField.'+type);
    			return fn((val));
			}

			$scope.$watch($rootScope, function(){
				if($scope.linkBind){
					var matches = $scope.linkBind.match(/{{[^}]*}}/g);
					var parameterOrigin, matchInit;

					if(matches){
						var fn, match, multipleMatch, result;
					
						//INSERIR PARAMETROS BINDHTML
						for(var i=0; i<matches.length;i++){
							match = matches[i].replace('{{', '');
							match = match.replace('}}', '');
							matchInit = match;

							multipleMatch = match.split(', ');
							match = multipleMatch[0];


							if(multipleMatch[1]){
								var matchRoot = match.split('.');
								var splitMatch = matchRoot[0].split(' (');

								var fnMultiple = eval(splitMatch[0]);

								var filterRoot = breakParam.breaks(fnMultiple, [matchRoot[1]])[0];
								
								if(filterRoot){
									var splitMatch = match.split(' (');
									var typeMatch;
									match = splitMatch[0];
									fn = filterRoot[0].value;

									if(splitMatch[1]){
										fn = typeParameter(splitMatch[1], fn);
									}
								}else{
									redirect.url(multipleMatch[2]);
								}

							}else{
								var splitMatch = match.split(' (');
								var typeMatch;
								match = splitMatch[0];


								fn = eval(match);
								fn = (fn ? fn : '');		

								if(splitMatch[1]){
									fn = typeParameter(splitMatch[1], fn);
								}
							}							

							$scope.linkBind = $scope.linkBind.replace(matches[i], '<span class="bindHtml" title="'+matchInit+'">'+fn+'</span>');
						}
					}else{
						//RECARREGAR BINDHTML
						var bindHtml = angular.element($elm).children('.bindHtml');

						$(bindHtml).each(function(){
							var parameter = $('.bindHtml', this).attr('title');
							if(parameter){
								var splitMatch = parameter.split(' (');
								var typeMatch;
								parameter = splitMatch[0];
								matchInit = parameter;


								fn = eval(parameter);
								fn = (fn ? fn : '');	

								if(splitMatch[1]){
									fn = typeParameter(splitMatch[1], fn);
								}

								if(fn){									
									$(this).html('<span class="bindHtml" title="'+parameter+'">'+fn+'</span>');
								}
							}
						});
					}

					clickEvent(angular.element($elm)[0]);					
				}
			});
			
		}
	};
}]);



//INSERIR TEMPLATE
directives.directive('tplInsert', ['$rootScope', 'baseUrls', 'linkLocation', 'breakParam', 'defaultServices', 'resultScope', 'activeNavigation', '$filter', '$timeout', 'urlSetParameter', function ($rootScope, baseUrls, linkLocation, breakParam, defaultServices, resultScope, activeNavigation, $filter, $timeout, urlSetParameter) {
	return {
		restrict: 'A',
		replace: true,
		scope: { 
        	tplInsert: '=',
        	tplConditional: '=',
        	tplInsertAddfilter:'='
        },
        link: function($scope, $elm, $attr){        	
        	var callTpl = function(data){
        		//CARREGA O RESULTADO DO LOAD E JOGA NA CONDITIONAL        		
        		if(data){
        			$scope.content.conditional = data.result;	        		
	        	}

	        	//INSERCAO DOS PARAMETROS DO TEMPLATE DE PAGINAÇÃO
	        	if($scope.content.tpl == 'tpl-pag-table'){

	        		if($scope.content.footer){
	        			if($scope.content.footer.pagination){
	        				var contentPagitantion = $scope.content.footer.pagination;

	    					//CAMPO NECESSARIO PARA A PRIMEIRA CHAMADA
	    					//INSERCAO DE PARAMETROS DENTRO DO TEMPLATE QUE ESTA SENDO CHAMADO NO OBJETO 'table' do tpl-pag-table'
							//{tpl: 'tpl-pag-table',
							//	table: {}
							//}
	        				contentPagitantion.form = {};						
							contentPagitantion.form.table = $scope.content.table;
	    					contentPagitantion.form.table.isPagination = true;
	    					contentPagitantion.form.table.pagination = {
		    					totalItems: contentPagitantion.qtdLines, //QUANTIDADE DE ITENS POR PAGINA 
	    						url: contentPagitantion.url, //URL DA PAGINACAO
		    					maxSize: contentPagitantion.btnPagesView, //QUANTIDADE DE BOTOES VISIVEIS
		    					boundaryLinks: contentPagitantion.firstLastLink, //VISUALIZAR BOTOES DE 'PRIMEIRA' E 'ÚLTIMA' PÁGINA
		    					directionLinks: contentPagitantion.directionLinks, //VISUALIZAR NAVEÇÃO 'VOLTAR' E 'AVANÇAR'
		    					numPagesText: (contentPagitantion.numPagesTextHidden ? "" : 'Total: '), //MOSTRAR TEXTO DE QUANTIDADE TOTAL DE PAGINAS      

	    						previoustext: (contentPagitantion.previoustext ? contentPagitantion.previoustext : 'Voltar'),
		    					nexttext: (contentPagitantion.nexttext ? contentPagitantion.nexttext : 'Avançar'),
		    					firsttext: (contentPagitantion.firsttext ? contentPagitantion.firsttext : 'Primeira'),
		    					lasttext: (contentPagitantion.lasttext ? contentPagitantion.lasttext : 'Última'),
	    					};

	    					//PARA A PRIMEIRA CHAMARDA
	    					contentPagitantion.form.table.page = {
	        					url: contentPagitantion.url, //URL DA PAGINACAO		
	        					totalItems: contentPagitantion.qtdLines, //QUANTIDADE DE ITENS POR PAGINA	  
							}							
	        			}
	        		}	        		
	        	}

	        	//PEGA O OBJETO QUE ESTA NA 'tplConditional' E JOGA NA CONDICIONAL,
	        	if($scope.tplConditional){
	        		$scope.contentTpl = '';
	        		//INSERIR 'contentTpl', SOMENTE APOS O CARREGAMENTO DA CONDICAO
	        		$scope.$watch('tplConditional', function(){	
	        			$scope.$watch('tplConditional.conditional', function(){
	        				$scope.contentTpl = '';
	        				$timeout(function(){
		        				if($scope.tplConditional.conditional){
			        				$scope.content.conditional = $scope.tplConditional.conditional;	        					
		        					$scope.contentTpl = ($scope.content.tpl ? baseUrls.directorys.templates.app + $scope.content.tpl +'.html' : '');		        					
		        				}

		        				//INSERCAO DO TEMPLATE DE PAGINACAO APOS O CARREGAMENTO DO SERVICO
		        				if($scope.content.form){
		        					if($scope.content.form.table){
				        				if($scope.content.form.table.isPagination){			        				
				        					$scope.content.tpl = 'tpl-pagination';			        				
					        			}
		        					}
		        				}
	        				}, 300);
	        			});
	        		});
	        	}else{
		        	$scope.contentTpl = ($scope.content.tpl ? baseUrls.directorys.templates.app + $scope.content.tpl +'.html' : '');
	        	}
        	}

        	//CRIAÇÃO DO '$scope.content'
        	if($scope.tplInsert.insertpartials){

        		if($scope.tplInsert.insertpartials.tplConditional){
        			var tplConditional = $scope.tplInsert.insertpartials.tplConditional;
        			var tplInsert;

        			var validParams = function(paramConditional, arrayCheckedParams){
        				var condSetparameterurl = urlSetParameter.parameter(paramConditional.param);

        				condSetparameterurl = (condSetparameterurl == undefined ? 0 : condSetparameterurl);
						if(condSetparameterurl){
							//SE O VALOR DO PARAMETRO DA URL FOR IGUAL A CONDICAO ENTAO CARREGAR O TPL DA CONDICAO
	    					if(condSetparameterurl == paramConditional.val){
        						arrayCheckedParams.push('ok');
	    					}
						}
        			};

		    		//LOOP NAS CONDICOES
		    		for(var i=0; i<tplConditional.tplConds.length; i++){
		    			var cond = tplConditional.tplConds[i];
		    			var checkedParams = [];
		    			//LOOP NAS CONDICIONAIS DO TEMPLATE
		    			for(var k=0; k<cond.conds.length;k++){
	    					var condTpl = cond.conds[k];

	    					if(cond.parameterurl){
		    					if(k == 0){
		    						validParams(condTpl, checkedParams);
		    						
		    					}else{
		    						//CHECAR SE O PARAMETRO ANTERIOR ESTA CORRETO
		    						//CASO ESTEJA A QUANTIDADE DE ITENS NO 'checkedParams' SERA IGUAL AO VALOR ATUAL DE 'k'
		    						if(checkedParams.length == k){
		    							validParams(condTpl, checkedParams);
		    						}
		    					}
		    				}
		    			}

		    			//SE A QUANTIDADE DE 'checkedParams' FOR IGUAL A QUANTIDADE 'tplConditional.tplConds'
		    			//ENTAO  A CONDICAO PARA O TEMPLATE ESTA OK E DEVE SER INSERIDO O TEMPLATE DESEJADO
		    			if(checkedParams.length == cond.conds.length){
		    				tplInsert = breakParam.breaks($rootScope.site.layout.partials, [cond.tpl])[0];
		    			}		    				
	    			}

		    		$scope.content = (tplInsert ? tplInsert : breakParam.breaks($rootScope.site.layout.partials, [tplConditional.defaultTpl])[0]);

        		}else{
        			$scope.content = breakParam.breaks($rootScope.site.layout.partials, $scope.tplInsert.insertpartials)[0];
        		}        		
        	}else{
        		$scope.content = $scope.tplInsert;        		
        	}


        	/*if($scope.section){
				if($scope.section.tplmultiple && $scope.section.parameterurl && $scope.section.parameter){
			    	var setparameterurl = urlSetParameter.parameter($scope.section.parameter);

			    	if(setparameterurl){
		    			
		    			if($scope.section.tplmultiple.parameters){
		    				var paramTpl = $scope.section.tplmultiple;
			    			var tplInsert = breakParam.breaks($rootScope.site.layout.partials, [paramTpl.defaultTpl])[0];;
		    				
		    				for(var j=0; j<paramTpl.parameters.length;j++){
		    					var conditionalTpl = paramTpl.parameters[j];

		    					if(conditionalTpl == setparameterurl){		
		    						tplInsert = breakParam.breaks($rootScope.site.layout.partials, [paramTpl.tplConditionals])[0];;
		    					}
		    				}
		    				
		    				console.log('aqui', $scope.section.form, tplInsert );
					    	$scope.section.form.insertpartials = [tplInsert];
					    	//$scope.section.form = tplInsert;
					    	//$scope.section.tpl = $scope.section.form.tpl;
		    			}
			    	}

				}
			}	*/

        	//INSERINDO O FILTRO DO HEADER
        	if($scope.tplInsertAddfilter){
        		$scope.content.headerFilter = $scope.tplInsertAddfilter;
        	}

        	//CRIAÇÃO DO 'tpl' QUE É A URL QUE VAI CHAMAR O TEMPLATE CORRETO
        	if($scope.content.tpl == 'tpl-box' || $scope.content.tpl  == 'tpl-inner'){
        		$scope.content.insertTplContent = baseUrls.directorys.templates.app + $scope.content.tplContent + '.html';
        	}

        	//CRIAÇÃO DO 'tpl' PARA PAGINAS EXTERNAS
        	if($scope.content.tpl == 'tpl-page-external'){
        		$scope.content.insertTplContent = baseUrls.directorys.templates.external + $scope.content.tplContent + '.html';
        	}

        	//FUNÇÃO PARA ATIVA A NAVEGAÇÃO
        	$scope.activeNav = function(nav){
        		return activeNavigation.active(nav);
        	}

        	//CHAMADA PARA O SERVICES    
        	//QUANDO CONTER SERVICE CHAMAR A FUNCAO PARA ADICIONAR O TEMPLATE SOMENTE DEPOIS DE FINALIZADO A CHAMADA     	
        	if($scope.content.service){
        		if($scope.content.service.call){  

        			//INSERIR MENSAGEM DE AGUARDE QUANDO A AREA PRINCIPAL NAO ESTIVER RESPONDIDA
        			var elmMainApp = $($elm[0]).closest("#mainApp");
        			if(elmMainApp && !$scope.content.modal){
        				$rootScope.mainMsgs = defaultServices.msgload;
        			}

        			var fn = eval('defaultServices.'+$scope.content.service.call.objresult);
        			fn(($scope.content), function(data){        
        				//SOLUCAO PARA QUANDO NAO HOUVER FORMULARIO, MAS PRECISAR CAPTURAR INFORMACOES SOBRE O USUARIO
        				//a solução foi checar se existe o 'content.detail', mas pode ser que isso nao resolva, precisa analizar melhor, por hora resolve
        				if(!data.detail){
	        				resultScope.format(data.result, data);	        				
		        		}		        		

	        			if(elmMainApp){
	        				$rootScope.mainMsgs = '';
	        			}
	        			if(elmMainApp && !$scope.content.modal && !$rootScope.mainMsgs.keep){
	        				if(data.msgs){
			        			if(data.msgs.response.status == 'Fail'){
			        				$scope.content.msgs = data.msgs;
			        			}	        					
	        				}
	        			}


	        			callTpl(data);
        			});			
        		}else{
        			callTpl();
        		}
        	}else{
        		callTpl();
        	} 

        	//CARREGAR PARAMETRO NO VALOR
        	if($scope.content.parameter){        		
        		if($scope.content.parameterclicked && $rootScope.objClicked){
        			var filter = $filter('filter')($rootScope.objClicked, $scope.content.parameter, true)[0];
        			(filter ? $scope.content.lineValue = filter.value : '');
        		}else{
					$scope.content.lineValue = breakParam.breaks($rootScope.user, [$scope.content.parameter])[0];        			
        		}
        	}   	
        
        	//REDIRECT OU CHAMADA DE FUNCAO
        	$scope.location = function(btn, form){
        		var scopeRoot = '.$parent.$parent.$parent';
        		if(btn.func){

        			var fn = eval('$scope'+scopeRoot+'.'+btn.func);
        			fn = (fn? fn : eval('$scope'+scopeRoot+scopeRoot+'.'+btn.func));
        			linkLocation.location(btn, fn, form);
        		}else{

        			//ATUALIZAR FORMULARIO NO CLIQUE DO BOTAO - REQUISIÇÂO EXTERNA (ex: google maps)
        			if(btn.reloadForm){
        				linkLocation.location(btn, '$scope'+scopeRoot, $scope.editField, function(data){
        					$scope.$apply(function(){
        						$scope.editField = data.form;	        					
        					});
        				});
        			}else{
        				linkLocation.location(btn, '$scope'+scopeRoot, form);
        			}        			
        		}
        	}

        	//PARAMETRO PARA IDENFICAR QUE OS DADOS ESTAO SENDO ATUALIZADOS NO FORMULARIO
			//USADO PARA A FUNCAO DE ABERTURA DA MODAL 'btnOpenmodal' CAPTURAR O FORMULARIO ATUALIZADO				
        	$scope.content.dataUpdate = 1;			

        	$scope.insertField = function(field){
        		//EXISTE UMA DIRETIVA PARA CONSTRUIR OS OPTIONS ATRAVES DE UMA URL 'optionsField'
				return baseUrls.directorys.templates.app + 'tpl-'+ field.nameTpl +'.html';
			};
        },
        template: '<div ng-include="contentTpl" ng-class="content.classe"></div>'
    }
}]);

//INSERIR CAMPOS
directives.directive('insertField', ['baseUrls', '$rootScope', '$filter', 'resultScope', 'linkLocation', 'breakParam', 'interactionField', '$timeout', 'defaultServices', function (baseUrls, $rootScope, $filter, resultScope, linkLocation, breakParam, interactionField, $timeout, defaultServices) {
	return {
		restrict: 'A',
		replace: true,
		scope: {
			insertField: '=',
			editField: '=',
		},
		link: function($scope, $elm, $attr){	
			$scope.content = $scope.insertField;
			if(!$scope.content.noclearvalue){
				$scope.content.lineValue = ''; //limpar valor antes de inserir o novo para nao capturar o valor de outro form
			}


			if($scope.content.list && !$scope.content.type){
        		$scope.content.type = 'select';
        		$scope.content.nameTpl = 'select';
        	}

        	//CASO EXISTA O PARAMETRO 'fieldCallHidden' NO FORMULARIO ESCONDER OS CAMPOS DO FORMULARIO PARA SOMENTE
        	//MOSTRAR OS CAMPOS QUE ESTAO NO RETORNO DO SERVICO, MESMO QUE NO FORMULARIO DEVERIA TER,
        	//DESSE MODO A VISUALIZACAO DOS CAMPOS DEPENDEM DO SERVICO E NAO DO 'externalService.js' 
        	if($scope.editField.fieldCallHidden){
        		$scope.content.defaultHidden = ($scope.content.ignoreHidden ?  false : true);
        	}


			$scope.insertCamp = baseUrls.directorys.templates.app + 'tpl-'+ $scope.insertField.nameTpl +'.html';

			if($scope.content.nameTpl == 'button'){
				
				$scope.location = function(btn, form){
					//REDIRECT OU CHAMADA DE FUNCAO
	        		var scopeRoot = '$scope.$parent';
	        		if(btn.func){
	        			var fn = eval(scopeRoot+'.'+btn.func);
	       				linkLocation.location(btn, fn, form);
	        		}else{

	        			//ATUALIZAR FORMULARIO NO CLIQUE DO BOTAO - REQUISIÇÂO EXTERNA (ex: google maps)
	        			if(btn.reloadForm){
	        				linkLocation.location(btn, scopeRoot, $scope.editField, function(data){
	        					$scope.$apply(function(){
	        						$scope.editField = data.form;	        					
	        					});
	        				});
	        			}else{
	        				linkLocation.location(btn, scopeRoot, form);
	        			}
	        		}
	        	}	
			}

			//ESCONDER ELEMENTO E CASO SEJA UM ELEMENTO COM SCROLL ESCONDER O A LINHA COM O SCROLL
    		var hideElement = function(hidden){
    			var line = $(angular.element($elm)[0]).parent().parent()[0];
    			var hideElement = hidden;
    			var elementInteracion = function(){
    				if(hidden){
	        			if($(line).hasClass('box-scroll')){
							$(line).removeClass('box-scroll').addClass('hide hide-scroll interaction');
	        			}    					
						
					}else{
						if($(line).hasClass('hide-scroll')){
							$(line).addClass('box-scroll interaction').removeClass('hide hide-scroll');
	        			}
					}
    			};

    			$scope.content.hidden = hideElement;

    			if($(line).hasClass('interaction')){
    				elementInteracion();

    			}else{
 					$timeout(function(){
 						elementInteracion();
 					}, 100);
    			}					

    			//ESCONDER ITEMS CONDICIONAIS
    			if($scope.content.conditionalShow.hide){

	    			for(var a=0; a< $scope.content.conditionalShow.hide.length; a++){
	    				var fieldHide = $scope.content.conditionalShow.hide[a];
						
						defaultServices.loopFiedsForm($scope.editField, function(data){
							if(data.name == fieldHide){
				            	data.defaultHidden = hideElement;						            	
				            }
						});
	    			}
	    		}
    		}

    		//ESCONDER PARAMETROS CONDICIONAIS
        	if($scope.content.conditionalShow){
        		if(!$scope.content[$scope.content.conditionalShow.parameter] && $scope.content.conditionalShow.parameter != 'lineValue' || $scope.content.conditionalShow.parameter != 'value' && $scope.content.conditionalShow.parameter != 'lineValue'){
        			hideElement(true);        			
        		}	        	    		
        	}

			//INTERACAO COM O FORMULARIO - HABILITAR E HABILITAR CAMPOS, ESCONDER E VISUALIZAR....
			if($scope.editField.fieldsInteraction){
				$scope.$watch('insertField.lineValue', function(){

					if($scope.content.type == 'radio' || $scope.content.type == 'checkbox'){
						$scope.content.lineValue = ($scope.content.lineValue ? $scope.content.lineValue : false);
					}

					//INSERIR O PARAMETRO 'interaction: true' EM CADA CAMPO QUE FOI CITADO EM fieldsInteraction.fields
					if($scope.insertField.interaction){
						for(var i=0; i<$scope.editField.fieldsInteraction.length; i++){
							var interaction = $scope.editField.fieldsInteraction[i];							
							var campModify = interactionField.interaction($scope.editField, interaction);
							//INSERIR RESULTADO DA MUDANCA NO CAMPO CORRETO
							if(campModify){							

								//ACHAR CAMPO DE INTERACAO
								defaultServices.loopFiedsForm($scope.editField, function(data){
						            if(data.name == campModify.name){
						            	data = campModify;
						            }
								});									            
							}
						}
					}

					//ESCONDER PARAMETROS CONDICIONAIS
					if($scope.content.conditionalShow){
						if(!$scope.content.lineValue){
							hideElement(true);
						}else{
							hideElement(false);
						}
					}
	        	});
			}

			
			//INSERIR PARAMETROS QUE NAO EXISTEM
        	var insertParameter = function(field){
        		angular.forEach(field, function(fieldIndex, fieldVal){
        			var ignore = false;

        			if($scope.content.ignoreParams){
	        			for(var b=0; b<$scope.content.ignoreParams.length; b++){
	        				var ignoreParam = $scope.content.ignoreParams[b];

	        				if(ignoreParam == fieldIndex || fieldIndex == 'ignoreParams'){
	        					ignore = true;
	        				}
	        			
	        			}
        			}

        			//IGNORAR PARAMETRO QUANDO FOR ADICIONAR OS PARAMETROS QUE NAO EXISTEM
        			if(!ignore){
	              	    if(fieldIndex == 'alias'){
	                      	if(!$scope.content.labelName){
	                        	$scope.content.labelName = fieldIndex;
	                      	}
	                    }else{
	                      	if(!$scope.content[fieldVal]){
	                        	$scope.content[fieldVal] = fieldIndex;
	                      	}
	                    }	               	
        			}
                });				
        	}
			//CARREGAR PARAMETRO NO VALOR			
        	if($scope.content.parameter){

        		if($scope.content.captureparameter){
        			if(!$scope.editField.formdisabled){
		        		var captureRoot = $rootScope[$scope.content.captureparameter];
		    			if(captureRoot){
		    				if(captureRoot.length > 0){
		    					var filter = $filter('filter')(captureRoot, {name: $scope.content.parameter}, true)[0];	
		    					if(filter){
		    						$scope.content.lineValue = (filter.lineValue ? filter.lineValue : filter.value);
		    						if($scope.content.addParamsResult){
		    							insertParameter(filter);
		    						}
		    					}
		    				}else{
		        				if(captureRoot[$scope.content.parameter]){
		        					$scope.content.lineValue = captureRoot[$scope.content.parameter];	
		        				}else{
			        				$scope.content.lineValue = (captureRoot.lineValue ? captureRoot.value : captureRoot.value);		        					
		        				}

			        			if($scope.content.addParamsResult){
	    							insertParameter(captureRoot);
	    						}
		    				}
		    			}
		    		}

    			}else{
       				$scope.content.lineValue = breakParam.breaks($rootScope.user, [$scope.content.parameter])[0];          				
        		}
        	}

        	
        	//ESCONDER CAMPOS DO FORMULARIO 'ex: flag de termo de uso no formulario de editar, quando usado o mesmo para cadastrar'
        	if($rootScope.objClicked){
        		var fieldsHide = $rootScope.objClicked.formFieldHide;

        		if(fieldsHide){
        			for(var i=0; i<fieldsHide.length;i++){
        				var parameterHide = fieldsHide[i];

        				if($scope.content.name == parameterHide){
        					$scope.content.inputHide = true;
        					$scope.content.labelHide = true;
        				}			
        			}
        		}


        		//CAPTURAR VALOR DO OBJTO CLICADO
        		if($scope.content.parameterclicked && !$scope.content.formdisabled){        			
        			if($scope.content.parameter){

        				if($scope.content.parameter == 'params'){
        					var paramArray = $rootScope.objClicked[$scope.content.parameter];
        					var filter = $filter('filter')(paramArray, {id: $scope.content.nameparams}, true)[0];	

        					if(filter){
        						$scope.content.lineValue = (filter.lineValue ? filter.lineValue : filter.value);
        					}

        				}else{
        					$scope.content.lineValue = $rootScope.objClicked[$scope.content.parameter];
        				}

        			}else{
        				$scope.content.lineValue = ($rootScope.objClicked.lineValue ? $rootScope.objClicked.lineValue : $rootScope.objClicked.value);
        			}
        		}
        	}


        	//DESABILITAR CAMPOS CASO TENHA 'formdisabled'

        	$scope.$watch('editField.formdisabled', function(){
        		var formdisabled = $scope.editField.formdisabled;
        		
        		if(formdisabled){
	        		var insertDisabled = function(parameter, rootSearch, value){
	        			var filter = {};

	        			var captureRoot = breakParam.breaks($rootScope, [rootSearch])[0];
	        			if(captureRoot){
	        				if(captureRoot.length> 0){
	        					filter = $filter('filter')(captureRoot, parameter, true)[0];	
	        				}else{

			        			angular.forEach(captureRoot, function(index, val){
			        				if(val == parameter){
			        					filter.name = val;
			        					filter.value = index;
			        				}
		        				});
	        				}
	        			}else{
	        				filter = $filter('filter')(rootSearch, parameter, true)[0];
	        			}

	        			if(filter){
	        				//CASO TENHA O PARAMERO 'parametervalue' COMPARAR O VALOR DO FILTRO COM O PARAMETRO
	        				//SE NAO DESABILITAR CASO CONTENHA O FILTRO							
	        				if($scope.content.name == filter.name){		        					
			        			if(value && !$scope.content.disabled){
		        					(filter.value ? filter.value : 0);
		        					$scope.content.disabled = (filter.value == value ? true : false);
			        			}else{
			        				$scope.content.disabled = true;
			        			}
	        				}
	        			}
	        		}

	        		//HABILITAR/DESABILITAR BOTAO DO FORMULARIO NA TROCA DO VALOR DO CAMPO
    				//SOMENTE SE O CAMPO FOR VISIVEL EXECUTA A FUNCAO
	        		if(formdisabled.btns && $scope.editField.btns && !$scope.content.defaultHidden){
	        			for(var i=0;i<formdisabled.btns.length;i++){
	        				var btnDisabled = formdisabled.btns[i];

	        				if($scope.content.name == btnDisabled.parameter){
	        					$scope.$watch('insertField.lineValue', function(){
	        						
	        						if($scope.content.type == 'radio' || $scope.content.type == 'checkbox'){
	        							$scope.content.lineValue = ($scope.content.lineValue ? $scope.content.lineValue : false);
	        						}

	        						for(var j=0; j<$scope.editField.btns.length;j++){
			        					var btn = $scope.editField.btns[j];
			        					if(btn.name == btnDisabled.name){
		        							if($scope.content.lineValue == btnDisabled.parametervalue){
			        							btn.disabled = true;
			        						}else{
			        							btn.disabled = false;
			        						}		        						
			        					}
			        				}
	        					});
	        				}
	        			}
	        		}

	    			if(formdisabled.parameters){
	    				for(var l=0; l<formdisabled.parameters.length;l++){
	    					var parameter = formdisabled.parameters[l];							
    						insertDisabled(parameter.name, parameter.captureObj, parameter.value, true);
	    				}
	    			}else{
	    				if(formdisabled.parameterclicked && $rootScope.objClicked){
	    					insertDisabled(formdisabled.parameter, $rootScope.objClicked, formdisabled.value);
   						}
	    			}
	        	}
			});
	
			//TODA AS VEZES QUE O 'editField.result' FOR ALTERADO FORMATAR NOVAMENTE O FORMULARIO
			$scope.$watch('editField.result', function(){
				if($scope.editField.edit || $scope.editField.result){
					//FORMATAR CONTENT COM O RESULTADO DO SERVICE
					resultScope.format($scope.editField.result, $scope.content, $scope.editField);
				}
			});
		},
		template: '<span ng-include="insertCamp"></span>'
	};
}]);


//PAGINACAO
directives.directive('tplPagination', ['defaultServices', function (defaultServices) {
	return {
		restrict: 'A',
		replace: true,
		scope: {
			tplPagination: '=',
		},
		link: function($scope, $elm, $attr){	
			$scope.content = $scope.tplPagination;	
			
			//FOMATACAO DA DIRETIVA ESTA NO 'inserttpl' POR PRECISAR CARREGAR OS VALORES APOS A CONCLUSAO DA DEPENDENCIA
			//Alguns campos que serao formatado sao inseridos no load, para que apos o carregamento do servico atualize os parametros,
			//sendo assim, qualquer alteracao nos parametros devera chegar também se o parametro também existe no load.
			
			$scope.content.pageChanged = function(){
				defaultServices.filterTable($scope.content, true);
			}

		}
	}
}]);

//SERVICE CALL NOS FIELDS - ATUALIZACAO DOS CAMPOS DO FORMULARIO
directives.directive('serviceCall', ['callServiceField', '$http', '$timeout', 'formatField', '$filter', 'defaultServices', function (callServiceField, $http, $timeout, formatField, $filter, defaultServices) {
	return {
		restrict: 'A',
		replace: true,
		scope: {
			serviceCall: '=',
			serviceForm: '=',			
		},
		link: function($scope, $elm, $attr){	
			$scope.content = $scope.serviceCall;

			var fnConditional = function(contentSearch, cond, element, array){
				//var insertVal = false;
				if(array){
					defaultServices.fieldSet(contentSearch, function(data){
						if(data.name == cond.name){							
							disabledBtn(data, cond);
						}
					});					
				}else{
					if(cond.name == "params"){
						var params = contentSearch[cond.name];

						var filter = $filter('filter')(params, {id: cond.paramsName})[0];
						if(filter){
							disabledBtn(element, cond);							
						}												
					}else{
						disabledBtn(element, cond);
					}	
				}
			}

			var disabledBtn = function(btn, cond){
				btn[cond.events.name] = cond.events.value;
			}

			//CONDICIONAL PARA VISUALIZAR DE BOTAO DO CAMPO
			//SOMENTE USADO NOS BOTOES DO CAMPO E NAO EM FORMULARIOS
			if($scope.content.btnConditional){
				var btns = angular.copy($scope.content.btns);
				for(var i=0; i<btns.length; i++){
					var btn = btns[i];
					//CONDICAO PARA VISUALIZAR O BOTAO
					if(btn.viewsConditional){
						for(var j=0; j<btn.viewsConditional.length; j++){
							var conditional = btn.viewsConditional[j];							
							if(conditional.searchThis){
								fnConditional($scope.content, conditional, btn);
							}else{
								if($scope.serviceForm.result){
									fnConditional($scope.serviceForm.result, conditional, btn, true);
								}
							}														
						}
					}
				}
				$scope.content.btns = btns;
			};

			if($scope.content.service){
				if($scope.content.service.events){
          			for(var i=0; i< $scope.content.service.events.length; i++){
          				var eventService = $scope.content.service.events[i];
          				$elm.bind(eventService.event, function(event){
          					callServiceField.callService(eventService, $scope.serviceForm);
          				});
          			}
          		}
			}

			//INSERIR 'lineValue' NOS CAMPOS DE RADIO
			if($scope.content.nameTpl == 'radio'){
				$scope.$watch('serviceCall.checked', function(){
					$scope.content.lineValue = $scope.content.checked;
				});
			}
			
			$scope.$watch('serviceCall.lineValue', function(){
				//LIMPAR RESULTADO
				if($scope.content.clearResult && !$scope.content.noClearResult){
					for(var i=0; i<$scope.content.clearResult.length; i++){
						var fieldClear = $scope.content.clearResult[i];
						defaultServices.loopFiedsForm($scope.serviceForm, function(data){
							if(data.name == fieldClear){
								data.value = '';

								switch(data.type){
									case 'radio':
										data.lineValue = false;
										data.checked = false;
										break;

									case 'checkbox':
										data.lineValue = false;
										data.checked = false;
										break;

									default:
										data.lineValue = '';
										break;
								}							
							}
						});
					}
				}

				if($scope.content.lineValue){					
					if($scope.content.lineValue.length > 0){

						switch($scope.content.type){
            				case 'pontos':
            					$scope.content.lineValue = formatField.pontos($scope.content.lineValue);
            					break;

            				case 'moeda':
            					$scope.content.lineValue = formatField.moeda($scope.content.lineValue, $scope.content.symbol);
            					break;

            				case 'date':
            					$scope.content.lineValue = formatField.date($scope.content.lineValue);
            					break;

            				default:
            					$scope.content.lineValue = formatField.olds($scope.content.lineValue, $scope.content.type);
            					break;
            			}   
					}

				}else{
					if($scope.content.value){
						$scope.content.lineValue = $scope.content.value;
					}
				}


				//AJUSTES IE				
				if (isIE () ) {
					//NAS DATAS DEVE INSERIR O DATEPIKER
		    		if($scope.content.type == 'date'){
						Modernizr.load({
						    test: Modernizr.inputtypes.date,
						    complete: function() {
				    			//IE 11 JA POSSUI TYPE DATE NO INPUT
						    	//INSERCAO DE DATEPICKER NOS CAMPOS DE DATA
						    	if($scope.content.nameTpl == 'input'){						    		
						        	$($elm).datepicker({
						        		dateFormat: 'dd/mm/yy',
										dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
										dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
										dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
										monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
										monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
										nextText: 'Pro',
										prevText: 'Ant'
						        	});
						            $($elm).on('keydown', function(e){
						              	e.preventDefault();
						            });			    											        
						    	}
			    			} 
						});
					}

					//PLACEHOLDER NO IE9 - INSERIR SPAN
					if($scope.content.placeholder){
						if(isIE () <= 9){
							$($elm).parent().css({'position': 'relative'});
							$($elm).before('<span class="placeholderIE">'+$scope.content.placeholder+'</span>');

							//DESAPARECER SPAN
							if($scope.content.lineValue.length > 0){
								var contentPlaceholder = $($elm).parent();
								var placeholderIE = $('.placeholderIE', contentPlaceholder);
								placeholderIE.hide();								
							}
						}
					}
					
		        }

				//PARAMETRO PARA IDENFICAR QUE OS DADOS ESTAO SENDO ATUALIZADOS NO FORMULARIO
				//USADO PARA A FUNCAO DE ABERTURA DA MODAL 'btnOpenmodal' CAPTURAR O FORMULARIO ATUALIZADO
				($scope.serviceForm.dataUpdate ? $scope.serviceForm.dataUpdate++ : '');
			});
			
			//PLACEHOLDER NO IE9 - ALTERAR O FOCO PARA O INPUT
			if($scope.content.placeholder){
				if(isIE () <= 9){
					var contentPlaceholder = $($elm).parent();
					$(contentPlaceholder).bind('click', '.placeholderIE', function(){
						$elm[0].focus();
					});
				}
			}
			
			$elm.bind('focusout', function(){				
				//COMPARAR VALORES
				if($scope.content.compareField){
					var fieldCompare = $scope.content.compareField;
					defaultServices.loopFiedsForm($scope.serviceForm, function(data){

						if(fieldCompare == data.name){
							$scope.$apply(function(){
								if($scope.content.lineValue != data.lineValue){
									$scope.content.invalid = true;
									$scope.content.lineValue = '';
		            			}
	            			});
						}
					});
	            }

	            if (isIE () ) {
		            //INSERCAO DE 'lineValue' APOS A INSERCAO DA DATA ATRAVES DO DATEPIKER
	            	if($scope.content.type == 'date'){
	            		$timeout(function(){
	            			$scope.content.lineValue = $($elm).val();	            			
	            		}, 200);
	            	}
	            }
			});
			

			$elm.bind('keyup', function(){
				//FUNCAO DE MAXLENGTH PARA O TYPE NUMBER
				if($scope.content.type == 'number' || $scope.content.type == 'pontos'){
					//VALIDACAO SE É NUMERO

						if($scope.content.lineValue){
							var maxlengthVal = $scope.content.lineValue.length  - 1;

							if(Number($scope.content.lineValue) || $scope.content.lineValue[maxlengthVal] == '0'){
								angular.element($elm).removeClass('ng-invalid ng-invalid-required');

								//VALIDACAO DE MAXLENGTH
								if($scope.content.maxlength){
									if($scope.content.lineValue.length > $scope.content.maxlength){
										$scope.$apply(function(){
											$scope.content.lineValue = $scope.content.lineValue.slice(0, $scope.content.maxlength);										
										});
										
									}
								}

							}else{
								//REMOVER O CARACTER SE NAO FOR NUMERO
								$scope.$apply(function(){
									$scope.content.lineValue = $scope.content.lineValue.slice(0, maxlengthVal);
								});
							}
						}
				}
			});

			//DOCUMENTACAO - https://developers.google.com/maps/documentation/
			//DOCUMENTACAO PLACES - https://developers.google.com/places/documentation/						
			if($scope.content.autocomplete){
				var autocomplete = $scope.content.autocomplete;				
		        var opts; //options for autocomplete

		        //convert options provided to opts
		        
		        var initOpts = function() {
		        	//types suportados = geocode, establishment, (regions), (cities)
		        	//types geocode = Busca endereço completo
		        	//types establishment = Busca estabelecimentos
		        	//types (regions) = Busca regiões (Estado, Cidade)
		        	//types (cities) = Busca regiões (Cidade)
		          	opts = {}
		          	if (autocomplete.options) {
		            	if (autocomplete.options.types) {
		              		opts.types = []
		              		var typesBreak = autocomplete.options.types.split(', ');

		              		for(var i=0; i<typesBreak.length; i++){
		              			opts.types.push(typesBreak[i])		              	
		              		}
		           		}
		            
		            	if (autocomplete.options.bounds) {
		              		opts.bounds = autocomplete.options.bounds
		            	}
		            
		            	if (autocomplete.options.country) {
		              		opts.componentRestrictions = {
		                		country: autocomplete.options.country
		              		}
		            	}
		          	}			      		          	
		        }
		        initOpts();

		        //create new autocomplete
		        //reinitializes on every change of the options provided
		        
		        var newAutocomplete = function() {
		          	/*autocomplete.gPlace = new google.maps.places.Autocomplete($elm[0], opts);

		        	google.maps.event.addListener(autocomplete.gPlace, 'place_changed', function() {

			            $scope.$apply(function() {
			                $scope.content.details = autocomplete.gPlace.getPlace();


		          			if($scope.content.details){
		          				if($scope.content.details.name){
			                		$scope.content.lineValue = $scope.content.details.name;
		          				}

				                /*var geoLocation = $scope.content.details.geometry.location;
				                var location = $http({ method: 'GET', url: 'https://maps.googleapis.com/maps/api/place/search/json'+ geoLocation.D+','+geoLocation.k}).success(function(successData){
				                	console.log(successData);
				                })
		          			}
			            });
		          	})*/
		        }
		        //newAutocomplete();

		        //watch options provided to directive		        
		        $scope.watchOptions = function () {
		          return autocomplete.options
		        };
		        $scope.$watch($scope.watchOptions, function () {
		          initOpts()
		          //newAutocomplete()		          
		        }, true);
				
				
			}
		},		
	};
}]);


//INSERIR TPL DE MODAL QUE ESTA NA PARTIAL QUE SEJA FORMULARIO
directives.directive('insertFormOfPartial', ['$rootScope', 'breakParam', 'urlSetParameter', function ($rootScope, breakParam, urlSetParameter) {
	return {
		restrict: 'A',
		link: function($scope, $elm){
			if($scope.fields){

				if($scope.fields.insertpartials){
					$scope.fields.form = breakParam.breaks($rootScope.site.layout.partials, $scope.fields.insertpartials)[0];
					if($scope.fields.aditionals){
						var lineAdd = $scope.fields.aditionals.line;
						var disabledFiel = $scope.fields.aditionals.disabled;
						if(lineAdd || disabledFiel){
							for(var i =0; i< $scope.fields.form.length; i++){
								var line = $scope.fields.form[i];
								if(lineAdd[i]){
									line.style = line.style + ' ' + lineAdd[i].style;								
								}
							}						
						}
					}					
			    }
			}	    
		},
		//template: '<span ng-include="insertCamp"></span>'
	};
}]);

//INSERIR TPL DE MODAL QUE ESTA NA PARTIAL QUE SEJA FORMULARIO
directives.directive('formatDate', ['formatField', function (formatField) {
	return {
		restrict: 'A',
		scope: {
			formatDate: '='			
		},
		link: function($scope, $elm){
			$scope.content = $scope.formatDate;

			$scope.$watch('formatDate.lineValue', function(){
				//COMO O '$watch' PASSA VARIAS VEZES É PRECISO VERIFICAR SE JA FOI MODICADO O 'lineValue' PARA QUE NAO EXECUTE  A FUNCAO NOVAMENTE

				if($scope.content.lineValue){
					if($scope.content.lineValue.length > 0){
						if($scope.content.type == 'pontos'){
							$scope.content.lineValue = formatField.pontos($scope.content.lineValue);
						} else if($scope.content.type == 'moeda') {
							$scope.content.lineValue = formatField.moeda($scope.content.lineValue, $scope.content.symbol);
						}else{
							$scope.content.lineValue = formatField.olds($scope.content.lineValue, $scope.content.type);
						}
					}
				}
			});
			
		},
		//template: '<span ng-include="insertCamp"></span>'
	};
}]);



//INSERIR CONDICOES DE VISUALIZACAO DOS BOTOES NA TABELA
directives.directive('viewConditional', ['$filter', function ($filter) {
	return {
		restrict: 'A',
		scope: {
			viewConditional: '=',
			viewLine: '='		
		},
		link: function($scope, $elm){
			$scope.btns = angular.copy($scope.viewConditional);

			var insertDisabled = function(cond){
				$scope.btns.icon = $scope.btns.icon + ' disabled';
				$scope.btns.disabled = cond.disabled;
				$scope.btns.hide = cond.hide;

				$scope.viewConditional = $scope.btns;
			};

			var filterConditional = function(fields, conditional){
				var filter = $filter('filter')(fields, conditional.name, true);
				filter = (filter.length>0 ? filter[0] : filter);

				if(conditional.obs){
					if(conditional.obs.captureparameter){
						var filterParameter = [];
						for(var m=0; m<conditional.obs.captureparameter.length; m++){
							var parameter = conditional.obs.captureparameter[m];
							var filterCapture = $filter('filter')(fields, parameter, true)[0];
							
							(filterCapture ? filterParameter.push(filter) : '');
						}

						if(filterParameter.length == conditional.obs.captureparameter.length){
							var text;
							var filterText;
							
							if(conditional.obs.textparameter){
								filterText = $filter('filter')(fields, conditional.obs.textparameter, true)[0];
							}
							
							$scope.btns.information = (filterText ? filterText.value : conditional.obs.text);	
						}
					}
				}

				if(filter){
					if(conditional.value){
						if(conditional.value == filter.value || conditional.value == filter.alias){							
							insertDisabled(conditional);
						}								
					}else{
						if(!filter.lineValue){
							insertDisabled(conditional);							
						}
					}
				}
			};
			var conditionals = $scope.btns.viewconditional;
			if(conditionals && $scope.viewLine){

				for(var i=0; i<conditionals.length; i++){
					var conditional = conditionals[i];

					//BUSCAR PARAMETRO
					if(conditional.searchParameter){
						//CASO SEJA PARA CAPTURAR PARAMETROS FORA DO FORMULARIO OU DE UMA LINHA
						if(!$scope.viewLine.field){
							
							
							if($scope.viewLine.length){
								for(var l=0; l<$scope.viewLine.length;l++){
									filterConditional($scope.viewLine[l], conditional);
								}

							}else{
								angular.forEach($scope.viewLine, function(index, val){
									if(val == conditional.searchParameter){

			        					//CASO A BUSCA SEJA NO FOOTER OU NO HEADER
			        					if(val == 'footer' || val == 'header'){
			        						for(var j=0; j<index.length;j++){
			        							filterConditional(index[j].field, conditional);
			        						}
			        					}else{
			        						filterConditional(index, conditional);		        						
			        					}
			        				}
		        				});
		        			}
						}

					}else{

						if($scope.viewLine.field){
							filterConditional($scope.viewLine.field, conditional);
						}else{

							if($scope.viewLine.length > 0){
								for(var m=0; m<$scope.viewLine.length;m++){
									var viewForm = $scope.viewLine[m].form;

									for(var l=0; l<viewForm.length;l++){
										filterConditional(viewForm[l].campos, conditional);
									}
								}
							}
						}						
					}


				}
			};

			$scope.viewConditinal = $scope.btns;
		},
	};
}]);




directives.directive('btnOpenmodal', ['$rootScope', 'modalCall', 'defaultServices', 'authServices', function ($rootScope, modalCall, defaultServices, authServices) {
	return {
		restrict: 'A',
		scope: {
        	modalScope:'=',
        	modalDetail: '=',
        },
		link: function ($scope, $elm) {	

			var open = function(){
				//INSERIR FORMULARIO DENTRO DO BOTAO
				if($scope.formDetail){
					objModal.form = $scope.formDetail;
				}

				if(!objModal.issaveform){
					$rootScope.objClicked = ($scope.formDetail ? $scope.formDetail : $scope.formScope.captureobj ? $scope.formScope : '');
				}

				$scope.$apply(function(){
					//SALVAR FORMULARIO ANTES DE ABRIR MODAL
					if(objModal.issaveform){
						var fn = eval('defaultServices.'+objModal.name);
	        			fn((objModal), function(data){        
	        				//ERROR - EXIBIR ERRO NA TELA

	        				if(data.response.status != 'Ok'){
	        					//INSERIR MGS DE ERRO E FORMATACAO DE ERRO NOS CAMPOS
	        					defaultServices.errorForm(objModal.form, data);
				        	}else{
				        		$rootScope.formPrimary = objModal;   		
				        		modalCall.open($scope, objModal.url);
				        	}        					
		        			
	        			});	
	        		}else if(objModal.isvalidform){
	        			var valid = defaultServices.captureFields(objModal.form);
	        			
	        			//ERROR - EXIBIR ERRO NA TELA
        				if(valid.response.status != 'Ok'){
			        		//INSERIR MGS DE ERRO E FORMATACAO DE ERRO NOS CAMPOS
			        		defaultServices.errorForm(objModal.form, valid);
			        	}else{
			        		$rootScope.formPrimary = objModal;
			        		modalCall.open($scope, objModal.url);
			        	}

	        		}else{
	        			$rootScope.formPrimary = objModal;
						modalCall.open($scope, objModal.url);							
					}
				});
			};

			//CAPTURAR FORMULARIO ATUALIZADO
			//'dataUpdate' ENCONTRA-SE EM 'tplInsert'
			//CADA VEZ QUE ALGUM CAMPO É ALTERADO O SEU VALOR ('lineValue') ESSE PARAMETRO É ATUALIZADO E COM ISTO RODA NOVAMENTE ESTA FUNCAO
			//PARA CAPTURAR NOVAMENTE O FORMULARIO
			if($scope.modalScope){
				var objModal = ($scope.modalScope.detailopen ? $scope.modalScope.detailopen : $scope.modalScope);
			}

			$scope.$watch('modalDetail.dataUpdate', function(){
				$scope.formScope = $scope.modalScope;
				$scope.formDetail = $scope.modalDetail;

				objModal = $scope.formScope;
			});


			if(objModal.openmodal){

				$elm.bind('click', function(event){
					if(objModal.openmodalLogin){
						if($rootScope.user){
							open();
						}else{
							$scope.$apply(function(){
								authServices.logout('', true);								
							});
						}
					}else{
						open();
					}
				});			
			}
		}
	};
}]);

directives.directive('activeClickFocusRemove', function () {
	return {
		restrict: 'A',
		link: function($scope, $elm){

			$elm.on('click', function(event){
				return ($elm.hasClass("active") ? $elm.removeClass("active") : $elm.addClass("active"));
			}).on('focusout', function(){
				$elm.removeClass("active");
			});
			
		}
	};
});


directives.filter('startFrom', function() {
	
    return function(input, start) {
		if(input){
    		start = +start;
        	return input.slice(start);
	    };
	};
});