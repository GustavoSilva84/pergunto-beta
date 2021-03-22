const express = require('express');
const router = express.Router();
const slugify = require('slugify');

const tbMateria = require('../../Models/tabelaMateria');

router.post('/admin/new/materia', (req, res) => {

    var titulo = checarComandos(req.body.titulo);
    var corpo = checarComandos(req.body.corpo);
    var urlMateria = checarComandos(slugify(titulo));

    validarDados(req, res, titulo, corpo, urlMateria);

});

function validarDados(req, res, titulo, corpo, urlMateria) {
 
    if(titulo.length >= 15 || corpo.length >= 70) {
        return res.redirect('/login');
    }

    if(titulo.trim() == '' || corpo.trim() == '') {
        return res.redirect('/login');
    }

    tbMateria.findAll({ where: {titulo: titulo} }).then((dados) => {

        if(Object.keys(dados).length != 0) {
            return res.redirect('/login');   
        }

        gravarMateria(req, res, titulo, urlMateria, corpo);

    });

}


function gravarMateria(req, res, titulo, urlMateria, corpo)  {

    tbMateria.create({
        titulo: titulo[0].toUpperCase() + titulo.substr(1),
        corpo: corpo[0].toUpperCase() + corpo.substr(1),
        urlMateria: urlMateria
    }).then(() => {
        res.redirect('/')
    });

}

function checarComandos(x){
    return x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
};

module.exports = router