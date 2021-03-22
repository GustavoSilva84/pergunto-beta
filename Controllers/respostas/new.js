require('dotenv').config();
const chaveCaptcha = process.env['CHAVE_PRIVADA_CAPTCHA'];

const express = require('express');
const router = express.Router();
const axios = require('axios');
const slugify = require('slugify');

const tbResposta = require('../../Models/tabelaRespostas');

router.post('/new/resposta', (req, res) => {

    let urlCaptcha = `https://www.google.com/recaptcha/api/siteverify?secret=${chaveCaptcha}&response=${req.body['g-recaptcha-response']}`;

    let urlMateria = checarComandos(req.body.urlMateria);
    let urlIdMateria = parseInt(req.body.urlIdMateria);

    let urlPergunta = checarComandos(req.body.urlPergunta);
    let urlIdPergunta = parseInt(req.body.urlIdPergunta); 

    let resposta = checarComandos(req.body.resposta);

    validarCaptcha(req, res, urlMateria, urlCaptcha, urlIdMateria, urlPergunta, urlIdPergunta, resposta);

});

function validarCaptcha(req, res, urlMateria, urlCaptcha, urlIdMateria, urlPergunta, urlIdPergunta, resposta) {

    axios(urlCaptcha).then((e) => {

        if(!e.data.success) {
            return res.redirect(`/materia/${urlMateria}/id/${urlIdMateria}/pergunta/${urlPergunta}/id/${urlIdPergunta}/pagina/0`);
        }

        validarDados(req, res, urlMateria, urlIdMateria, urlPergunta, urlIdPergunta, resposta);

    });

}

function validarDados(req, res, urlMateria, urlIdMateria, urlPergunta, urlIdPergunta, resposta) {

    if(urlMateria.length >= 15 || urlPergunta.length >= 45 || resposta.length >= 2000) {
        return res.redirect(`/materia/${urlMateria}/id/${urlIdMateria}/pergunta/${urlPergunta}/id/${urlIdPergunta}/pagina/0`);
    }

    if(urlMateria.trim() == '' || urlPergunta.trim() == '' || resposta.trim() == '') {
        return res.redirect(`/materia/${urlMateria}/id/${urlIdMateria}/pergunta/${urlPergunta}/id/${urlIdPergunta}/pagina/0`);
    }

    if(isNaN(urlIdMateria) || isNaN(urlIdPergunta)) {
        return res.redirect(`/`);
    }

    gravarDados(req, res, urlMateria, urlIdMateria, urlPergunta, urlIdPergunta, resposta);

}

function gravarDados(req, res, urlMateria, urlIdMateria, urlPergunta, urlIdPergunta, resposta) {

    tbResposta.create({

        urlMateria: slugify(urlMateria),
        resposta: resposta[0].toUpperCase() + resposta.substr(1),
        perguntaId: urlIdPergunta

    }).then(() => {

        res.redirect(`/materia/${urlMateria}/id/${urlIdMateria}/pergunta/${urlPergunta}/id/${urlIdPergunta}/pagina/0`);

    });

}

function checarComandos(x){
    return x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
};

module.exports = router;
