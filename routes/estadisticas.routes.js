const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticas.controller');
const isAuth = require('../utils/is-auth');

// Ruta para la página de opciones de estadísticas
router.get('/', isAuth, estadisticasController.mostrarOpciones);

// Ruta para estadísticas generales
router.get('/generales',isAuth, estadisticasController.get_estadisticasGenerales);

// Ruta para estadísticas rewards
router.get('/sucursal',isAuth, estadisticasController.get_estadisticasRewards);

// Ruta para obtener las compras por sucursal
router.get('/comprasSucursal/:id',isAuth, estadisticasController.getComprasSucursal);

// Ruta para obtener compras por usuario 
router.get('/comprasPorUsuario', estadisticasController.getComprasPorUsuario);

// Ruta para obtener promociones activas con sus compras
router.get('/promocionesActivas', estadisticasController.getPromocionesActivas);

// Ruta para obtener reclamos por promoción 
router.get('/reclamosPorPromocion', estadisticasController.getReclamosPorPromocion);

// Ruta para obtener reclamos de promociones por usuario por sucursal
router.get('/reclamoPromoSucursal', estadisticasController.getReclamoPromoSucursal);

// Ruta para obtener recompensas reclamadas por promoción 
router.get('/recompensaReclamadaPorPromocion', estadisticasController.getRecompensaReclamadaPorPromocion);

module.exports = router;
