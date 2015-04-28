
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
    /* Rotas principais*/
    if(servicesConfig.user.layout.links.perfil){    	
    $routeProvider
      .when(servicesConfig.user.layout.links.perfil.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: perfilCtrl, access: { requiredLogin: servicesConfig.user.layout.links.perfil.pageclose}})
    }
});

app.run(function ($rootScope, $location) {
});


var perfilCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.minhaconta.pages.perfil;
  $scope.pageClose = servicesConfig.user.layout.links.perfil.pageclose;
  
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.perfil);  
};