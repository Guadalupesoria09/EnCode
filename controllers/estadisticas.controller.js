const { response } = require('express');
const Estadisticas = require('../models/estadisticas.model');

exports.mostrarOpciones = (request, response) => {
    const username = request.user ? request.user.username : ''; 
    response.render('estadisticas', { username }); 
};

exports.estadisticasGenerales = (request, response) => {
    response.send('Estadísticas Generales');
};

exports.estadisticasRewards = (request, response) => {
    response.send('Estadísticas Rewards');
};