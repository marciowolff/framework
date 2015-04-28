
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
  /* Rotas principais*/
  if(servicesConfig.user.layout.links.cadastro){
  $routeProvider
   	.when(servicesConfig.user.layout.links.cadastro.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: cadastroCtrl, access: { requiredLogin: servicesConfig.user.layout.links.cadastro.pageclose}})
  }
});

app.run(function ($rootScope, $location) {
});


var cadastroCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.cadastro;
  $scope.pageClose = servicesConfig.user.layout.links.cadastro.pageclose;  

  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.cadastro);
};