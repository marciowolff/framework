
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
    /* Rotas principais*/
    if(servicesConfig.user.layout.links.catalogo){
    	var link = servicesConfig.user.layout.links.catalogo; 
    	$routeProvider
	      .when(link.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: catalogoCtrl, access: { requiredLogin: servicesConfig.user.layout.links.catalogo.pageclose}})
    }
});

app.run(function ($rootScope, $location) {
});


var catalogoCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = /*(servicesConfig.user.layout.links.catalogo.navinternaactive == 'resgate' ?*/ $rootScope.site.layout.pages.resgate.pages.catalogo /*: $rootScope.site.layout.pages.catalogo)*/;
  $scope.pageClose = servicesConfig.user.layout.links.catalogo.pageclose;

  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.catalogo);
};