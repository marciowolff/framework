
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
  	/* Rotas principais*/
  	if(servicesConfig.user.layout.links.minhaconta){
  	$routeProvider
  		.when(servicesConfig.user.layout.links.minhaconta.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: minhacontaCtrl, access: { requiredLogin: servicesConfig.user.layout.links.minhaconta.pageclose}})
	}
});

app.run(function ($rootScope, $location) {
});


var minhacontaCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.minhaconta;
  $scope.pageClose = servicesConfig.user.layout.links.minhaconta.pageclose;    
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.minhaconta);
};