const express = require('express');
const router = express.Router();
const tbLogin = require('../../Models/tabelaLogin');
const bcryptjs = require('bcryptjs');
const chalk = require('chalk');
const app = require('../../routes');
const autenticar = require('../login/autenticar')

router.get('/deslogar', autenticar, (req, res) => {

    req.session.usuario = undefined;
    res.redirect('/login')

});

module.exports = router;