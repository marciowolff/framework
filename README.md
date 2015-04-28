Arquivo Readme Loja
!version: 1.0
!date: 12/08/2014
!from: Marcio Wolff dos Santos
!saved-by: marcio.wolff@hotmail.com


1. INSTALAÇÃO DA APLICAÇÂO
======================================================================================================

1.1 Instalar o nodejs: http://udgwebdev.com/node-js-para-leigos-instalacao-e-configuracao/
	Primeiro passo, acesse o site oficial: http://nodejs.org e clique em Download, para usuários do Windows e MacOSX, basta baixar os instaladores dessa página e instalar normalmente. 

1.1.2 Configurando ambiente de desenvolvimento:
	Para configurar o ambiente de desenvolvimento basta adicionar uma variável de ambiente do sistema operacional, conhecida como NODE_ENV='development'.

	Clique com botão direito no ícone Meu Computador e selecione a opção Propriedades, no lado esquerdo da janela, clique no link Configurações avançadas do sistema. Na janela seguinte, acesse a aba Avançado e clique no botão Variáveis de Ambiente..., agora no campo Variáveis do sistema clique no botão Novo..., em Nome da variável digite NODE_ENV e em Valor da variável digite development.

1.2 Instalar o gruntjs: 
	Na pasta do seu projeto abrir o terminal e digitar npm install -g grunt-cli.
	Depois ainda no terminal digitar npm install
	Depois ainda no terminal digitar npm install express
	Depois ainda no terminal digitar npm install reload

1.2.1 Rodar o grunt:
	Na pasta do seu projeto abra o terminal e digite grunt load. (pronto)	

	O grunt serve para quando fizer alguma alteração nos documentos e ir na web quando atualizar a página visualizar as alterações feitas. 


1.2.3 Rodar services:
	Neste projeto existe 2 services (default.server.js e loja.server.js) que são encontrados na pasta raiz do projeto.

	Na pasta do seu projeto abrir o terminal e digitar: node default.server.js (pronto)
	Abra outro terminal e digite: node loja.server.js (pronto)

	Pronto a loja e os services externos (default.server.js) estão ligados.
	Acesse http://localhost:3000/ para visualizar o projeto.


