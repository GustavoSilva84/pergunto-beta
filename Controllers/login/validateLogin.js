const express = require('express');
const router = express.Router();
const tbLogin = require('../../Models/tabelaLogin');
const bcryptjs = require('bcryptjs');
const chalk = require('chalk');

router.post('/logar', (req, res) => {

    var nome = checarComandos(req.body.nome);
    var senha = checarComandos(req.body.senha);

    validarInformacoes(req, res, nome, senha);

});

function validarInformacoes(req, res, nome, senha) {

    if(nome.length >= 100 || senha.length >= 100) {
        return res.redirect('/login');
    }

    if(nome.trim() == '' || senha.trim() == '') {
        return res.redirect('/login');
    }

    tbLogin.findOne().then((dados) => {

        if(!dados) {

            if(nome == 'admin' && senha == 'admin') {

                req.session.usuario = {
                    nome: 'admin',
                    id: 'admin'
                }

                return res.redirect('/admin');

            }else {
                return res.redirect('/login');
            }

        }else {

            tbLogin.findOne({ where: { nome: nome } }).then((dados) => {

                if(dados) {

                    if(bcryptjs.compareSync(senha, dados.senha)) {

                        req.session.usuario = {
                            nome: nome,
                            id: dados.id
                        }

                        return res.redirect('/admin');

                    }else {
                        return res.redirect('/login');
                    }
                    
                }else {
                    return res.redirect('/login');
                }

            });

        }

    });

}

function checarComandos(x){
    return x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
};

module.exports = router;