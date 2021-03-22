const express = require('express');
const app = express();

// admin
const newAdmin = require('./Controllers/admin/newAdmin');
app.use('/', newAdmin);

const removeAdmin = require('./Controllers/admin/removeAdmin');
app.use('/', removeAdmin);

// login 
const validateLogin = require('./Controllers/login/validateLogin');
app.use('/', validateLogin);

const showLogin = require('./Controllers/login/showLogin');
app.use('/', showLogin);

// materia 
const newMateria = require('./Controllers/materia/newMateria');
app.use('/', newMateria);

const showMaterias = require('./Controllers/materia/showMateria');
app.use('/', showMaterias);

// perguntas

const newPergunta = require('./Controllers/perguntas/new');
app.use('/', newPergunta);

const showPergunta = require('./Controllers/perguntas/show');
app.use('/', showPergunta);

// respostas

const newResposta = require('./Controllers/respostas/new');
app.use('/', newResposta)

const controladorRespostas = require('./Controllers/respostas/show');
app.use('/', controladorRespostas);

// fim resposta
const deleteMateria = require('./Controllers/deleteMateria/delete');
app.use('/', deleteMateria);

module.exports = app;