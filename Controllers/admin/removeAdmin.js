const express = require('express');
const router = express.Router();
const tabelaLogin = require('../../Models/tabelaLogin')

router.post('/admin/deletar/admin', (req, res) => {

    var id = req.body.id;

    validarDados(req, res, id);

});

function validarDados(req, res, id) {

    if(isNaN(id)) {
        return res.redirect('/login');
    }

    tabelaLogin.findAll({ where: {id: id} }).then((dados) => {

        if(Object.keys(dados).length == 0) {
            return res.redirect('/login');
        }

        deletarUsuario(req, res, id);

    });
    
}

function deletarUsuario(req, res, id) {

    tabelaLogin.destroy({ where: {id: id} }).then(() => {
        res.redirect('/login');
    });

}

module.exports = router;