
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
    /* Rotas principais*/
    if(servicesConfig.user.layout.links.vantagem){
    	var link = servicesConfig.user.layout.links.vantagem; 

    	$routeProvider
	      .when(link.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: vantagemCtrl, access: { requiredLogin: link.pageclose}})
        .when(link.oldHref, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: vantagemCtrl, access: { requiredLogin: link.pageclose}})
    }
});

app.run(function ($rootScope, $location) {
});


var vantagemCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.vantagem;
  $scope.pageClose = servicesConfig.user.layout.links.vantagem.pageclose;

  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.vantagem);
};