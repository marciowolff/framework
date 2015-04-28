
describe("Test Services", function () {
    var servicesConfig;
        
    beforeEach(function () {
        module("app");

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            servicesConfig = $injector.get('servicesConfig');
        });

    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    describe("Admin Service", function () {
         var adminServices;
 
        beforeEach(function () {
            inject(function ($injector) {
                adminBackend($httpBackend, servicesConfig);              
                //adminServices = $injector.get('adminServices');  
            });
        });

         it("Test chamada Usuário Admin", inject(function ($http, $httpBackend) {
         }));        
    });

    describe("Auth Service", function () {
        var authServices, peopleServices, resultAuthAdmin;
        var url, urlPeople, successCallback;
        beforeEach(function () {
            inject(function ($injector) {
                authBackend($httpBackend, servicesConfig);
                authServices = $injector.get('authServices');

                url = servicesConfig.endpoints.auth;
                //urlPeople = servicesConfig.endpoints.people + 1;
                successCallback = jasmine.createSpy();
            });
        });

        it("Test login Sucesso", inject(function ($http, $httpBackend) {            
            var payload = { 'userName': 'adm', 'passwd': 'tusk' };            

            expect(authServices.login).not.toBe(undefined);
            expect(angular.isFunction(authServices.login)).toBe(true);

            var authAdmin = authServices.login(['adm', 'tusk']);                
            $httpBackend.expectPOST(url, payload).respond(200, authBackendData.auth[0]);
            //$httpBackend.expectGET(urlPeople).respond(200, peopleBackendData.people[1]);
            $http.post(url, payload).success(successCallback)
            authAdmin.then(function(data){
                resultAuthAdmin = data.data;
            });
            $httpBackend.flush(); 

            expect(resultAuthAdmin).not.toBeNull();
            expect(resultAuthAdmin).toBeDefined();
            
            expect(resultAuthAdmin.response.status).toBe('Ok');
            expect(resultAuthAdmin.userName).toBe('adm');
        }));

        it("Test login Falha", inject(function ($http, $httpBackend) {
            var payload = { 'userName': 'adms', 'passwd': 'tusk' };

            expect(authServices.login).not.toBe(undefined);
            expect(angular.isFunction(authServices.login)).toBe(true);

            var authAdmin = authServices.login(['adms', 'tusk']);
            $httpBackend.expectPOST(url, payload).respond(200, authBackendData.auth[1]);
            //$httpBackend.expectGET(urlPeople).respond(200, peopleBackendData.people[1]);
            $http.post(url, payload).success(successCallback)
            authAdmin.then(function(data){
                resultAuthAdmin = data.data;
            });
            $httpBackend.flush(); 

            expect(resultAuthAdmin).not.toBeNull();
            expect(resultAuthAdmin).toBeDefined();
            
            expect(resultAuthAdmin.response.status).not.toBe('Ok');
            expect(resultAuthAdmin.userName).not.toBe('adm');
        }));
    });

    describe("People Service", function () {
        var peopleServices;

        beforeEach(function () {
            inject(function ($injector) {
                peopleBackend($httpBackend, servicesConfig);
                peopleServices = $injector.get('peopleServices');
            });

        });

        it("Test chamada para Lista de Clientes", inject(function ($http, $httpBackend) {
            var url = servicesConfig.endpoints.people + 'all',
                successCallback = jasmine.createSpy();

            expect(peopleServices.loadPerson).not.toBe(undefined);
            expect(angular.isFunction(peopleServices.loadPerson)).toBe(true);

            var client = peopleServices.loadPerson('all');
            
            $httpBackend.expectGET(url).respond(200, peopleBackendData);
            $http.get(url).success(successCallback)
            $httpBackend.flush();
           
            expect(client).not.toBeNull();
            expect(client.people.length).toBe(6);
            expect(client.people[1].Id).toBe(2);
            expect(client.people[1].name).toBe('Rosilene Wolff dos Santos');
        }));    

        it("Test chamada para Cliente", inject(function ($http, $httpBackend) {
            var person = 2, 
                url = servicesConfig.endpoints.people + person,
                successCallback = jasmine.createSpy();

            expect(peopleServices.loadPerson).not.toBe(undefined);
            expect(angular.isFunction(peopleServices.loadPerson)).toBe(true);

            var client = peopleServices.loadPerson(person);
            
            $httpBackend.expectGET(url).respond(200, peopleBackendData.people[1]);
            $http.get(url).success(successCallback)
            $httpBackend.flush();
           
            expect(client).not.toBeNull();

            expect(client.Id).toBe(person);
            expect(client.name).toBe('Rosilene Wolff dos Santos');
        }));    
    });


    describe("Orders Service", function () {
        var ordersServices;
        var peopleServices;

        beforeEach(function () {           

            inject(function ($injector) {
                ordersBackend($httpBackend, servicesConfig);
                peopleBackend($httpBackend, servicesConfig);
                ordersServices = $injector.get('ordersServices');
                peopleServices = $injector.get('peopleServices');
            });

        });

        it("Test chamada para Lista de Pedidos por usuário", inject(function ($http, $httpBackend) {
            var person = 2,
                urlPeople = servicesConfig.endpoints.people + person,
                urlOrder = servicesConfig.endpoints.orders + person,
                successCallback = jasmine.createSpy();

            expect(peopleServices.loadPerson).not.toBe(undefined);
            expect(angular.isFunction(peopleServices.loadPerson)).toBe(true);

            var client = peopleServices.loadPerson(person);
            
            $httpBackend.expectGET(urlPeople).respond(200, peopleBackendData.people[1]);
            $http.get(urlPeople).success(successCallback)
            $httpBackend.flush();

            expect(client).not.toBeNull();
            expect(client.Id).toBe(person);


            expect(ordersServices.loadOrders).not.toBe(undefined);
            expect(angular.isFunction(ordersServices.loadOrders)).toBe(true);

            var orders = ordersServices.loadOrders(person);
            $httpBackend.expectGET(urlOrder).respond(200, ordersBackendData.orders[1]);
            $http.get(urlOrder).success(successCallback)
            $httpBackend.flush();

            expect(orders).not.toBeNull();
            expect(orders.clientId).toBe(person);
        }));        
    });


    describe("Product Service", function () {
        var productsServices;

        beforeEach(function () {
            inject(function ($injector) {
                productsBackend($httpBackend, servicesConfig);
                productsServices = $injector.get('productsServices');
            });
        });

        it("Test chamada Lista de Produtos", inject(function ($http, $httpBackend) {
            var url = servicesConfig.endpoints.products + 'all',
                successCallback = jasmine.createSpy();

            expect(productsServices.loadProducts).not.toBe(undefined);
            expect(angular.isFunction(productsServices.loadProducts)).toBe(true);

            var listProduct = productsServices.loadProducts('all');
            
            $httpBackend.expectGET(url).respond(200, productsBackendData);
            $http.get(url).success(successCallback)
            $httpBackend.flush();
           
            expect(listProduct).not.toBeNull();
            expect(listProduct.products.length).toBe(3);
        })); 

        it("Test chamada de Produto", inject(function ($http, $httpBackend) {
            var product = 1,
                url = servicesConfig.endpoints.products + product,
                successCallback = jasmine.createSpy();

            expect(productsServices.loadProducts).not.toBe(undefined);
            expect(angular.isFunction(productsServices.loadProducts)).toBe(true);

            var productThis = productsServices.loadProducts(product);
            
            $httpBackend.expectGET(url).respond(200, productsBackendData.products[0]);
            $http.get(url).success(successCallback)
            $httpBackend.flush();
           
            expect(productThis).not.toBeNull();
            expect(productThis.Id).toBe(product);
        }));        
    });
});