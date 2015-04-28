
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
  /* Rotas principais*/
  if(servicesConfig.user.layout.links.contato){  	
  $routeProvider
    .when(servicesConfig.user.layout.links.contato.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: contatoCtrl, access: { requiredLogin: servicesConfig.user.layout.links.contato.pageclose }})
  }
});

app.run(function ($rootScope, $location) {
});


var contatoCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.contato;
  $scope.pageClose = servicesConfig.user.layout.links.contato.pageclose;
  
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.contato);
};