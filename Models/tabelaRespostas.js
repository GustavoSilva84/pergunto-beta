const conexao = require('../database/conexaoBD');
const sequelize = require('sequelize');
const chalk = require('chalk');

const tbPergunta = require('./tabelaPerguntas');

const tbResposta = conexao.define('resposta', {

    resposta: {
        type: sequelize.TEXT,
        allowNull: false
    },

    urlMateria: {
        type: sequelize.TEXT,
        allowNull: false
    }

});

tbPergunta.hasMany(tbResposta); //uma pergunta tem varias respostas
tbResposta.belongsTo(tbPergunta); //uma resposta pertence a uma pergunta

tbResposta.sync({ force: false }).then(() => {
    console.log(chalk.green(`\n| Tabela resposta criada com sucesso`));
}).catch((erro) => {
    console.log(chalk.red(`\n| Erro ao criar a tabela respostas\n ERRO: ${erro}\n`));
});

module.exports = tbResposta;