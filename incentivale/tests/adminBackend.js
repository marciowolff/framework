
external.constant("adminBackendData", {
    user : [
        { 
            Id: 1, 
            name: 'CVC',                         
            logo: {title: "CVC", img: "http://localhost:4000/assets/images/logo.png"},
            logoApp: {title: "Indicou ganhou!", img: "http://localhost:4000/assets/images/logoApp.png"},
            logoDesenv: {title:"IncentiVale", img: "http://localhost:4000/assets/images/logoDesenv.jpg", url: ''},
            layout: {
                header: {
                    color: "#FFF"
                },
                pagesUrl: {
                    index: {title: 'Index', href:'/index'},
                    login: {title: "Login", href:"/login"},
                    cadastro: {title: "cadastro", href:"/cadastro"},
                    contato: {title: "contato", href:"/contato"},
                    regulamento: {title: "regulamento", href:"/regulamento"},
                    programa: {title: "programa", href:"/programa"},
                    indique: {title: "indique", href:"/indicacao"},
                    extrato: {title: "extrato", href:"/extrato"}  
                },
                nav: [
                    {title: 'Fale conosco', classe: 'contato', url: '/contato'},
                    {title: 'Regulamento', classe: 'regulamento', url: '/regulamento'},
                    {title: 'Indique', classe: 'indique', url: '/indique', openmodal: true},
                    {title: 'Catálogo de prêmios', classe: 'catalogo', url: '/catalogo'},
                    {title: 'O programa', classe: 'programa', url: '/programa'},
                    {title: 'Home', classe: 'home', url: '/index'},
                ],
                menus: {
                    login: {tpl: 'tpl-box', classe: 'box box-default form login', tplContent:'box-login', title: 'Seja bem vindo(a) a <strong>Promoção indicou ganhou</strong>', 
                        btn: [
                            {title: 'Entrar', classe:"btn-primary", url: '/index', formsend: true},
                            {title: 'Esqueci a senha', classe:"btn-link", url: '/senha', openmodal: true}
                        ]
                    },
                    extrato: {tpl: 'tpl-box', classe: 'box box-default', tplContent:'box-extrato', title: 'Extrato Rápido', btn: [{title: '+ Detalhes', classe:"btn-primary", url: '/extrato'}]},
                    indicacao: {tpl: 'tpl-box', classe: 'box box-primary', tplContent:'box-indicacoes', contentClass:'list-box', title: 'Minhas indicações', btn: [{title: 'Acompanhe sua indicação', classe:"btn-default", url: '/indicacao'}]},
                    bnTroquePontos: {tpl: 'banner-middle', classe: 'banner-middle', title: 'Troque seus pontos', img: 'banners/menu.png', url: '/catalogo'}
                },
                modals: {
                    password: {
                        ctrl: 'modalPasswordCtrl',
                        size: 'sm',
                        content: {tpl: 'tpl-form', classe: 'password', title: 'Esqueci minha senha', titleAlign: 'text-center', modal: true,
                            btns: [
                                {name: 'saveForm', text: 'Enviar', visibled: true, classe: 'btn-primary'},
                            ],
                            detail: [
                                {classe: 'titleBorderNn', description: 'Insira o seu e-mail cadastrado e enviaremos sua senha.', descriptionAlign: 'text-center',
                                    form: [
                                        {
                                            style: 'inline',
                                            campos: [
                                                {nameTpl: 'input', type: 'email', name:'mail', id: 'mail', labelName: 'Email:', required: true, size: 12, inputSize: 9, labelSize: 2},
                                            ]
                                        },                                        
                                    ]
                                }
                            ]
                        }
                    },
                    observacao: {
                        ctrl: 'modalObservacaoCtrl',
                        size: 'sm',
                        content: {tpl: 'tpl-text', classe: 'observacao', title: 'Observação', icon: 'fa fa-search',
                            texts: [
                                {classe:"text-center", value: 'Cliente ainda não tem uma data para fecahr a venda, depende da apuração dos nomes dos premiados.'}
                            ]
                        }
                    },
                    indique: {
                        ctrl: 'modalIndiqueCtrl',
                        size: 'md',
                        content: {tpl: 'tpl-form', classe: 'indique', title: 'Indique já', titleAlign: 'text-center', icon: 'cadastro', modal: true,
                            btns: [
                                {name: 'saveForm', text: 'Enviar indicação', visibled: true, classe: 'btn-secondary', icon: 'icon ind-alerta'},
                            ],
                            detail: [
                                {classe: 'titleBorderNn', description: 'Preencha os dados abaixo para fazer sua indicação.', descriptionAlign: 'text-center',
                                    form: [
                                        {
                                            style: 'inline',
                                            campos: [
                                                {nameTpl: 'input', type: 'text', name:'nameEmp', id: 'nameEmp', labelName: 'Nome da empresa:', required: true, size: 12, inputSize: 9, labelSize: 3},
                                            ]
                                        },
                                        {
                                            style: 'inline',
                                            campos: [
                                                {nameTpl: 'input', type: 'text', name:'nameClient', id: 'nameClient', labelName: 'Nome do cliente:', required: true, size: 12, inputSize: 9, labelSize: 3},
                                            ]
                                        },
                                        {
                                            style: 'inline',
                                            campos: [
                                                {nameTpl: 'input', type: 'email', name:'mail', id: 'mail', labelName: 'Email:', required: true, size: 12, inputSize: 9, labelSize: 3},
                                            ]
                                        },
                                        {
                                            style: 'inline',
                                            campos: [
                                                {nameTpl: 'input', type: 'tel', name:'tel', id: 'tel', labelName: 'Telefone:', required: true, size: 7, inputSize: 6, labelSize: 5},
                                                {nameTpl: 'input', type: 'tel', name:'cel', id: 'cel', labelName: 'Celular:', required: true, size: 5, inputSize: 9, labelSize: 3},
                                            ]
                                        },
                                        {
                                            style: 'inline',
                                            campos: [
                                                {nameTpl: 'input', type: 'text', name:'qtdCartoes', id: 'qtdCartoes', labelName: 'Quantidade de cartões Vale-Viagem CVC:', classLabel:'lineHeightMin', required: true, size: 12, inputSize: 5, labelSize: 3},
                                            ]
                                        },
                                        {
                                            style: 'inline',
                                            campos: [
                                                {nameTpl: 'input', type: 'text', name:'valVenda', id: 'valVenda', labelName: 'Valor da venda:', required: true, size: 12, inputSize: 5, labelSize: 3},
                                            ]
                                        },
                                        {
                                            style: 'inline',
                                            campos: [
                                                {nameTpl: 'textarea', name:'obs', id: 'obs', labelName: 'Observação:', required: true, size: 12, inputSize: 9, labelSize: 3, row: 5},
                                            ]
                                        }, 
                                    ]
                                }
                            ]
                        }
                    }
                },
                pages: {
                    login: {
                        menu: ['login'],
                        banner: {
                            title: '<strong>Ganhe pontos toda vez</strong> que seu indicado <small>comprar vale-viagens CVC!</small>',
                            //img: {url:'', alt: ''},
                            itens: '<p>Veja como é fácil participar</p>'
                                +'<ul>'
                                    +'<li>Acumule Pontos</strong> a cada venda ativa</li>'
                                    +'<li><strong>Indique clientes</strong> para comprar vale viagens da CVC</li>'
                                    +'<li><strong>Troque por Prêmios</strong> exclusivos dentro do catálogo online</li>'
                                +'</ul>',
                            btn: [{title: 'Participe <small>clique aqui e cadastre-se</small>', icon: 'fa fa-star', classe:'btn-secondary',  url: '/cadastro'}]
                        }
                    },
                    index: {
                        menu: ['extrato', 'indicacao'],
                        banner: {
                            title: '<strong>Ganhe pontos toda vez</strong> que seu indicado <small>comprar vale-viagens CVC!</small>',
                            //img: {url:'', alt: ''},
                            itens: '<p>Veja como é fácil participar</p><ul><li>Acumule Pontos</strong> a cada venda ativa</li><li><strong>Indique clientes</strong> para comprar vale viagens da CVC</li><li><strong>Troque por Prêmios</strong> exclusivos dentro do catálogo online</li></ul>',
                            btn: [
                                {title: 'Clique aqui e <small>Faça sua indicacao</small>', icon: 'fa fa-star', classe:'btn-secondary', openmodal:true, url: 'indique'}
                            ]
                        },
                        content: [
                            {tpl: 'tpl-box', classe: 'box list list-icon catalogo', tplContent:'box-text', 
                                title: 'Catálogo de prêmios',
                                icon: 'catalogo',
                                text: 'Confira os prêmios que você pode resgatar em nosso catálogo. São diversas opções em cartões-presente.',
                                btn: [{title: 'ver catálogo', classe:"", link: 'catalogo'}]
                            },
                            {tpl: 'tpl-box', classe: 'box list list-icon indique', tplContent:'box-text', 
                                title: 'Indique já',
                                icon: 'indique',
                                text: 'Indique seus clientes para comprar vale viagens da CVC, acumule pontos e troque por Prêmios!',
                                btn: [{title: 'Quero indicar', classe:"", link: 'indique', openmodal: true}]
                            },
                            {tpl: 'tpl-box', classe: 'box list list-icon contato', tplContent:'box-text', 
                                title: 'Contato',
                                icon: 'contato',
                                text: 'Em caso de dúvidas entre em contato pelo telefone 11 5555.5555 ou por meio de nosso canal on-line.',
                                btn: [{title: 'Fale conosco', classe:"", link: 'contato'}]
                            }
                        ]
                    },
                    cadastro: {
                        menu: ['login'],
                        content: {tpl: 'tpl-form', classe: 'cadastro', title: 'Cadastro', titleAlign: 'text-center', icon: 'cadastro', 
                            btns: [
                                {name: 'saveForm', text: 'Enviar', visibled: true, classe: 'btn-primary'},
                            ],
                            detail: [
                                {classe: 'titleBorderNn', description: 'Preencha o cadastro abaixo para participar da Promoção.', descriptionAlign: 'text-center',
                                    form: [
                                        {
                                            style: 'inline',
                                            campos: [
                                                {nameTpl: 'input', type: 'text', name:'name', id: 'name', labelName: 'Nome Completo:', required: true, size: 12, inputSize: 9, labelSize: 3},
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
                                                {nameTpl: 'input', type: 'email', name:'mail', id: 'mail', labelName: 'Email:', required: true, size: 12, inputSize: 5, labelSize: 3},
                                            ]
                                        },
                                        {
                                            style: 'inline',
                                            campos: [
                                                {nameTpl: 'input', type: 'date', name:'dtNascimento', id: 'dtNascimento', labelName: 'Data de Nascimento:', obs: '(xx / xx / xxxx)', required: true, size: 12, obsSize: 2, inputSize: 3, labelSize: 3},
                                            ]
                                        },
                                        {
                                            style: 'inline',
                                            campos: [
                                                {nameTpl: 'input', type: 'text', name:'cep', id: 'cep', labelName: 'CEP:', required: true, size: 12, inputSize: 3, labelSize: 3},
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
                                                {nameTpl: 'input', type: 'text', name:'complemento', id: 'complemento', labelName: 'Complemento:', required: true, size: 7, inputSize: 7, labelSize: 3},
                                                {nameTpl: 'input', type: 'text', name:'bairro', id: 'bairro', labelName: 'Bairro:', required: true, size: 5, inputSize: 9, labelSize: 3},
                                            ]
                                        },
                                        {
                                            style: 'inline',
                                            campos: [
                                                {nameTpl: 'input', type: 'text', name:'cidade', id: 'cidade', labelName: 'Cidade:', required: true, size: 7, inputSize: 7, labelSize: 3},
                                                {nameTpl: 'select', type: 'select', name:'estado', id: 'estado', labelName: 'Estado:', required: true, size: 5, inputSize: 9, labelSize: 3,
                                                    optionsSelecione: true, options: {obj: [
                                                        {value: '0', text: 'São Paulo'},
                                                        {value: '1', text: 'Rio de Janeiro'}
                                                    ]}
                                                }
                                            ]
                                        },
                                        {
                                            style: 'inline',
                                            campos: [
                                                {nameTpl: 'input', type: 'tel', name:'tel', id: 'tel', labelName: 'Telefone:', required: true, size: 7, inputSize: 7, labelSize: 3},
                                                {nameTpl: 'input', type: 'tel', name:'cel', id: 'cel', labelName: 'Celular:', required: true, size: 5, inputSize: 9, labelSize: 3},
                                            ]
                                        },
                                        {
                                            style: 'inline',
                                            campos: [
                                                {nameTpl: 'radio', type: 'radio', name:'newsMail', id: 'newsMail', labelName: 'Desejo receber novidades em meu email', required: false, size: 12, inputSize: 8, labelSize: 3},
                                            ]
                                        }          
                                    ]
                                },
                                {title: 'Regulamento', classe: 'titleBorderNn',
                                    form: [
                                        {
                                            style: 'inline',
                                            campos: [
                                                {nameTpl: 'list', classe:"box-scroll", maxHeight: '100px', size: 12, labelHide: true, inputSize: 12,
                                                    content: '<ul>'
                                                        +'<li>TEXTO</li>'
                                                        +'<li>TEXTO</li>'
                                                        +'<li>TEXTO</li>'
                                                        +'<li>TEXTO</li>'
                                                        +'<li>TEXTO</li>'
                                                        +'<li>TEXTO</li>'
                                                        +'<li>TEXTO</li>'
                                                    +'</ul>'
                                                },
                                            ]
                                        },                                    
                                        {
                                            style: 'inline',
                                            campos: [
                                                {nameTpl: 'radio', type: 'radio', name:'regulamento', id: 'regulamento', labelName: 'Li e concordo com o Regulamento', required: true, size: 12, inputSize: 8, labelSize: 3},
                                            ]
                                        }          
                                    ]
                                }
                            ]
                        }
                    },

                    contato: {
                        menu: ['extrato', 'indicacao'],
                        content: {tpl: 'tpl-form', classe: 'contato',  title: 'Fale conosco', 
                            btns: [
                                {name: 'saveForm', text: 'Enviar', visibled: true, classe: 'btn-primary'},
                            ],
                            detail: [
                                {description: 'Em caso de dúvidas entre em contato pelo telefone <strong>11 5555.5555</strong> ou preencha os campos abaixo e aguarde que em breve entraremos em contato',
                                    form: [
                                        {
                                            style: 'inline',
                                            campos: [
                                                {nameTpl: 'input', type: 'text', name:'name', id: 'name', labelName: 'Nome:', required: true, size: 12, inputSize: 9, labelSize: 3},
                                            ]
                                        },
                                        {
                                            style: 'inline',
                                            campos: [
                                                {nameTpl: 'input', type: 'email', name:'mail', id: 'mail', labelName: 'Email:', required: true, size: 12, inputSize: 5, labelSize: 3},
                                            ]
                                        },
                                        {
                                            style: 'inline',
                                            campos: [
                                                {nameTpl: 'select', type: 'select', name:'assunto', id: 'assunto', labelName: 'Assunto:', required: true, size: 12, inputSize: 5, labelSize: 3,
                                                    optionsSelecione: true, options: {obj: [
                                                        {value: '0', text: 'Assunto 1'},
                                                        {value: '1', text: 'Assunto 2'}
                                                    ]}
                                                }
                                            ]
                                        },
                                        {
                                            style: 'inline',
                                            campos: [
                                                {nameTpl: 'textarea', name:'msg', id: 'msg', labelName: 'Mensagem:', required: true, size: 12, inputSize: 9, labelSize: 3, row: 5},
                                            ]
                                        },                                        
                                    ]
                                }
                            ]
                        }
                    },

                    regulamento: {
                        menu: ['extrato', 'indicacao'],
                        content: {tpl: 'tpl-page-texts', classe: 'regulamento',  title: 'Regulamento', 
                            detail: [
                                { description: '<ul>'
                                        +'<li>TEXTO</li>'
                                        +'<li>TEXTO</li>'
                                        +'<li>TEXTO</li>'
                                        +'<li>TEXTO</li>'
                                        +'<li>TEXTO</li>'
                                    +'</ul>'
                                },
                                {classe:'box box-tertiary', description: '<ul>'
                                        +'<li>Nome da empresa</li>'
                                        +'<li>Nome da pessoa interessada</li>'
                                        +'<li>Telefones(s) e/ou e-mail para contato</li>'
                                        +'<li>Quantidade de cartões Vale-Viagem CVC</li>'
                                        +'<li>Valor da venda</li>'
                                    +'</ul>'
                                }
                            ]
                        }
                    },

                    programa: {
                        menu: ['extrato', 'indicacao', 'bnTroquePontos'],
                        content: {tpl: 'tpl-page-texts', classe: 'programa',  title: 'O Programa', 
                            detail: [
                                {classe:'img-right', description: '<p>A promoção <strong>"Indicou, ganhou!"</strong> da <strong>INCENTIVALE</strong> é uma ação promocional promovida em conjunto com a CVC que visa premiar seus agentes de viagem, colaboradores financeiros e administrativos.</p>'
                                + '<p>Esta promoção será válida durante o período de 04/05/2013 a 03/07/2014 e suas regras e funcionamento estão disponíveis em:'
                                + '<a href="www.incentivale.com.br/indicouganhou" title="Indicou ganhou" target="blank">www.incentivale.com.br/indicouganhou</a></p>'
                                + '<p>Indicando a <strong>INCENTIVALE</strong> a toda empresa que estiver interessada em adquirir cartões vale-viagem <strong>CVC</strong>, o participante receberá um carimbo em seu passaporte digital que pode ser trocado por prêmios. São Cartões Presente de mais de 40 marcas do varejo nacional.</p>'
                                + '<p>O premiado, pode também optar por acumular seus carimbos e trocar por prêmios de maior valor ao final de cada mês da campanha.</p>'
                                },
                                {tpl: 'tpl-carousel', classe:'box box-tertiary carousel', slideShow: 5, slideToScroll: 1,
                                    slides: [
                                        {title: 'Pão de Açucar', img: 'http://localhost:4000/assets/images/parceiros/pao-de-acucar.jpg'},
                                        {title: 'Netshoes', img: 'http://localhost:4000/assets/images/parceiros/netshoes.jpg'},
                                        {title: 'Extra Hipermercados', img: 'http://localhost:4000/assets/images/parceiros/extra.jpg'},
                                        {title: 'O Boticário', img: 'http://localhost:4000/assets/images/parceiros/boticario.jpg'},
                                        {title: 'Centauro', img: 'http://localhost:4000/assets/images/parceiros/centauro.jpg'},
                                        {title: 'Centauro', img: 'http://localhost:4000/assets/images/parceiros/centauro.jpg'},
                                        {title: 'Centauro', img: 'http://localhost:4000/assets/images/parceiros/centauro.jpg'}
                                    ]
                                },
                                {classe:'col-md-7', title: 'Como funciona', 
                                    btn: [{title: 'Clique aqui e <small>Faça sua indicacao</small>', icon: 'fa fa-star', classe:'btn-secondary', openmodal: true, url: '/indicacao'}],
                                    img: {tpl: 'banner-middle', classe: 'pull-right col-md-5 banner-middle', title: 'Troque seus pontos', img: 'http://localhost:4000/assets/images/banners/tbl-premiacao.png'},
                                    description: '<p>No início de cada mês, cada agente de viagem receberá um email com uma imagem de um passaporte personalizado. Nele, existem 5 espaços para carimbos em cada mês de duração da campanha.</p>'
                                    + '<p>Ao indicar a <strong>INCENTIVALE</strong>, o agente receberá uma atualização de seu passaporte com um novo carimbo após validação da indicação.</p>'
                                    + '<p>Poderá também receber um visto negado, que representará uma indicação não válida.</p>'
                                    + '<p>Serão 5 indicações máximas por mês. A partir da 6ª indicação, será sim permitido utilizá-la no mês seguinte, que também terá um limite de até 5 indicações e assim sucessivamente durante o período de vigência da campanha.</p>'
                                    + '<p>Os colaboradores financeiros e administrativo serão premiados com base em metas atingidas pelos agentes de viagem. Ao exemplo de que se o grupo for composto por 60 agentes, a meta da 1ª indicação será 60, a 2ª de 120 e assim sucessivamente. Valerão sim as indicações acumuladas para esse total, ao exemplo de que se, apenas 12 colaboradores fizerem as 5 indicações, preencherão também as 60 indicações.</p>',
                                },
                                
                            ]
                        }
                    },

                    indique: {
                        menu: ['extrato', 'indicacao'],
                        content: {tpl: 'tpl-page-texts', classe: 'indique',  title: 'Minhas Indicações', subtitle: "Acompanhe suas indicações aqui.", 
                            detail: [
                                {tpl: 'tpl-table', classe:'table-primary',
                                    header: {
                                        filter: true,
                                        title: 'Setembro 2014',                                        
                                    },
                                    btn: [
                                        {icon: 'fa fa-search', classe:'', openmodal:true, url: 'observacao'}
                                    ],
                                    titles: [
                                        {title: 'Data', width: '20%'},
                                        {title: 'Empresa', width: '20%', classe:"text-left"},
                                        {title: 'Contato', width: '20%'},
                                        {title: 'Valor', width: '20%'},
                                        {title: 'Status', width: '10%'}
                                    ],
                                    body:[
                                        {content: [{value: '06/09/2014'}, {value: 'CMO Construtora', classe:"text-left"}, {value: 'Bleyner'}, {value: '3.000,00'}, {icon: 'icon ind-ativo'}]},
                                        {content: [{value: '06/09/2014'}, {value: 'CMO Construtora', classe:"text-left"}, {value: 'Bleyner'}, {value: '3.000,00'}, {icon: 'icon ind-negativo'}]},
                                        {content: [{value: '06/09/2014'}, {value: 'CMO Construtora', classe:"text-left"}, {value: 'Bleyner'}, {value: '3.000,00'}, {icon: 'icon ind-negativo'}]},
                                        {content: [{value: '06/09/2014'}, {value: 'CMO Construtora', classe:"text-left"}, {value: 'Bleyner'}, {value: '3.000,00'}, {icon: 'icon ind-negativo'}]},
                                        {content: [{value: '06/09/2014'}, {value: 'CMO Construtora', classe:"text-left"}, {value: 'Bleyner'}, {value: '3.000,00'}, {icon: 'icon ind-negativo'}]},
                                    ],
                                    footer: {title: 'Saldo', classe:"list-box", content: [
                                        {icon: 'icon ind-negativo', description: '<span>Vistos <small>Negativos</small></span> <strong>15</strong>'},
                                        {icon: 'icon ind-ativo', description: '<span>Vistos <small>Ativo</small></span> <strong>250</strong>'}
                                    ]}
                                },
                            ]
                        }
                    },

                    extrato: {
                        menu: ['extrato', 'indicacao'],
                        content: {tpl: 'tpl-page-texts', classe: 'extrato',  title: 'Extrato detalhado', subtitle: "Confira abaixo a sua pontuação detalhada do Programa!", 
                            detail: [
                                {tpl: 'tpl-table', classe:'table-default',
                                    header: {
                                        filter: true,
                                        title: 'Setembro 2014',                                        
                                    },
                                    titles: [
                                        {title: 'Data', width: '20%'},
                                        {title: 'Tipo', width: '20%'},
                                        {title: 'Descrição', width: '40%', classe:"text-left"},
                                        {title: 'Valor', width: '20%'}
                                    ],
                                    body:[
                                        {content: [{value: '06/09/2014'}, {value: 'Débito'}, {value: 'Venda Vale-Viagem', classe:"text-left"}, {value: '3.000,00'}]},
                                        {content: [{value: '06/09/2014'}, {value: 'Débito'}, {value: 'Venda Vale-Viagem', classe:"text-left"}, {value: '3.000,00'}]},
                                        {content: [{value: '06/09/2014'}, {value: 'Débito'}, {value: 'Venda Vale-Viagem', classe:"text-left"}, {value: '3.000,00'}]},
                                        {content: [{value: '06/09/2014'}, {value: 'Débito'}, {value: 'Venda Vale-Viagem', classe:"text-left"}, {value: '3.000,00'}]},
                                        {content: [{value: '06/09/2014'}, {value: 'Débito'}, {value: 'Venda Vale-Viagem', classe:"text-left"}, {value: '3.000,00'}]},
                                    ],
                                    tfoot:[
                                        {content: [{colspan: 2}, {value: 'Saldo Total', classe:"text-right"}, {value: '4.500,00'}]}
                                    ]
                                },
                            ]
                        }
                    },
                }
            },         
            cpf: '333.333.333-33',
            birthday: '24/01/1986',
            age: '28 anos', 
            sex: 'Masculino',
            civilStatus: 'Solteiro', 
            role: 'Frontend',            
            address: { 
                cidade: "São Paulo", 
                uf: "SP" 
            }, 
            imgUrl: "http://m.c.lnkd.licdn.com/mpr/mpr/shrink_200_200/p/8/005/048/190/1fa0c13.jpg"              
        },
        { 
            Id: 2, 
            name: 'Marcio Wolff dos Santos', 
            email: 'marcio.wolff@hotmail.com',
            cpf: '333.333.333-33',
            birthday: '24/01/1986',
            age: '28 anos', 
            sex: 'Masculino',
            civilStatus: 'Solteiro', 
            role: 'Frontend',            
            address: { 
                cidade: "São Paulo", 
                uf: "SP" 
            }, 
            imgUrl: "http://m.c.lnkd.licdn.com/mpr/mpr/shrink_200_200/p/8/005/048/190/1fa0c13.jpg"              
        },
    ],    
});
var adminBackend = function ($httpBackend, servicesConfig) {
    $httpBackend.whenGET(servicesConfig.endpoints.admin + 1).respond(200, adminBackendData.user[0]);
};