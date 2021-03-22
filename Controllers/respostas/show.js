const chalk = require('chalk');
const express = require('express');
const router = express.Router();

const tbMateria = require('../../Models/tabelaMateria');
const tbPergunta = require('../../Models/tabelaPerguntas');
const tbResposta = require('../../Models/tabelaRespostas');

router.get('/materia/:urlMateria/id/:urlIdMateria/pergunta/:urlPergunta/id/:urlIdPergunta/pagina/:urlPagina', (req, res) => {
    
    let urlMateria = checarComandos(req.params.urlMateria);
    let urlIdMateria = parseInt(req.params.urlIdMateria);

    let urlPergunta = checarComandos(req.params.urlPergunta);
    let urlIdPergunta = parseInt(req.params.urlIdPergunta);
    
    let urlPagina = parseInt(req.params.urlPagina);

    validarDados(req, res, urlMateria, urlIdMateria, urlPergunta, urlIdPergunta, urlPagina);

});

function validarDados(req, res, urlMateria, urlIdMateria, urlPergunta, urlIdPergunta, urlPagina) {

    if(isNaN(urlIdMateria)) {
        return res.redirect('/');
    }

    if(isNaN(urlIdPergunta)) {   
        return res.redirect('/');
    }

    if(isNaN(urlPagina)) {
        return res.redirect('/');
    }

    if(urlMateria.length >= 15 || urlPergunta.length >= 46) {
        return res.redirect('/');
    }

    buscarBD(req, res, urlMateria, urlIdMateria, urlPergunta, urlIdPergunta, urlPagina);

}

function buscarBD(req, res, urlMateria, urlIdMateria, urlPergunta, urlIdPergunta, urlPagina) {

    let limite = 5;
    let aparti = urlPagina * limite;

    tbMateria.findOne({ where: {urlMateria: urlMateria, id: urlIdMateria} }).then((dadosMateria) => {

        if(dadosMateria == null) {
            return res.redirect('/');
        }

        tbPergunta.findOne({ 
            where: {id: urlIdPergunta, urlTitulo: urlPergunta} 
        }).then((dadosPergunta) => {
    
            if(dadosPergunta == null) {
                return res.redirect('/');
            }
    
            tbResposta.findAndCountAll({
                limit: limite, offset: aparti, where: {perguntaId: urlIdPergunta}, order: [['id', 'DESC']]
            }).then((dadosRespostas) => {
    
                if(dadosRespostas == null) {
                    return res.redirect('/');
                }
    
                mostrarDados(req, res, urlMateria, urlIdMateria, urlPergunta, urlIdPergunta, urlPagina, limite, aparti, dadosPergunta, dadosRespostas);
    
            });
    
        });

    });

}

function mostrarDados(req, res, urlMateria, urlIdMateria, urlPergunta, urlIdPergunta, urlPagina, limite, aparti, dadosPerguntas, dadosRespostas) {    

    let proximo;

    if(aparti + limite >= dadosRespostas.count) {
        proximo = false;
    }else {
        proximo = true;
    }

    if(urlPagina == 0) {

        res.render('respostas', {
            
            dadosPerguntas: dadosPerguntas,
            dadosRespostas: dadosRespostas.rows, 

            urlMateria: urlMateria,
            urlIdMateria: urlIdMateria,

            urlPergunta: urlPergunta,
            urlIdPergunta: urlIdPergunta,

            urlPagina: urlPagina,
            proximo: proximo  

        });

    }else {

        if(Object.keys(dadosRespostas.rows).length != 0) {

            res.render('verMaisResposta', {

                dadosPerguntas: dadosPerguntas,
                dadosRespostas: dadosRespostas.rows, 

                urlMateria: urlMateria,
                urlIdMateria: urlIdMateria,

                urlPergunta: urlPergunta,
                urlIdPergunta: urlIdPergunta,

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

module.exports = router;
