
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
    /* Rotas principais*/
    if(servicesConfig.user.layout.links.dadoscredito){    	
    $routeProvider
      .when(servicesConfig.user.layout.links.dadoscredito.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: dadoscreditoCtrl, access: { requiredLogin: servicesConfig.user.layout.links.dadoscredito.pageclose}})
    }
});

app.run(function ($rootScope, $location) {
});


var dadoscreditoCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.minhaconta.pages.dadoscredito;
  $scope.pageClose = servicesConfig.user.layout.links.dadoscredito.pageclose;
  
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.dadoscredito);  
};