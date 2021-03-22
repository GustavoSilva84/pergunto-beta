const express = require('express');
const router = express.Router();
const chalk = require('chalk')

const tbPergunta = require('../../Models/tabelaPerguntas');
const tbMateria = require('../../Models/tabelaMateria');

router.get('/materia/:urlMateria/id/:urlIdMateria/pagina/:urlPagina', (req, res) => {

    let urlMateria = checarComandos(req.params.urlMateria);
    let urlIdMateria = parseInt(req.params.urlIdMateria);
    let urlPagina = parseInt(req.params.urlPagina);

    validarDados(req, res, urlMateria, urlIdMateria, urlPagina);

});

function validarDados(req, res, urlMateria, urlIdMateria, urlPagina) {

    if(isNaN(urlIdMateria)) {
        return res.redirect('/');
    }

    if(isNaN(urlPagina)) {
        return res.redirect('/');
    }

    if(urlMateria.length >= 15) {
        return res.redirect('/');
    }

    buscarBD(req, res, urlMateria, urlIdMateria, urlPagina)

};


function buscarBD(req, res, urlMateria, urlIdMateria, urlPagina) {

    let aparti = (urlPagina * 10);

    tbMateria.findOne({ where: {id: urlIdMateria, urlMateria: urlMateria} }).then((dadosMateria) => {

        if(dadosMateria == null) {
            return res.redirect('/');
        }

        tbPergunta.findAndCountAll({
            limit: 10, offset: aparti, where: {materiumId: urlIdMateria}, order: [ ['id','DESC'] ]
        }).then((dadosArtigos) => {

            if(dadosArtigos == null) {
                return res.redirect('/');
            }

            mostrarDados(req, res, urlMateria, urlIdMateria, urlPagina, aparti, dadosMateria, dadosArtigos);

        });
    
    });

}

function mostrarDados(req, res, urlMateria, urlIdMateria, urlPagina, aparti, dadosMateria, dadosArtigos) {

    let proximo;

    if(aparti + 10 >= dadosArtigos.count) {
        proximo = false;
    }else {
        proximo = true;
    }

    if(urlPagina == 0) {

        res.render('perguntas', {
            dadosMateria: dadosMateria,
            dados: dadosArtigos.rows,
            urlMateria: urlMateria,
            urlId: urlIdMateria,
            urlPagina: urlPagina,
            proximo: proximo
        });

    }else {

        if(Object.keys(dadosArtigos.rows).length != 0) {

            res.render('verMaisPergunta', {
                dadosMateria: dadosMateria,
                dados: dadosArtigos.rows,
                urlMateria: urlMateria,
                urlId: urlIdMateria,
                urlPagina: urlPagina,
                proximo: proximo    
            });

        }else {
            res.redirect(`/`);
        }

    }
    
}

function checarComandos(x){
    return x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");  
};

module.exports = router

