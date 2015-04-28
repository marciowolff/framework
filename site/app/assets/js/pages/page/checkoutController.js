
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
    /* Rotas principais*/
    if(servicesConfig.user.layout.links.checkout){
    	var link = servicesConfig.user.layout.links.checkout; 
    	$routeProvider
	      .when(link.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: checkoutCtrl, access: { requiredLogin: servicesConfig.user.layout.links.checkout.pageclose}})
    }
});

app.run(function ($rootScope, $location) {
});


var checkoutCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.resgate.pages.checkout;
  $scope.pageClose = servicesConfig.user.layout.links.checkout.pageclose;

  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.catalogo);
};