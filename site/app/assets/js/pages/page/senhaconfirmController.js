
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
  /* Rotas principais*/
  if(servicesConfig.user.layout.links.senhaconfirm){
  $routeProvider
   	.when(servicesConfig.user.layout.links.senhaconfirm.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: senhaconfirmCtrl, access: { requiredLogin: servicesConfig.user.layout.links.senhaconfirm.pageclose}})
  }
});

app.run(function ($rootScope, $location) {
});


var senhaconfirmCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.recuperarsenha.pages.confirm;
  $scope.pageClose = servicesConfig.user.layout.links.senhaconfirm.pageclose;  

  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.senhaconfirm);
};