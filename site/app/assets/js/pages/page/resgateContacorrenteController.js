
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
  	/* Rotas principais*/
  	if(servicesConfig.user.layout.links.resgatecreditoconta){
  	$routeProvider
  		.when(servicesConfig.user.layout.links.resgatecreditoconta.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: resgatecreditocontaCtrl, access: { requiredLogin: servicesConfig.user.layout.links.resgatecreditoconta.pageclose}})
	}
});

app.run(function ($rootScope, $location) {
});


var resgatecreditocontaCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.resgate.pages.contacorrente;
  $scope.pageClose = servicesConfig.user.layout.links.resgatecreditoconta.pageclose;    
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.resgatecreditoconta);
};