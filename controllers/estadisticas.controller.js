const Estadisticas = require('../models/estadisticas.model');
const Compras = require('../models/compras.model');
const Sucursal = require('../models/sucursal.model');

 // METHODS GET & POST DE Estadisticas

 exports.mostrarOpciones = (request, response) => {
    response.render('estadisticas', {
        title: 'Opciones de Estadísticas',
	privilegios: request.session.privilegios,
        csrfToken: request.csrfToken()
    });
};

exports.get_estadisticasGenerales = (request, response) => {
    response.render('estadisticasGenerales', {
        title: 'Estadísticas Generales',
        csrfToken: request.csrfToken()
    });
};

// Método para obtener las compras por sucursal por usuario
exports.getComprasSucursal = async (request, response) => {
    const  {idSucursal}   = request.query; // ID de la sucursal desde la URL
    try {
        const [comprasPorUsuario] = await Compras.fetchComprasSucursal(idSucursal);

        return response.render('compras');
        response.json(comprasPorUsuario);

       
    } catch (error) {
        console.error('Error al obtener las compras por usuario en la sucursal:', error);
        response.status(500).json({ message: 'Error al obtener las compras por usuario en la sucursal' });
    }
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
        const [reclamosPorPromocion] = await Compras.fetchReclamosPorPromocion();
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

exports.get_estadisticasRewards = async (request, response) => {
    try {
        const comprasPorUsuario = await Estadisticas.fetchComprasPorUsuario();        
        response.render('estadisticasRewards', {
            title: 'Estadísticas Rewards',
            csrfToken: request.csrfToken(),
            data: { comprasPorUsuario } 
        });
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

exports.getMasUtilizadas = async (request, response) => {
    try {
        const [recompensasMasUtilizadas] = await PromoSucurRecomp.fetchMasUtilizadas();

        if (!recompensasMasUtilizadas || recompensasMasUtilizadas.length === 0) {
            return response.status(404).json({ message: 'No se encontraron recompensas más utilizadas.' });
        }

        return response.json(recompensasMasUtilizadas);

    } catch (error) {
        console.error('Error al obtener las recompensas más utilizadas:', error);
        response.status(500).json({ message: 'Error al obtener las recompensas más utilizadas' });
    }
};