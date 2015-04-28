var authBackendData = {

    auth: [
        {
            response: {
                status: "Ok",
                dateTime: "18-07-2014 11:56:09",
                messages: {
                    message: []
                }
            },
            userName: "adm",
            passwd: null,
            token: "f430c44f59ce4765ba6401a04a2128df",
            nomOperador: null,
            cdgrupo: 0
        },
        {
            response: {
                status: "Fail",
                dateTime: "18-07-2014 11:59:07",
                messages: {
                  message: [
                    {
                      "fieldName": "userName",
                      "text": "Usuario e/ou senha invï¿½lido!",
                      "type": "Error"
                    }
                  ]
                }
            },
            userName: "adms",
            passwd: "tusk",
            token: null,
            nomOperador: null,
            cdgrupo: 0
        }
    ]
};

var authBackend = function ($httpBackend, servicesConfig) {
	console.log("entrou")
    $httpBackend.whenPOST(servicesConfig.endpoints.auth, {userName: "adm", passwd: "tusk"}).respond(200, authBackendData.auth[0]);
    $httpBackend.whenPOST(servicesConfig.endpoints.auth, {userName: "adms", passwd: "tusk"}).respond(200, authBackendData.auth[1]);
};