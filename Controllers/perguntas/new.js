require('dotenv').config();
const chaveCaptcha = process.env['CHAVE_PRIVADA_CAPTCHA'];

const express = require('express');
const router = express.Router();
const axios = require('axios');
const slugify = require('slugify');
const chalk = require('chalk')

const tbPergunta = require('../../Models/tabelaPerguntas');


router.post('/new/pergunta', (req, res) => {

    let urlCaptcha = `https://www.google.com/recaptcha/api/siteverify?secret=${chaveCaptcha}&response=${req.body['g-recaptcha-response']}`;
    
    let titulo = checarComandos(req.body.titulo);
    let corpo = checarComandos(req.body.corpo);
    let urlMateria = checarComandos(req.body.urlMateria);
    let urlIdMateria = parseInt(req.body.urlIdMateria);

    validarCaptcha(req, res, urlCaptcha, titulo, corpo, urlMateria, urlIdMateria);

});

function validarCaptcha(req, res, urlCaptcha, titulo, corpo, urlMateria, urlIdMateria) {

    axios.get(urlCaptcha).then((dados) => {

        if(dados.data.success) {
            validarDados(req, res, titulo, corpo, urlMateria, urlIdMateria)
        }else {
            return res.redirect(`/materia/${urlMateria}/id/${urlIdMateria}/pagina/0`);
        }

    }).catch(() => {
        return res.redirect(`/materia/${urlMateria}/id/${urlIdMateria}/pagina/0`);
    });

}

function validarDados(req, res, titulo, corpo, urlMateria, urlIdMateria) {

    console.log(chalk.green(titulo.length))

    if(titulo.length >= 45 || urlMateria.length >= 15 || corpo.length >= 20000) {
        return res.redirect(`/materia/${urlMateria}/id/${urlIdMateria}/pagina/0`);
    }
    
    if(urlMateria.trim() == '' || titulo.trim()  == '' || corpo.trim()  == '') {
        return res.redirect(`/materia/${urlMateria}/id/${urlIdMateria}/pagina/0`);
    }

    if(isNaN(urlIdMateria)) {
        return res.redirect(`/materia/${urlMateria}/id/${urlIdMateria}/pagina/0`);
    }

    gravarDados(req, res, titulo, corpo, urlMateria, urlIdMateria);

}

function gravarDados(req, res, titulo, corpo, urlMateria, urlIdMateria) {

    tbPergunta.create({

        titulo: titulo[0].toUpperCase() + titulo.substr(1), 
        corpo: corpo[0].toUpperCase() + corpo.substr(1),

        urlTitulo: slugify(titulo),
        urlMateria: slugify(urlMateria),
        materiumId: urlIdMateria
        
    }).then(() => {
        return res.redirect(`/materia/${urlMateria}/id/${urlIdMateria}/pagina/0`);
    });

};

function checarComandos(x){
    return x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");  
};

module.exports = router
