
app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
    /* Rotas principais*/
    if(servicesConfig.user.layout.links.login){      
    $routeProvider
      .when(servicesConfig.user.layout.links.login.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: loginCtrl, access: { requiredLogin: false }})
    }
});

app.run(function ($rootScope, $location) {
});


var loginCtrl = function ($rootScope, $scope, $location, $window, authServices, servicesConfig, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.login;
  $scope.pageClose = servicesConfig.user.layout.links.login.pageclose;

  //VERIFICAR SE O USUARIO ESTA LOGADO
  authFn.auth($scope, servicesConfig.user.layout.links.login);
};