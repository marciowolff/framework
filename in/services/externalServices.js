var external = angular.module('external', ['ngResource']);

external.config(function () {
});

external.run(function ($rootScope) {
});

external.constant("servicesConfig", {
    ambienteProd: false,
    endpoints: {
        /*
        'hoot': 'http://localhost:8082/inback/service/',
        'auth': 'http://localhost:8082/inback/session/auth', 
        'people': 'http://localhost:8082/inback/service/usuario/find/', 
        'points': 'http://localhost:8082/inback/service/saldo/',
        /*
        /**/
        'hoot': 'http://10.10.10.123:8080/inback/service/',
        'auth': 'http://10.10.10.123:8080/inback/session/auth', 
        'people': 'http://10.10.10.123:8080/inback/service/usuario/find/', 
        'points': 'http://10.10.10.123:8080/inback/service/saldo/',
        /**/
    },
    siteHost: '/',
    analitics: 'UA-58644910-1',
    debug: true,
    captcha: {
        //https://www.google.com/recaptcha/
        sitekey: '6Lcufv4SAAAAANldbPctoKyqI6gHtu2Zb7hVNuzU',      
        secretkey: '6Lcufv4SAAAAALBv6u5oZl1wN_v5yemwmljnLVgt'  
    },
    user : { 
        Id: 1, 
        name: 'In Mais',
        logo: {title: "In Mais", img: "assets/images/logo.png"},        
        layout: {
            type: 'center',
            header: {
                login: true,
                user:{tpl: 'tpl-dropdownmenu', classe: 'links', titleref: 'apelido',
                    menu: [
                        {type: 'navinterno', title: 'Minha Conta', classe: 'minhaconta', url: 'minhaconta', ref: 'minhaconta'},
                        {type: 'navinterno', title: 'Resgate', classe: 'resgate', url: 'resgate', ref: 'resgate'},
                        {type: 'navinterno', title: 'Compras Promocionais', classe: 'compraspromocao', url: 'vantagem', ref: 'vantagem'},
                        {title: 'Alterar Dados', classe: 'editPerfil', url: 'perfil',},
                        {title: 'Fale Conosco', classe: 'contato', url: 'contato'},
                        {title: 'Sair', classe: 'closeApp', func: 'logout'}
                    ],                    
                    points: {text: 'Você tem <strong>{{$rootScope.user.points.value (pontos)}}</strong> pontos', classpoints: 'points'}
                },
            },
            menu: {
                login: false,
            },
            footer: {
                copyright: false,
                sizenav: 12,
                lists: [
                    {
                        title: 'Informações', classe:"info", size: 3, list: [
                            //{type: 'nav', title: 'Mapa do site', classe:'mapasite', url: '', ref:'mapasite'},
                            {type: 'nav', title: 'Conheça o In Mais', classe:'institucional', url: 'institucional', ref:'institucional' /*linkexterno: true*/},
                            {type: 'nav', title: 'Seja um parceiro', classe:'parceiro', url: 'contato', ref:'parceiro'},
                            {type: 'nav', title: 'Trabalhe conosco', classe:'trabalheconosco', url: 'contato', ref:'trabalheconosco'},
                        ]
                    },
                    {
                        title: 'In Mais', classe:"website", size: 3, list: [
                            {type: 'nav', title: 'Home', classe:'home', url: 'index', ref:'index'},
                            {type: 'nav', title: 'Como juntar pontos', classe:'juntarpontos', url: 'comojuntarpontos', ref:'comojuntarpontos'},
                            {type: 'nav', title: 'Como usar seus pontos', classe:'usarpontos', url: 'comousarpontos', ref:'comousarpontos'},
                            {type: 'nav', title: 'Como comprar', classe:'comocomprar', url: 'comocomprar', ref:'comocomprar'},
                            {type: 'nav', title: 'Parceiros', classe:'parceiros', url: 'parceiros', ref: 'parceiros'},
                        ]
                    },
                    {
                        title: 'Redes Sociais', classe:"socialmedia", size: 3, list: [
                            {title: 'facebook.com.br/Inmais', classe:'facebook', url: 'facebook.com.br/Inmais', linkexterno: true, icon: 'facebook'},
                            {title: 'twitter.com/inmaisatende', classe:'twitter', url: 'twitter.com/inmaisatende', linkexterno: true, icon: 'twitter'},
                        ]
                    },
                    {
                        title: 'Contato', classe:"help", size: 3, list: [
                            {type: 'nav', title: 'Fale Conosco', classe:'contato', url: 'contato', ref:'contato'},
                            {type: 'nav', title: 'Perguntas Frequentes', classe:'duvidas', url: 'perguntasfrequentes', ref: 'perguntasfrequentes'},
                            {type: 'nav', title: 'Política de Privacidade', classe:'politica', url: '', ref: 'politicaprivacidade'},
                            {type: 'nav', title: 'Regulamento', classe: 'regulamento', url: 'regulamento', ref:'regulamento'},
                        ]
                    },
                ],
                //FOOTER PARCEIROS
                /*parceiros: 
                    {id: 'nav-parceiros', tpl: 'tpl-carousel', slideShow: 8, slideToScroll: 1, parceirosClass: 'container',
                    slides:[
                        {title: 'Americanas', url: "http://www.americanas.com", target: 'blank',img: 'assets/images/parceiros/americanas.png'},
                        {title: 'Submarino', img: 'assets/images/parceiros/submarino.png'},
                        {title: 'Sony', img: 'assets/images/parceiros/sony.png'},
                        {title: 'Brastemp', img: 'assets/images/parceiros/brastemp.png'},
                        {title: 'Consul', img: 'assets/images/parceiros/consul.png'},
                        {title: 'Polishop', img: 'assets/images/parceiros/polishop.png'},
                        {title: 'Electrolux', img: 'assets/images/parceiros/electrolux.png'},
                        {title: 'Semp Toshiba', img: 'assets/images/parceiros/semptoshiba.png'},
                    ]


- validar resgate antes de calcular

                },*/
            },
            links: {
                login: {name: 'login', title: "Login", href:"/login", pagedefault: false},
                loginSicoob: {name: 'loginSicoob', title: "Login Sicoob", href:"/sicoob/login", pagedefault: false},
                index: {name: 'index', title: 'Index', href:'/index', pageclose: false, navactive: 'index'},

                //EXTERNOS
                institucional: {name: 'institucional', title: "Conheça o In Mais", href:"/institucional", pageclose: false, navactive: 'institucional'},
                comocomprar: {name: 'comocomprar', title: "Como comprar", href:"/como-comprar", pageclose: false, navactive: 'comocomprar'},
                comousarpontos: {name: 'comousarpontos', title: "Como usar pontos", href:"/como-usar-seus-pontos", pageclose: false, navactive: 'comousarpontos'},
                comojuntarpontos: {name: 'comojuntarpontos', title: "Como juntar pontos", href:"/como-juntar-pontos", pageclose: false, navactive: 'comojuntarpontos'},
                parceiros: {name: 'parceiros', title: "Parceiros", href:"/parceiros", pageclose: false, navactive: 'parceiros'},
                perguntasfrequentes: {name: 'perguntasfrequentes', title: "Perguntas Frequentes", href:"/perguntas-frequentes", pageclose: false, navactive: 'perguntasfrequentes'},

                contato: {name: 'contato', title: "contato", href:"/contato", pageclose: false, navactive: 'contato', navinternaactive: 'contato'},

                regulamento: {name: 'regulamento', title: "regulamento", href:"/regulamento", pageclose: false, navactive: 'regulamento'},

                //CADASTRO
                cadastro: {name: 'cadastro', title: "cadastro", href:"/cadastro", pageclose: false},
                cadastroconfirm: {name: 'cadastroconfirm', title: "confirmação cadastro", href:"/cadastro-confirm", pageclose: false},
                recuperarsenha: {name: 'recuperarsenha', title: "recuperar senha", href:"/recuperar-senha", pageclose: false},
                senhaconfirm: {name: 'senhaconfirm', title: "confirmar senha", href:"/recuperar-senha-confirm", pageclose: false},
                senhafinish: {name: 'senhafinish', title: "concluido senha", href:"/recuperar-senha-concluido", pageclose: false},

                //MINHA CONTA
                minhaconta: {name: 'minhaconta', title: "minhaconta", href:"/minha-conta", pageclose: true, navinternaactive: 'minhaconta', navactive: 'minhaconta', menuactive: 'visaogeral'},
                extrato: {name: 'extrato', title: "extrato", href:"/minha-conta/extrato", pageclose: false, navinternaactive: 'minhaconta', navactive: 'minhaconta', menuactive: 'extrato'} ,
                acompanharesgate: {name: 'acompanharesgate', title: "acompanha resgate", href:"/minha-conta/acompanhar-resgate", pageclose: true, navinternaactive: 'minhaconta', navactive: 'minhaconta', menuactive: 'acompanharesgate'},
                perfil: {name: 'perfil', title: "perfil", href:"/minha-conta/perfil", pageclose: true, navinternaactive: 'minhaconta', navactive: 'minhaconta', menuactive: 'perfil'},
                dadoscredito: {name: 'dadoscredito', title: "dados para créditos", href:"/minha-conta/dados-credito", pageclose: true, navinternaactive: 'minhaconta', navactive: 'minhaconta', menuactive: 'dadoscredito'},
                addcontacredito: {name: 'addcontacredito', title: "adicionar conta", href:"/minha-conta/adicionar-conta-credito", pageclose: true, navinternaactive: 'minhaconta', navactive: 'minhaconta', menuactive: 'dadoscredito'},
                addcartaoprepago: {name: 'addcartaoprepago', title: "Solicitar cartão pré-pago", href:"/minha-conta/solicitar-cartao-pre-pago", pageclose: true, navinternaactive: 'minhaconta', navactive: 'minhaconta', menuactive: 'dadoscredito'},
                alterarsenha: {name: 'alterarsenha', title: "alterar senha", href:"/minha-conta/alterar-senha", pageclose: true, navinternaactive: 'minhaconta', navactive: 'minhaconta', menuactive: 'alterarsenha'},

                //RESGATE
                resgate: {name: 'resgate', title: "resgate", href:"/resgate", pageclose: true, navinternaactive: 'resgate'},
                resgatecreditoconta: {name: 'resgatecreditoconta', title: "resgate credito em conta corrente", href:"/resgate/conta-corrente", pageclose: true, navinternaactive: 'resgate', menuactive: 'resgatecreditoconta'},
                resgateprepago: {name: 'resgateprepago', title: "resgate pre-pago", href:"/resgate/prepago", pageclose: true, navinternaactive: 'resgate', menuactive: 'resgateprepago'},
                
                //COMPRAS PROMOCIONAIS
                vantagem: {name: 'vantagem', title: "compras promocionais", href:"/compras-promocionais/catalogo:parameter/categoria:parameter", oldHref:"/compras-promocionais", hrefDefault: '/compras-promocionais/catalogo:S/categoria:907PARC', pageclose: false, navinternaactive: 'vantagem', navactive: 'vantagem',},

                //CATALOGO
                catalogo: {name: 'catalogo', title: "catalogo", href:"/resgate/catalogo:parameter", pageclose: true, navinternaactive: 'resgate'},
                checkout: {name: 'checkout', title: "resgate", href:"/resgate/catalogo:parameter/checkout", pageclose: true, navinternaactive: 'resgate'},
            },
            navauth: false,
            navinternalauth: false,
            nav: [
                //refhref precisa ser igual ao link.href sem '/' para inserir a class active na navegacao 
                {type: 'nav', title: 'Minha Conta', classe:'minhaconta', url: 'minhaconta', ref:'minhaconta', close: true},
                {type: 'nav', title: 'Como Comprar', classe: 'comocomprar', url: 'comocomprar', ref:'comocomprar'},
                {type: 'nav', title: 'Como usar seus pontos', classe: 'comousarpontos', url: 'comousarpontos', ref:'comousarpontos'},
                {type: 'nav', title: 'Como juntar pontos', classe: 'comojuntarpontos', url: 'comojuntarpontos', ref:'comojuntarpontos'},
                {type: 'nav', title: 'Conheça o In Mais', classe: 'institucional', url: 'institucional', ref:'institucional'},
                {type: 'nav', title: 'Home', classe: 'home', url: 'index', ref:'index'},
            ],
            partials: {

                //BOX - LOGIN
                login: {id: 'box-login', tpl: 'tpl-form', classe: 'box box-tertiary form login',
                    btns: [
                        {title: 'entrar', type: 'submit', func: 'login', classe:"btn-primary", url: 'index', updateLogin: true, visibled: true},
                        {title: 'cadastre-se!', classe:"btn-default", url: 'cadastro', visibled: true},
                        //{title: 'esqueci minha senha', class:"btn-link", url: 'password', visibled: true, openmodal: true}, //MODAL
                        {title: 'esqueci minha senha', classe:"btn-link", url: 'recuperarsenha', visibled: true},
                    ],
                    msgbottom: true,
                    detail: [
                        {classe: 'titleBorderNn', 
                            title: {text: 'login'},
                            form: [
                                {
                                    style: 'inline',
                                    campos: [
                                        {nameTpl: 'input', type: 'text', name:'userName', id: 'userName', mask: '999.999.999-99', labelHide: true, required: true, size: 6, inputSize: 12},
                                        {nameTpl: 'input', type: 'password', name:'passwd', id: 'passwd', placeholder: 'Senha', labelHide: true, required: true, size: 6, inputSize: 12},                                        
                                    ]
                                },                                       
                            ]
                        }
                    ]
                },

                //MINHA CONTA {INICIO}
                //NAVEGACAO INTERNA
                navinterno: {
                    id: 'nav-internomenu', tpl: 'tpl-list-form', contentClass: 'nav',
                    result: {
                        line:[
                            {classe: 'col-md-3', field: [
                                {type: 'navinterno', value: 'Minha Conta', classe:'btn btn-default minhaconta', icon: 'minhaconta', url: 'minhaconta', ref:'minhaconta'},
                            ]},
                            {classe: 'col-md-3', field: [
                                {type: 'navinterno', value: 'Resgate', classe:'btn btn-default resgate', icon: 'resgate', url: 'resgate', ref:'resgate'},
                            ]},
                            {classe: 'col-md-3', field: [
                                {type: 'navinterno', value: 'Compras Promocionais', classe:'btn btn-default vantagem', icon: 'vantagem', url: 'vantagem', ref:'vantagem'},
                            ]},
                            {classe: 'col-md-3', field: [
                                {type: 'navinterno', value: 'Fale Conosco', classe:'btn btn-default faleconosco', icon:'faleconosco', url: 'contato', ref:'contato'},
                            ]},
                        ]
                    },                    
                },

                //MENU LATERAL {INICIO}
                //CONTA
                menupontos: {
                    id: 'menu-pontos', tpl: 'tpl-box', classe: 'box box-primary', tplContent:'tpl-list-form', contentClass:'list-box menu', title: 'Seus Pontos', 
                    result: {
                        line:[
                            {field: [
                                {type: 'menu', value: 'Visão Geral', classe:'geral', icon: 'geral', url: 'minhaconta', ref:'visaogeral'},
                                {type: 'menu', value: 'Extrato', classe:'extrato', icon: 'dinheiro', url: 'extrato', ref:'extrato'},
                                //{value: 'Comprar pontos', class:'compra', icon: 'compra'},
                                {type: 'menu', value: 'Acompanhar resgates', classe:'acompanhar', icon: 'acompanhar', url: 'acompanharesgate', ref:'acompanharesgate'},
                                //{value: 'Pontos a vencer', class:'pontosvencer', icon: 'time'},
                                //{value: 'Transferência de pontos', class:'transferencia', icon: 'atualizar'},
                            ]},
                        ]
                    },                    
                },

                //DADOS
                menudados: {
                    id: 'menu-dados', tpl: 'tpl-box', classe: 'box box-primary', tplContent:'tpl-list-form', contentClass:'list-box menu', title: 'Seus Dados', 
                    result: {
                        line:[
                            {field: [
                                {type: 'menu', value: 'Alterar dados pessoais', classe:'editPerfil', icon: 'perfil', url: 'perfil', ref:'perfil'},
                                {type: 'menu', value: 'Meus dados para créditos', classe:'editarCredito', icon: 'credito', url: 'dadoscredito', ref:'dadoscredito'},
                                {type: 'menu', value: 'Alterar Senha', classe:'senha', icon: 'config', url: 'alterarsenha', ref:'alterarsenha'},
                            ]},
                        ]
                    },                    
                },
                //MENU LATERAL {FIM}

                //BOX - SALDO ATUAL
                saldoatual: {id: 'box-saldoatual', tpl: 'tpl-box', classe: 'box box-default saldo', tplContent:'tpl-list-form', contentClass:'list-box', title: 'Seu Saldo Atual', 
                    service: {
                        call: {url: 'saldoatual/find/', objresult: 'load', parameter: 'idUsuario', filter: 'line'},
                    },
                    aditionals: {
                        field: {nameclass: 'strong', valueclass: 'value'}
                    },
                    btn: [{title: 'ver extrato', classe:"btn-link", url: 'extrato'}]
                },

                //BOX - PONTOS A VENCER
                proximospontosvencimento: {id: 'box-proximospontosvencimento', tpl: 'tpl-box', classe: 'box box-default ptvencer', tplContent:'tpl-list-form', contentClass:'list-box', title: 'Próximos Pontos a Vencer', 
                    service: {
                        call: {url: 'pontosavencer/find/', objresult: 'load', parameter: 'idUsuario', filter: 'line'},
                    },
                    aditionals: {
                        field: {nameclass: 'strong', valueclass: 'value'}
                    },
                    btn: [{title: 'Ver todos', classe:"btn-link", url: 'extrato'}]
                },

                //BOX - PONTOS A VENCER (DETALHAMENTO)
                proximospontosvencimentoextrato: {id: 'box-proximospontosvencimento', tpl: 'tpl-box', classe: 'box box-default ptvencer', tplContent:'tpl-list-form', contentClass:'list-box', title: 'Próximos Pontos a Vencer', 
                    service: {
                        call: {url: 'pontosavencerdetalhado/find/', objresult: 'load', parameter: 'idUsuario', filter: 'line'},
                    },
                    aditionals: {
                        field: {nameclass: 'strong', valueclass: 'value'}
                    },
                    btn: [{title: 'Ver todos', classe:"btn-link", url: 'extrato'}]
                },

                //BOX - ULTIMOS CREDITOS
                ultimoscreditos: {id: 'box-ultimoscreditos', tpl: 'tpl-box', classe: 'box box-default ultcreditos', tplContent:'tpl-list-form', contentClass:'list-box', title: 'Últimos Créditos', 
                    service: {
                        call: {url: 'ultimoscreditos/find/', objresult: 'load', parameter: 'idUsuario', filter: 'line'},
                    },
                    aditionals: {
                        field: {nameclass: 'strong', valueclass: 'value'}
                    },
                    btn: [{title: 'ver extrato', classe:"btn-link", url: 'extrato'}]
                },

                //BOX - ULTIMOS RESGATES
                ultimosresgates: {id: 'box-ultimosresgates', tpl: 'tpl-box', classe: 'box box-default ultresgate', tplContent:'tpl-list-form', contentClass:'list-box', title: 'Últimos Resgates', 
                    service: {
                        call: {url: 'ultimosresgates/find/', objresult: 'load', parameter: 'idUsuario', filter: 'line'},
                    },
                    aditionals: {
                       field: {nameclass: 'strong', valueclass: 'value'}
                    },   
                    btn: [{title: 'resgatar', classe:"btn-link", url: 'resgate'}]
                },
                //MINHA CONTA {INICIO}

                //MENU - COMPRAS PROMOCIONAIS
                menucategoriavantagem: {
                    id: 'categorias', tpl: 'tpl-box', classe: 'box box-primary menu', tplContent:'tpl-list-form', contentClass:'list-box', title: 'Filtrar por Categorias', 
                    service: {
                        call: {objresult: 'load',
                            urls: [
                                {url: 'categoria/find/tipopremio/', parameter: 'S', parameterType: 'string'},
                            ]                            
                        },
                    },
                    aditionals: {
                        field: {type: 'menu', aliasclassheader: 'titleheader', valueclass: 'value', nameclass: 'description', urldirect: true,
                            insertDinamic: {ref: 'name', classe: 'value', 
                                menuactiveaut: [
                                    {parameterurl: 'catalogo', parameterfiled: 'params', paramsName: 'catalogo'},
                                    {parameterurl: 'categoria', parameterfiled: 'value'},
                                ]
                            }
                        },
                    },                                       
                }, 
                menupremiosvantagem: {
                    id: 'tipopremios', tpl: 'tpl-box', classe: 'box box-primary menu', tplContent:'tpl-list-form', contentClass:'list-box', title: 'Filtrar por Tipos de Prêmios', 
                    service: {
                        call: {url: 'tipopremio/find/vantagem', objresult: 'load'},
                    },
                    aditionals: {
                        field: {type: 'menu', aliasclassheader: 'titleheader', nameclass: 'description', valueclass: 'value', hideImage: true, url: 'vantagem',
                            insertDinamic: {ref: 'name', classe: 'value', 
                                menuactiveaut: [
                                    {parameterurl: 'catalogo', parameterfiled: 'value'},
                                    {parameterurl: 'categoria', parameterfiled: 0},
                                ],
                                urlset: [
                                    {parameter: 'catalogo', setvalue: 'value'},
                                    {parameter: 'categoria', setvalue: 0}
                                ],
                            }
                        },
                    },                                 
                },
                
                
                //RESGATE {INICIO}
                //CARROUSEL DE NAVEGACAO
                navresgate: {
                    id: 'nav-navresgate', tpl: 'tpl-carousel', contentClass: 'nav', slideShow: 4, slideToScroll: 1,
                    service: {
                        call: {url: 'tipopremio/find/0', objresult: 'load'},
                    },
                    aditionals: {
                        field: {type: 'menu', imgset: 'grd',
                            insertDinamic: {ref: 'name', classe: 'value', 
                                menuactiveaut: {parameterurl: 'catalogo', parameterfiled: 'value'},
                                urlset: [
                                    {parameter: 'catalogo', setvalue: 'value'},
                                ],
                            }
                        },
                    },
                    body:[
                    ],
                },

                //CATALOGO DE PRODUTOS
                catalogo: {tpl: 'tpl-pag-table', classe:'table-primary',
                    /*service: {
                        call: {url: 'filtroperiodo', objresult: 'load',},
                    },*/
                    header: {
                        filter: {
                            show: false,  
                        },                                       
                    },
                    footer: {
                        pagination: {
                            url: '/paginacao/',
                            qtdLines: 8,
                            btnPagesView: 3,
                            showNumPages: true,
                            numPagesTextHidden: true,
                            firstLastLink: true,
                            directionLinks: true,
                            previoustext: '<',
                            nexttext: '>',
                            firsttext: '<<',
                            lasttext: '>>'                                        
                        }
                    },
                    table: {id: 'catalogo',tpl: 'tpl-list-form', classe:'list-box catalogo', clickbtn: true, 
                        service: {
                            call: {objresult: 'load',
                                urls: [
                                    {url: 'premio/find/tipopremio/', parameterurl: true, parameter: 'catalogo'},
                                    {url: '/codpre/', parameter: '0'},
                                    {url: '/nome/', parameter: '0'},
                                    {url: '/categoria/', parameter: '0'},
                                    {url: '/subcategoria/', parameter: '0'},
                                    {url: '/codprg/', parameter: '0'},
                                    {url: '/tpbeneficiario/', parameter: '0'},
                                    {url: '/faixaini/', parameter: '0'},
                                    {url: '/faixafim/', parameter: '0'},
                                    {url: '/id/', parameter: 'idUsuario'},                                                    
                                ],
                                error: {
                                    urlparametererror: 'resgate',
                                    hidecontent: true,
                                },
                            },
                        },                                        
                        aditionals: {
                            field: {
                                aliasclassheader: 'titleheader',
                                imageclass: 'image', 
                                aliasclass: 'title', 
                                nameclass: 'description', 
                                valueclass: 'result', 
                                url: 'resgate', 
                                imgset: 'grd',
                                required: true,
                                btns: [
                                    {name: 'save', title: 'Confirmar', visibled: true, classe: 'btn-primary', url: 'checkout', captureline: true,
                                        urlset: [
                                            {parameter: 'catalogo', setvalue: 'params', arrayset: {param: "id", value: "tipoPremio", set: 'value'}},
                                            //{parameter: 'checkout', setvalue: 'value'}
                                        ],
                                    },
                                ],                                
                            },                                    
                        },                                  
                        footer:[]
                    },         
                },
                //RESGATE {FIM}


                //CATALOGO DE PRODUTOS - VANTAGEM {INICIO}
                catalogovantagem: {tpl: 'tpl-pag-table', classe:'table-primary',
                    header: {
                        filter: {
                            show: false,  
                        },                                       
                    },
                    footer: {
                        pagination: {
                            url: '/paginacao/',
                            qtdLines: 8,
                            btnPagesView: 3,
                            showNumPages: true,
                            numPagesTextHidden: true,
                            firstLastLink: true,
                            directionLinks: true,
                            previoustext: '<',
                            nexttext: '>',
                            firsttext: '<<',
                            lasttext: '>>'                                        
                        }
                    },
                    table: {id: 'catalogo-vantagem',tpl: 'tpl-list-form', classe:'list-box catalogo-vantagem', clickbtn: true, 
                        service: {
                            call: {objresult: 'load',
                                urls: [
                                    {url: 'premio/find/tipopremio/', parameterurl: true, parameter: 'catalogo'},
                                    {url: '/codpre/', parameter: '0'},
                                    {url: '/nome/', parameter: '0'},
                                    {url: '/categoria/', parameterurl: true, parameter: 'categoria'},
                                    {url: '/subcategoria/', parameter: '0'},
                                    {url: '/codprg/', parameter: '0'},
                                    {url: '/tpbeneficiario/', parameter: '0'},
                                    {url: '/faixaini/', parameter: '0'},
                                    {url: '/faixafim/', parameter: '0'},
                                    {url: '/id/', parameter: 'idUsuario'},                                                    
                                ],                                
                            },
                        },                                        
                        aditionals: {
                            field: {
                                aliasclassheader: 'titleheader',
                                nameclass: 'description', 
                                valueclass: 'result', 
                                listclass: '',
                                url: 'resgate', 
                                imageclass: 'image', 
                                imgset: 'grd',
                                required: false,
                                aliasclass: 'title',
                                btnConditional: true,
                                btns: [
                                    {title: 'Resgatar', visibled: true, classe: 'btn-secondary', disabled: true, openmodal:true, openmodalLogin:true, url: 'condicaovantagemresgatar', /*url: "http://www.inmaisviagens.com.br", target: 'blank'*/
                                        viewsConditional: [
                                            { name: 'params', paramsName: 'resgatar', searchThis: true, events:{name: 'disabled', value: false}}
                                        ],
                                    },
                                    {title: 'Comprar', visibled: true, classe: 'btn-secondary', disabled: true, openmodal:true, openmodalLogin:true, url: 'condicaovantagemcomprar',/*url: "http://www.inmaisviagens.com.br", target: 'blank'*/
                                        viewsConditional: [
                                            { name: 'params', paramsName: 'comprar', searchThis: true, events:{name: 'disabled', value: false}}
                                        ],
                                    },
                                ],                                                               
                            },                                    
                        },                                  
                        footer:[]
                    },         
                },
                //CATALOGO DE PRODUTOS - VANTAGEM {FIM}

                //FORMULARIOS {INICIO}
                //DADOS PESSOAIS
                dadospessoais: [
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'nome', id: 'nome', labelName: 'Nome Completo:', required: true, size: 12, inputSize: 6, labelSize: 3},
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'date', name:'datanascimento', id: 'datanascimento', labelName: 'Data de Nascimento:', obs: '(dia / mês / ano)', required: true, size: 12, inputSize: 3, labelSize: 3, obsSize: 9, obsLabelSize: 3},
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'select', type: 'select', name:'sexo', id: 'sexo', labelName: 'Sexo:', required: true, size: 12, inputSize: 3, labelSize: 3}
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'select', type: 'select', name:'estadocivil', id: 'estadocivil', labelName: 'Estado Cívil:', required: true, size: 12, inputSize: 3, labelSize: 3}
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'input', name:'nacionalidade', id: 'nacionalidade', labelName: 'Nacionalidade:', required: true, size: 12, inputSize: 3, labelSize: 3}
                        ]
                    },
                ],

                //ENDERECO
                endereco: [
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'input', name:'pais', id: 'pais', labelName: 'País:', lineValue: 'Brasil', noclearvalue: true, disabled: true, required: true, size: 12, inputSize: 3, labelSize: 3}
                        ]
                    } , 
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'cep', id: 'cep', labelName: 'CEP:', required: true, size: 5, inputSize: 6, labelSize: 3},
                            {nameTpl: 'button', type: 'button', name:'searchcep', id: 'searchcep', reloadForm: true, size: 3, inputSize: 12, title: 'Buscar', visibled: true, classe: 'btn-tertiary',
                                insertResult: [
                                    /*
                                    BUSCAR NO GOOGLE
                                    {origin: 'postal_code', destiny: 'cep'}, //CEP
                                    {origin: 'route', destiny: 'logradouro'}, //RUA
                                    {origin: 'neighborhood', destiny: 'bairro'}, //BAIRRO
                                    {origin: 'locality', destiny: 'cidade'}, //CIDADE
                                    {origin: 'administrative_area_level_1', destiny: 'estadouf'}, //ESTADO
                                    {origin: 'country', long_name: true, destiny: 'pais'}, //PAIS
                                    */

                                    {origin: 'cep', destiny: 'cep'}, //CEP
                                    {origin: 'logradouro', destiny: 'logradouro'}, //RUA
                                    {origin: 'bairro', destiny: 'bairro'}, //BAIRRO
                                    {origin: 'cidade', destiny: 'cidade'}, //CIDADE
                                    {origin: 'estado', destiny: 'estadouf'}, //ESTADO
                                    //{origin: 'country', long_name: true, destiny: 'pais'}, //PAIS
                                ]    
                            },
                        ]
                    },
                    
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'logradouro', id: 'logradouro', labelName: 'Endereço:', required: true, size: 12, inputSize: 3, labelSize: 3},
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'numero', id: 'numero', labelName: 'Número:', required: true, size: 12, inputSize: 3, labelSize: 3},
                        ]
                    },   
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'comp', id: 'comp', labelName: 'Complemento:', required: false, size: 12, inputSize: 3, labelSize: 3},
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'bairro', id: 'bairro', labelName: 'Bairro:', required: true, size: 12, inputSize: 3, labelSize: 3},
                        ]
                    },  
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'input', name:'cidade', id: 'cidade', labelName: 'Cidade:*', placeholder: 'Digite um local', required: true, size: 12, inputSize: 3, labelSize: 3,
                                autocomplete: {options: {country: 'br', types: '(cities)'}}
                            },
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'select', type: 'select', name:'estadouf', id: 'estadouf', labelName: 'Estado:', required: true, size: 12, inputSize: 3, labelSize: 3},
                        ]
                    }
                    /*{
                        style: 'inline',
                        campos: [
                            {nameTpl: 'captcha', name:'captcha', id: 'captcha', required: true, size: 10, inputSize: 3, labelSize: 3},
                        ]
                    } */ 
                ],

                //RESUMO DO CONTATO
                contatoexpress: [
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'email', name:'email', id: 'email', labelName: 'Email:', required: true, size: 12, inputSize: 3, labelSize: 3},
                        ]
                    },                    
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'tel', name:'numtelefone', id: 'numtelefone', labelName: 'Residencial:', required: false, size: 12, inputSize: 3, labelSize: 3},
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'tel', name:'numcelular', id: 'numcelular', labelName: 'Celular:', required: false, size: 12, inputSize: 3, labelSize: 3},
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'radio', type: 'checkbox', name:'flagsms', id: 'flagsms', labelName: 'Aceito receber mensagens por SMS', required: false, size: 12, inputSize: 8, labelSize: 3},
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'radio', type: 'checkbox', name:'flagemail', id: 'flagemail', labelName: 'Aceito receber e-mails do In Mais', required: false, size: 12, inputSize: 8, labelSize: 3},
                        ]
                    }
                ],
                //FORMULARIOS {FIM}

                //DADOS RESGATE DE CARTÃO/SOLICITACAO CARTAO
                dadoscartao: [
                    //RESGATE DE CARTAO
                    {
                        style: 'inline ',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'cartaoNome', id: 'cartaoNome', labelName: 'Nome Completo:', required: true, size: 12, inputSize: 6, labelSize: 2},
                        ]
                    },
                    {
                        style: 'inline ',
                        campos: [
                            {nameTpl: 'input', type: 'date', name:'cartaoDatanascimento', id: 'cartaoDatanascimento', labelName: 'Data de Nascimento:', obs: '(dia / mês / ano)',obsSize:12, obsLabelSize:2, required: true, size: 12, inputSize: 3, labelSize: 2},
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'select', type: 'select', name:'cartaoSexo', id: 'cartaoSexo', labelName: 'Sexo:', required: true, size: 12, inputSize: 3, labelSize: 2}
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'select', type: 'select', name:'cartaoEstadocivil', id: 'cartaoEstadocivil', labelName: 'Estado Cívil:', required: true, size: 12, inputSize: 3, labelSize: 2}
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'input', name:'cartaoNacionalidade', id: 'cartaoNacionalidade', labelName: 'Nacionalidade:', required: true, size: 12, inputSize: 5, labelSize: 2}
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'cartaoNaturalidade', id: 'cartaoNaturalidade', labelName: 'Naturalidade:', required: true, size: 12, inputSize: 5, labelSize: 2}
                        ]
                    },
                    {
                        style: 'inline ',
                        campos: [
                            {nameTpl: 'input', type: 'cpf', name:'cartaoCpf', id: 'cartaoCpf', labelName: 'CPF:', required: true, size: 12, inputSize: 3, labelSize: 2, disabled: true},
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'rg', name:'cartaoRg', id: 'cartaoRg', labelName: 'Número do RG:', maxlength:20, required: true, size: 12, inputSize: 3, labelSize: 2}
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'cartaoOrgaoexpedidor', id: 'cartaoOrgaoexpedidor', labelName: 'Órgão Expedidor do RG:', required: true, size: 12, inputSize: 3, labelSize: 2}
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'cartaoNomeMae', id: 'cartaoNomeMae', labelName: 'Nome da Mãe:', required: true, size: 12, inputSize: 6, labelSize: 2}
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'cartaoNomePai', id: 'cartaoNomePai', labelName: 'Nome do Pai:', required: true, size: 12, inputSize: 6, labelSize: 2}
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'cartaoPais', id: 'cartaoPais', labelName: 'País:', disabled:true, required: true, size: 12, inputSize: 3, labelSize: 2}
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'cep', name:'cartaoCep', id: 'cartaoCep', labelName: 'CEP:', required: true, size: 6, inputSize: 6, labelSize: 4},
                            {nameTpl: 'button', type: 'button', name:'searchcep', id: 'searchcep', reloadForm: true, size: 3, inputSize: 8, title: 'Buscar', visibled: true, classe: 'btn-tertiary',
                                insertResult: [
                                    /*
                                    BUSCAR NO GOOGLE
                                    {origin: 'postal_code', destiny: 'cep'}, //CEP
                                    {origin: 'route', destiny: 'logradouro'}, //RUA
                                    {origin: 'neighborhood', destiny: 'bairro'}, //BAIRRO
                                    {origin: 'locality', destiny: 'cidade'}, //CIDADE
                                    {origin: 'administrative_area_level_1', destiny: 'estadouf'}, //ESTADO
                                    {origin: 'country', long_name: true, destiny: 'pais'}, //PAIS
                                    */

                                    {origin: 'cep', destiny: 'cartaoCep'}, //CEP
                                    {origin: 'logradouro', destiny: 'cartaoLogradouro'}, //RUA
                                    {origin: 'bairro', destiny: 'cartaoBairro'}, //BAIRRO
                                    {origin: 'cidade', destiny: 'cartaoCidade'}, //CIDADE
                                    {origin: 'estado', destiny: 'cartaoEstadouf'}, //ESTADO
                                    //{origin: 'country', long_name: true, destiny: 'pais'}, //PAIS
                                ]    
                            },
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'cartaoLogradouro', id: 'cartaoLogradouro', labelName: 'Endereço:', required: true, size: 12, inputSize: 6, labelSize: 2}
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'cartaoNumero', id: 'cartaoNumero', labelName: 'Número:', required: true, size: 12, inputSize: 3, labelSize: 2},
                        ]
                    },  
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'cartaoComp', id: 'cartaoComp', labelName: 'Complemento:', required: false, size: 12, inputSize: 3, labelSize: 2},
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'cartaoBairro', id: 'cartaoBairro', labelName: 'Bairro:', required: true, size: 12, inputSize: 3, labelSize: 2}
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'cartaoCidade', id: 'cartaoCidade', labelName: 'Cidade:', required: true, size: 12, inputSize: 3, labelSize: 2}
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'cartaoEstadouf', id: 'cartaoEstadouf', labelName: 'Estado:', required: true, size: 12, inputSize: 3, labelSize: 2}
                        ]
                    },

                    {
                        style: 'inline ',
                        campos: [
                            {nameTpl: 'input', type: 'email', name:'cartaoEmail', id: 'cartaoEmail', labelName: 'E-mail:', required: true, size: 12, inputSize: 6, labelSize: 2},
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                             {nameTpl: 'input', type: 'tel', name:'cartaoCelular', id: 'cartaoCelular', labelName: 'Telefone Celular:', required:true, maxlength: 2, size: 12, inputSize: 3, labelSize: 2},
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'tel', name:'cartaoTelefoneResidencial', id: 'cartaoTelefoneResidencial', labelName: 'Telefone Residencial:', required: false, size: 12, inputSize: 3, labelSize: 2},
                        ]
                    },
                    /*{
                        style: 'inline',
                        campos: [
                            {nameTpl: 'textarea', type: 'text', name:'mensagem', id: 'mensagem',maxlength: 255, size: 12, inputSize: 10, labelSize: 2, labelName: 'Mensagem:'},
                        ]
                    }*/
                ],


                //REGULAMENTO
                regulamento: [
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'list', contentClass: 'listRegulamento', size: 12, labelHide: true, inputSize: 12, 
                                result: {
                                    line:[
                                        {field: [
                                            {value: '<p>O presente “Regulamento” tem por finalidade estabelecer todas as regras e condições para participação dos Participantes no Programa In Mais.</p>'}
                                        ]},
                                        {field: [
                                            {value: '<p>IN MAIS MARKETING LTDA. (“IN MAIS”), pessoa jurídica de direito privado, inscrita no CNPJ/MF nº 19.970.341/0001-18, com sede a Rua André Fernandes 205a, Jardim Europa, CEP: 04.536-020 – São Paulo/ SP, desenvolveu conceito inovador no mercado de fidelização brasileiro, onde o participante do programa (“PARTICIPANTE”) pode converter seus pontos em valores monetários e transferir para uma conta bancária exclusivamente de sua titularidade ou creditar os valores em um cartão pré-pago com a marca IN MAIS ou efetuar resgates por outros produtos e serviços que o IN MAIS vier a disponibilizar.</p>'}
                                        ]},
                                        {field: [
                                            {value: '<p>O IN MAIS é um programa de Multi fidelização (“PROGRAMA”), que consiste na possibilidade de acúmulo de pontos em diversos PARCEIROS DE ACÚMULO (“PARCEIROS DE ACÚMULO”) do PROGRAMA, assim como, resgate dos pontos nos PARCEIROS DE RESGATE (“PARCEIROS DE RESGATE”) cadastrados no PROGRAMA.</p>'}
                                        ]},
                                        {field: [
                                            {value: '<p>Para resgate através de produtos e serviços o IN MAIS também inovou trazendo PARCEIROS DE RESGATE com preços promocionais. Dessa maneira, o PARTICIPANTE poderá resgatar produtos a preços atrativos com menor volume de pontuação.</p>'}
                                        ]},
                                        {field: [
                                            {value: '<p>Uma das grandes revoluções em programas de fidelidade trazidas pelo PROGRAMA IN MAIS é transparência ao PARTICIPANTE a respeito do valor do PONTO IN MAIS, de maneira que ele possa comparar o preço apresentado no PROGRAMA com os valores aplicados pelo mercado, podendo, assim, fazer a melhor opção entre resgatar um produto na plataforma ou resgatar os pontos em valores através de transferência para sua conta bancária ou cartão pré-pago In Mais.</p>'}
                                        ]},
                                        {field: [
                                            {value: '<p>O Participante também poderá comprar produtos com preços promocionais nos parceiros (“PARCEIROS DE COMPRA”) cadastrados no programa In Mais. São descontos de até 40% do valor de varejo e o cliente ainda ganha pontos In Mais na compra.</p>'}
                                        ]},
                                        {field: [
                                            {value: '<h5>1. DISPOSIÇÕES INICIAIS:</h5>'
                                            +'<p>1.1. PARTICIPANTE: Pessoa física devidamente cadastrada no programa In Mais através do site www.inmais.com.br, ou através de qualquer outra plataforma disponibilizada pelo Programa. Ao realizar seu cadastro, o participante deve incluir seus dados de forma correta, completa e concordar com as regras estabelecidas neste Regulamento, formalizando o aceite através da efetivação do cadastro no programa.</p>'
                                            +'<p>1.2. PONTOS IN MAIS: Ou Ponto(s), pode ser acumulado pelo Participante a partir de sua inscrição no Programa com a devida aceitação dos termos deste Regulamento. É a unidade de medida utilizada para apurar o Acúmulo de pontos adquiridos nos Parceiros de Acúmulo e a utilização nos Parceiros de Resgate. Todos os pontos são gerenciados na Conta do Participante. Um ponto In Mais possui o valor monetário de R$ 0,01 (um centavo de Real).</p>'
                                            +'<p>1.3. CONTA IN MAIS: A Conta In Mais ou conta, agrupa todas as informações do Participante, assim como reúne os pontos adquiridos em todos os PARCEIROS DE ACÚMULO, inclusive, saldo extrato, validade dos pontos, pontos expirados, podendo ser acompanhada através do site do In Mais.</p>'
                                            +'<p>1.4. PARCEIROS DE ACÚMULO: São empresas (Pessoas Jurídicas) não vinculadas entre si que possuem, cada uma, programas de relacionamentos próprios, com regulamentos e termos próprios, sem qualquer gestão ou interferência do IN MAIS, que concedem pontos IN MAIS aos participantes de seus programas ou permitem que eles façam a opção de transferência de seus pontos acumulados em seu programa privado para o PROGRAMA IN MAIS.</p>'
                                            +'<p>1.5. PARCEIROS DE RESGATE: São empresas (Pessoas Jurídicas) que ofertam seus produtos e/ ou serviços aos PARTICIPANTES, para que estes possam trocar os PONTOS IN MAIS acumulados na plataforma do PROGRAMA IN MAIS.</p>'
                                            +'<p>1.6. PARCEIROS DE COMPRA: São empresas (Pessoas Jurídicas) que ofertam seus produtos e/ ou serviços aos PARTICIPANTES, para que estes possam comprar produtos e/ou serviços em suas plataformas, e pagar através do meio de pagamento disponibilizado pelo Parceiro de Compra e pagamento a ser efetuado ao Parceiro. Os valores apresentados podem ser até 40% abaixo dos praticados pelo varejo.</p>'
                                            }
                                        ]},
                                        {field: [
                                            {value: '<h5>2. ADESÃO AO PROGRAMA IN MAIS</h5>'
                                            +'<p>2.1. O programa In Mais é de livre adesão a qualquer pessoa física que possua um CPF (Cadastro de Pessoas Físicas do Ministério da Fazenda) próprio e válido, que efetuar o cadastro no programa através do site www.inmais.com.br , ou qualquer plataforma disponibilizada e devidamente habilitada pelo Programa.</p>'
                                            +'<p>2.2. Apenas pessoas físicas podem se associar ao programa In Mais. Caso haja transferência de pontos de uma Pessoa Jurídica do PARCEIRO DE ACÚMULO, este deve indicar a pessoa física responsável que receberá os pontos no Programa In Mais.</p>'
                                            +'<p>2.3. O interessado em participar do programa deve efetuar seu cadastro conforme solicitado pelo Programa In Mais, incluindo todos os dados e é o único responsável pela veracidade e integridade de todas as informações apresentadas ao Programa, tendo o dever de atualiza-las, em especial os dados cadastrais como, nome, CPF, e-mail, endereço e telefone para contato.</p>'
                                            +'<p>2.4. Ao aderir ao Programa, os Participantes devem conhecer e analisar previamente este Regulamento, decidindo sobre sua participação no programa In Mais, e ao realizar seu cadastro o Participante irá aderir a todos as regras e condições aqui estipuladas, não podendo alegar desconhecimento de seu inteiro teor, assim como sua aceitação incontestável. </p>'
                                            +'<p>2.5. Havendo qualquer indício identificado pelo Programa In Mais de fraude ou irregularidade no cadastro, o Participante pode ter sua conta impedida de cadastramento ou excluída e seus pontos cancelados, sem possibilidade de estorno.</p>'
                                            +'<p>2.6. Caso o Participante efetue o cadastramento no Programa com CPF de terceiros, a conta será cancelada e seus pontos excluídos.</p>'
                                            +'<p>2.7. O Participante somente poderá manter uma única Conta no Programa e esta ficará vinculada ao seu número de CPF. Qualquer conta duplicada será cancelada e os pontos adquiridos excluídos. </p>'
                                            +'<p>2.8. A participação do Programa In Mais é gratuita, assim como sua adesão. </p>'
                                            +'<p>2.9. A adesão do Participante ao Programa In Mais requer, necessariamente, aceitação deste regulamento na efetivação do cadastro. Após preenchimento dos dados e efetivação do cadastro, o participante receberá uma senha de acesso. O login no sistema sempre será seu CPF. Com login e senha o Participante poderá ter acesso a sua conta In Mais localizada em ambiente seguro dentro da plataforma In Mais. </p>'
                                            +'<p>2.10. Não havendo concordância com os termos deste Regulamento o Participante não poderá efetuar o cadastro do Programa In Mais.</p>'
                                            +'<p>2.11. Os dados, informações e senhas da Conta In Mais são pessoais e intransferíveis, devendo o Participante mantê-los sob sua responsabilidade e sigilo, não as divulgando, fornecendo ou compartilhando. O acesso ou utilização dos pontos de Participante de forma indevida por terceiros, são de responsabilidade exclusiva do Participante, assim como é responsável pelo acesso negligente à Conta In Mais realizado por meio de computadores e/ou em ambientes eletrônicos não seguros, suspeitos, compartilhados, ou quaisquer outros que possam representar riscos à transação ou facilitar a incidência de fraudes.</p>'
                                            +'<p>2.12. A alteração da senha de acesso pode ser efetuada pelo Participante, a qualquer tempo,mediante solicitação no site do Programa.</p>'
                                            }
                                        ]},
                                        {field: [
                                            {value: '<h5>3. O PONTO IN MAIS</h5>'
                                            +'<p>3.1. A validade dos Pontos In Mais é de 2 (dois) anos, a partir da data de sua aquisição, qual seja, o lançamento dos pontos na conta do Participante. Ao utilizar seus pontos In Mais, o Programa sempre debitará os pontos mais antigos para os mais recentes.</p>'
                                            +'<p>3.2. O Programa In Mais disponibiliza três formas de utilização dos Pontos adquiridos, sendo elas:'
                                            +'<p>3.2.1. Conversão dos pontos em valores monetários e transferência para uma conta bancária de titularidade exclusivamente do Participante;</p>'
                                            +'<p>3.2.2. Conversão dos Pontos em valores monetários e crédito em um cartão pré-pago In Mais;</p>'
                                            +'<p>3.2.3. Resgate de produtos e serviços nos Parceiros de Resgate cadastrados no Programa;</p>'
                                            +'<p>3.3. O Participante poderá cadastrar até 2 (duas) contas bancárias, sendo conta corrente ou poupança, mediante aceitação dos termos e regulamentos para transferências. </p>'
                                            +'<p>3.4. Ao solicitar a conversão de seus Pontos em valores monetários, o Participante indicará a quantidade de pontos que deseja converter. Esta opção de resgate de pontos sempre será tarifada em 750 (Setecentos e cinquenta) pontos In Mais. Caso a conta bancária cadastrada ou o cartão pré-pago esteja em nome de terceiros, cancelados, bloqueados ou possuam algum impedimento no momento da transferência ou do crédito no cartão, o crédito não será realizado e a tarifa será debitada da conta In Mais do Participante, sem possibilidade de entorno, porém os pontos transferidos serão devolvidos ao Participante.</p>'
                                            +'<p>3.5. Somente serão permitidas transferências os bancos disponibilizados pelo Programa In Mais;</p>'
                                            +'<p>3.6. Somente serão permitidos créditos em cartões pré-pagos emitidos pelo In Mais.</p>'
                                            +'<p>3.7. Caso o Participante já possua algum cartão com a bandeira In Mais, poderá solicitar a inclusão em sua lista de cartões. O In Mais analisará a possibilidade de inclusão na conta do Participante e, se aceito, cadastrará o cartão no Programa. A análise de cada solicitação é efetuada exclusivamente pelo In Mais e sob critérios internos. </p>'
                                            +'<p>3.8. Os Pontos In Mais são pessoais e intransferíveis, sendo vedada a sua cessão a terceiros, a qualquer título, inclusive por sucessão ou herança. Caso o Participante faleça, sua Conta será finalizada e os Pontos acumulados serão cancelados.</p>'
                                            +'<p>3.9. É expressamente proibida a negociação pelo Participante dos Pontos In Mais, incluindo, mas não se limitando à sua compra, venda, cessão ou permuta. Havendo comprovação de tais práticas acorrerá a imediata exclusão do Participante no Programa e o cancelamento de seus Pontos, independentemente de serem tomadas as medidas civis e criminais cabíveis. </p>'
                                            }
                                        ]},
                                        {field: [
                                            {value: '<h5>4. COMO JUNTAR E RESGATAR PONTOS IN MAIS</h5>'
                                            +'<p>4.1. O Participante poderá juntar pontos In Mais transferindo pontos dos Parceiros de Acúmulo para o In Mais e Comprar produtos nos Parceiros de Compra. </p>'
                                            +'<p>4.2. O Crédito de Pontos ao participante através de sua Conta In mais ocorrerá em até 60 (sessenta) dias corridos após o envio do arquivo do Parceiro. </p>'
                                            +'<p>4.3. Havendo divergência entre os pontos acumulados no Parceiro e a quantidade de pontos creditado no Programa In Mais, o Participante deve entrar em contato com o Parceiro de Acúmulo. </p>'
                                            +'<p>4.4. A utilização dos pontos In Mais deve ser efetuada através de um das formas listada na cláusula 3.2.</p>'
                                            +'<p>4.5. Os Parceiros de Resgate para utilização dos Pontos In Mais devem estar devidamente cadastrados na Plataforma e o Participante poderá verificar a regra de resgate de cada parceiro na página do Parceiro dentro do site In Mais.</p>'
                                            }
                                        ]},
                                        {field: [
                                            {value: '<h5>5. COMPRA DE PRODUTOS</h5>'
                                            +'<p>5.1. Poderá o Participante comprar produtos na plataforma In Mais através dos Parceiros de Compra.</p>'
                                            +'<p>5.2. Os Produtos ofertados pelos Parceiros podem ter até 40% de desconto se comparados ao preço de varejo.</p>'
                                            +'<p>5.3. Nas compras realizadas conforme previsto neste Regulamento, o Participante receberá Pontos In Mais de acordo com a política de cada Parceiro.</p>'
                                            +'<p>5.4. Os produtos e/ou serviços disponibilizados pelos Parceiros devem ser adquiridos na plataforma do Parceiro, porém através do site do In Mais.</p>'
                                            +'<p>5.5. As compras efetuadas diretamente nos sites do Parceiro, sem o devido acesso através do site In Mais, não receberão Pontos In Mais.</p>'
                                            +'<p>5.6. As compras efetuadas nos Parceiros seguem as regras, prazos, meios e regulamentos dos Parceiros, não havendo nenhuma relação com o In Mais.</p>'
                                            +'<p>5.7. Os Pontos adquiridos através de compras em Parceiros serão creditados conforme item 4 deste Regulamento.</p>'
                                            }
                                        ]},
                                        {field: [
                                            {value: '<h5>6. DISPOSIÇÕES GERAIS:</h5>'
                                            +'<p>6.1. O In Mais poderá, a qualquer tempo, incluir, excluir ou modificar os Parceiros de Acúmulo e/ou de Resgate, independentemente da anuência dos Participantes.</p>'
                                            +'<p>6.2. O Regulamento do Programa In Mais poderá ser alterado, a qualquer tempo, independentemente da anuência dos Participantes.</p>'
                                            +'<p>6.3 Casos não omissos e não previstos neste regulamento, serão decididos, exclusivamente pelo In Mais.</p>'
                                            +'<p>6.4 Lei aplicável. Este Regulamento será regido e interpretado de acordo com a legislação brasileira. </p>'
                                            +'<p>São Paulo, 17 de outubro de 2014. <br/><br/><br/>IN MAIS MARKETING LTDA.</li>'
                                            }
                                        ]},
                                    ]
                                },                                
                            },                            
                        ]
                    },      
                ],

                //INFORMAÇÕES DE CONTATO
                infocontato: {id: 'info-contato', tpl:'tpl-inner',                    
                    lineValue: '<p><strong>Em caso de dúvidas, entre em contato conosco.</strong><br/>'
                    + '(61) 3364-0005 | (11) 2306-4392<br/>'
                    +'<a href="mailto:contato@inmais.com.br" target="_blank">contato@inmais.com.br</a><br/>'
                    +'Ou acesse a página <a href="{contato}" class="btn btn-link inline">Fale Conosco</a></p>'
                }
            },
            banners: {                
            },
            modals: {
                //MODAL - ESQUECI A SENHA
                password: {
                    ctrl: 'modalDefaultCtrl',
                    size: 'sm',
                    content: {tpl: 'tpl-form', classe: 'password', modal: true,
                        header: {
                            title: {classe: 'text-center', text: 'Esqueci minha senha'}
                        },
                        btns: [
                            {name: 'save', title: 'Enviar', visibled: true, classe: 'btn-primary',
                                service: {
                                    send: {url: 'esquecisenha/save'},
                                }, 
                            },
                        ],
                        msg: {
                            success: 'E-mail enviado com sucesso!', error: 'E-mail não enviado. Por favor, Tenta novamente!'
                        },
                        detail: [
                            {classe: 'titleBorderNn', 
                                title: {
                                    description: { classe: 'text-center', text: 'Insira o seu e-mail cadastrado e enviaremos sua senha.'}
                                },
                                form: [
                                    {
                                        style: 'inline',
                                        campos: [
                                            {nameTpl: 'input', type: 'email', name:'txemail', id: 'txemail', labelName: 'Email:', required: true, size: 12, inputSize: 9, labelSize: 2},
                                        ]
                                    },                                       
                                ]
                            }
                        ]
                    }
                },

                //MODAL - REGULAMENTO
                regulamento: {
                    ctrl: 'modalDefaultCtrl',
                    size: 'md',
                    content: {tpl: 'tpl-form', classe: 'modalRegulamento', modal: true,
                        header: {
                            title: {classe: 'text-left', text: 'REGULAMENTO PROGRAMA IN MAIS'}
                        },
                        detail: [
                            {insertpartials: ['regulamento']}
                        ]
                    }
                },

                //MODAL - CONFIRMAÇÃO DE EXCLUSÃO
                excluir: {
                    ctrl: 'modalDefaultCtrl',
                    size: 'md',
                    content: {tpl: 'tpl-text', classe: 'excluircontas', title: 'Excluir conta cadastrada', icon: 'fa fa-trash-o',
                        btns: [
                            {name: 'delet', title: 'Sim', visibled: true, classe: 'btn-red', openmodal:true, url: 'dadoscredito',
                                service: {
                                    delet: {url: 'dadoscredito/delete', captureparameter:'objClicked', parameter: 'cdDadosCredito', dataconstruct: true,
                                    reload: [
                                        {place: 'main', id: 'page-contasCadastrada', idContent: 'table-contasCadastrada'},
                                    ]}
                                }
                            },
                            {name: 'closeModal', title: 'Não', visibled: true, classe: 'btn-tertiary', openmodal:true,},
                            
                        ],
                        texts: [
                            {tpl:'tpl-inner', classinner: 'text-center', lineValue: 'Deseja realmente excluir?'}
                        ]
                    }
                },

                //MODAL - CONFIRMACAO DE RESGATE
                resgateconfirm: {
                    ctrl: 'modalDefaultCtrl',
                    size: 'md',
                    content: {tpl: 'tpl-form', classe: 'modalResgate', modal: true,
                        header: {
                            title: {classe: 'text-center', text: 'Resumo do Resgate'}
                        },
                        btns: [
                            {name: 'closeModal', title: 'Cancelar', visibled: true, classe: 'btn-red', openmodal:true,},
                            {name: 'save', title: 'Confirmar', saveAfterForm: true, issaveform:true, visibled: true, classe: 'btn-primary', url: 'resgatefinish', openmodal:true,
                                service: {
                                    //send: {notsave: true, saveparameter: ['all']},
                                    send: {url: 'finalizaresgate/save/', parameter: 'idUsuario', personreload: true},
                                },
                            },
                        ],
                        detail: [
                            {classe:'bg-form', form: [
                                {
                                    style: 'inline',
                                    campos: [
                                        {nameTpl: 'inputtext', type:'text', classe:'inputtext', name:'nomePremio', id: 'nomePremio', captureparameter:'formsaved', parameter: 'nomePremio', labelName: 'Produto Selecionado', size: 12, inputSize: 7, labelSize: 5,},
                                    ]
                                },
                                {
                                    style: 'inline',
                                    campos: [
                                        {nameTpl: 'inputtext', classe:'inputtext', type: 'pontos', name:'qtdade', id: 'qtdade', captureparameter:'formsaved', parameter: 'qtdade', addParamsResult: true, noClearResult: true, size: 12, inputSize: 7, labelSize: 5,},
                                    ]
                                },
                                
                                {
                                    style: 'inline',
                                    campos: [
                                        {nameTpl: 'inputtext', type:'pontos', classe:'inputtext', name:'qtpon', id: 'qtpon', captureparameter:'formsaved', parameter: 'qtpon', addParamsResult: true, noClearResult: true, size: 12, inputSize: 7, labelSize: 5},
                                    ]
                                },
                                {
                                    style: 'inline',
                                    campos: [
                                        {nameTpl: 'inputtext', type:'moeda', symbol: 'R$', classe:'inputtext', name:'qtpremio_total', id: 'qtpremio_total', captureparameter:'formsaved', parameter: 'qtpremio_total', addParamsResult: true, noClearResult: true, size: 12, inputSize: 7, labelSize: 5},
                                    ]
                                },
                                {
                                    style: 'inline col-md-12 box-scroll',
                                    campos: [
                                        {nameTpl: 'inputtext', name:'textoCondicaoEntrega', id: 'textoCondicaoEntrega', classe:'listRegulamento', captureparameter:'formsaved', parameter: 'textoCondicaoEntrega', hidden: false, ignoresave: true, labelHide: true,  size: 12, inputSize: 12,
                                            conditionalShow: {parameter: 'lineValue', hide : ['textoCondicaoEntrega', 'flagcondicaoEntrega']},
                                        },
                                    ]
                                }, 
                                {
                                    style: 'inline col-md-12',
                                    campos: [
                                        {nameTpl: 'radio', type: 'checkbox', name:'flagcondicaoEntrega', id: 'flagcondicaoEntrega', labelName: 'Li e concordo com as condições de entrega.', required: true, size: 12, inputSize: 12, labelSize: 0, ignoresave: true,},
                                    ]
                                },                                
                            ]}
                        ]
                    }
                },

                //MODAL - PERGUNTA CARTAO RESGATE
                resgatecartao: {
                    ctrl: 'modalDefaultCtrl',
                    size: 'sm',
                    content: {tpl: 'tpl-form', classe: 'modalResgateCartao', modal: true,
                        header: {
                            title: {classe: 'text-center', text: 'Solicitação de novo cartão'}
                        },
                        btns: [
                            {name: 'closeModal', title: 'Não', visibled: true, classe: 'btn-primary', openmodal:true, url: 'return'},
                            {name: 'closeModal', title: 'Sim', visibled: true, classe: 'btn-tertiary', openmodal:true,},
                        ],
                        detail: [
                            {classe:'bg-form', form: [
                                {
                                    style: 'inline',
                                    campos: [
                                        {nameTpl: 'inputtext', type:'text', classe:'inputtext', name:'pergunta', id: 'pergunta', captureparameter:'formsaved', parameter: 'pergunta', labelHide: true, size: 12, inputSize: 12,},                                        
                                    ]
                                },
                            ]}
                        ]
                    }
                },

                //MODAL - RESGATE EDETUADO
                resgatefinish: {
                    ctrl: 'modalDefaultCtrl',
                    size: 'sm',
                    content: {tpl: 'tpl-form', classe: 'modalResgateFinalizado', modal: true,
                        header: {
                            title: {classe: 'text-center', text: 'Resgate efetuado'}
                        },
                        btns: [
                            {name: 'closeModal', title: 'Fechar', visibled: true, classe: 'btn-primary', openmodal:true, url: 'resgate'},
                        ],
                        detail: [
                            {classe:'bg-form', form: [
                                {
                                    style: 'inline',
                                    campos: [
                                        {nameTpl: 'inputtext', type:'text', classe:'inputtext', name:'pontos', id: 'pontos', labelName: 'Seu saldo atual é:', lineValue: '<strong>{{$rootScope.user.points.value (pontos)}}</strong> pontos', noclearvalue: true, size: 12, inputSize: 5, labelSize: 6,},                                        
                                    ]
                                },
                            ]}
                        ]
                    }
                },

                //COMPRAS PROMOCIONAIS - VANTAGEM {INICIO}
                //MODAL - CONFIRMACAO DE RESGATE - COMPRAR
                //****MODAL IGUAL A DE 'condicaovantagemresgatar' O QUE MUDA É O VALOR DO PARAMATRO 'cdpremioLog'
                condicaovantagemcomprar: {
                    ctrl: 'modalDefaultCtrl',
                    size: 'md',
                    content: {id:'modal-compraspromocionais-comprar', tpl: 'tpl-form', classe: 'modalComprasPromocionais comprar', modal: true, fieldsInteraction: true,
                        header: {
                            title: {classe: 'text-center', text: 'Condição de Entrega'}
                        },
                        btns: [
                            {name: 'closeModal', title: 'Cancelar', visibled: true, classe: 'btn-red'},
                            {name: 'save', title: 'Confirmar', visibled: true, classe: 'btn-primary', msgIgnore: true, /*notcloseModal: true,*/ urlexternal: true, setReturnUrl: 'url'},
                        ],
                        formdisabled: {
                            btns: [{name: 'save', parameter: 'flagcondicaoEntrega', captureObj: 'this', parametervalue: false}]
                        },
                        service: {
                            send: {url: 'compraspromocionais/save'},
                            call: {objresult: 'load', urls: [
                                {url: 'logpremio/find/', setparamObj: true, parameter: 'comprar'}
                            ]},
                        },
                        detail: [
                            {classe:'bg-form', form: [
                                {
                                    style: 'inline',
                                    campos: [
                                        {nameTpl: 'inputtext', type:'text', classeContent:'inputtext', name:'alias', id: 'alias', parameterclicked: true, parameter: 'alias', ignoresave: true, labelHide: true, size: 12, inputSize: 12},
                                        {nameTpl: 'input', type: 'hidden', name:'cpf', id: 'cpf', captureparameter:'user', parameter: 'idUsuario', labelHide: true, required: true, size: 0, inputSize: 0, labelSize: 0},
                                        {nameTpl: 'input', type: 'hidden', name:'cdpremioLog', id: 'cdpremioLog', parameterclicked: true, parameter: 'params', nameparams: 'comprar', labelHide: true, required: false, size: 0, inputSize: 0, labelSize: 0},                                        
                                    ]
                                },
                                {
                                    style: 'inline col-md-12 box-scroll',
                                    campos: [
                                        {nameTpl: 'inputtext', name:'textoCondicao906COMP', id: 'textoCondicao906COMP', classe:'listRegulamento', parameterclicked: true, parameter: 'params', nameparams: 'textoCondicao906COMP', ignoresave: true, hidden: false, labelHide: true,  size: 12, inputSize: 12,
                                            conditionalShow: {parameter: 'value', hide : ['textoCondicao906COMP', 'flagcondicaoEntrega']},
                                        },
                                    ]
                                },
                                {
                                    style: 'inline col-md-12',
                                    campos: [
                                        {nameTpl: 'radio', type: 'checkbox', name:'flagcondicaoEntrega', id: 'flagcondicaoEntrega', labelName: 'Li e concordo com as condições de entrega.', ignoresave: true, required: true, size: 12, inputSize: 12, labelSize: 0, ignoresave: true,
                                            obs: 'Após clicar em Confirmar, você será direcionado automaticamente para o site do parceiro.'
                                        },
                                    ]
                                },
                                {
                                    style: 'inline col-md-12',
                                    campos: [
                                        {nameTpl: 'inner', id: 'aviso', name:'aviso', classinner: 'aviso', ignoresave: true, noclearvalue: true, lineValue: 'Após clicar em Confirmar, você será direcionado automaticamente para o site do parceiro.'},
                                    ]
                                },

                            ]}
                        ]
                    }
                },

                //MODAL - CONFIRMACAO DE RESGATE - RESGATAR
                //****MODAL IGUAL A DE 'condicaovantagemcomprar' O QUE MUDA É O VALOR DO PARAMATRO 'cdpremioLog'
                condicaovantagemresgatar: {
                    ctrl: 'modalDefaultCtrl',
                    size: 'md',
                    content: {id:'modal-compraspromocionais-resgatar', tpl: 'tpl-form', classe: 'modalComprasPromocionais resgatar', modal: true, fieldsInteraction: true,
                        header: {
                            title: {classe: 'text-center', text: 'Condição de Entrega'}
                        },
                        btns: [
                            {name: 'closeModal', title: 'Cancelar', visibled: true, classe: 'btn-red'},
                            {name: 'save', title: 'Confirmar', visibled: true, classe: 'btn-primary', msgIgnore: true, /*notcloseModal: true,*/ urlexternal: true, setReturnUrl: 'url'},
                        ],
                        formdisabled: {
                            btns: [{name: 'save', parameter: 'flagcondicaoEntrega', captureObj: 'this', parametervalue: false}]
                        },
                        service: {
                            send: {url: 'compraspromocionais/save'},
                            call: {objresult: 'load', urls: [
                                {url: 'logpremio/find/', setparamObj: true, parameter: 'resgatar'}
                            ]},
                        },
                        detail: [
                            {classe:'bg-form', form: [
                                {
                                    style: 'inline',
                                    campos: [
                                        {nameTpl: 'inputtext', type:'text', classeContent:'inputtext', name:'alias', id: 'alias', parameterclicked: true, parameter: 'alias', ignoresave: true, labelHide: true, size: 12, inputSize: 12},
                                        {nameTpl: 'input', type: 'hidden', name:'cpf', id: 'cpf', captureparameter:'user', parameter: 'idUsuario', labelHide: true, required: true, size: 0, inputSize: 0, labelSize: 0},
                                        {nameTpl: 'input', type: 'hidden', name:'cdpremioLog', id: 'cdpremioLog', parameterclicked: true, parameter: 'params', nameparams: 'resgatar', labelHide: true, required: false, size: 0, inputSize: 0, labelSize: 0},                                        
                                    ]
                                },
                                {
                                    style: 'inline col-md-12 box-scroll',
                                    campos: [
                                        {nameTpl: 'inputtext', name:'textoCondicao906RESG', id: 'textoCondicao906RESG', classe:'listRegulamento', parameterclicked: true, parameter: 'params', nameparams: 'textoCondicao906RESG', ignoresave: true, hidden: false, labelHide: true,  size: 12, inputSize: 12,
                                            conditionalShow: {parameter: 'value', hide : ['textoCondicao906RESG', 'flagcondicaoEntrega']},
                                        },
                                    ]
                                },
                                {
                                    style: 'inline col-md-12',
                                    campos: [
                                        {nameTpl: 'radio', type: 'checkbox', name:'flagcondicaoEntrega', id: 'flagcondicaoEntrega', labelName: 'Li e concordo com as condições de entrega.', ignoresave: true, required: true, size: 12, inputSize: 12, labelSize: 0, ignoresave: true,
                                            obs: 'Após clicar em Confirmar, você será direcionado automaticamente para o site do parceiro.'
                                        },
                                    ]
                                },
                                {
                                    style: 'inline col-md-12',
                                    campos: [
                                        {nameTpl: 'inner', id: 'aviso', name: 'aviso', classinner: 'aviso', ignoresave: true, noclearvalue: true, lineValue: 'Após clicar em Confirmar, você será direcionado automaticamente para o site do parceiro.'},
                                    ]
                                },

                            ]}
                        ]
                    }
                    //COMPRAS PROMOCIONAIS - VANTAGEM {FIM}
                },
            },
            pages: {
                login: {
                    classe: 'pagLogin',
                    hide: {
                        //header: true,
                        headerlogin: true,
                        //footer: true,
                    },
                    content: {id: 'box-login', tpl: 'tpl-form', classe: 'box box-default form login', 
                        header: {
                            title: {classe: 'text-center', text: 'Seja bem vindo(a) ao <strong>In Mais</strong>'}
                        },
                        btns: [
                            {title: 'Entrar', type: 'submit', func: 'login', classe:"btn-primary", visibled: true, url: 'index'},
                            {title: 'Cadastre-se', classe:"btn-default", url: 'cadastro', visibled: true},
                            {title: 'Esqueci a senha', classe:"btn-link", url: 'password', visibled: true, openmodal: true}
                        ],
                        detail: [
                            {classe: 'titleBorderNn', 
                                title: {text: 'Login', 
                                    description: { classe: 'text-left', text: 'Insira seu login e sua senha para entrar.'}
                                },
                                form: [
                                    {
                                        style: 'inline',
                                        campos: [
                                            {nameTpl: 'input', type: 'text', name:'userName', id: 'userName', mask: '999.999.999-99', labelName: 'Login:', required: true, size: 12, inputSize: 8, labelSize: 3},
                                        ]
                                    },
                                    {
                                        style: 'inline',
                                        campos: [
                                            {nameTpl: 'input', type: 'password', name:'passwd', id: 'passwd', labelName: 'Senha:', required: true, size: 12, inputSize: 8, labelSize: 3},
                                        ]
                                    },                                       
                                ]
                            }
                        ]
                    },
                    pages:{
                        sicoob:{
                            classe: 'pagLogin',
                            title: 'Login Sicoob',
                            setPagLogin: 'loginSicoob',
                            redirectauth: 'perfil',
                            redirectlogin: 'perfil',
                            hide: {
                                //header: true,
                                headerlogin: true,
                                //footer: true,
                            },
                            content: {tpl: 'tpl-page-texts', classe: 'login-sicoob',
                                detail: [
                                    {id: 'box-login', tpl: 'tpl-form', classe: 'box box-default form login', 
                                        header: {
                                            title: {classe: 'text-center', text: 'Seja bem vindo(a) ao <strong>In Mais</strong>'}
                                        },
                                        btns: [
                                            {title: 'Entrar', type: 'submit', func: 'login', classe:"btn-primary", visibled: true, url: 'index'},
                                            //{title: 'Cadastre-se', classe:"btn-default", url: 'cadastro', visibled: true},
                                            //{title: 'Primeiro acesso', classe:"btn-default first-access", url: 'primeiroacesso', visibled: true},
                                            {title: 'Esqueci a senha', classe:"btn-link", url: 'password', visibled: true, openmodal: true}
                                        ],
                                        detail: [
                                            {classe: 'titleBorderNn', 
                                                title: {text: 'Login', 
                                                    description: { classe: 'text-left', text: 'Insira seu login e sua senha para entrar.'}
                                                },
                                                form: [
                                                    {
                                                        style: 'inline',
                                                        campos: [
                                                            {nameTpl: 'input', type: 'text', name:'userName', id: 'userName', mask: '999.999.999-99', labelName: 'Login:', required: true, size: 12, inputSize: 8, labelSize: 3},
                                                        ]
                                                    },
                                                    {
                                                        style: 'inline',
                                                        campos: [
                                                            {nameTpl: 'input', type: 'password', name:'passwd', id: 'passwd', labelName: 'Senha:', required: true, size: 12, inputSize: 8, labelSize: 3},
                                                        ]
                                                    },                                       
                                                ]
                                            },
                                        ],
                                    },

                                    {classe: 'col-md-12 banners',
                                        id: 'carrousel-sicoob', tpl: 'tpl-carousel', type:'2', contentClass: 'carrousel', speed: 3500, autoplay: true,
                                        result: {                                                
                                            line: [
                                                {
                                                    field: [
                                                        {titleLink: 'teste', image: 'assets/images/sicoob/banner1.jpg'},
                                                        {titleLink: 'teste2', image: 'assets/images/sicoob/banner1.jpg'},
                                                        {titleLink: 'teste3', image: 'assets/images/sicoob/banner1.jpg'},
                                                ]},                                                
                                            ]
                                        },                                        
                                    }
                                ]
                            },                            
                        }   
                    }

                },                
                index: {
                    classe: 'pagExternal',
                    //content: {tpl: 'tpl-page-external', iframe: true, class: 'externalIndex', url:'pages/home.html'}
                    content: {tpl: 'tpl-page-external', iframe: true, name:'iframe-index', classe: 'externalIndex', url:'/wordpress'}
                },
                external: {
                    institucional: {
                        classe: 'pagExternal',
                        content: {tpl: 'tpl-page-external', iframe: true, name:'iframe-institucional', classe: 'externalInstitucional', url:'/wordpress/institucional'}
                    },
                    comocomprar: {
                        classe: 'pagExternal',
                        content: {tpl: 'tpl-page-external', iframe: true, name:'iframe-comocomprar', classe: 'externalComoComprar', url:'/wordpress/como-comprar'}
                        
                    },
                    comousarpontos: {
                        classe: 'pagExternal',
                        content: {tpl: 'tpl-page-external', iframe: true, name:'iframe-comousarpontos', classe: 'externalComoUsarPontos', url:'/wordpress/como-usar-seus-pontos'}
                    },
                    comojuntarpontos: {
                        classe: 'pagExternal',
                        content: {tpl: 'tpl-page-external', iframe: true, name:'iframe-comojuntarpontos', classe: 'externalComoJuntarPontos', url:'/wordpress/como-juntar-pontos'}
                    },
                    parceiros: {
                        classe: 'pagExternal',
                        content: {tpl: 'tpl-page-external', iframe: true, name:'iframe-parceiros', classe: 'externalParceiros', url:'/wordpress/parceiros'}
                    },
                    perguntasfrequentes: {
                        classe: 'pagExternal',
                        content: {tpl: 'tpl-page-external', iframe: true, name:'iframe-perguntasfrequentes', classe: 'externalPerguntasfrequentes', url:'/wordpress/perguntas_frequentes/sobre-o-in-mais'}
                    }

                },

                //CONTATO EXTERNO
                contato:{
                    classe: 'pagExternal',
                        content: {tpl: 'tpl-page-external', iframe: true, name:'iframe-contato', classe: 'externalContato', url:'/wordpress/contato'}
                },

                //CONTANTO INTERNO
                /*contato: {
                    classe: 'pagContato',
                    nav: ['navinterno'],
                    title: 'Fale Conosco',
                    content: {tpl: 'tpl-form', classe: 'contato',
                        header: {
                            title: {text: 'Fale conosco'}
                        },
                        btns: [
                            {name: 'save', title: 'Enviar', visibled: true, classe: 'btn-primary', clearform: true},
                        ],
                        service: {
                            call: {url: 'faleconosco/find/', objresult: 'load', parameter: '0'}, 
                            send: {url: 'faleconosco/save'},
                        }, 
                        msg: {
                            success: 'Obrigado por sua mensagem. Responderemos em breve!'
                        },
                        detail: [
                            {
                                title: {
                                    description: {text: 'Em caso de dúvidas entre em contato pelo telefone <strong>(61) 3364-0005</strong> ou preencha os campos abaixo e aguarde que em breve entraremos em contato'}
                                },
                                form: [
                                    {
                                        style: 'inline',
                                        campos: [
                                            {nameTpl: 'input', type: 'text', name:'nome', id: 'nome', labelName: 'Nome:', required: true, size: 12, inputSize: 9, labelSize: 3},
                                        ]
                                    },
                                    {
                                        style: 'inline',
                                        campos: [
                                            {nameTpl: 'input', type: 'email', name:'txemail', id: 'txemail', labelName: 'Email:', required: true, size: 12, inputSize: 5, labelSize: 3},
                                        ]
                                    },
                                    {
                                        style: 'inline',
                                        campos: [
                                            {nameTpl: 'select', type: 'select', name:'cdassunto', id: 'cdassunto', labelName: 'Assunto:', required: true, size: 12, inputSize: 5, labelSize: 3}
                                        ]
                                    },
                                    {
                                        style: 'inline',
                                        campos: [
                                            {nameTpl: 'textarea', name:'mensagem', id: 'mensagem', labelName: 'Mensagem:', maxlength: '500', required: true, size: 12, inputSize: 9, labelSize: 3, row: 5},
                                        ]
                                    },                                        
                                ]
                            }
                        ]
                    }
                },*/

                cadastro: {
                    classe: 'pagCadastro',
                    //redirectlogin: 'minhaconta', // pagina ou not para nao redirecionar - redirect default encontra-se em 'layout.// true ou pagina'
                    redirectauth: 'perfil', // true ou pagina    
                    title: 'Cadastre-se', 

                    content: {tpl: 'tpl-form', classform: 'cadastro',
                        header: {
                            title: {classe: 'text-center', text: 'Formulário de Cadastro',
                                description: {
                                    classe: 'text-left', 
                                    text: 'Preencha o cadastro abaixo para participar da Promoção.'
                                }
                            }
                        },
                        btns: [
                            {name: 'save', title: 'Cadastre-se', visibled: true, classe: 'btn-primary', url: 'cadastroconfirm'},
                        ],
                        service: {
                            call: {url: 'participante/find/', objresult: 'load', parameter: '0'}, 
                            send: {url: 'participante/save', saveparameter: ['email']},
                        },               
                        detail: [
                            {title: {text:'Dados pessoais'},
                                insertpartials: ['dadospessoais'], 
                            },
                            {classe: 'formarReset',
                                form: [
                                    {
                                       style: 'inline',
                                        campos: [
                                            {nameTpl: 'input', type: 'text', name:'cpf', id: 'cpf', labelName: 'CPF:', required: true, size: 12, inputSize: 3, labelSize: 3},
                                        ]
                                    },
                                ]
                            },
                            
                            {title: {text:'Endereço de Correspondência'},
                                insertpartials: ['endereco']
                            },
                            {title: {text:'Dados para contato'},
                                insertpartials: ['contatoexpress']
                            },                          
                            {form: [         
                                /*{
                                    style: 'inline',
                                    campos: [
                                        {nameTpl: 'captcha', type:'captcha', name:'captcha', id: 'captcha', required: true, size: 10, inputSize: 3, labelSize: 3},
                                    ]
                                },*/
                                {
                                    style: 'inline',
                                    campos: [
                                        {nameTpl: 'radio', type: 'checkbox', name:'flagconcordo', id: 'flagconcordo', labelName: 'Declaro que os dados fornecidos estão corretos. Li e concordo com o <a href="{regulamento, modal}" class="btn btn-link inline">regulamento de adesão</a>', required: true, size: 12, inputSize: 12, labelSize: 0},
                                    ]
                                }
                            ]},
                        ]
                    },
                    pages:{
                        confirm:{
                            classe:'pagConfirm',
                            title: 'Cadastre-se',
                            content: {tpl: 'tpl-page-texts', classe: 'col-md-12 confirm',  title: 'Cadastro realizado com sucesso',
                                /*service: {
                                    error: {
                                        urlparametererror: 'cadastro', 
                                    }
                                },*/
                                detail: [
                                    { size: 9, description: '<p><strong>Seu cadastro foi efetuado com sucesso!</strong></p>'
                                    + 'Sua senha de acesso ao programa In Mais será enviada em alguns minutos para o seguinte e-mail cadastrado: <br/> <strong>{{$rootScope.formsaved, email, cadastro}}</strong></p>'
                                    },                            
                                    {classe: 'footer', size: 5, description: '<h6>Pronto!</h6>'
                                    + '<p>Entre agora mesmo no programa e tenha uma experiência de VALOR REAL!</p>',
                                        btn: [
                                            {title: 'Ir para o site', visibled: true, classe: 'btn-primary', url: 'index'},
                                        ], 
                                    },                            
                                ]
                            },
                        },        
                    }
                },
                

                recuperarsenha: {
                    classe: 'pagRecuperarsenha',
                    title: 'Senha',
                    content: {tpl: 'tpl-page-texts', classe: 'recuperar-senha-1',  title: 'Reenvio de Senha', subtitle: 'Preencha os dados abaixo para recuperar sua senha',
                        detail: [
                            {classform: 'bg-form', tpl: 'tpl-form',
                                header: {
                                    title: {classe: 'text-left', text: 'Reenvio de Senha - Passo 1'}
                                },
                                btns: [
                                    {name: 'save', title: 'Continuar', visibled: true, classe: 'btn-primary', url: 'senhaconfirm'},
                                ],
                                service: {
                                    send: {url: '', notsave: true, saveparameter: ['cpf', 'datanascimento']},
                                },
                                detail: [
                                    {form: [
                                            {
                                                style: 'inline',
                                                campos: [
                                                    {nameTpl: 'input', type: 'text', name:'cpf', id: 'cpf', labelName: 'CPF:', required: true, size: 12, inputSize: 5, labelSize: 7},
                                                ]
                                            },
                                            {
                                                style: 'inline',
                                                campos: [
                                                    {nameTpl: 'input', type: 'date', name:'datanascimento', id: 'datanascimento', clearmask: true, labelName: 'Data de Nascimento:', obs: '(dia / mês / ano)', labelName: 'Data de Nascimento:', required: true, size: 12, inputSize: 5, labelSize: 7,}
                                                ]
                                            },   
                                            /*{
                                                style: 'inline',
                                                campos: [
                                                    {nameTpl: 'captcha', name:'captcha', id: 'captcha', required: true, size: 12, inputSize: 12, labelSize: 0},
                                                ]
                                            },*/
                                        ]
                                    }                                    
                                ]
                            },                           
                            {insertpartials: ['infocontato']},
                        ]
                    },                                     
                    pages: {
                        confirm: {
                            classe: 'pagRecuperarsenha',
                            title: 'Senha',
                            content: {tpl: 'tpl-page-texts', classe: 'recuperar-senha-2',
                                detail: [
                                    {classform: 'bg-form', tpl: 'tpl-form',
                                        header: {
                                            title: {classe: 'text-left', text: 'Reenvio de Senha - Passo 2',
                                                description: {
                                                    classe: 'text-left strong', 
                                                    text: 'Confirme seu E-mail.'
                                                }
                                            }
                                        },
                                        btns: [
                                            {name: 'save', title: 'Continuar', visibled: true, classe: 'btn-primary', url: 'senhafinish'},
                                        ],
                                        service: {
                                            call: {objresult: 'load', errordefault: true, urls: [
                                                    {url: 'esquecisenha/find/', captureparameter:'formsaved', parameter: 'cpf'},
                                                    {url: '/data/', captureparameter:'formsaved', parameter: 'datanascimento'},
                                                ],
                                                error: {
                                                    urlparametererror: 'recuperarsenha', 
                                                    hidecontent: true,
                                                },
                                                /*btnserror: [
                                                    {title: 'Retornar', visibled: true, class: 'btn btn-primary', url: 'recuperarsenha'},
                                                ]*/
                                            }, 
                                            send: {url: 'esquecisenha/save'},
                                        },
                                        detail: [
                                            {
                                                title: {
                                                    description: {text: 'Confirme o e-mail para recebimento da nova senha:'}
                                                },
                                                form: [
                                                    {
                                                        style: 'inline',
                                                        campos: [
                                                            {nameTpl: 'inputtext', name:'email', id: 'email', labelName: 'E-mail:', size: 6},
                                                            {nameTpl: 'input', type: 'hidden', name:'cpf', id: 'cpf', labelHide: true, required: false, size: 0, inputSize: 0, labelSize: 0},
                                                            {nameTpl: 'input', type: 'hidden', name:'dataNascimento', labelHide: true, required: false, size: 0, inputSize: 0, labelSize: 0},
                                                        ]
                                                    },
                                                ]
                                            }                                    
                                        ]
                                    },                           
                                    {insertpartials: ['infocontato']},
                                ]
                            },     
                        },                        

                        finish: {
                            classe: 'pagRecuperarsenha',
                            title: 'Senha',
                            content: {tpl: 'tpl-page-texts', classe: 'recuperar-senha-3',  title: 'Reenvio de Senha',
                                detail: [
                                    {classform: 'bg-form', tpl: 'tpl-form',
                                        header: {
                                            title: {classe: 'text-left', text: 'Reenvio de Senha - Concluído',
                                                description: {
                                                    classe: 'text-left strong', 
                                                    text: 'Senha Enviada.'
                                                }
                                            }
                                        },
                                        btns: [
                                            {title: 'Ir para o site', visibled: true, classe: 'btn-primary', url: 'index'},
                                        ],
                                        detail: [
                                            {
                                                title: {
                                                    description: {text: 'A sua senha foi enviada para o endereço de e-mail cadastrado. Você deverá receber a mensagem dentro de alguns minutos.'}
                                                },
                                            }                                            
                                        ]
                                    },                           
                                    {insertpartials: ['infocontato']},
                                ]
                            },     
                        }
                    }
                },

                //MINHA CONTA {INICIO}
                minhaconta: {
                    classe: 'pagMinhaconta',
                    menu: ['menupontos', 'menudados'],
                    nav: ['navinterno'],
                    title: 'Minha Conta',
                    content: {tpl: 'tpl-page-texts', classe: 'minhaconta',  title: 'Visão Geral da Conta', 
                        detail: [
                            {description: '<h4>{{$rootScope.user.apelido}} <br/><a href="{perfil}" class="btn btn-link">atualizar cadastro</a></h4>', 
                            },
                            {tpl: 'tpl-form', classform: 'formInline',
                                service: {
                                    call: {url: 'participante/find/', objresult: 'load', parameter: 'idUsuario'},                                     
                                },
                                detail: [
                                    {form: [
                                            {
                                                style: 'inline',
                                                campos: [
                                                    {nameTpl: 'inputtext', classe:'left-input', name:'email', id: 'email', labelName: 'E-mail:', size: 6},
                                                    {nameTpl: 'inputtext', classe:'left-input', name:'datanascimento', id: 'datanascimento', type:"date", labelName: 'Data de nascimento:', size: 6},
                                                ]
                                            },
                                            {
                                                style: 'inline',
                                                campos: [
                                                    {nameTpl: 'inputtext', classe:'left-input', name:'cpf', id: 'cpf', type: "cpf", labelName: 'CPF:', size: 6},
                                                    {nameTpl: 'inputtext', classe:'left-input', name:'numtelefone', id: 'numtelefone', type: "tel", labelName: 'Telefone:', size: 6},
                                                ]
                                            },
                                        ]
                                    },
                                ]
                            },
                            //QUANDO QUISER CHAMAR UM A UM, MAS FICARA 1 REQUISICAO POR PARAMETRO
                            /*{tpl: 'tpl-inputtext', name:'cpf', id: 'cpf', labelName: 'CPF:', size: 12, inputSize: 5, labelSize: 3,
                                service: {
                                    call: {url: 'find/', objresult: 'load', parameter: 'idUsuario'},                                     
                                }
                            },*/
                            {size: 6, 
                                insertpartials: ['saldoatual'],                                
                            },
                            {size: 6,
                                insertpartials: ['proximospontosvencimento'],
                            },
                            {size: 6,
                                insertpartials: ['ultimoscreditos'],
                            },
                            {size: 6,
                                insertpartials: ['ultimosresgates'],
                            },
                            {tpl: 'tpl-pag-table', classe:'table-primary', 
                                header: {
                                    filter: false,
                                    title: 'Últimos Lançamentos',                                        
                                    btn: [{title: 'ver extrato', classe:"btn-link", url: 'extrato'}]
                                },
                                table: {tpl: 'tpl-table', classe:"tbl",
                                    service: {
                                        call: {url: 'ultimoslancamentos/find/', objresult: 'load', parameter: 'idUsuario'},                                         
                                    },                                    
                                    aditionals: {
                                        footerhidden: true,
                                    },
                                    titles: [
                                        {hidden: true},
                                        {width: '20%'},
                                        {width: '20%'},
                                        {width: '40%'},
                                        {width: '20%'}
                                    ],
                                    body:[{hidden: true}],                                    
                                    footer:[]                                    
                                },                                
                            },
                            
                        ]
                    },
                    pages: {
                        extrato: {
                            menu: ['menupontos', 'menudados'],
                            nav: ['navinterno'],
                            title: 'Minha Conta',
                            classe: 'pagMinhaconta',
                            content: {tpl: 'tpl-page-texts', classe: 'minhacontaExtrato',  title: 'Extrato',
                                detail: [
                                    {size: 6, classe:'taaaa',
                                        insertpartials: ['saldoatual'],                                
                                    },
                                    {size: 6,
                                        insertpartials: ['proximospontosvencimentoextrato'],
                                    },                                    
                                    {tpl: 'tpl-pag-table', classe:'table-primary',
                                        service: {
                                            call: {url: 'filtroperiodo', objresult: 'load',},
                                        },
                                        header: {
                                            title: 'Lançamentos',
                                            filter: {
                                                show: true,  
                                                breadcrumb: {txt: 'Filtro(s) selecionado(s):', visibled: true},
                                                detail: [
                                                    {
                                                        //btn: {name: 'search', type: 'submit', title: 'Buscar', visibled: true, class: 'btn-default'},
                                                        btn: {name: 'filterTable', title: 'Filtrar', visibled: true, classe: 'btn-tertiary'},
                                                        form: [                   
                                                            {
                                                                style: 'horizontal',
                                                                campos: [
                                                                    {nameTpl: 'select', type: 'select', name:'periodo', id: 'periodo', labelName: 'Período:', required: false, size: 6, inputSize: 9, labelSize: 3, haveDefault: true},
                                                                    {nameTpl: 'select', type: 'select', name:'tipoPonto', id: 'tipoPonto', labelName: 'Tipo:', required: false, size: 6, inputSize: 10, labelSize: 2},
                                                                    /*{nameTpl: 'select', type: 'select', name:'tipo', id: 'tipo', labelName: 'Tipo:', required: false, size: 4, inputSize: 9, labelSize: 3,
                                                                        options: {obj: [
                                                                            {id: '0', description: 'Resgate'},
                                                                            {id: '1', description: 'Resgate 2'}
                                                                        ]}
                                                                    },*/
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                ],
                                            },                                       
                                        },
                                        footer: {
                                            pagination: {
                                                url: '/paginacao/',
                                                qtdLines: 10,
                                                btnPagesView: 3,
                                                showNumPages: true,
                                                numPagesTextHidden: true,
                                                firstLastLink: true,
                                                directionLinks: true,
                                                previoustext: '<',
                                                nexttext: '>',
                                                firsttext: '<<',
                                                lasttext: '>>'                                        
                                            }
                                        },
                                        table: {tpl: 'tpl-table', classe:"tbl",
                                            service: {
                                               call: {objresult: 'load', url: 'extrato/find/', parameter: 'idUsuario',
                                                    headerfilter: [
                                                        {url: '/periodo/', parameterFilter: 'periodo', valueDefault:30},
                                                        {url: '/tipoponto/', parameterFilter: 'tipoPonto'},                                                        
                                                    ],
                                                },                                          
                                            },                                    
                                            aditionals: {
                                                footerhidden: true,
                                            },
                                            titles: [
                                                {hidden: true},
                                                {width: '20%'},
                                                {width: '20%'},
                                                {width: '40%'},
                                                {width: '20%'}
                                            ],
                                            body:[
                                                {hidden: true},
                                            ],                                     
                                            footer:[]                                    
                                        },         
                                    },
                                ]
                            }
                        },
                        acompanharesgate: {
                            classe: 'pagMinhaconta',
                            menu: ['menupontos', 'menudados'],
                            nav: ['navinterno'],
                            title: 'Minha Conta',
                            content: {tpl: 'tpl-page-texts', classe: 'minhacontaResgate',  title: 'Acompanhar Resgates', 
                                detail: [
                                    {tpl: 'tpl-pag-table', classe:'table-primary', 
                                        service: {
                                            call: {url: 'filtroperiodo', objresult: 'load',},
                                        },
                                        header: {
                                            filter: {
                                                show: true,  
                                                detail: [
                                                    {
                                                        //btn: {name: 'search', type: 'submit', title: 'Buscar', visibled: true, class: 'btn-default'},
                                                        btn: {name: 'filterTable', title: 'Filtrar', visibled: true, classe: 'btn-tertiary'},
                                                        form: [                   
                                                            {
                                                                style: 'horizontal',
                                                                campos: [
                                                                    {nameTpl: 'select', type: 'select', name:'periodo', id: 'periodo', labelName: 'Período:', required: false, size: 4, inputSize: 9, labelSize: 3, haveDefault: true},
                                                                    /*{nameTpl: 'select', type: 'select', name:'tipo', id: 'tipo', labelName: 'Tipo:', required: false, size: 4, inputSize: 9, labelSize: 3,
                                                                        options: {obj: [
                                                                            {id: '0', description: 'Resgate'},
                                                                            {id: '1', description: 'Resgate 2'}
                                                                        ]}
                                                                    },*/
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                ],
                                            },                                       
                                        },
                                        table: {id: 'tbl-resgate', tpl: 'tpl-table', classe:"tbl",
                                            service: {
                                                call: {objresult: 'load', url: 'acompanharresgates/find/', parameter: 'idUsuario',
                                                    headerfilter: [
                                                        {url: '/periodo/', parameterFilter: 'periodo', valueDefault:30},
                                                    ],
                                                },                                                 
                                            },
                                            aditionals: {
                                                footerhidden: true,
                                            },
                                            titles: [
                                                {width: '20%'},
                                                {width: '20%'},
                                                {width: '40%'},
                                                {width: '20%'}
                                            ],
                                            body:[],                                    
                                            footer:[]                                    
                                        },                                                                  
                                    },                                    
                                ]
                            }
                        },

                        perfil: {
                            classe: 'pagMinhaconta',
                            menu: ['menupontos', 'menudados'],
                            nav: ['navinterno'],
                            title: 'Minha Conta',
                            content: {tpl: 'tpl-form', classform: 'minhacontaperfil', edit: true,
                                header: {
                                    title: {classe: 'text-left', text: 'Dados Pessoais'}
                                },
                                btns: [
                                    {name: 'save', title: 'Salvar', visibled: true, classe: 'btn-primary'},
                                ],
                                service: {
                                    call: {url: 'participante/find/', objresult: 'load', parameter: 'idUsuario'}, 
                                    send: {url: 'participante/save'},
                                },
                                msg: {
                                    success: 'Dados atualizados com sucesso!'
                                },
                                detail: [
                                    {classe: 'titleBorderNn', 
                                        title: {text: 'Dados Pessoais', 
                                            description: { classe: 'text-left', text: 'Mantenha seus dados sempre atualizados'}
                                        },
                                        insertpartials: ['dadospessoais'],
                                    },
                                    {classe: 'formarReset',
                                        form: [
                                            {
                                               style: 'inline',
                                                campos: [
                                                    {nameTpl: 'input', type: 'text', name:'cpf', id: 'cpf', labelName: 'CPF:', disabled: true, required: true, size: 12, inputSize: 3, labelSize: 3},
                                                ]
                                            },
                                        ]
                                    },
                                    {classe: 'titleBorderNn', title: {text:'Endereço de Correspondência'},
                                        insertpartials: ['endereco'],
                                    },
                                    {classe: 'titleBorderNn', title: {text:'Dados para contato'},
                                        insertpartials: ['contatoexpress']
                                    },
                                ]
                            }
                        },
                        
                        dadoscredito: {
                            classe: 'pagMinhaconta',
                            menu: ['menupontos', 'menudados'],
                            nav: ['navinterno'], 
                            title: 'Minha Conta',
                            content: {tpl: 'tpl-page-texts', classe: 'minhacontaCreditos',  title: 'Dados para Créditos', 
                                detail: [
                                    {tpl: 'tpl-pag-table', classe:'table-primary', id: 'page-contasCadastrada',
                                        header: {
                                            filter: false,
                                            title: 'Contas Cadastradas',
                                        },
                                        table: {tpl: 'tpl-table', classe:"tbl", id: 'table-contasCadastrada',
                                            service: {
                                                call: {url: 'dadoscredito/find/', objresult: 'load', parameter: 'idUsuario'},                                         
                                            },                                    
                                            aditionals: {
                                                btnLine: [
                                                    {icon: 'fa fa-trash-o', classe:'excluir', titlelink: 'Excluir', openmodal: true, url: 'excluir', captureobj: true},
                                                    /*{name: 'delete', title: 'Deletar', captureline: true, class: 'btn-link',
                                                        service: {
                                                            delete: {url: 'dadoscredito/delete', parameters: [
                                                                'cdDadosCredito',
                                                            ], reload: [
                                                                {place: 'main', id: 'page-contasCadastrada', idContent: 'table-contasCadastrada'},
                                                            ]}
                                                        }
                                                    },*/
                                                    {icon: 'fa fa-pencil', url: 'addcontacredito', titlelink: 'Editar', captureline: true, formFieldHide: ['flag'],
                                                        viewconditional: [
                                                            { name: 'possoEditar', value: 'false', disabled: true, obs: {captureparameter: ['mensagemPossoEditar'], textparameter: 'mensagemPossoEditar', /*text: 'teste'*/} /*hide: true*/}
                                                        ],
                                                    },                                                    
                                                ],
                                                footerhidden: true,
                                            },
                                            titles: [
                                                {hidden: true},
                                                {width: '20%'},
                                                {width: '20%'},
                                                {width: '40%'},
                                                {hidden: true},
                                                {hidden: true},
                                            ],
                                            body:[
                                                {hidden: true},
                                                {},
                                                {},
                                                {},
                                                {hidden: true},
                                                {hidden: true},
                                            ],                         
                                            footer:[]                                    
                                        }, 
                                        footer: {
                                            content: {tpl: 'tpl-button', classe: 'btn-tertiary', title: 'Adicionar uma conta', inputSize:12, url: 'addcontacredito', captureline: true, ignoreparameter: true, formFieldHide: ['cdDadosCredito'],
                                                obs: '*Limite máximo de contas cadastradas permitidas: <strong>4</strong>', obsSize:12, classinner: 'no-padding',
                                                viewconditional: [
                                                    { name: 'possoCadastrar', value: 'false', searchParameter: 'footer', disabled: true}                                                
                                                ],
                                            }
                                        }                                 
                                    },
                                    {tpl: 'tpl-pag-table', classe:'table-primary', 
                                        header: {
                                            filter: false,
                                            title: 'Cartões Cadastrados',
                                        },
                                        table: {tpl: 'tpl-table', classe:"tbl",
                                            service: {                                                
                                                call: {url: 'cartoesprepago/find/', objresult: 'load', parameter: 'idUsuario'},

                                            },                                    
                                            aditionals: {
                                                footerhidden: true,
                                            },
                                            titles: [
                                                {width: '20%'},
                                                {width: '20%'},
                                                {width: '40%'},
                                                {width: '20%'}
                                            ],
                                            body:[],                                    
                                            footer:[]                                    
                                        },                                                                      
                                        footer: {
                                            content: {tpl: 'tpl-button', classe: 'btn-tertiary', inputSize: 12, title: 'Solicitar um Cartão Pré-pago', url: 'addcartaoprepago'}
                                        }
                                    },                                    
                                ]
                            },
                            pages: {
                                addcontacredito: {
                                    classe: 'pagMinhaconta',
                                    menu: ['menupontos', 'menudados'],
                                    nav: ['navinterno'],
                                    title: 'Minha Conta',
                                    content: {tpl: 'tpl-form', classe: 'addcontacredito', edit: true, removeEditSave: true,
                                        header: {
                                            title: {classe: 'text-left', text: 'Dados para Créditos'}
                                        },
                                        btns: [
                                            {name: 'save', title: 'Salvar', visibled: true, classe: 'btn-primary right', url: 'dadoscredito'},
                                            /*{name: 'delete', title: 'Deletar', visibled: true, class: 'btn-tertiary right', url: 'dadoscredito', 
                                                conditional: [
                                                    { name: 'cdDadosCredito', hide: true}
                                                ],
                                            },*/
                                            {title: 'Excluir', visibled: true, openmodal: true, classe: 'btn-tertiary right', url: 'excluir', captureobj: true,
                                                conditional: [
                                                    { name: 'cdDadosCredito', hide: true}
                                                ],
                                            },
                                            {title: 'Voltar', visibled: true, classe: 'btn-link inline left', url: 'dadoscredito'},
                                        ],
                                        service: {
                                            call: {objresult: 'load', urls: [
                                                    {url: 'dadoscredito/cpf/', parameter: 'idUsuario'},
                                                    {url: '/find/', parameterclicked: true, parameter: 'cdDadosCredito'},
                                                ],
                                            }, 
                                            send: {url: 'dadoscredito/save'},
                                            delet: {url: 'dadoscredito/delete', parameters: ['cdDadosCredito', 'cpf']},
                                            error: {
                                                urlparametererror: 'dadoscredito', 
                                            }
                                        },
                                        formdisabled: {
                                            parameters: [{captureObj: 'objClicked', name: 'cdDadosCredito'}, /*{captureObj: 'user', name: 'cpf'}*/]
                                        },
                                        detail: [
                                            {classe: 'titleBorderNn', 
                                                title: {text: 'Conta Bancária', 
                                                    description: {text: 'Digite abaixo os dados de sua conta bancária. Esses dados serão utilizados para que você possa receber crédito em dinheiro em sua Conta Corrente.'}
                                                },                                            
                                                form: [
                                                    {
                                                        style: 'inline',
                                                        campos: [
                                                            {nameTpl: 'input', type: 'hidden', name:'cdDadosCredito', id: 'cdDadosCredito', captureparameter:'objClicked', /*defaultresult: '0',*/ parameter: 'cdDadosCredito', labelHide: true, required: false, size: 0, inputSize: 0, labelSize: 0},
                                                            {nameTpl: 'input', type: 'hidden', name:'cpfParticipanteLogado', id: 'cpfParticipanteLogado', captureparameter:'user', parameter: 'idUsuario', labelHide: true, required: false, size: 0, inputSize: 0, labelSize: 0},
                                                            {nameTpl: 'input', type: 'text', name:'cpf', id: 'cpf', labelName: 'CPF:', required: true, disabled: true, size: 12, inputSize: 3, labelSize: 2},
                                                        ]
                                                    },
                                                    {
                                                        style: 'inline ',
                                                        campos: [
                                                            {nameTpl: 'select', type: 'select', name:'banco', id: 'banco', labelName: 'Banco:', required: true, size: 12, inputSize: 6, labelSize: 2}
                                                        ]
                                                    },
                                                    {
                                                        style: 'inline',
                                                        campos: [
                                                            {nameTpl: 'input', type: 'number', name:'agencia', id: 'agencia', labelName: 'Agência:', maxlength: 10, required: true, size: 4, inputSize: 6, labelSize: 6},
                                                            {nameTpl: 'input', type: 'number', name:'digitoAgencia', id: 'digitoAgencia', labelName: 'Dígito:', maxlength: 5, size: 3, inputSize: 5, labelSize: 4},
                                                        ]
                                                    },
                                                    {
                                                        style: 'inline',
                                                        campos: [
                                                            {nameTpl: 'input', type: 'number', name:'conta', id: 'conta', labelName: 'Conta:', maxlength: 15, required: true, size: 4, inputSize: 6, labelSize: 6},
                                                             {nameTpl: 'input', type: 'number', name:'digitoConta', id: 'digitoConta', labelName: 'Dígito:', maxlength: 5, size: 3, inputSize: 5, labelSize: 4},
                                                        ]
                                                    },
                                                    /*{
                                                        style: 'inline ',
                                                        campos: [
                                                            {nameTpl: 'select', type: 'select', name:'tipoconta', id: 'tipoconta', labelName: 'Tipo:', required: true, size: 12, inputSize: 3, labelSize: 2,
                                                                options: {obj: [
                                                                    {id: '0', description: 'Tipo conta 1'},
                                                                    {id: '1', description: 'Tipo conta 2'}
                                                                ]}
                                                            }
                                                        ]
                                                    },*/
                                                    {
                                                        style: 'inline',
                                                        campos: [
                                                            {nameTpl: 'radio', type: 'checkbox', name:'flag', id: 'flag', required: true, size: 12, inputSize: 12, labelSize: 0,
                                                            labelName: 'Declaro que os dados fornecidos estão corretos e a conta para crédito está ativa e é de minha responsabilidade.<br/>'
                                                            + 'Li e concordo com as <a href="{regulamento, modal}" class="btn btn-link inline">regras de Cartão Pré-Pago e Crédito em Conta</a>'},
                                                        ]
                                                    }
                                                    
                                                ]                                                                          
                                            },
                                        ]
                                    }
                                },

                                addcartaoprepago: {
                                    classe: 'pagMinhaconta',
                                    menu: ['menupontos', 'menudados'],
                                    nav: ['navinterno'],
                                    title: 'Minha Conta',
                                    content: {tpl: 'tpl-form', classe: 'addcartaoprepago', edit: true, removeEditSave: true,
                                        header: {
                                            title: {classe: 'text-left', text: 'Solicitação de Cartão Pré-Pago'}
                                        },
                                        btns: [
                                            {name: 'save', title: 'Enviar', visibled: true, classe: 'btn-primary right', url: 'dadoscredito'},
                                            /*{title: 'Cancelar', visibled: true, class: 'btn-danger right', url: 'dadoscredito'},*/
                                            {title: 'Voltar', visibled: true, classe: 'btn-link inline left', url: 'dadoscredito'},
                                        ],
                                        service: {
                                            call: {objresult: 'load', urls: [
                                                    {url: 'formulariocartoes/cpf/', parameter: 'idUsuario'},
                                                    {url: '/find/', parameter: '0'},
                                                ],
                                            }, 
                                            send: {url: 'formulariocartoes/save'},
                                        },
                                        formdisabled: {
                                            parameters: [{captureObj: 'objClicked', name: 'cdDadosCredito'}, /*{captureObj: 'user', name: 'cpf'}*/]
                                        },
                                        detail: [
                                            {classe: 'titleBorderNn', 
                                                title: {
                                                    description: {text: 'Preencha o formulário abaixo para solicitar seu cartão pré-pago.<p><small><i> Os dados alterados neste formulário não alterarão seu cadastro do Programa In Mais, caso seja necessário atualização, por favor, clique em <a href="{perfil}" class="btn btn-link inline">Alterar Dados Pessoais</a>. e faça as alterações necessárias.</i></small></p>'}
                                                },
                                                insertpartials: ['dadoscartao'],                                                                                                                          
                                            },
                                        ]
                                    }
                                }


                            }
                        },



                        alterarsenha: {
                            classe: 'pagMinhaconta',
                            menu: ['menupontos', 'menudados'],
                            nav: ['navinterno'],
                            title: 'Minha Conta',
                            content: {tpl: 'tpl-form', classe: 'alterar-senha',
                                header: {
                                    title: {classe: 'text-left', text: 'Alterar Senha'}
                                },
                                btns: [
                                    {name: 'save', title: 'Salvar', visibled: true, classe: 'btn-primary' , clearform: true},
                                ],
                                service: {
                                    call: {url: 'alterarsenha/find/', objresult: 'load', parameter: 'idUsuario'}, 
                                    send: {url: 'alterarsenha/save'},
                                },
                                detail: [
                                    {classe: 'titleBorderNn', 
                                        form: [
                                            {
                                                style: 'inline',
                                                campos: [
                                                    {nameTpl: 'input', type: 'hidden', name:'cpf', id: 'cpf', captureparameter:'user', parameter: 'idUsuario', labelHide: true, required: false, size: 0, inputSize: 0, labelSize: 0},
                                                    {nameTpl: 'input', type: 'password', name:'senhaAtual', id: 'senhaAtual', labelName: 'Senha atual:', required: true, size: 12, inputSize: 3, labelSize: 4},
                                                ]
                                            },
                                            {
                                                style: 'inline',
                                                campos: [
                                                    {nameTpl: 'input', type: 'password', name:'senhaNova', id: 'senhaNova', labelName: 'Nova senha:', required: true, size: 12, inputSize: 3, labelSize: 4},
                                                ]
                                            },
                                            {
                                                style: 'inline',
                                                campos: [
                                                    {nameTpl: 'input', type: 'password', name:'confirmaSenhaNova', id: 'confirmaSenhaNova', labelName: 'Confirmação da nova senha:', required: true, size: 12, inputSize: 3, labelSize: 4},
                                                ]
                                            },
                                        ]                                                                          
                                    },
                                ]
                            }
                        },
                    }
                },                
                //MINHA CONTA {FIM}

                //RESGATE
                resgate: {
                    classe: 'pagResgate',
                    nav: ['navinterno'],
                    title: 'Resgate',
                    content: {tpl: 'tpl-page-texts', classe: 'resgate',  title: 'Como quer resgatar seus pontos?', subtitle: '<p>Escolha uma das opções abaixo e veja como é fácil e rápido aproveitar tudo o que o In Mais tem a te oferecer!</p>',
                        detail: [
                            {classe: 'navInternal',
                                insertpartials: ['navresgate'],
                            },
                        ]
                    },

                    pages:{
                        catalogo: {
                            classe: 'pagResgate',
                            nav: ['navinterno'],
                            title: 'Resgate',

                            content: {tpl: 'tpl-page-texts', title: 'Como quer resgatar seus pontos?', subtitle: '<p>Escolha uma das opções abaixo e veja como é fácil aproveitar tudo o que o In Mais tem a te oferecer!</p>',
                                detail: [
                                    {classe: 'navInternal',
                                        insertpartials: ['navresgate'],
                                    },
                                    {classe: 'catalogo',
                                        insertpartials: ['catalogo'],
                                    }                                                                    
                                ]
                            }
                        },
                        checkout: {
                            classe: 'pagResgate',
                            nav: ['navinterno'],
                            title: 'Resgate',
                            btnReturn: {visibled: {top: true, footer: false}},
                            content: {tpl: 'tpl-page-texts', title: 'Como quer resgatar seus pontos?', subtitle: '<p>Escolha uma das opções abaixo e veja como é fácil aproveitar tudo o que o In Mais tem a te oferecer!</p>',
                                detail: [
                                    {tpl: 'tpl-form', classe: 'form-checkout', fieldCallHidden: true,
                                        btns: [
                                            {name: 'save', openmodal: true, issaveform:true, url: 'resgateconfirm', title: 'Confirmar', visibled: true, classe: 'btn-primary', topPagclick: true},
                                        ],
                                        service: {
                                            call: {objresult: 'load', 
                                                urls: [
                                                    {url: 'formularioresgate/find/', parameter: 'idUsuario'},
                                                    {url: '/premio/', setparamObj: true, parameter: 'codpremio'},
                                                    {url: '/tipopremio/', setparamObj: true, parameter: 'tipoPremio'},
                                                    {url: '/condicao/', parameterclicked: true},
                                                    {url: '/catalogo/', setparamObj: true, parameter: 'catalogo'},
                                                ],
                                                error: {
                                                    urlparametererror: 'catalogo',
                                                    hidecontent: true,
                                                },
                                            },                                            
                                            send: {notsave: true, saveparameter: ['all']},
                                        },
                                        fieldsInteraction: [
                                            {field: 'pergunta', interaction: 'openmodal', url: 'resgatecartao', checkedparameter:'lineValue', fields:['pergunta']}
                                        ],
                                        detail: [
                                            {classe:'bg-form', form: [
                                                    //CAMPOS COMUNS
                                                    {
                                                        style: 'inline col-md-3 right',
                                                        campos: [
                                                            {nameTpl: 'image', classe:'imagem', name:'imagem', id: 'imagem', imgset: 'grd', ignoresave: true, addParamsResult: true, labelHide: true, size: 12, inputSize: 12, labelSize: 0,},
                                                            {nameTpl: 'inputtext', classe:'titulo', name:'nomePremio', id: 'nomePremio', addParamsResult: true, labelHide: true, size: 12, inputSize: 12, labelSize: 0,},
                                                            {nameTpl: 'inputtext', classe:'condicao', name:'textoCondicao', id: 'textoCondicao', addParamsResult: true, labelHide: true, size: 12, inputSize: 12, labelSize: 0,},
                                                        ]
                                                    },
                                                    {
                                                        style: 'inline col-md-7',
                                                        campos: [
                                                            {nameTpl: 'input', type: 'hidden', name:'catalogo', id: 'catalogo', savetype: 'number', required: false, size: 0, inputSize: 0, labelSize: 0},
                                                            {nameTpl: 'input', type: 'hidden', name:'condicao', id: 'condicao', savetype: 'number', required: false, size: 0, inputSize: 0, labelSize: 0},
                                                            {nameTpl: 'input', type: 'hidden', name:'tipoPremio', id: 'tipoPremio', required: false, size: 0, inputSize: 0, labelSize: 0},
                                                            {nameTpl: 'input', type: 'hidden', name:'codpremio', id: 'codpremio', savetype: 'number', required: false, size: 0, inputSize: 0, labelSize: 0},
                                                            {nameTpl: 'input', type: 'hidden', name:'pergunta', id: 'pergunta', required: false, size: 0, inputSize: 0, labelSize: 0},
                                                            {nameTpl: 'select', type: 'select', name:'cartao_pre_pago', id: 'cartao_pre_pago', savetype: 'number', addParamsResult: true, /*interaction: true,*/ size: 12, inputSize: 7, labelSize: 5,},
                                                        ]
                                                    },
                                                    {
                                                        style: 'inline col-md-7',
                                                        campos: [
                                                            {nameTpl: 'select', type: 'select', name:'conta_corrente', id: 'conta_corrente', savetype: 'number', addParamsResult: true, /*interaction: true,*/ size: 12, inputSize: 7, labelSize: 5,
                                                                obs: 'Dados incorretos? <a href="{dadoscredito}">Clique aqui</a> para corrigir.', obsSize: 12, obsLabelSize:5,
                                                                /*service: {
                                                                   events: [
                                                                        {objresult: 'load', event: 'change', edit: true, //errordefault: true, 
                                                                            urls: [
                                                                                {url: 'resgatecondicao/find/', parameter: 'idUsuario'},
                                                                                {url: '/premio/', parameterform: true, parameter: 'codpre'},
                                                                            ]
                                                                        },
                                                                    ]                                                                                                                                            
                                                                },*/
                                                            },                                                            
                                                        ]
                                                    },
                                                    {
                                                        style: 'inline col-md-7',
                                                        campos: [
                                                            {nameTpl: 'select', type: 'select', name:'tipo_conta', id: 'tipo_conta', interaction: true, labelName: 'Tipo da Conta:', required: true, size: 12, inputSize: 5, labelSize: 5,
                                                                options: {obj: [
                                                                    {id: '904CC', description: 'Corrente'},
                                                                    {id: '904CP', description: 'Poupança'}
                                                                ]},
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        style: 'inline col-md-7',
                                                        campos: [
                                                            {nameTpl: 'input', type: 'tel', name:'telefonevoucher', id: 'telefonevoucher', addParamsResult: true, size: 12, inputSize: 5, labelSize: 5},
                                                        ]
                                                    },
                                                    {
                                                        style: 'inline col-md-7',
                                                        campos: [
                                                            {nameTpl: 'input', type: 'tel', name:'telefone', id: 'telefone', addParamsResult: true, size: 12, inputSize: 5, labelSize: 5},
                                                        ]
                                                    },

                                                    {
                                                        style: 'inline col-md-7',
                                                        campos: [
                                                            {nameTpl: 'input', type: 'tel', name:'telefone_confirmacao', id: 'telefone_confirmacao', compareField:'telefone', addParamsResult: true, size: 12, inputSize: 5, labelSize: 5,
                                                            obs: 'Insira o mesmo número de telefone', obsSize: 12, obsLabelSize:5,},
                                                        ]
                                                    },
                                                    {
                                                        style: 'inline col-md-7',
                                                        campos: [
                                                            {nameTpl: 'input', type: 'cpf', name:'cpf', id: 'cpf', addParamsResult: true, disabled: true, size: 12, inputSize: 5, labelSize: 5},
                                                        ]
                                                    },
                                                    {
                                                        style: 'inline col-md-7',
                                                        campos: [
                                                            {nameTpl: 'inputtext', type:'pontos', classe:'inputtext', name:'saldo_atual', id: 'saldo_atual', savetype: 'number', addParamsResult: true, size: 12, inputSize: 7, labelSize: 5,
                                                            information: 'Soma dos pontos disponíveis para resgate'},
                                                        ]
                                                    },                                                    
                                                    {
                                                        style: 'inline col-md-7',
                                                        campos: [
                                                            {nameTpl: 'inputtext', type:'pontos', classe:'inputtext', name:'taxa_resgate', id: 'taxa_resgate', savetype: 'number', addParamsResult: true, size: 12, inputSize: 7, labelSize: 5},
                                                        ]
                                                    },
                                                    {
                                                        style: 'inline col-md-7',
                                                        campos: [
                                                            {nameTpl: 'inputtext', type:'pontos', classe:'inputtext', name:'disponivel', id: 'disponivel', savetype: 'number', addParamsResult: true, size: 12, inputSize: 7, labelSize: 5},
                                                        ]
                                                    },
                                                    {
                                                        style: 'inline col-md-7',
                                                        campos: [
                                                            {nameTpl: 'input', classe:'inputtext', type: 'pontos', name:'qtdade', id: 'qtdade', savetype: 'number', addParamsResult: true, disabled: false, size: 10, inputSize: 6, labelSize: 6,
                                                                obs: 'Digite sem casas decimais. Ex.: 1000', obsSize: 12, obsLabelSize: 6, 
                                                                //LIMPAR OS CAMPOS QUANDO TROCAR O VALOR
                                                                clearResult: ['qtpon', 'qtpremio_total', 'flagprepago', 'flagcontacorrente', 'flagvoucher', 'flagrecarga']
                                                            },
                                                            {nameTpl: 'button', type: 'button', name:'calcularpontoscc', id: 'calcularpontoscc', size: 2, ignoreHidden: true, inputSize: 11, title: 'Calcular', visibled: true, disabled: false, classe:'btn-primary',
                                                                information: 'Antes de calcular insira a quantidade de pontos que deseja resgatar.',                                                                
                                                                service: {
                                                                    call: {objresult: 'load', errordefault: true, isvalidform: true, edit: true,
                                                                        //PARA O BOTAO FUNCIONAR DEVE SER PREENCHIDO O CAMPO QUE ESTA NO 'paramter'
                                                                        conditional: {mgsalert: 'Insira a quantidade de Pontos que deseja resgatar.', obj: [
                                                                            {parameter: 'qtdade',  value: 'lineValue'},
                                                                        ]},
                                                                        urls: [
                                                                            {url: 'resgatecalcula/find/', parameter: 'idUsuario'},
                                                                            {url: '/pontos/', parameterform: true, parameter: 'qtdade'},
                                                                            {url: '/catalogo/', setparamObj: true, parameter: 'catalogo'},
                                                                            {url: '/condicao/', parameterclicked: true},
                                                                            {url: '/premio/', setparamObj: true, parameter: 'codpremio'},
                                                                        ],
                                                                    },
                                                                },
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        style: 'inline col-md-7',
                                                        campos: [
                                                            {nameTpl: 'inputtext', type:'pontos', classe:'inputtext', name:'qtpon', id: 'qtpon', savetype: 'number', addParamsResult: true, size: 12, inputSize: 7, labelSize: 5,
                                                            information: 'Soma dos pontos que você deseja resgatar mais o custo dos créditos'},
                                                        ]
                                                    },                                                     
                                                    {
                                                        style: 'inline col-md-7',
                                                        campos: [
                                                            {nameTpl: 'inputtext', type:'moeda', symbol: 'R$', classe:'inputtext', name:'qtpremio_total', id: 'qtpremio_total', savetype: 'number', addParamsResult: true, size: 12, inputSize: 7, labelSize: 5},                                                            
                                                        ]
                                                    },
                                                ]                                                                          
                                            },
                                            {classe: 'bg-form',
                                                insertpartials: ['dadoscartao'],
                                            },
                                            {
                                                form: [
                                                    {
                                                    style: 'inline',
                                                        campos: [
                                                            {nameTpl: 'radio', type: 'checkbox', name:'flagprepago', id: 'flagprepago', addParamsResult: true,  size: 12, inputSize: 12, labelSize: 0,
                                                            labelName: 'Declaro que os dados fornecidos estão corretos e o cartão está ativo e é de minha responsabilidade.<br/> Li e concordo com as <a href="{regulamento, modal}" class="btn btn-link inline">regras de cartão pré-pago</a>.'},

                                                            {nameTpl: 'radio', type: 'checkbox', name:'flagcontacorrente', id: 'flagcontacorrente', addParamsResult: true,  size: 12, inputSize: 12, labelSize: 0,
                                                            labelName: 'Declaro que os dados fornecidos estão corretos e a conta para crédito está ativa e é de minha responsabilidade.<br/> Li e concordo com as <a href="{regulamento, modal}" class="btn btn-link inline">regras de crédito em conta</a>.'},

                                                            {nameTpl: 'radio', type: 'checkbox', name:'flagvoucher', id: 'flagvoucher', addParamsResult: true,  size: 12, inputSize: 12, labelSize: 0,
                                                            labelName: 'Declaro que os dados fornecidos estão corretos e o telefone está ativo e é de minha responsabilidade.<br/> Li e concordo com as <a href="{regulamento, modal}" class="btn btn-link inline">regras de ingressos</a>.'},

                                                            {nameTpl: 'radio', type: 'checkbox', name:'flagrecarga', id: 'flagrecarga', addParamsResult: true, size: 12, inputSize: 12, labelSize: 0,
                                                            labelName: 'Declaro que os dados fornecidos estão corretos e o celuar está ativo e é de minha responsabilidade.<br/> Li e concordo com as <a href="{regulamento, modal}" class="btn btn-link inline">regras de recarga</a>.'},

                                                            {nameTpl: 'inputtext', name:'textoCondicaoEntrega', id: 'textoCondicaoEntrega', addParamsResult: true, hidden: true, size: 12, inputSize: 12},
                                                        ]
                                                    }
                                                ]      
                                            }
                                        ]
                                    }, 
                                ]
                            }
                        },
                    }
                },

                //COMPRAS PROMOCIONAIS
                vantagem: {
                    classe: 'pagVantagem',
                    nav: ['navinterno'],
                    title: 'Compras promocionais',
                    menu: ['menucategoriavantagem', 'menupremiosvantagem'],
                    content: {tpl: 'tpl-page-texts',
                        detail: [
                            {classe: 'catalogo', 
                                insertpartials: {
                                    tplConditional: {
                                        defaultTpl: 'catalogovantagem',
                                        tplConds: [
                                            {parameterurl: true, tpl: 'catalogo', 
                                                conds: [
                                                    {param: 'catalogo', val: 'CB'},
                                                    {param: 'categoria', val: 0},
                                                ]
                                            },
                                            {parameterurl: true, tpl: 'catalogo', 
                                                conds: [
                                                    {param: 'catalogo', val: 'BC'},
                                                    {param: 'categoria', val: 0},
                                                ], 
                                            },
                                            {parameterurl: true, tpl: 'catalogo', 
                                                conds: [
                                                    {param: 'catalogo', val: 'V'},
                                                    {param: 'categoria', val: 0}, 
                                                ], 
                                            },
                                        ]
                                    }
                                }
                            }                                                                    
                        ]
                    }                    
                },

                regulamento: {
                    classe: 'pagRegulamento',
                    //redirectlogin: 'not',
                    title: 'Regulamento',
                    content: {tpl: 'tpl-form', classe: 'regulamento',
                        header: {
                            title: {classe: 'text-left', text: 'REGULAMENTO PROGRAMA IN MAIS'}
                        },
                        detail: [
                            {insertpartials: ['regulamento']}
                        ]
                    }                    
                },
                
            }
        }             
    }
});