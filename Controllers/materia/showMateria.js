const express = require('express');
const router = express.Router();

const tbMateria = require('../../Models/tabelaMateria');

router.get('/', (req, res) => {

    tbMateria.findAll({
        order: [['titulo', 'ASC']] 
    }).then(dadosMaterias => {

        validarDados(req, res, dadosMaterias);

    });

});

function validarDados(req, res, dados) {
    
    if(Object.keys(dados).length != 0) {

        mostrarDados(req, res, dados);

    }else {

        res.render('materias', {
            dados: {
                titulo: 'Não a materias cadastrada',
                mensagem: 'Volte mais tarde ou cadastre uma matateria'
            },
            mostrar: true
        });

    }

}

function mostrarDados(req, res, dados) {

    res.render('materias', {
        dados: dados,
        mostrar: false
    });

}

module.exports = router