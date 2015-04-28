describe("Test Constants", function () {

    var servicesConfig, baseUrls;        
    beforeEach(function () {
        module("app");
        module('ngMockE2E');

        inject(function ($injector) {
            servicesConfig = $injector.get('servicesConfig'),
            baseUrls = $injector.get('baseUrls');
        });

    });

    describe("Test Constant baseUrls adminCtrl", function(){
        it('Constant APP', inject(function () {
            expect(baseUrls.directorys.app).toBe('/app/');
        }));

        it('Constant PAGES', inject(function () {
            expect(baseUrls.directorys.pages).toBe('/app/pages/');
        }));

        it('Constant PARTIALS', inject(function () {
            expect(baseUrls.directorys.partials).toBe('/app/pages/partials/');
        }));

        it('Constant TEMPLATES APP', inject(function () {
            expect(baseUrls.directorys.templates.app).toBe('/app/pages/template/');
        }));

        it('Constant TEMPLATES BOOTSTRAP', inject(function () {
            expect(baseUrls.directorys.templates.bootstrap).toBe('/app/pages/template/bootstrap/');
        }));
    });

    describe("Test Constant ServicesConfig URLS", function(){
        it('Constant servicesConfig Admin', inject(function () {
            expect(servicesConfig.endpoints.admin).toBe('/admin/');
        }));

        it('Constant servicesConfig People', inject(function () {
            expect(servicesConfig.endpoints.people).toBe('/people/');
        }));

        it('Constant servicesConfig Orders', inject(function () {
            expect(servicesConfig.endpoints.orders).toBe('/orders/');
        }));

        it('Constant servicesConfig Products', inject(function () {
            expect(servicesConfig.endpoints.products).toBe('/products/');
        }));
    });
});