var external = angular.module('external', ['ngResource']);

external.config(function () {
});

external.run(function ($rootScope) {
});

external.constant("servicesConfig", {
    ambienteProd: false,
    endpoints: {
        'hoot': 'http://10.10.10.123:8080/incentback/service/',
        'auth': 'http://10.10.10.123:8080/incentback/session/auth', 
        'people': 'http://10.10.10.123:8080/incentback/service/usuario/find/',
        'points': 'http://10.10.10.123:8080/incentback/service/saldo/',
    },
    siteHost: '/',
    debug: true,
    captcha: {
        //https://www.google.com/recaptcha/
        sitekey: '6Lcufv4SAAAAANldbPctoKyqI6gHtu2Zb7hVNuzU',      
        secretkey: '6Lcufv4SAAAAALBv6u5oZl1wN_v5yemwmljnLVgt'  
    },
    user : { 
        Id: 1, 
        name: 'Indicou Ganhou',                         
        logo: {title: "CVC", img: "assets/images/logo.png"},
        logoApp: {title: "Indicou Ganhou!", img: "assets/images/logoApp.png"},
        logoDesenv: {title:"IncentiVale", img: "assets/images/logoDesenv.jpg", url: ''},
        layout: {
            type:  'center', //layout Full
            header: {
                login: false,
                user:{tpl: 'tpl-link', classe: 'links',
                    menu: [
                        {title: 'Editar Dados', classe: 'editPerfil', url: 'perfil', refhref:'perfil'},        
                        {title: 'Sair', classe: 'closeApp', func: 'logout',}
                    ],
                    points: {text: 'Você tem <strong>{{$rootScope.user.points.value}}</strong> pontos', classpoints: 'points'}
                },
            },
            menu: {
                login: true,
            },
            footer: {
                copyright: true,
            },
            links: {
                login: {name: 'login', title: "Login", href:"/login", pagedefault: true},
                index: {name: 'index', title: 'Index', href:'/index', pageclose: true, navactive: 'index'},
                cadastro: {name: 'cadastro', title: "cadastro", href:"/cadastro", pageclose: false},
                contato: {name: 'contato', title: "contato", href:"/contato", pageclose: false, navactive: 'contato'},
                regulamento: {name: 'regulamento', title: "regulamento", href:"/regulamento", pageclose: false, navactive: 'regulamento'},
                programa: {name: 'programa', title: "programa", href:"/programa", pageclose: false, navactive: 'programa'},
                perfil: {name: 'perfil', title: "perfil", href:"/perfil/", pageclose: true, navactive: 'perfil'},
                indique: {name: 'indique', title: "indique", href:"/indicacao", pageclose: true, },
                extrato: {name: 'extrato', title: "extrato", href:"/extrato", pageclose: false, navactive: 'extrato'},
                resgate: {name: 'resgate', title: "resgate", href:"/catalogo-de-premios", pageclose: true, navactive: 'catalogo'},
                extratohistorico: {name: 'extratohistorico', title: "extrato-historico", href:"/meus-resgates", pageclose: false, navactive: 'extrato-historico'},
            },
            navauth: true,
            nav: [
                //refhref precisa ser igual ao link.href sem '/' para inserir a class active na navegacao 
                {type: 'nav', title: 'Fale conosco', classe: 'contato', url: 'contato', ref:'contato'},
                {type: 'nav', title: 'Regulamento', classe: 'regulamento', url: 'regulamento', ref:'regulamento'},
                {type: 'nav', title: 'Indique', classe: 'indique', url: 'indique', openmodal: true, ref: 'indique'},
                {type: 'nav', title: 'Catálogo de prêmios', classe: 'catalogo', url: 'resgate', ref:'catalogo'},
                {type: 'nav', title: 'O programa', classe: 'programa', url: 'programa', ref:'programa'},
                {type: 'nav', title: 'Home', classe: 'home', url: 'index', ref:'index'},
            ],
            partials: {
                login: {id: 'box-login', tpl: 'tpl-form', classe: 'box box-default form login',
                	header: {
                        title: {classe: 'text-center', text: 'Seja bem vindo(a) a <strong>Promoção Indicou Ganhou</strong>'}
                    },
                    btns: [
                        {title: 'Entrar', type: 'submit', func: 'login', classe:"btn-primary", visibled: true, url: 'index'},
                        {title: 'cadastre-se!', classe:"btn-default", url: 'cadastro', visibled: true},
                        {title: 'Esqueci a senha', classe:"btn-link", url: 'password', visibled: true, openmodal: true}
                    ],
                    detail: [
                        {classe: 'titleBorderNn',
                        	title: {text: 'Login',
                        		description: {classe: 'text-left', text: 'Insira seu login e sua senha para entrar.'}
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
                indicacao: {id: 'menu-indicacao', tpl: 'tpl-box', classe: 'box box-primary', tplContent:'tpl-list', contentClass:'list-box format1', title: 'Minhas indicações', 
                    service: {
                        call: {url: 'indicacoesrapido/', objresult: 'load', parameter: 'idUsuario', filter: 'footer'},
                    },
                    aditionals: {
                        field: {aliasclass: 'title', nameclass: 'description', valueclass: 'result'},
                        linelimite: 2,
                    },                   
                    body:[{icon: 'ind-negativo'}, {icon: 'ind-ativo'}],
                    btn: [{title: 'Acompanhe sua indicação', classe:"btn-default", url: 'indique'}]
                },
                extrato: {id: 'menu-extrato', tpl: 'tpl-box', classe: 'box box-default extrato-rapido', title: 'Extrato Rápido', tplContent:'tpl-table',
                    service: {
                        call: {url: 'extratorapido/', objresult: 'load', parameter: 'idUsuario'},
                    },
                    aditionals: {
                        titleshidden: true,
                        footerhidden: true                        
                    },
                    body:[                        
                    ], 
                    
                    btn: [
                        {title: 'Meus Resgates', classe:"btn-primary posLeft", url: 'extratohistorico'},
                        {title: '+ Detalhes', classe:"btn-primary", url: 'extrato'},
                    ]
                },

                formcadastro: [
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'nome', id: 'nome', labelName: 'Nome Completo:', required: true, size: 12, inputSize: 9, labelSize: 3},
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'cpf', id: 'cpf', labelName: 'CPF:', required: true, size: 12, inputSize: 5, labelSize: 3},
                        ]
                    },             
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'email', name:'email', id: 'email', labelName: 'Email:', required: true, size: 12, inputSize: 5, labelSize: 3},
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'date', name:'datanascimento', id: 'datanascimento', labelName: 'Data de Nascimento:', obs: '(dd / mm / aaaa)', required: true, size: 12, obsSize: 2, inputSize: 3, labelSize: 3},
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'cep', id: 'cep', labelName: 'CEP:', required: true, size: 7, inputSize: 7, labelSize: 3},
                            /*{nameTpl: 'button', type: 'button', name:'searchcep', id: 'searchcep', size: 3, title: 'Buscar', visibled: true, class: 'btn-primary',
                                service: {
                                    send: {url: 'test/save'},
                                },
                            },*/
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'logradouro', id: 'logradouro', labelName: 'Endereço:', required: true, size: 9, inputSize: 8, labelSize: 3},
                            {nameTpl: 'input', type: 'text', name:'numero', id: 'numero', labelName: 'Nº:', required: true, size: 3, inputSize: 10, labelSize: 2},
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'comp', id: 'complemento', labelName: 'Complemento:', required: false, size: 7, inputSize: 7, labelSize: 3},
                            {nameTpl: 'input', type: 'text', name:'bairro', id: 'bairro', labelName: 'Bairro:', required: true, size: 5, inputSize: 9, labelSize: 3},
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'cidade', id: 'cidade', labelName: 'Cidade:', required: true, size: 7, inputSize: 7, labelSize: 3},
                            {nameTpl: 'select', type: 'select', name:'estadouf', id: 'estadouf', labelName: 'Estado:', required: true, size: 5, inputSize: 9, labelSize: 3}
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'tel', name:'numtelefone', id: 'numtelefone', labelName: 'Telefone:', required: true, size: 7, inputSize: 7, labelSize: 3},
                            {nameTpl: 'input', type: 'tel', name:'numcelular', id: 'numcelular', labelName: 'Celular:', required: false, size: 5, inputSize: 9, labelSize: 3},
                        ]
                    },
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'input', type: 'text', name:'codsupervisor', id: 'codsupervisor', labelName: 'Código do Supervisor:', maxlength: '20', required: false, size: 7, inputSize: 7, labelSize: 3},
                            {nameTpl: 'input', type: 'text', name:'nomesupervisor', id: 'nomesupervisor', labelName: 'Nome do Supervisor:', maxlength: '50', required: true, size: 5, inputSize: 9, labelSize: 3},
                        ]
                    },                             
                ],

                regulamento: [
                    {
                        style: 'inline',
                        campos: [
                            {nameTpl: 'list', contentClass: 'listRegulamento', size: 12, labelHide: true, inputSize: 12, 
                                result: {
                                    line:[
                                        {field: [
                                            {value: '<h5>A CAMPANHA</h5>'
                                            +'<p>A promoção "Indicou, Ganhou!" da INCENTIVALE é uma ação promocional promovida em conjunto com a CVC que visa premiar seus agentes de viagem.'
                                            +'Esta promoção será válida durante o período de 01/11/2014 a 01/01/2015, podendo ser prorrogada e suas regras e funcionamento estão disponíveis no endereço digital: <a href="http://www.incentivale.com.br/indicouganhou/" target="_blank">www.incentivale.com.br/indicouganhou</a> na seção regulamento.</p>'
                                            }
                                        ]},
                                        {field: [
                                            {value: '<h5>COMO FUNCIONA</h5>'
                                            +'<p>Para participar o agente de viagens deverá acessar o site, efetuar seu cadastro e preencher suas indicações.</p>'
                                            +'<p>Ao indicar a INCENTIVALE, o agente receberá uma atualização de seu saldo de pontos oriundos das indicações que deverá acontecer em até 48h após a indicação em si ou até que a empresa interessada possa ser contatada e comprove seu interesse pelo produto.</p>'
                                            +'<p>Serão 5 indicações máximas por mês. A partir da 6ª indicação, será sim permitido utilizá-la no mês seguinte, que também terá um limite de até 5 indicações e assim sucessivamente durante o período de vigência da campanha.</p>'
                                            +'<p>Após o último mês, as indicações excedentes serão consideradas, limitando-se a 5 indicações por participante.</p>'
                                            +'<p>Caso a indicação não seja validada, o participante receberá  um aviso de indicação não válida e esta não será pontuada.</p>'
                                            }
                                        ]},
                                        {field: [
                                            {value: '<h5>REGULAMENTO</h5>'}
                                        ]},
                                        {field: [
                                            {value: '<h6>1) Adesão:</h6>'
                                            +'<p>Os agentes de viagem deverão acessar o site <a href="http://www.incentivale.com.br/indicouganhou/" target="_blank">www.incentivale.com.br/indicouganhou</a>, preencher seu cadastro completo e realizar a adesão.</p>'
                                            +'<p>O participante da  Promoção Indicou Ganhou passará a receber pontos pelas indicações de Pessoas Jurídicas interessadas em adquirir <strong>VALE-VIAGEM CVC</strong>.  Os pontos acumulados pelos participantes poderão ser trocados por produtos previamente informados através do site do Programa.</p>'
                                            +'<p>Não há necessidade de que a empresa compre os cartões <strong>VALE-VIAGEM CVC</strong> na INCENTIVALE para que os colaboradores ganhem /obtenham suas indicações válidas. Será necessária apenas a validação da indicação por parte da INCENTIVALE.</p>'
                                            }
                                        ]},
                                        {field: [
                                            {value: '<h6>2) Forma de pontuação:</h6>'
                                            +'<p>O participante poderá acumular até 5 (cinco) indicações em cada mês. Caso o participante consiga indicar mais de 5 no mês, o número excedente acumulará para o mês seguinte.</p>'
                                            +'<p>Cada indicação vale 25 pontos, sendo que a 5º indicação dentro do mesmo mês vale 200. A soma total de todas as 5 indicações será sempre no máximo de 200 pontos. Nesse caso, e como exemplo temos:</br>'
                                            +'<ul>'
                                            +'<li><strong>PONTOS POR INDICAÇÃO</strong></li>'
                                            +'<li>1 Indicação: 25 pontos</li>'
                                            +'<li>2 Indicações: 50 pontos</li>'
                                            +'<li>3 Indicações: 75 pontos</li>'
                                            +'<li>4 Indicações: 100 pontos</li>'
                                            +'<li>5 Indicações: 200 pontos</li>'
                                            +'</ul>'
                                            +'<p>As indicações válidas serão todas que tiverem intenção clara de aquisição de <strong>cartões VALE-VIAGEM CVC</strong> enquanto pessoa jurídica. </p>'
                                            +'<p>As indicações em que forem observadas intenção de compra de pacotes ou produtos CVC que não cartões Vale-Viagem, serão reencaminhadas ao mesmo agente indicador, sempre com as observações comerciais percebidas e computadas como Não Válidas. Recebendo o status de indicação não aceita.</p>'
                                            +'<p>A Incentivale se reserva o direito de invalidar os pontos acumulados indevidamente pelos Participantes em caso de falhas no Sistema ou Equipamentos do Programa.</p>'
                                            +'<h6>Pontos por Bonificação:</h6>'
                                            +'<p>Caso uma indicação torne-se uma venda e essa venda tenha <strong>valor superior a R$20.000,00 (vinte mil reais)</strong> essa indicação valerá 50 pontos bônus, limitados a 5 indicações mensais.</p>'
                                            +'<p>Desta forma, o valor máximo de pontos que cada participante poderá acumular por mês é de 450 pontos compostos por pontos por indicação mais os pontos ganhos por bonificação por venda concretizada, ambos limitados a 5 indicações.</p>'
                                            }
                                        ]},
                                        {field: [
                                            {value: '<h6>3) Resgates de Pontos:</h6>'
                                            +'<p>Para resgatar é só acessar o site e se logar. O participante deve cadastrar sua senha de acesso que é de sua inteira responsabilidade, isentando a Incentivale de qualquer compartilhamento deste dado com terceiros.</p>'
                                            +'<p>O resgate dos pontos poderá ser feito a qualquer momento da campanha. O premiado poderá também optar por acumular os seus pontos e resgatar ao final da campanha. A distribuição dos prêmios será feita no mês seguinte do encerramento da promoção, conforme escolha e solicitação de resgate de cada participante dentro do catálogo de prêmios do programa. </p>'
                                            +'<p>Somente poderá resgatar seus pontos o participante que alcançar a quantidade estipulada de pontos para o prêmio escolhido.</p>'
                                            +'<p>As entregas dos prêmios resgatados serão realizadas sempre na CVC, ficando sob exclusiva responsabilidade da CVC a distribuição aos premiados.</p>'
                                            }
                                        ]},
                                        {field: [
                                            {value: '<h6>4) Validade dos Pontos:</h6>'
                                            +'<p>Os pontos liberados para troca são válidos por 15 dias após o encerramento da campanha, e não representarão para os Participantes da Promoção qualquer direito adquirido sobre os prêmios anunciados, os quais poderão ser alterados, substituídos ou cancelados a qualquer momento a critério único e exclusivo da Incentivale, ainda que dentro do prazo de validade estabelecido no site.</p>'
                                            +'<p>Os pontos liberados de uma campanha não serão acumulados para a campanha seguinte. Obrigatoriamente o participante deverá realizar o resgate no período de 15 dias após o término, caso não realize os pontos perderão a validade.</p>'
                                            }
                                        ]},
                                        {field: [
                                            {value: '<h6>5) Disposições Gerais:</h6>'
                                            +'<p>As indicações serão válidas apenas enquanto o participante for colaborador da empresa CVC. Caso ele seja desligado, ainda assim terá direito ao resgate dos pontos já adquiridos.</p>'
                                            +'<p>A distribuição dos prêmios será feita no mês seguinte do encerramento da promoção conforme escolha e solicitação de resgate de cada participante dentro do catálogo de prêmios do programa.</p>'
                                            +'<p>O número total de indicações válidas e não válidas será tabulado e ficarão disponíveis a cada participante dentro do próprio portal da campanha no item meus pontos ou minhas indicações.</p>'
                                            +'<p>Para que as indicações sejam recebidas adequadamente e consideradas validas deverão ser enviadas exclusivamente através do formulário de indicação dentro do <strong>portal Indicou Ganhou</strong>, sendo acessado por um clique sobre o botão vermelho da home do site, com o nome Faça sua indicação. </p>'
                                            +'<p>Indicações enviadas por outros meios e a outros e-mails serão consideradas como <strong>“não válidas”</strong>.</p>'
                                            +'<p>No fim de vigência, serão computados se os participantes possuem indicações excedentes dos meses anteriores e, caso o tenham, serão pontuados de acordo com a regra de pontuação deste regulamento, limitadas a 5 indicações excedentes.</p>'
                                            +'<p>Qualquer alteração neste regulamento seja da forma de adesão, critérios de pontuação, distribuição ou acúmulo de pontos, prêmios fornecidos, troca de pontos e entrega de prêmios, validade dos prêmios, retirada ou substituição de empresas fabricantes ou prestadora de serviços, ou de qualquer outro item será informada ao participante de forma a ser definida única e exclusivamente a critério da Incentivale.</p>'
                                            +'<p>A Incentivale reserva-se ao direito de a qualquer momento encerrar este Promoção mediante aviso prévio de 15 (quinze) dias, garantindo ao Participante a distribuição de pontos durante este período e a troca dos pontos acumulados por prêmios constantes no site da Promoção que será vigente por 30 (trinta) dias corridos após o encerramento da mesma.</p>'
                                            +'<p>A participação na Promoção Indicou Ganhou será regida exclusivamente por este regulamento, que pode ser substituído ou alterado a qualquer tempo, a critério único e exclusivo da Incentivale.</p>'
                                            +'<p>Os participantes da <strong>Promoção Indicou Ganhou</strong>, poderão consultar através do site  o extrato de pontuação onde constará os pontos ganhos, os pontos liberados, os pontos resgatados, os pontos estornados, as pontuações extras, oriundos das indicações validadas.</p>'
                                            +'<p>A Incentivale tem o direito de prorrogar ou não automaticamente esta campanha. </p>'                                            
                                            }
                                        ]},
                                    ]
                                },                                
                            },                            
                        ]
                    },      
                ],

                bnTroquePontos: {tpl: 'banner-middle', classe: 'banner-middle', title: 'Troque seus pontos', img: 'banners/menu.png', url: 'catalogo'}
            },
            banners: {
                ganhepontos: {id:'banner-ganhepontos', tpl: 'banner-index', classe: 'banner default', scope: {
                    title: '<strong>Ganhe pontos toda vez</strong> que seu indicado <small>comprar vale-viagem CVC!</small>',
                    //img: {url:'', alt: ''},
                    itens: '<p>Veja como é fácil participar</p><ul><li><strong>Acumule Pontos</strong> a cada venda ativa</li><li><strong>Indique clientes</strong> para comprar VALE-VIAGEM CVC</li><li><strong>Troque por Prêmios</strong> exclusivos dentro do catálogo online</li></ul>',
                    btn: [
                        {title: 'Clique aqui e <small>Faça sua indicacao</small>', icon: 'fa fa-star', classe:'btn-secondary', openmodal:true, url: 'indique'}
                    ]
                }},
                ganhepontoscadastro: {id:'banner-ganhepontoscadastro', tpl: 'banner-index', classe: 'banner default', scope: {
                    title: '<strong>Ganhe pontos toda vez</strong> que seu indicado <small>comprar vale-viagem CVC!</small>',
                    //img: {url:'', alt: ''},
                    itens: '<p>Veja como é fácil participar</p><ul><li><strong>Acumule Pontos</strong> a cada venda ativa</li><li><strong>Indique clientes</strong> para comprar VALE-VIAGEM CVC</li><li><strong>Troque por Prêmios</strong> exclusivos dentro do catálogo online</li></ul>',
                    btn: [
                        {title: 'Participe <small>Clique aqui e cadastre-se</small>', icon: 'fa fa-star', classe:'btn-secondary', url: 'cadastro'}
                    ]
                }},
                catalogo: {id:'banner-catalogo', tpl: 'banner-index', classe: 'banner catalogo', scope: {}},
            },
            modals: {
                password: {
                    id:'modal-password',
                    ctrl: 'modalDefaultCtrl',
                    size: 'sm',
                    content: {tpl: 'tpl-form', classe: 'password',modal: true,
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
	                        		description: {classe: 'text-center', text: 'Insira o seu e-mail cadastrado e enviaremos sua senha.'}
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
                observacao: {
                    id:'modal-observacao',
                    ctrl: 'modalDefaultCtrl',
                    size: 'sm',
                    content: {tpl: 'tpl-text', classe: 'observacao', title: 'Observação', icon: 'fa fa-search',
                        texts: [
                            {tpl:'tpl-inner', parameterclicked: true, parameter: 'observacoes'}
                        ]
                    }
                },
                indique: {
                    id:'modal-indique',
                    ctrl: 'modalDefaultCtrl',
                    size: 'md',
                    content: {tpl: 'tpl-form', classe: 'indique', modal: true,
                        header: {
	                        title: {classe: 'text-center', text: 'Indique já', icon: 'cadastro'}
	                    },
                        btns: [
                            {name: 'save', title: 'Enviar indicação', visibled: true, classe: 'btn-secondary', icon: 'icon ind-alerta',
                                service: {
                                    send: {url: 'indicacoes/save', reload: [
                                        {place: 'menu', id: 'menu-indicacao'},
                                        {place: 'main', id: 'table-indicacao'},
                                        {place: 'main', id: 'footer-indicacao'},
                                    ]},                                    
                                }, 
                            },
                        ],
                        service: {
                            call: {objresult: 'load', urls: [
                                {url: 'indicacoes/find/', parameter: 'idUsuario'},
                                {url: '/contato/', parameterclicked: true, parameter: 'cdcontato'},
                            ]},                             
                        },
                        detail: [
                            {classe: 'titleBorderNn', 
                            	title: {
	                        		description: {classe: 'text-center', text: 'Preencha os dados abaixo para fazer sua indicação.'}
	                        	},
                                form: [
                                    {
                                        style: 'inline',
                                        campos: [
                                            {nameTpl: 'input', type: 'hidden', name:'cdcontato', id: 'cdcontato', labelHide: true, required: false, size: 0, inputSize: 0, labelSize: 0},
                                            {nameTpl: 'input', type: 'hidden', name:'nologinWeb', id: 'nologinWeb', parameter: 'idUsuario',  labelHide: true, required: true, size: 0, inputSize: 0, labelSize: 0},
                                            {nameTpl: 'input', type: 'text', name:'cnpj', id: 'cnpj', labelName: 'CNPJ', required: false, size: 12, inputSize: 9, labelSize: 3},
                                        ]
                                    },
                                    {
                                        style: 'inline',
                                        campos: [
                                            {nameTpl: 'input', type: 'text', name:'nomeEmpresa', id: 'nomeEmpresa', labelName: 'Nome da empresa:', required: true, size: 12, inputSize: 9, labelSize: 3},
                                        ]
                                    },
                                    {
                                        style: 'inline',
                                        campos: [
                                            {nameTpl: 'input', type: 'text', name:'nomeCliente', id: 'nomeCliente', labelName: 'Nome do cliente:', required: true, size: 12, inputSize: 9, labelSize: 3},
                                        ]
                                    },
                                    {
                                        style: 'inline',
                                        campos: [
                                            {nameTpl: 'input', type: 'email', name:'email', id: 'email', labelName: 'Email:', required: true, size: 12, inputSize: 9, labelSize: 3},
                                        ]
                                    },
                                    {
                                        style: 'inline',
                                        campos: [
                                            {nameTpl: 'input', type: 'tel', name:'telefone1', id: 'telefone1', labelName: 'Telefone:', required: true, size: 7, inputSize: 6, labelSize: 5},
                                            {nameTpl: 'input', type: 'tel', name:'telefone2', id: 'telefone2', labelName: 'Celular:', required: false, size: 5, inputSize: 9, labelSize: 3},
                                        ]
                                    },
                                    {
                                        style: 'inline',
                                        campos: [
                                            {nameTpl: 'input', type: 'text', name:'qtdeCartoes', id: 'qtdeCartoes', labelName: 'Quantidade de cartões:', classLabel:'lineHeightMin', required: true, size: 12, inputSize: 5, labelSize: 3},
                                        ]
                                    },
                                    {
                                        style: 'inline',
                                        campos: [
                                            {nameTpl: 'input', type: 'moeda', name:'valorVenda', id: 'valorVenda', labelName: 'Valor da venda:', required: true, size: 12, inputSize: 5, obs: '( 99.999,99 )', obsSize: 3, labelSize: 3, maxlength: 20},
                                        ]
                                    },
                                    {
                                        style: 'inline',
                                        campos: [
                                            {nameTpl: 'textarea', name:'observacao', id: 'observacao', labelName: 'Observação:', required: false, size: 12, inputSize: 9, labelSize: 3, row: 5},
                                        ]
                                    }, 
                                ]
                            }
                        ]
                    }
                },
                resgate: {
                    id:'modal-resgate',
                    ctrl: 'modalDefaultCtrl',
                    size: 'md',
                    content: {tpl: 'tpl-form', classe: 'resgate', modal: true,
                        header: {
	                        title: {classe: 'text-center', text: 'Resgate', icon: 'cadastro'}
	                    },
                        btns: [
                            {name: 'save', title: 'Resgatar produto', visibled: true, classe: 'btn-secondary', icon: 'icon ind-alerta'},
                        ],
                        service: {
                            call: {objresult: 'load', urls: [
                                {url: 'premiocondicao/find/', parameterclicked: true, parameter: 'premio'},                                
                            ]},     
                            send: {url: 'intencaoresgate/save/', parameter: 'idUsuario', personreload: true},                   
                        },
                        msg: {
                            success: 'Resgate realizado com sucesso!'
                        },
                        detail: [
                            {classe: 'titleBorderNn', 
                            	title: {
	                        		description: {classe: 'text-left', text: 'Preencha os dados abaixo para fazer seu resgate.'}
	                        	},
                                form: [
                                    {
                                        style: 'inline col-md-5 right',
                                        campos: [
											{nameTpl: 'input', type: 'hidden', name:'codprg', id: 'codprg', labelHide: true, required: false, size: 0, inputSize: 0, labelSize: 0},
                                            {nameTpl: 'input', type: 'hidden', name:'codcat', id: 'codcat', labelHide: true, required: false, size: 0, inputSize: 0, labelSize: 0},
											{nameTpl: 'input', type: 'hidden', name:'codpre', id: 'codpre', labelHide: true, required: false, size: 0, inputSize: 0, labelSize: 0},
                                            {nameTpl: 'image', name:'foto', id: 'foto', labelHide: true, size: 12, inputSize: 12, labelSize: 0,
                                                parameterclicked: true, parameter: 'image'
                                            },
                                        ]
                                    },
                                    {
                                        style: 'inline col-md-7',
                                        campos: [
                                            {nameTpl: 'select', type: 'select', name:'sqcondicao', id: 'sqcondicao', labelName: 'Vale compra R$:', required: true, size: 12, inputSize: 7, labelSize: 5,
                                                service: {
                                                    events: [
                                                        {objresult: 'load', event: 'change', edit: true, errordefault: true, 
                                                            conditional: {obj: [
                                                                {parameter: 'qtdade', value: 'lineValue'}
                                                            ]},
                                                            urls: [
                                                            {url: 'premiocondicao/find/', parameter: 'idUsuario'},
                                                            {url: '/codpre/', parameterclicked: true, parameter: 'premio'},
                                                            {url: '/codcat/', parameterform: true, parameter: 'codcat'},
                                                            {url: '/condicao/', parameterform: true, parameter: 'sqcondicao'},
                                                            {url: '/qtd/', parameterform: true, parameter: 'qtdade'},                                                            
                                                            ]
                                                        },
                                                    ]
                                                                                                                            
                                                }, 
                                            },
                                        ]
                                    },
                                    {
                                        style: 'inline col-md-7',
                                        campos: [
                                            {nameTpl: 'input', type: 'number', name:'qtdade', id: 'qtdade', labelName: 'Quantidade:', required: true, size: 12, inputSize: 7, labelSize: 5,
                                                service: {
                                                    events: [
                                                        {objresult: 'load', event: 'focusout', edit: true, errordefault: true,
                                                            conditional: {mgsalert: 'Selecione um Vale compra', obj: [
                                                                {parameter: 'sqcondicao', value: 'lineValue'}
                                                            ]},
                                                            urls: [
                                                            {url: 'premiocondicao/find/', parameter: 'idUsuario'},
                                                            {url: '/codpre/', parameterclicked: true, parameter: 'premio'},
                                                            {url: '/codcat/', parameterform: true, parameter: 'codcat'},
                                                            {url: '/condicao/', parameterform: true, parameter: 'sqcondicao'},
                                                            {url: '/qtd/', parameterform: true, parameter: 'qtdade'},                                                            
                                                            ]
                                                        },
                                                    ]                                                                                                                            
                                                },
                                            },
                                        ]
                                    },
                                    {
                                        style: 'inline col-md-7',
                                        campos: [
                                            {nameTpl: 'input', type: 'moeda', name:'total', id: 'total', labelName: 'Total:', disabled: true, required: true, size: 12, inputSize: 7, labelSize: 5, formatreload: true},
                                        ]
                                    },
                                    {
                                        style: 'inline col-md-7',
                                        campos: [
                                            {nameTpl: 'input', type: 'moeda', name:'saldo', id: 'saldo', labelName: 'Saldo de Pontos:', disabled: true,  required: true, size: 12, inputSize: 7, labelSize: 5, formatreload: true},
                                        ]
                                    },
                                    {
                                        style: 'inline col-md-7',
                                        campos: [
                                            {nameTpl: 'input', type: 'password', name:'senha', id: 'senha', labelName: 'Senha:', required: true, size: 12, inputSize: 7, labelSize: 5, formatreload: true},
                                        ]
                                    }, 
                                    {
                                        style: 'inline col-md-12 box-scroll',
                                        campos: [
                                            {nameTpl: 'inputtext', name:'textoCondicaoEntrega', id: 'textoCondicaoEntrega', classe:'listRegulamento', labelHide: true, size: 12, inputSize: 12, formatreload: true},
                                        ]
                                    }, 
                                    {
                                        style: 'inline col-md-12',
                                        campos: [
                                            {nameTpl: 'radio', type: 'checkbox', name:'condicaoEntrega', id: 'condicaoEntrega', labelName: 'Li e concordo com as condições de entrega', required: true, size: 12, inputSize: 12, labelSize: 0},
                                        ]
                                    },
                                ]
                            },                        
                        ]
                    }
                }
            },
            pages: {
                login: {
                    classe: 'pagLogin',
                    menu: ['login'],
                    banner: ['ganhepontoscadastro'],
                },
                //PAGINA DE LOGIN NO MEIO
                /*login: {
                    class: 'pagLogin',
                    hide: {
                        //header: true,
                        menu: true,
                        headerlogin: true,
                        footer: true,
                    },
                    content: {partial: ['login']}
                },*/
                index: {
                    classe: 'pagIndex',
                    page: 'index',
                    menu: ['extrato', 'indicacao'],
                    banner: ['ganhepontos'],

                    content: [
                        {tpl: 'tpl-box', classe: 'box list list-icon catalogo', tplContent:'box-text', 
                            title: 'Catálogo de prêmios',
                            icon: 'catalogo',
                            text: 'Confira os prêmios que você pode resgatar em nosso catálogo. São diversas opções em cartões-presente.',
                            btn: [{title: 'ver catálogo', classe:"", url: 'catalogo'}]
                        },
                        {tpl: 'tpl-box', classe: 'box list list-icon indique', tplContent:'box-text', 
                            title: 'Indique já',
                            icon: 'indique',
                            text: 'Indique seus clientes para comprar VALE-VIAGEM CVC, acumule pontos e troque por Prêmios!',
                            btn: [{title: 'Quero indicar', classe:"", url: 'indique', openmodal: true}]
                        },
                        {tpl: 'tpl-box', classe: 'box list list-icon contato', tplContent:'box-text', 
                            title: 'Contato',
                            icon: 'contato',
                            text: 'Em caso de dúvidas entre em contato pelo nosso canal on-line.',
                            btn: [{title: 'Fale conosco', classe:"", url: 'contato'}]
                        }
                    ]
                },
                cadastro: {
                    classe: 'pagCadastro',
                    redirectlogin: 'perfil', // pagina ou not para nao redirecionar - redirect default encontra-se em 'layout.// true ou pagina'
                    redirectauth: true, // true ou pagina
                    menu: ['login'],
                    content: {tpl: 'tpl-form', classe: 'cadastro',
                        header: {
	                        title: {classe: 'text-center', text: 'Cadastro', icon: 'cadastro'}
	                    },
                        btns: [
                            {name: 'save', title: 'Cadastre-se', visibled: true, classe: 'btn-primary', url: 'index'},
                        ],
                        service: {
                            call: {url: 'participante/find/', objresult: 'load', parameter: '0'}, 
                            send: {url: 'participante/save'},
                        },
                        detail: [
                            {classe: 'titleBorderNn marginBottom0', 
                            	title: {
	                        		description: {classe: 'text-left', text: 'Mantenha seus dados sempre atualizados',}
	                        	},
                                insertpartials: ['formcadastro'],                                                                     
                            },
                            {classe: 'contentParameters0',
                                form: [
                                    {
                                        style: 'inline border',
                                        campos: [
                                            {nameTpl: 'input', type: 'password', name:'passwd', id: 'passwd', labelName: 'Senha:', required: true, size: 7, inputSize: 7, labelSize: 3},
                                            {nameTpl: 'input', type: 'password', name:'confpasswd', id: 'confpasswd', labelName: 'Confirmar senha:', required: true, size: 5, inputSize: 9, labelSize: 3},
                                        ]
                                    },                                    
                                ],
                            },
                            {title: 'Regulamento', classe: 'titleBorderNn box-scroll marginBottom0',
                                insertpartials: ['regulamento']
                            },
                            {classe: 'contentParameters0',
                                form: [                               
                                    {
                                        style: 'inline',
                                        campos: [
                                            {nameTpl: 'radio', type: 'checkbox', name:'flagconcordo', id: 'flagconcordo', labelName: 'Li e concordo com o Regulamento', required: true, size: 12, inputSize: 8, labelSize: 3},
                                        ]
                                    }          
                                ]
                            }
                        ]
                    }
                },

                contato: {
                    classe: 'pagContato',
                    menu: ['extrato', 'indicacao'],
                    content: {tpl: 'tpl-form', classe: 'contato',
                    	header: {
	                        title: {text: 'Fale conosco'}
	                    },
                        btns: [
                            {name: 'save', title: 'Enviar', visibled: true, classe: 'btn-primary'},
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
	                        		description: {text: 'Em caso de dúvidas , sugestões ou reclamações  preencha os campos abaixo e aguarde que em breve entraremos em contato'}
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
                                            {nameTpl: 'select', type: 'select', name:'cdassunto', id: 'cdassunto', labelName: 'Assunto:', required: true, size: 12, inputSize: 5, labelSize: 3,
                                                optionsSelecione: true
                                            }
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
                },

                regulamento: {
                    classe: 'pagRegulamento',
                    redirectlogin: 'not',
                    menu: ['extrato', 'indicacao'],
                    content: {tpl: 'tpl-form', classe: 'regulamento',
                    	header: {
	                        title: {text: 'Regulamento'}
	                    },
                        detail: [
                            {insertpartials: ['regulamento']}
                        ]
                    }  
                },

                programa: {
                    classe: 'pagPrograma',
                    menu: ['extrato', 'indicacao', 'bnTroquePontos'],
                    content: {tpl: 'tpl-page-texts', classe: 'programa',  title: 'O Programa', 
                        detail: [
                            {classline:'img-right', description: '<p>A promoção <strong>"Indicou, Ganhou!"</strong> da <strong>INCENTIVALE</strong> é uma ação promocional promovida em conjunto com a <strong>CVC</strong> que visa premiar seus agentes de viagem.</p>'
                            + '<p>Esta promoção será válida durante o período de 01/11/2014 a 01/01/2015 e suas regras e funcionamento estão disponíveis em: '
                            + '<a href="http://www.incentivale.com.br/indicouganhou/" title="Indicou Ganhou" target="blank">www.incentivale.com.br/indicouganhou</a></p>'
                            + '<p>Indicando para a Incentivale  empresas interessadas em adquirir cartões <strong>VALE-VIAGEM CVC</strong>, o participante acumulará pontos que podem ser trocados por prêmios. São Cartões Presente de mais de 40 marcas do varejo nacional.</p>'
                            + '<p>O premiado, pode também optar por acumular seus pontos e trocar por prêmios de maior valor ao final de cada mês da campanha.</p>'
                            },
                            {tpl: 'tpl-carousel', classe:'box box-tertiary carousel', slideShow: 5, slideToScroll: 1,
                                result: {
                                    line: [
                                        {field: [
                                            {titleLink: 'Pão de Açucar', image: 'assets/images/parceiros/pao-de-acucar.jpg'},
                                            {titleLink: 'Netshoes', image: 'assets/images/parceiros/netshoes.jpg'},
                                            {titleLink: 'Extra Hipermercados', image: 'assets/images/parceiros/extra.jpg'},
                                            {titleLink: 'O Boticário', image: 'assets/images/parceiros/boticario.jpg'},
                                            {titleLink: 'Centauro', image: 'assets/images/parceiros/centauro.jpg'}
                                        ]},
                                    ]
                                }
                            },
                            {classline:'col-md-7', title: 'Como funciona', 
                                btn: [{title: 'Clique aqui e <small>Faça sua indicacao</small>', icon: 'fa fa-star', classe:'btn-secondary', openmodal: true, url: 'indique'}],
                                img: {tpl: 'banner-middle', classe: 'pull-right col-md-5 banner-middle', title: 'Troque seus pontos', img: 'assets/images/banners/tbl-premiacao.png'},
                                description: '<p>Para participar o Agente de viagens deverá acessar o site, efetuar seu cadastro e preencher suas indicações.Ao indicar uma empresa para a Incentivale, o agente receberá uma atualização do seu saldo até 48h após a indicação, ou até que a empresa indicada possa ser contatada e comprove seu interesse pelo produto. </p>'
                                + '<p>Caso o interesse da empresa não seja confirmado, será contabilizado como Indicação Não Válida.</p>'
                                + '<p>Serão 5 indicações máximas por mês. A partir da 6ª indicação, será sim permitido utilizá-la no mês seguinte, que também terá um limite de até 5 indicações e assim sucessivamente durante o período de vigência da campanha.</p>'
                                + '<p>Cada indicação vale 25 pontos sendo que a 5º indicação dentro do mesmo mês vale 200 pontos e  caso uma indicação torne-se uma venda e essa venda tenha <strong>valor superior a R$20.000,00 (vinte mil reais)</strong> essa indicação valerá 50 pontos bônus, limitados a 5 indicações mensais. Desta forma, você ganhar até  450 pontos no mês!</p>'
                            },
                            
                        ]
                    }
                },

                indique: {
                    classe: 'pagIndique',
                    menu: ['extrato', 'indicacao'],
                    content: {tpl: 'tpl-page-texts', classe: 'indique',  title: 'Minhas Indicações', subtitle: "Acompanhe suas indicações aqui.", 
                        detail: [
                            {tpl: 'tpl-pag-table', classe:'table-primary', 
                                header: {
                                    //title: 'Setembro 2014',                                        
                                    filter: {
                                        show: false,
                                        detail: [
                                            {
                                                btn: {name: 'load', title: 'Filtrar', visibled: true, classe: 'btn-primary', filter: true},
                                                form: [                   
                                                    {
                                                        style: 'horizontal',
                                                        campos: [
                                                            {nameTpl: 'select', type: 'select', name:'periodo', id: 'periodo', labelName: 'Perído:', required: false, size: 10, inputSize: 8, labelSize: 4,
                                                                optionsSelecione: false, options: {obj: [
                                                                    {id: '0', description: 'Últimos 30 dias'},
                                                                    {id: '1', description: 'Últimos 60 dias'}
                                                                ]},
                                                            },
                                                        ]
                                                    }
                                                ]
                                            },
                                        ],
                                    },
                                },
                                table: {id:'table-indicacao', tpl: 'tpl-table',
                                    service: {
                                        call: {url: 'indicacoes/', objresult: 'load', parameter: 'idUsuario'},                                         
                                    },                                    
                                    aditionals: {
                                        btnLine: [
                                            {icon: 'fa fa-pencil', classe:'', openmodal:true, url: 'indique', 
                                                formdisabled: {
                                                    parameterclicked: true, parameter: 'naoPossuiStatusAtendimento', parametervalue: 1,
                                                    btns: [{name: 'save', parameter: 'naoPossuiStatusAtendimento', parametervalue: 1}]
                                                }
                                            },
                                            {icon: 'fa fa-search', classe:'', openmodal:true, url: 'observacao', parameterclicked: true, parameter: 'observacoes'}
                                        ],                                        
                                        //detailopen: {url: 'indique', openmodal: true, },
                                        footerhidden: true,
                                    },
                                    titles: [
                                        {width: '20%'},
                                        {width: '20%'},
                                        {width: '5%'},
                                        {width: '5%'},
                                        {width: '20%'},
                                        {hidden: true},
                                        {hidden: true},
                                        {hidden: true},
                                    ],
                                    body:[
                                        {},
                                        {},
                                        {},
                                        {},
                                        {},
                                        {hidden: true},
                                        {hidden: true},
                                        {hidden: true},                                        
                                    ],                                    
                                    footer:[]                                    
                                },
                                footer: {id:'footer-indicacao', title: 'Saldo', classe:"list-box", 
                                    content: {tpl: 'tpl-list', classe:'list-box format1', 
                                        service: {
                                            call: {url: 'indicacoes/', objresult: 'load', parameter: 'idUsuario', filter: 'footer'},
                                        },
                                        aditionals: {
                                            field: {aliasclass: 'title', nameclass: 'description', valueclass: 'result'}
                                            /*iconLine: {type:'odd', icons: ['ind-negativo', 'ind-ativo']},
                                            linelimite: 2,*/
                                        },                   
                                        body:[{icon: 'ind-negativo'}, {icon: 'ind-ativo'}],
                                    }
                                }
                            },
                        ]
                    }
                },

                resgate: {
                    classe: 'pagResgate',   
                    banner: ['catalogo'],
                    //menu: ['extrato', 'indicacao'],                 
                    //title: 'Resgate',
                    content: {tpl: 'tpl-page-texts', classe: 'resgate',  title: 'Escolha seu prêmio', subtitle: '',
                        detail: [     
                            {tpl: 'tpl-form', classe: 'form-search', 
                                btns: [
                                    {name: 'search', type: 'submit', title: 'Buscar', visibled: true, classe: 'btn-default'},
                                ],
                                service: {
                                    search: {url: 'premio/find/', objresult: 'search', parameter: 'search', reload:[
                                        {place: 'main', id: 'catalogo'}
                                    ]},
                                },                                
                                detail: [
                                    {
                                        form: [
                                            {
                                                style: 'inline',
                                                campos: [
                                                    {nameTpl: 'input', type: 'input', name:'search', id: 'search', placeholder: 'Procurar', labelHide: true, required: true, size: 11, inputSize: 12},
                                                ]
                                            }, 
                                                                                                                           
                                        ]
                                    }
                                ]
                            },

                            {id: 'catalogo',tpl: 'tpl-list', classe:'list-box',   
                                service: {
                                    call: {url: 'premio/find/', objresult: 'load', parameter: '0'},                      
                                }, 
                                aditionals: {
                                    field: {classe: 'item', aliasclass: 'title', aliasclassheader: 'titleheader', nameclass: 'description', valueclass: 'result', url: 'resgate', openmodal: true, captureobj: true},                                    
                                },                                               
                                
                            }                       
                        ]
                    },
                    
                },

                minhaconta: {
                    pages: {      
                        perfil: {
                            classe: 'pagPerfil',
                            menu: ['extrato', 'indicacao'],
                            content: {tpl: 'tpl-form', classe: 'cadastro', edit: true,
                                header: {
			                        title: {classe: 'text-left', text: 'Meus dados'}
			                    },
                                btns: [
                                    {name: 'save', title: 'Atualizar', visibled: true, classe: 'btn-primary', url: 'minhaconta'},
                                ],
                                service: {
                                    call: {url: 'participante/find/', objresult: 'load', parameter: 'idUsuario'}, 
                                    send: {url: 'participante/save'},
                                },
                                aditionals:{
                                    disabled: [{name: 'cpf'}],
                                },
                                detail: [
                                    {classe: 'titleBorderNn marginBottom0',
                                        insertpartials: ['formcadastro'],                                                                     
                                    },
                                    {classe: 'contentParameters0',
                                        form: [
                                            {
                                                style: 'inline border',
                                                campos: [
                                                    {nameTpl: 'input', type: 'password', name:'passwd', id: 'passwd', labelName: 'Senha:', required: false, size: 7, inputSize: 7, labelSize: 3},
                                                    {nameTpl: 'input', type: 'password', name:'confpasswd', id: 'confpasswd', labelName: 'Confirmar senha:', required: false, size: 5, inputSize: 9, labelSize: 3},
                                                ]
                                            },
                                            {
                                                //style: 'inline',
                                                //campos: [
                                                //    {nameTpl: 'radio', type: 'checkbox', name:'flagemail', id: 'flagemail', labelName: 'Desejo receber novidades em meu email', required: false, size: 12, inputSize: 8, labelSize: 3},
                                                //    {nameTpl: 'input', type: 'hidden', name:'edit', id: 'edit', labelHide: true, required: false, size: 0, value: true},
                                                //]
                                            }   
                                        ],
                                    },
                                                          
                                ]
                            }
                        },                  
                        extrato: {
                            classe: 'pagExtrato',
                            menu: ['extrato', 'indicacao'],
                            content: {tpl: 'tpl-page-texts', classe: 'extrato',  title: 'Extrato detalhado', subtitle: "Confira abaixo a sua pontuação detalhada do Programa!", 
                                detail: [
                                    {tpl: 'tpl-pag-table', classe:'table-default', 
                                        header: {
                                            title: 'Setembro 2014',                                        
                                            filter: {
                                                show: false,
                                                detail: [
                                                    {
                                                        btn: {name: 'load', title: 'Filtrar', visibled: true, classe: 'btn-primary', filter: true},
                                                        form: [                   
                                                            {
                                                                style: 'horizontal',
                                                                campos: [
                                                                    {nameTpl: 'select', type: 'select', name:'periodo', id: 'periodo', labelName: 'Perído:', required: false, size: 10, inputSize: 8, labelSize: 4,
                                                                        optionsSelecione: false, options: {obj: [
                                                                            {id: '0', description: 'Últimos 30 dias'},
                                                                            {id: '1', description: 'Últimos 60 dias'}
                                                                        ]},
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                ],
                                            },
                                        },
                                        table: {tpl: 'tpl-table',
                                            service: {
                                                call: {url: 'extrato/', objresult: 'load', parameter: 'idUsuario'},
                                            },
                                            titles: [
                                                {width: '20%'},
                                                {width: '30%'},
                                                {width: '20%'},
                                                {width: '15%'},
                                                {width: '15%'},
                                                {hidden: true},
                                            ],
                                            body:[
                                                {} ,
                                                {},
                                                {},
                                                {},
                                                {},
                                                {hidden: true},
                                            ],
                                            footer:[
                                                {colspan: 5, alias: 'Saldo Total', classe:"text-right"},                                        
                                            ],
                                            btn1: [{title: 'Ir para home', classe:"btn-primary", url: 'index' }]
                                        }
                                    },
                                ]
                            },
                            pages:{
                                historico: {
                                    classe: 'pagExtrato',
                                    menu: ['extrato', 'indicacao'],
                                    content: {tpl: 'tpl-page-texts', classe: 'extrato-historico', title: 'Meus resgates', subtitle: "Confira abaixo o histórico de resgates.", 
                                        detail: [
                                            {tpl: 'tpl-pag-table', classe:'table-default',
                                                header: {
                                                    title: 'Setembro 2014',                                        
                                                    filter: {
                                                        show: false,
                                                        detail: [
                                                            {
                                                                btn: {name: 'load', title: 'Filtrar', visibled: true, classe: 'btn-primary', filter: true},
                                                                form: [                   
                                                                    {
                                                                        style: 'horizontal',
                                                                        campos: [
                                                                            {nameTpl: 'select', type: 'select', name:'periodo', id: 'periodo', labelName: 'Perído:', required: false, size: 10, inputSize: 8, labelSize: 4,
                                                                                optionsSelecione: false, options: {obj: [
                                                                                    {id: '0', description: 'Últimos 30 dias'},
                                                                                    {id: '1', description: 'Últimos 60 dias'}
                                                                                ]},
                                                                            },
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                        ],
                                                    },
                                                },
                                                table: {tpl: 'tpl-table',
                                                    service: {
                                                        call: {url: 'resgatehistorico/', objresult: 'load', parameter: 'idUsuario'},
                                                    },
                                                    titles: [
                                                        {width: '15%'},
                                                        {width: '15%'},
                                                        {width: '15%'},
                                                        {width: '15%'},
                                                        {width: '15%'},
                                                        {width: '15%'},
                                                        {hidden: true},
                                                    ],
                                                    body:[
                                                        {},
                                                        {},
                                                        {},
                                                        {},
                                                        {},
                                                        {},
                                                        {hidden: true},
                                                    ],
                                                    btn1: [{title: 'Ir para home', classe:"btn-primary", url: 'index' }]
                                                }
                                            },
                                        ]
                                    },
                                },
                            }
                        },
                    }
                }
            }
        }             
    }
});