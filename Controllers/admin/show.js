const express = require('express');
const router = express.Router();
const tbLogin = require('../../Models/tabelaLogin');
const autenticar = require('../login/autenticar')

router.get('/admin', autenticar, (req, res) => {

    tbLogin.findAll().then((dados) => {

        if(Object.keys(dados).length == 0) {

            res.render('admin', {
                nome: 'admin', 
                senha: 'admin',
                mostrar: false
            });

        } else {

            res.render('admin', {
                dados: dados,
                mostrar: true
            });

        }

    });

});

module.exports = router;