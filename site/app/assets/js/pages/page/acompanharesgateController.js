
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
  	/* Rotas principais*/
  	if(servicesConfig.user.layout.links.acompanharesgate){
  	$routeProvider
  		.when(servicesConfig.user.layout.links.acompanharesgate.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: acompanharesgateCtrl, access: { requiredLogin: servicesConfig.user.layout.links.acompanharesgate.pageclose}})
	}
});

app.run(function ($rootScope, $location) {
});


var acompanharesgateCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.minhaconta.pages.acompanharesgate;
  $scope.pageClose = servicesConfig.user.layout.links.acompanharesgate.pageclose;    
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.acompanharesgate);
};