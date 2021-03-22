const conexao = require('../database/conexaoBD');
const sequalize = require('sequelize');
const chalk = require('chalk');

const tbLogin = conexao.define('login', {

    nome: {
        type: sequalize.TEXT,
        allowNull: false
    },

    senha: {
        type: sequalize.TEXT,
        allowNull: false
    }

})
 
tbLogin.sync({ force: false }).then(() => {
    console.log(chalk.green(`\n| Tabela login criada com sucesso`));
}).catch((erro) => {
    console.log(chalk.red(`\n| Erro ao criar a tabela login\n ERRO: ${erro}`));
});

module.exports = tbLogin;