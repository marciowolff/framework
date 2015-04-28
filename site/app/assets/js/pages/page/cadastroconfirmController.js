
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
  /* Rotas principais*/
  if(servicesConfig.user.layout.links.cadastroconfirm){
  $routeProvider
   	.when(servicesConfig.user.layout.links.cadastroconfirm.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: cadastroconfirmCtrl, access: { requiredLogin: servicesConfig.user.layout.links.cadastroconfirm.pageclose}})
  }
});

app.run(function ($rootScope, $location) {
});


var cadastroconfirmCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.cadastro.pages.confirm;
  $scope.pageClose = servicesConfig.user.layout.links.cadastroconfirm.pageclose;  

  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.cadastroconfirm);
};