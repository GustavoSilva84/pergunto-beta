const express = require('express');
const router = express.Router();
const tbUsuarios = require('../../Models/tabelaLogin')

router.get('/login', (req, res) => {

    if(req.session.usuario) {
        return res.redirect('/admin');
    }else {
        
        return res.render('login');
    }
    
});

module.exports = router;