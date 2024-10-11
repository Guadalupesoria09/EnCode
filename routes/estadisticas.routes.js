const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticas.controller');

// Ruta para opciones de estadísticas
router.get('/', estadisticasController.mostrarOpciones);

// Ruta para estadísticas generales
router.get('/estadisticasGenerales', estadisticasController.estadisticasGenerales);

// Ruta para estadísticas rewards
router.get('/estadisticasRewards', estadisticasController.estadisticasRewards);

module.exports = router;