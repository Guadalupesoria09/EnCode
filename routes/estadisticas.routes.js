const express = require('express');
const router = express.Router();
const estadisticas_controller = require('../controllers/estadisticas.controller');

// Rutas para estadísticas
router.get('/estadisticas', estadisticas_controller.get_estadisticas);
router.get('/estadisticasRewards', estadisticas_controller.get_estadisticas_rewards);

module.exports = router;
