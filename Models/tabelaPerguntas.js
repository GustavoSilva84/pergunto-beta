const conexao = require('../database/conexaoBD');
const sequelize = require('sequelize');
const chalk = require('chalk');

const tbMateria = require('./tabelaMateria');

const tbPergunta = conexao.define('perguntas', { 

    titulo: {
        type: sequelize.TEXT,
        allowNull: false
    },

    corpo: {
        type: sequelize.TEXT,
        allowNull: false
    },

    urlTitulo: {
        type: sequelize.TEXT,
        allowNull: false
    },

    urlMateria: {
        type: sequelize.TEXT,
        allowNull: false
    }

});

tbMateria.hasMany(tbPergunta);
tbPergunta.belongsTo(tbMateria);

tbPergunta.sync({force: false }).then(() => {
    console.log(chalk.green(`\n| Tabela perguntas criada com sucesso`));
}).catch((erro) => {
    console.log(chalk.red(`\n| Erro ao criar a tabela perguntas\n ERRO: ${erro}`));
});

module.exports = tbPergunta