
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
  	/* Rotas principais*/
  	if(servicesConfig.user.layout.links.resgateprepago){
  	$routeProvider
  		.when(servicesConfig.user.layout.links.resgateprepago.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: resgateprepagoCtrl, access: { requiredLogin: servicesConfig.user.layout.links.resgateprepago.pageclose}})
	}
});

app.run(function ($rootScope, $location) {
});


var resgateprepagoCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.resgate.pages.prepago;
  $scope.pageClose = servicesConfig.user.layout.links.resgateprepago.pageclose;     
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.resgateprepago);
};