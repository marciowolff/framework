
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
  	/* Rotas principais*/
  	if(servicesConfig.user.layout.links.resgate){
  	$routeProvider
  		.when(servicesConfig.user.layout.links.resgate.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: resgateCtrl, access: { requiredLogin: servicesConfig.user.layout.links.resgate.pageclose}})
	}
});

app.run(function ($rootScope, $location) {
});


var resgateCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.resgate;
  $scope.pageClose = servicesConfig.user.layout.links.resgate.pageclose;    
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.resgate);
};