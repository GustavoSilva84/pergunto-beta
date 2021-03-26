const tabelaLogin = require('../../Models/tabelaLogin');
const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const autenticar = require('../login/autenticar')

router.post('/admin/new/admin', autenticar, (req, res) => {

    var nome = checarComandos(req.body.nome);
    var senha = checarComandos(req.body.senha);

    validarDados(req, res, nome, senha);

});

function validarDados(req, res, nome, senha) {

    if(nome.length >= 100 || senha.length >= 100) {
        res.redirect('/login');
    }

    if(nome.trim() == '' || senha.trim() == '') {
        res.redirect('/login');
    }

    tabelaLogin.findAll({ where: {nome: nome} }).then((dados) => {

        if(Object.keys(dados).length != 0) {
            return res.redirect('/login');
        }

        gravarAdmin(req, res, nome, senha);

    });

}

function gravarAdmin(req, res, nome, senha) {

    let salt = bcryptjs.genSaltSync(10);
    let senhaHash = bcryptjs.hashSync(senha, salt);

    tabelaLogin.create({
        nome: nome,
        senha: senhaHash
    }).then(() => {
        res.redirect('/admin');
    });

}

function checarComandos(x){
    return x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

module.exports = router;