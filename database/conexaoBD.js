require('dotenv').config()
const sequelize = require('sequelize');
const chalk = require('chalk');

const nomeDoBD = process.env['NOME_DO_BD'];
const usuarioDoBD = process.env['USUARIO'];
const senhaDoBD = process.env['SENHA'];
const localDoBD = process.env['HOST'];

const conexao = new sequelize(nomeDoBD, usuarioDoBD, senhaDoBD, {
    host: localDoBD,
    dialect: 'mysql',
    timezone: '-03:00'
});

conexao.authenticate().then(() => {
    console.log(chalk.green('\n| foi possivel se conectar ao banco de dados'));
}).catch((erro) => {
    console.log(chalk.red(`\n| Não foi possivel se conectar\n---> Erro: ${erro}`));
});

module.exports = conexao;