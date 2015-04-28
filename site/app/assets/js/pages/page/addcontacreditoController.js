
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
    /* Rotas principais*/
    if(servicesConfig.user.layout.links.addcontacredito){    	
    $routeProvider
      .when(servicesConfig.user.layout.links.addcontacredito.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: addcontacreditoCtrl, access: { requiredLogin: servicesConfig.user.layout.links.addcontacredito.pageclose}})
    }
});

app.run(function ($rootScope, $location) {
});


var addcontacreditoCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.minhaconta.pages.dadoscredito.pages.addcontacredito;
  $scope.pageClose = servicesConfig.user.layout.links.addcontacredito.pageclose;
  
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.addcontacredito);  
};
