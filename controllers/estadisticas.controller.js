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


    // Método para obtener recompensas reclamadas por promoción
    exports.getRecompensaReclamadaPorPromocion = async (request, response) => {
    try {
        const [recompensaReclamadaPorPromocion] = await Estadisticas.fetchRecompensaReclamadaPorPromocion();
        response.json(recompensaReclamadaPorPromocion);
    } catch (error) {
        console.error('Error al obtener las recompensas reclamadas por promoción:', error);
        response.status(500).json({ message: 'Error al obtener las recompensas reclamadas por promoción' });
    }
};




exports.get_estadisticasSucursal = (request, response) => {
    response.render('estadisticasSucursal', {
        title: 'Estadísticas Sucursal',
        csrfToken: request.csrfToken()
    });
};


// Método para obtener las compras por sucursal por usuario
exports.getComprasSucursal = async (request, response) => {
    const { idSucursal } = request.query; // ID de la sucursal desde la URL

    try {
        const [comprasPorUsuario] = await Estadisticas.fetchComprasSucursal(idSucursal);
        response.json(comprasPorUsuario);
    } catch (error) {
        console.error('Error al obtener las compras por usuario en la sucursal:', error);
        response.status(500).json({ message: 'Error al obtener las compras por usuario en la sucursal' });
    }
};


// Método para obtener los reclamos de promociones por usuario en una sucursal
exports.getReclamoPromoSucursal = async (request, response) => {
    const { idSucursal } = request.query; // ID de la sucursal desde la URL

    try {
        const [reclamos] = await Estadisticas.fetchReclamoPromoSucursal(idSucursal);
        response.json(reclamos);
    } catch (error) {
        console.error('Error al obtener las promociones reclamadas por usuario en la sucursal:', error);
        response.status(500).json({ message: 'Error al obtener las promociones reclamadas por usuario en la sucursal' });
    }
};


// Método para obtener ventas de un mes en una sucursal
exports.getVentasPorMes = async (request, response) => {
    const { idSucursal } = request.query; // ID de la sucursal desde la URL

    try {
        const [ventasPorMes] = await Estadisticas.fetchVentasPorMes(idSucursal);
        response.json(ventasPorMes);
    } catch (error) {
        console.error('Error al obtener las ventas por mes:', error);
        response.status(500).json({ message: 'Error al obtener las ventas por mes' });
    }
};


// Método para obtener promociones activas en una sucursal
exports.getPromocioneSucursal = async (request, response) => {
    const { idSucursal } = request.query; // ID de la sucursal desde la URL

    try {
        const [promocioneSucursal] = await Estadisticas.fetchPromoSucursal(idSucursal);
        response.json(promocioneSucursal);
    } catch (error) {
        console.error('Error al obtener las promociones activas:', error);
        response.status(500).json({ message: 'Error al obtener las promociones activas' });
    }
};