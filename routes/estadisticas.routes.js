const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticas.controller');
const isAuth = require('../utils/is-auth');  

// Ruta para la página de opciones de estadísticas
router.get('/', isAuth, estadisticasController.mostrarOpciones);

// Ruta para estadísticas generales
router.get('/generales',isAuth, estadisticasController.get_estadisticasGenerales);

// Ruta para estadísticas rewards
router.get('/rewards',isAuth, estadisticasController.get_estadisticasRewards);

// Ruta para obtener compras por usuario (JSON)
router.get('/comprasPorUsuario', estadisticasController.getComprasPorUsuario);


module.exports = router;