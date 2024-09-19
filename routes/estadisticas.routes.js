// estadisticas.routes.js
const express = require('express');
const router = express.Router();

const isAuth=require('../utils/is-auth');

const estadisticasController = require('../controllers/estadisticas.controller');

router.get('/estadisticas', isAuth, estadisticasController.getEstadisticas);
router.get('/estadisticasRewards', isAuth, estadisticasController.getEstadisticasRewards);

module.exports = router;