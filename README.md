Opa pessoal fiz esse projetinho pra demostrar meu apredizado de nodejs, Espero que gostem <3


Para você usar esse projetinho que fiz, Você tera que ter MySql e o NodeJs instalado na sua maquina, Então se você tiver eles instalados siga os seguentes passos

1) Primeramente crie um banco de dados com o nome "escola"

2) Com o banco de dados criado você tera que logar a aplicação a seu banco de dados, Para isso entre na pasta "database" e va ate o arquivo "conexao.js", Dentro dele preencha os dados
   
   EXEMPLO:
   const conexao = new sequelize('nome do banco de dados ex: escola', 'usuario do banco de dados ex: root', 'senha do seu banco de dados ex: 1234', {
    host: 'localhost',
    dialect: 'mysql'
  });
  
3) Instale os dados necessarios 
  ex: npm install
  
4) Inicie a aplicação com o node
   ex: node server.js
   
5) E para entrar na pagina de admin basta entar na tela de login e digitar 'admin' no campo nome e senha 
