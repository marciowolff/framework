

app.config(function ($routeProvider, $httpProvider, $locationProvider, $logProvider, baseUrls, servicesConfig) {
  /* Rotas principais*/
  $routeProvider
    .when(servicesConfig.user.layout.links.loginSicoob.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: loginsicoobCtrl, access: { requiredLogin: servicesConfig.user.layout.links.loginSicoob.pageclose }})
    .when(servicesConfig.user.layout.links.institucional.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: institucionalCtrl, access: { requiredLogin: servicesConfig.user.layout.links.institucional.pageclose }})
    .when(servicesConfig.user.layout.links.comocomprar.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: comocomprarCtrl, access: { requiredLogin: servicesConfig.user.layout.links.comocomprar.pageclose }})
    .when(servicesConfig.user.layout.links.comousarpontos.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: comousarpontosCtrl, access: { requiredLogin: servicesConfig.user.layout.links.comousarpontos.pageclose }})
    .when(servicesConfig.user.layout.links.comojuntarpontos.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: comojuntarpontosCtrl, access: { requiredLogin: servicesConfig.user.layout.links.comojuntarpontos.pageclose }})
    .when(servicesConfig.user.layout.links.parceiros.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: parceirosCtrl, access: { requiredLogin: servicesConfig.user.layout.links.parceiros.pageclose }})
    .when(servicesConfig.user.layout.links.perguntasfrequentes.href, { view: 'mainApp', templateUrl: baseUrls.directorys.app + servicesConfig.user.layout.type + '.html', controller: perguntasfrequentesCtrl, access: { requiredLogin: servicesConfig.user.layout.links.perguntasfrequentes.pageclose }})
});

app.run(function ($rootScope, $location) {
});

var loginsicoobCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.login.pages.sicoob;
  $scope.pageClose = servicesConfig.user.layout.links.loginSicoob.pageclose;

  //VERIFICAR SE O USUARIO ESTA LOGADO
  authFn.auth($scope, servicesConfig.user.layout.links.loginSicoob);
};

var institucionalCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.external.institucional;
  $scope.pageClose = servicesConfig.user.layout.links.institucional.pageclose;
  
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.institucional);
};


var comocomprarCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.external.comocomprar;
  $scope.pageClose = servicesConfig.user.layout.links.comocomprar.pageclose;
  
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.comocomprar);
};

var comousarpontosCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.external.comousarpontos;
  $scope.pageClose = servicesConfig.user.layout.links.comousarpontos.pageclose;
  
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.comousarpontos);
};

var comojuntarpontosCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.external.comojuntarpontos;
  $scope.pageClose = servicesConfig.user.layout.links.comojuntarpontos.pageclose;
  
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.comojuntarpontos);
};

var parceirosCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.external.parceiros;
  $scope.pageClose = servicesConfig.user.layout.links.parceiros.pageclose;
  
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.parceiros);
};

var perguntasfrequentesCtrl = function ($rootScope, $scope, servicesConfig, baseUrls, authFn) {
  $scope.pageServer = $rootScope.site.layout.pages.external.perguntasfrequentes;
  $scope.pageClose = servicesConfig.user.layout.links.perguntasfrequentes.pageclose;
  
  //CHAMADA PARA AUTENTICACAO E MONTAGEM DA TELA
  authFn.auth($scope, servicesConfig.user.layout.links.perguntasfrequentes);
};