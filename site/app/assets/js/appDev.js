'use strict';


/************************************************************************************************
 * MODULE: APPWEBDEV
 * 
 ************************************************************************************************/
var appDev = angular.module('appDev', ['ngMockE2E', 'app']);

appDev.run(function ($httpBackend, servicesConfig) {
    $httpBackend.whenGET(/.*\.htm/).passThrough();
    $httpBackend.whenPOST(/http[:][/][/]localhost[:]((3000))[/].*/).passThrough();
    $httpBackend.whenGET(/http[:][/][/]localhost[:]((3000))[/].*/).passThrough();

    authBackend($httpBackend, servicesConfig);
    adminBackend($httpBackend, servicesConfig);
    menuBackend($httpBackend, servicesConfig);
    peopleBackend($httpBackend, servicesConfig);
    ordersBackend($httpBackend, servicesConfig);
    productsBackend($httpBackend, servicesConfig);
});