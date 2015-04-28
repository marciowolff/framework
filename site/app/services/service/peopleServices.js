
external.config(function () {
});

external.run(function ($rootScope) {
});

external.factory('peopleServices', function ($resource, servicesConfig) {
    var peopleServices = {
        _Person: $resource(servicesConfig.endpoints.people + ':personId', { personId: '@id' }),
        _Points: $resource(servicesConfig.endpoints.points + ':personId', { personId: '@id' }),

        loadPerson: function (personId, successCallback, errorCallback) {
        	var person = this._Person.get({ personId: personId }, function(successData){
        		if (angular.isFunction(successCallback)) {
	                successCallback(successData);
	            }
        	}, function(errorData){
        		if (angular.isFunction(errorCallback)) {
	                errorCallback(errorData);
	            }
        	});
        	
            return person;
        },
        loadPoints: function(personId, successCallback, errorCallback){
            var points = this._Points.get({ personId: personId }, function(successData){
                if (angular.isFunction(successCallback)) {
                    successCallback(successData);
                }
            }, function(errorData){
                if (angular.isFunction(errorCallback)) {
                    errorCallback(errorData);
                }
            });
            
            return points;
        }

    };
    return peopleServices;
});
