// estadisticas.routes.js
const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticas.controllers');

// Define las rutas y asocia cada ruta con un controlador
router.get('/estadisticas', estadisticasController.getEstadisticas);
router.get('/estadisticasRewards', estadisticasController.getEstadisticasRewards);

module.exports = router;