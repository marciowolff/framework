
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
  /* Rotas principais*/
  if(servicesConfig.user.layout.links.index){  	
  $routeProvider
    .when(servicesConfig.user.layout.links.index.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: indexCtrl, access: { requiredLogin: servicesConfig.user.layout.links.index.pageclose }})
  }
});

app.run(function ($rootScope, $location) {
});


var indexCtrl = function($rootScope, $scope, servicesConfig, baseUrls, authFn){
  $scope.pageServer = $rootScope.site.layout.pages.index;
  $scope.pageClose = servicesConfig.user.layout.links.index.pageclose;
  
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.index);
};