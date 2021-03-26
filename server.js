require('dotenv').config()
const express = require('express');
const app = express();
const chalk = require('chalk');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

//Configuracoes
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressSession({ secret: 'protocoloBicicletaDeRodinha', cookie: { maxAge: 50000000 } }));


//Models
const pergunta = require('./Models/tabelaPerguntas');
const resposta = require('./Models/tabelaRespostas');
const materia = require('./Models/tabelaMateria');

//Rotas 
app.use('/', require('./routes'));

const porta = 8282;

app.listen(process.env.PORT || porta, (erro) => {

    if(erro) {
        console.log(chalk.red(`\nNão foi possivel iniciar o servidor!\n--> Erro: ${erro}`));
    } else {
        console.log(chalk.green(`\n|-> Servidor iniciado com sucesso!!\n> http://localhost:${porta}\n`));
    };

});