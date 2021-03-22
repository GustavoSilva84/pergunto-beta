const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const slugify = require('slugify');

const tbMateria = require('../../Models/tabelaMateria');
const tbPerguntas = require('../../Models/tabelaPerguntas');
const tbRespostas = require('../../Models/tabelaRespostas');

router.post('/deletemateria', (req, res) => {

    let urlMateria = checarComandos(slugify(req.body.materia));

    validarDados(req, res, urlMateria);

});

function validarDados(req, res, urlMateria)  {

    tbMateria.findAll({ where: {urlMateria: urlMateria} }).then((dados) => {

        if(Object.keys(dados).length == 0) {
            res.redirect('/');
        }

        deletarMateria(req, res, urlMateria);

    });
   
}

function deletarMateria(req, res, urlMateria) {

    tbMateria.destroy({ where: {urlMateria: urlMateria} }).then(() => {
        tbPerguntas.destroy({ where: {urlMateria: urlMateria} }).then(() => {
            tbRespostas.destroy({ where: {urlMateria: urlMateria} }).then(() => {

                res.redirect('/');

            });
        });
    });

}

function checarComandos(x){
    return x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
};

module.exports = router;