
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
    /* Rotas principais*/
    if(servicesConfig.user.layout.links.regulamento){    	
    $routeProvider
      .when(servicesConfig.user.layout.links.regulamento.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: regulamentoCtrl, access: { requiredLogin: servicesConfig.user.layout.links.regulamento.pageclose}})
    }
});

app.run(function ($rootScope, $location) {
});


var regulamentoCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.regulamento;
  $scope.pageClose = servicesConfig.user.layout.links.regulamento.pageclose;
  
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.regulamento);
};