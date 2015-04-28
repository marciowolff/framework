
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
  /* Rotas principais*/
  if(servicesConfig.user.layout.links.extrato){  	
  $routeProvider
    .when(servicesConfig.user.layout.links.extrato.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: extratoCtrl, access: { requiredLogin: servicesConfig.user.layout.links.extrato.pageclose }})
  }
});

app.run(function ($rootScope, $location) {
});


var extratoCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.minhaconta.pages.extrato;
  $scope.pageClose = servicesConfig.user.layout.links.extrato.pageclose;
  
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.extrato);
};