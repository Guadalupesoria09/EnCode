const Estadisticas = require('../models/estadisticas.model');

 // METHODS GET & POST DE PROMOCIONES

 exports.mostrarOpciones = (request, response) => {
    response.render('estadisticas', {
        title: 'Opciones de Estadísticas',
        csrfToken: request.csrfToken()
    });
};

exports.get_estadisticasGenerales = async (request, response) => {
    try {
        const data = await Estadisticas.obtenerEstadisticasGenerales();
        response.render('estadisticasGenerales', {
            title: 'Estadísticas Generales',
            csrfToken: request.csrfToken(), 
            data: data 
        });
    } catch (error) {
        console.error('Error al obtener estadísticas generales:', error);
        response.status(500).render('error', { message: 'Error al obtener estadísticas generales' });
    }
};

exports.get_estadisticasRewards = async (request, response) => {
    try {
        const rewardsData = await Estadisticas.obtenerEstadisticasRewards();
        response.render('estadisticasRewards', {
            title: 'Estadísticas Rewards',
            csrfToken: request.csrfToken(),
            rewardsData: rewardsData 
        });
    } catch (error) {
        console.error('Error al obtener estadísticas de recompensas:', error);
        response.status(500).render('error', { message: 'Error al obtener estadísticas de recompensas' });
    }
};