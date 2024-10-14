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

// Método para obtener el nombre de las promociones activas y las compras generadas
exports.getPromocionesActivas = async (request, response) => {
    try {
        const [promocionesActivas] = await Estadisticas.fetchPromocionesActivas();
        response.json(promocionesActivas);
    } catch (error) {
        console.error('Error al obtener las promociones activas:', error);
        response.status(500).json({ message: 'Error al obtener las promociones activas' });
    }
};

// Método para obtener reclamos por promoción
exports.getReclamosPorPromocion = async (request, response) => {
    try {
        const [reclamosPorPromocion] = await Estadisticas.fetchReclamosPorPromocion();
        response.json(reclamosPorPromocion);
    } catch (error) {
        console.error('Error al obtener los reclamos por promoción:', error);
        response.status(500).json({ message: 'Error al obtener los reclamos por promoción' });
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

