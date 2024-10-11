const { response } = require('express');
const Estadisticas = require('../models/estadisticas.model');

exports.mostrarOpciones = (request, response) => {
    const username = request.user ? request.user.username : ''; 
    const csrfToken = request.csrfToken(); // Obtén el token CSRF
    response.render('estadisticas', { username, csrfToken }); // Pasa el token a la vista
};

exports.estadisticasGenerales = (request, response) => {
    response.send('estadisticasGenerales');
};

exports.estadisticasRewards = (request, response) => {
    response.send('estadisticasRewards');
};