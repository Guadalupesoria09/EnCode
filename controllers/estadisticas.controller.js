const Estadisticas = require('../models/estadisticas.model');

 // METHODS GET & POST DE Estadisticas

 exports.mostrarOpciones = (request, response) => {
    response.render('estadisticas', {
        title: 'Opciones de Estadísticas',
        csrfToken: request.csrfToken()
    });
};


exports.get_estadisticasGenerales = (request, response) => {
    response.render('estadisticasGenerales', {
        title: 'Estadísticas Generales',
        csrfToken: request.csrfToken()
    });
};

// Método para obtener las compras por usuario
exports.getComprasPorUsuario = async (request, response) => {
    try {
        const [comprasPorUsuario] = await Estadisticas.fetchComprasPorUsuario();
        response.json(comprasPorUsuario); 
    } catch (error) {
        console.error('Error al obtener las compras por usuario:', error);
        response.status(500).json({ message: 'Error al obtener las compras por usuario' });
    }
};



exports.get_estadisticasRewards = async (request, response) => {
    try {
        const comprasPorUsuario = await Estadisticas.fetchComprasPorUsuario();        
        response.render('estadisticasRewards', {
            title: 'Estadísticas Rewards',
            csrfToken: request.csrfToken(),
            data: { comprasPorUsuario } 
        });
    } catch (error) {
        console.error('Error al obtener estadísticas generales:', error);
        response.status(500).render('error', { message: 'Error al obtener estadísticas generales' });
    }
};

