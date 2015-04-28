
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
  /* Rotas principais*/
  if(servicesConfig.user.layout.links.senhafinish){
  $routeProvider
   	.when(servicesConfig.user.layout.links.senhafinish.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: senhafinishCtrl, access: { requiredLogin: servicesConfig.user.layout.links.senhafinish.pageclose}})
  }
});

app.run(function ($rootScope, $location) {
});


var senhafinishCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.recuperarsenha.pages.finish;
  $scope.pageClose = servicesConfig.user.layout.links.senhafinish.pageclose;  

  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.senhafinish);
};