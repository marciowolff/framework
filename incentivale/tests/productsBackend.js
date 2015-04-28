var productsBackendData = {
    products : [
        { 
            Id: 1,
            name: 'Câmera Digital Fujifilm FinePix, S8200, 16MP Preta, LCD 3", Zoom Ótico 40x, Cartão de 8GB',
            image: "images/camera.jpg",
            description: {
                desc: 'As câmeras Super Zoom são a melhor escolha quando a questão é qualidade x preço.',
                value: 'R$ 689,00'
            }
        },
        { 
            Id: 2,
            name: 'Motorola RAZR D1 Branco, Dual Chip, Processador 1.0GHz, Android 4.1, 3G, GPS, Wi-Fi, Câmera 5.0MP, Fone de Ouvido, Memória Interna 4GB',
            image: "images/celular.jpg",
            description: {
                desc: 'Exclusivo, o novo Motorola da família RAZR possui um desenho de construção sólida, sofisticado e mais fino. E conta ainda com tela cheia de bordas mínimas. Tudo isso para facilitar o manuseio do aparelho e a visualização do conteúdo.',
                value: 'R$ 399,00'
            }
        },
        { 
            Id: 3,
            name: 'Smart TV SLIM LED 40" Samsung UN40F5500AGXZD, Dual Core, Wi-fi, Função Futebol, HDMI, RF, Full HD, USB',
            image: "images/tv.jpg",
            description: {
                desc: 'Ideal para quem gosta de futebol e curte acompanhar cada detalhe do jogo! A Smart TV SLIM LED da Samsung 40’’ irá transformar sua experiência com o mundo do futebol com apenas um botão!',
                value: 'R$ 1.698,00'
            }
        }
    ]    
};

var productsBackend = function ($httpBackend, servicesConfig) {
    $httpBackend.whenGET(servicesConfig.endpoints.products + 'all').respond(200, productsBackendData);    
    $httpBackend.whenGET(servicesConfig.endpoints.products + '1').respond(200, productsBackendData.products[0]);
    $httpBackend.whenGET(servicesConfig.endpoints.products + '2').respond(200, productsBackendData.products[1]);
    $httpBackend.whenGET(servicesConfig.endpoints.products + '3').respond(200, productsBackendData.products[2]);
};