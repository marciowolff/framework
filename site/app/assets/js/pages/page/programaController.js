
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
    /* Rotas principais*/
    if(servicesConfig.user.layout.links.programa){    	
    $routeProvider
      .when(servicesConfig.user.layout.links.programa.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: programaCtrl, access: { requiredLogin: servicesConfig.user.layout.links.programa.pageclose}})
    }
});

app.run(function ($rootScope, $location) {
});


var programaCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.programa;
  $scope.pageClose = servicesConfig.user.layout.links.programa.pageclose;
  
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.programa);
};