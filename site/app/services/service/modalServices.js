'use strict';

external.factory('modalServices', ['$http', '$filter', '$timeout', 'modalCall', 'servicesConfig', 'defaultServices', 'baseUrls', '$rootScope', function($http, $filter, $timeout, modalCall, servicesConfig, defaultServices, baseUrls, $rootScope) {
    var modalServices = {

        //ENVIAR FORMULARIO (SALVAR OU EDITAR)
        save: function(btn, contentModal, modal){
            btn.form = contentModal;
            defaultServices.save(btn, function(data){
                if(data.response.status == 'Ok'){

                    if(contentModal.sucessclose != false){
                        if(!btn.notcloseModal){

                            $timeout(function(){
                                //CASO O BOTAO QUE ESTA DENTRO DA MODAL FOR PARA ABRIR OUTRA MODAL,
                                //ENTRAO FECHA A MODAL ATUAL E ABRE A OUTRA MODAL
                                modal.dismiss('close');
                                if(btn.openmodal){
                                    modalCall.open(btn, btn.url);
                                }else{
                                    if($rootScope){                                            
                                        if($rootScope.formPrimary){
                                            $rootScope.formPrimary = '';            
                                        }
                                    }
                                }
                            }, (contentModal.timeclose ? contentModal.timeclose : 1800));
                        }
                    }                    
                }   
            });
        },

        //ENVIAR FORMULARIO (DELETAR)
        delet: function(btn, contentModal, modal){
            btn.form = contentModal;
            defaultServices.delet(btn, function(data){
                if(data.response.status == 'Ok'){
                    
                    data.texts = '';
                    data.btns = '';
                    if(contentModal.sucessclose != false){

                        $timeout(function(){
                            //CASO O BOTAO QUE ESTA DENTRO DA MODAL FOR PARA ABRIR OUTRA MODAL,
                            //ENTRAO FECHA A MODAL ATUAL E ABRE A OUTRA MODAL
                            modal.dismiss('close');
                            if(btn.openmodal){
                                modalCall.open(btn, btn.url);
                            }else{
                                if($rootScope){                                    
                                    if($rootScope.formPrimary){
                                        $rootScope.formPrimary = '';            
                                    }
                                }
                            }
                        }, (contentModal.timeclose ? contentModal.timeclose : 1800));
                    }                    
                }   
            });
        },

        //CHAMAR OPCOES DO SELECT
        getOptions: function (urlOption, callback) {
            //$http({ method: 'GET', url: urlOption, sessionToken.tokeon}).success(function (opts) {
                var opts = [
                    {value: '00', text: '10'},
                    {value: 'Title', text: 'Titulo'},
                    {value: '10', text: '20'},
                    {value: '20', text: '30'}

                ];

                if (angular.isFunction(callback)) {
                    callback(opts);
                }
                //return opts;
            //});
            return opts;            
        },

        disabledBtns: function(obj){
            defaultServices.disabledBtns(obj);
        },

        //ALTERACAO DO PARAMETRO PARA EDICAO DE DENTRO DAS TABS
        filterTab: function(list, option){
            for(var i=0; i < list.length; i++){
                var filterTab = list[i];

                for(var j=0; j< filterTab.campos.length; j++){
                    filterTab.campos[j].formEdit = option;
                }
            };
        },

    };
    return modalServices;
}]);


