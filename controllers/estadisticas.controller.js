const { response } = require('express');
const Estadisticas = require('../models/estadisticas.model');

exports.mostrarOpciones = (request, response) => {
    const username = request.user ? request.user.username : ''; 
    response.render('estadisticas', { username }); 
};

exports.estadisticasGenerales = (request, response) => {
    request.send('Estadísticas Generales');
};

exports.estadisticasRewards = (request, response) => {
    response.send('Estadísticas Rewards');
};


exports.getEstadisticasGenerales = (req, res) => {
    Estadisticas.fetchSellosPorDia()
        .then(([rows]) => {
            const dias = rows.map(row => row.dia);
            const sellos = rows.map(row => row.total_sellos);

            res.render('estadisticasGenerales', { dias, sellos });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error al obtener las estadísticas');
        });
};
