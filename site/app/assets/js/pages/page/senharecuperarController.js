
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
  /* Rotas principais*/
  if(servicesConfig.user.layout.links.recuperarsenha){
  $routeProvider
   	.when(servicesConfig.user.layout.links.recuperarsenha.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: recuperarsenhaCtrl, access: { requiredLogin: servicesConfig.user.layout.links.recuperarsenha.pageclose}})
  }
});

app.run(function ($rootScope, $location) {
});


var recuperarsenhaCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.recuperarsenha;
  $scope.pageClose = servicesConfig.user.layout.links.recuperarsenha.pageclose;  

  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.recuperarsenha);
};