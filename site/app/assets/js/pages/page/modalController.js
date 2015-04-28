

//MODAL
var modalDefaultCtrl = function ($rootScope, $scope, $modalInstance, tplModal) {
  	$scope.modalInstance = $modalInstance;
	$scope.modal = tplModal;
};

//MODAL CONTROLE BASE
var modalCtrl = function ($scope, $modal, $rootScope, $filter, $window, baseUrls, modalServices, redirect) {

	//CHAMADA DO EVENTO CLICK	
	$scope.eventBtn = function(nameFunction, btn){
		var fn = eval('$scope.'+nameFunction);
		fn((btn ? btn : this));
	}
	
	//FECHAR MODAL
	$scope.closeModal = function(btn){
		$scope.modalInstance.dismiss('close');
		$scope.modal.content.tpform = '';
		$scope.modal.content.msgs = '';

		if($rootScope.formPrimary){
			$rootScope.formPrimary = '';			
		}

		//NO CLICK PARA FECHAR A MODAL 'X' NÃO É PASSDO NENHUM PARAMENTRO, 
		//POR ISSO É NECESSÁRIO CHECAR SE EXISTE 'btn'
		if(btn){
			if(btn.url){
				if(btn.url == 'return'){
		            $rootScope.objClicked = "";
		            $rootScope.formsaved = "";
		            $rootScope.formPrimary = "";
		            $window.history.back();
		          return false;
		        }else{
					redirect.url(btn.url); 		        	
		        }
			}
		}
	}

	//FECHAR SALVAR
	$scope.save = function(btn){
		modalServices.save(btn, $scope.modal.content, $scope.modalInstance);
	}

	//FECHAR DELETAR
	$scope.delet = function(btn){
		modalServices.delet(btn, $scope.modal.content, $scope.modalInstance);
	}
}



