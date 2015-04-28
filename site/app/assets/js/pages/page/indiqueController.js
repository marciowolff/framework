
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
    /* Rotas principais*/
    if(servicesConfig.user.layout.links.indique){    	
    $routeProvider
      .when(servicesConfig.user.layout.links.indique.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: indiqueCtrl, access: { requiredLogin: servicesConfig.user.layout.links.indique.pageclose }})
    }
});

app.run(function ($rootScope, $location) {
});


var indiqueCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.indique;
  $scope.pageClose = servicesConfig.user.layout.links.indique.pageclose;
  
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.indique);
};