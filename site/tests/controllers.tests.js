describe("Test Controllers", function () {

    var $scope, $rootScope, $controller, $location, $httpBackend, creationCtrl, baseUrls, servicesConfig; 

    beforeEach(module('app'));
    beforeEach(module('ngMockE2E'));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        servicesConfig = $injector.get('servicesConfig'),
        baseUrls = $injector.get('baseUrls');

        $location = $injector.get('$location');
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();

        $controller = $injector.get('$controller');
        creationCtrl = $controller;                
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });    
   
    describe("Test Controller adminCtrl", function(){
        
        beforeEach(inject(function ($injector) {
            var url = servicesConfig.endpoints.admin + 1;
            
            $httpBackend.expectGET(url).respond(200, adminBackendData.user[0]);
            creationCtrl('adminCtrl', {
                '$scope': $scope
            });

            $httpBackend.flush();
        }));

        it('Carregar Página Default', inject(function () {
            expect($scope.contentAdmin).toBe(baseUrls.directorys.app + 'content.html');
        }));

        it('Carregar Usuário Admin', inject(function () {
            expect($scope.user.Id).toBe(1);
            expect($scope.user.name).toBe('Marcio Wolff dos Santos');
        }));
    });

    describe("Test Controller indexCtrl", function(){
        var client = {Id: 1};

        beforeEach(inject(function ($injector) {
            var url = servicesConfig.endpoints.people + 'all';
            
            $httpBackend.expectGET(url).respond(200, peopleBackendData);
            creationCtrl('indexCtrl', {
                '$scope': $scope
            });

            $httpBackend.flush();
        }));

        it('Carregar Página de Lista de Clientes', inject(function () {
            expect($scope.pagId).toBe('pagInit');
            expect($scope.title).toBe('Lista de Clientes');
            expect($scope.mainAdmin).toBe(baseUrls.directorys.pages + 'dashboard.html');
        }));

        it('Link para a Página de Perfil do Cliente', inject(function () {
            expect($scope.openPerfil(client).$$path).toBe("/perfil/" + client.Id);
            expect($scope.clients.people).toEqual(peopleBackendData.people);
        }));

        it('Paginação', inject(function () {
            expect($scope.pageSize).toBe(5);
            expect($scope.currentPage).toBe(0);
            expect($scope.gap).toBe(2);
        }));
    });

    describe("Test Controller perfilCtrl", function(){
        var person = 1;

        beforeEach(inject(function ($injector) {
            var client = {clientId: person},
            url = servicesConfig.endpoints.people + person;
            
            $httpBackend.expectGET(url).respond(200, peopleBackendData.people[0]);
            creationCtrl('perfilCtrl', {
                '$scope': $scope,
                $routeParams : client
            });

            $httpBackend.flush();
        }));

        it('Carregar Página do Perfil do Cliente', inject(function () {
            expect($scope.pagId).toBe('pagPerfil');
            expect($scope.title).toBe('Perfil do usuário');
            expect($scope.mainAdmin).toBe(baseUrls.directorys.pages + 'perfil.html');            
        }));

        it('Cliente', inject(function () {           
            expect($scope.clientCurrent.Id).toBe(person);
            expect($scope.clientCurrent.name).toBe('Marcio Wolff dos Santos');
        }));

        it('Link para voltar a Lista de Clientes', inject(function () {           
            expect($scope.address().$$path).toBe("/enderecos/" + $scope.clientCurrent.Id); 
            expect($scope.orders().$$path).toBe("/pedidos/" + $scope.clientCurrent.Id);
        }));

        it('Link para a Página de Endereços', inject(function () {           
            expect($scope.address().$$path).toBe("/enderecos/" + $scope.clientCurrent.Id); 
        }));

        it('Link para a Página de Pedidos', inject(function () {           
            expect($scope.orders().$$path).toBe("/pedidos/" + $scope.clientCurrent.Id);
        }));
    });
    
    describe("Test Controller enderecosCtrl", function(){
        var person = 1;

        beforeEach(inject(function ($injector) {
            var client = {clientId: person},
            url = servicesConfig.endpoints.people + person;
            
            $httpBackend.expectGET(url).respond(200, peopleBackendData.people[0]);
            creationCtrl('enderecosCtrl', {
                '$scope': $scope,
                $routeParams : client
            });

            $httpBackend.flush();
        }));

        it('Carregar Página de Endereços do Cliente', inject(function () {
            expect($scope.pagId).toBe('pagEnderecos');
            expect($scope.mainAdmin).toBe(baseUrls.directorys.pages + 'enderecos.html');
        }));

        it('Cliente', inject(function () {           
            expect($scope.clientCurrent.Id).toBe(person);
            expect($scope.clientCurrent.name).toBe('Marcio Wolff dos Santos');
        }));

        it('Link para voltar ao Perfil', inject(function () {
            expect($scope.previous().$$path).toBe("/perfil/" + $scope.clientCurrent.Id); 
        }));

        it('Paginação', inject(function () {
            expect($scope.pageSize).toBe(2);
            expect($scope.currentPage).toBe(0);
            expect($scope.gap).toBe(1);
        }));
    });


    describe("Test Controller pedidosCtrl", function(){
        var person = 2;

        beforeEach(inject(function ($injector) {
            var client = {clientId: person},
            urlPeople = servicesConfig.endpoints.people + person,
            urlOrder = servicesConfig.endpoints.orders + person,
            urlProducts = servicesConfig.endpoints.products;
            
            $httpBackend.expectGET(urlPeople).respond(200, peopleBackendData.people[1]);
            $httpBackend.expectGET(urlOrder).respond(200, ordersBackendData.orders[1]);

            //ITEM DO PEDIDO
            $httpBackend.expectGET(urlProducts + '1').respond(200, productsBackendData.products[0]);
            $httpBackend.expectGET(urlProducts + '3').respond(200, productsBackendData.products[2]);
            $httpBackend.expectGET(urlProducts + '2').respond(200, productsBackendData.products[1]);
            $httpBackend.expectGET(urlProducts + '3').respond(200, productsBackendData.products[2]);
            $httpBackend.expectGET(urlProducts + '2').respond(200, productsBackendData.products[1]);
            $httpBackend.expectGET(urlProducts + '3').respond(200, productsBackendData.products[2]);
            $httpBackend.expectGET(urlProducts + '3').respond(200, productsBackendData.products[2]);

            creationCtrl('pedidosCtrl', {
                '$scope': $scope,
                $routeParams : client
            });

            $httpBackend.flush();
        }));

        
        it('Carregar Página de Pedidos', inject(function () {       
            expect($scope.pagId).toBe('pagPedidos');
            expect($scope.title).toBe('Pedidos');
            expect($scope.mainAdmin).toBe(baseUrls.directorys.pages + 'pedidos.html');
        }));

        it('Cliente', inject(function () {           
            expect($scope.clientCurrent.Id).toBe(person);
            expect($scope.clientCurrent.name).toBe('Rosilene Wolff dos Santos');
        }));

        it('Link para voltar ao Perfil', inject(function () {             
            expect($scope.previous().$$path).toBe("/perfil/" + $scope.clientCurrent.Id); 
        }));

        it('Status do pedido', inject(function () {
            expect($scope.statusTxt(2)).toBe("Entregue"); 
        }));

        it('Pedido Aberto', inject(function () {
            expect($scope.viewCurrent).toBe(0);
            expect($scope.viewOrderActive($scope.viewCurrent)).toBe('active'); 
            expect($scope.ViewOrder($scope.viewCurrent)).toBe(0); 
        }));

        it('Paginação', inject(function () {
            expect($scope.pageSize).toBe(2);
            expect($scope.currentPage).toBe(0);
            expect($scope.gap).toBe(1);
        }));
    });

});