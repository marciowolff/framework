
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
    /* Rotas principais*/
    if(servicesConfig.user.layout.links.addcartaoprepago){    	
    $routeProvider
      .when(servicesConfig.user.layout.links.addcartaoprepago.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: addcartaoprepagoCtrl, access: { requiredLogin: servicesConfig.user.layout.links.addcartaoprepago.pageclose}})
    }
});

app.run(function ($rootScope, $location) {
});


var addcartaoprepagoCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.minhaconta.pages.dadoscredito.pages.addcartaoprepago;
  $scope.pageClose = servicesConfig.user.layout.links.addcartaoprepago.pageclose;
  
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.addcartaoprepago);  
};
