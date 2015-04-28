
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
  /* Rotas principais*/
  
  if(servicesConfig.user.layout.links.extratohistorico){  	
  $routeProvider
    .when(servicesConfig.user.layout.links.extratohistorico.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: extratohistoricoCtrl, access: { requiredLogin: servicesConfig.user.layout.links.extratohistorico.pageclose }})
  }
});

app.run(function ($rootScope, $location) {
});


var extratohistoricoCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.minhaconta.pages.extrato.pages.historico;
  $scope.pageClose = servicesConfig.user.layout.links.extratohistorico.pageclose;
  
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.extratohistorico);
};