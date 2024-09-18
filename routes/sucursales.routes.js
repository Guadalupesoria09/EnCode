const express = require('express');
const router = express.Router();
const sucursales_controller = require('../controllers/sucursales.controller');

// Rutas para sucursales
router.get('/registrarSucursales', sucursales_controller.get_registrar_sucursales);
router.get('/registrarDueno', sucursales_controller.get_registrar_dueno);
router.get('/sucursales', sucursales_controller.get_sucursales);

module.exports = router;
