
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
    /* Rotas principais*/
    if(servicesConfig.user.layout.links.alterarsenha){    	
    $routeProvider
      .when(servicesConfig.user.layout.links.alterarsenha.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: alterarsenhaCtrl, access: { requiredLogin: servicesConfig.user.layout.links.alterarsenha.pageclose}})
    }
});

app.run(function ($rootScope, $location) {
});


var alterarsenhaCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.minhaconta.pages.alterarsenha;
  $scope.pageClose = servicesConfig.user.layout.links.alterarsenha.pageclose;
  
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.alterarsenha);  
};