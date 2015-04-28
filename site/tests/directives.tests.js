

describe("Test Directives", function () {

    var $rootScope, $compile, $scope, $httpBackend, baseUrls, servicesConfig;

    beforeEach(function () {
        module("app", "/app/pages/template/messages.html", "/app/pages/partials/subtable1.html");

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $compile = $injector.get('$compile');
            $rootScope = $injector.get('$rootScope');

            servicesConfig = $injector.get('servicesConfig');
            baseUrls = $injector.get('baseUrls');
            $scope = $rootScope.$new();       
        });
    });

    describe("Test Template Messages", function() {
        var element, directive;
        var msg = [
            success = {
                "response":{
                    "status":"Ok",
                    "dateTime":"29-07-2014 14:23:32",
                    "messages":{
                        "message":[]
                    }
                },
                "userName":"adm",
                "passwd":null,
                "token":"6fbaf53d4e484114a3f9ed540f00cf25",
                "nomOperador":null,
                "cdgrupo":0
            },
            fail = {
                "response": {
                    "status":"Fail",
                    "dateTime":"29-07-2014 13:58:48",
                    "messages":{
                        "message":[{
                            "fieldName":"userName",
                            "text":"Usuario e/ou senha invï¿½lido!",
                            "type":"Error"
                        }]
                    }
                },
                "userName":"asdsa",
                "passwd":"sadasdsa",
                "token":null,
                "nomOperador":null,
                "cdgrupo":0
            }
        ];
        
        it('Test Directive Messages message Fail', function () {
            $scope.msg = msg[1];
            element = angular.element('<div messages msgs="msg"></div>'); 

            $compile(element)($scope);
            $scope.$digest();

            directive = element.isolateScope();

            expect(directive.msgs).toBe($scope.msg);
            expect(directive.msgs.response.status).toBe('Fail');
            expect(directive.msgs.token).toBeNull();
        });

        it('Test Directive Messages message Ok', function () {
            $scope.msg = msg[0];
            element = angular.element('<div messages msgs="msg"></div>'); 

            $compile(element)($scope);
            $scope.$digest();

            directive = element.isolateScope();

            expect(directive.msgs).toBe($scope.msg);
            expect(directive.msgs.response.status).toBe('Ok');
            expect(directive.msgs.token).not.toBeNull();
        });
    });
    

    describe("Test Template Tabela", function() {                
        var element, directive;


        
        beforeEach(function () {
            inject(function ($injector, $compile) {
                $scope.subtable =  baseUrls.directorys.partials + 'subtable1.html';
                $scope.pedido = productsBackendData.products;
                element = angular.element('<tpl tpl-table tplurl="subtable" tplscope="pedido"></tpl>'); 

                $compile(element)($scope);
                $scope.$digest();

                directive = element.isolateScope();
            });
        });


        it('Test Directive Scope SubTemplate Url', function () {
            expect(directive.tplurl).toBe($scope.subtable);
        });

        it('Test Directive Scope SubTemplate scope', function () {
            expect(directive.tplscope).toBe($scope.pedido);
        });
    });


    describe("Test Filter Paginação", function() {
       var startFrom, element;
       var list = [{id: 1}, {id: 2}, {id: 3}];
       var resultTemplate = '<ul><li></li> <li></li> <li></li></ul>';
       beforeEach(function(){

           inject(function ($filter, $injector) {
               startFrom = $filter('startFrom');                

               element = $compile('<ul class="pagination pull-right">' +
                   '<li ng-class="{disabled: currentpage == 0}">' +
                        '<a href ng-click="prevPage()">&laquo;</a>' +
                    '</li>' +                    
                    '<li ng-repeat="n in range(listarray.length - gap, currentpage, currentpage + gap)" ng-class="{active: n == currentpage}" ng-click="setPage()">' +
                        '<a href ng-bind="n + 1">1</a>' +
                    '</li>' +
                    '<li ng-class="{disabled: (currentpage) == listarray.length - pagesize}">' +
                        '<a href ng-click="nextPage()">&raquo;</a>' +
                    '</li>' +
                    '<li class="numberAll"><span>{{currentpage+1}}/{{numberOfPages()}}</span></li>' +
                '</ul>')($scope);

                $scope.list = list;
                $scope.$digest();
            });
        });

        it('Filtrar lista de acordo com a página', function () {
            expect(startFrom).not.toEqual(null);
            expect(startFrom(list, 1)).toEqual([{id: 2}, {id: 3}]);
        });

        it('Template da Paginação', function(){
            expect(element.find('li').length).toEqual($scope.list.length);
        });
    });
});