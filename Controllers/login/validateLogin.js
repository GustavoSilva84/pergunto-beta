const express = require('express');
const router = express.Router();
const tbLogin = require('../../Models/tabelaLogin');

router.post('/admin', (req, res) => {

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

    tbLogin.findAll().then((dadosLogin) => {

        if(Object.keys(dadosLogin).length == 0) {

            if(nome == 'admin' && senha == 'admin') {

                usuarioExistente(req, res, nome, senha, dadosLogin);

            }else {

                res.redirect('/login');

            }

        }else {

            tbLogin.findAll({ where: {nome, senha} }).then((dadosLogin) => {

                if(Object.keys(dadosLogin).length != 0) {

                    usuarioExistente(req, res, nome, senha, dadosLogin);

                } else {

                    res.redirect('/login');

                }

            })
            
        }

    });

}

function usuarioExistente(req, res, nome, senha, dadosLogin) {

    tbLogin.findAll().then((dadosLogin) => {

        if(Object.keys(dadosLogin).length == 0) {

            res.render('admin', {
                nome: 'admin', 
                senha: 'admin',
                mostrar: false
            });

        } else {

            res.render('admin', {
                dados: dadosLogin,
                mostrar: true
            });

        }

    });

};

function checarComandos(x){
    return x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
};

module.exports = router;