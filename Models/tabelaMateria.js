const conexao = require('../database/conexaoBD');
const sequelize = require('sequelize');
const chalk = require('chalk');

const tbMateria = conexao.define('materia', {

    titulo: {
        type: sequelize.TEXT,
        allowNull: false
    },

    corpo: {
        type: sequelize.TEXT,
        allowNull: false
    },

    urlMateria: {
        type: sequelize.TEXT,
        allowNull: false
    }
    
});

tbMateria.sync({ force: false }).then(() => {
    console.log(chalk.green(`\n| Tabela materias criada com sucesso`));
}).catch((erro) => {
    console.log(chalk.red(`\n| Erro ao criar a tabela materias\n ERRO: ${erro}`));
});

module.exports = tbMateria;