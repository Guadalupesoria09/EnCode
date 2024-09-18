const express = require('express');
const router = express.Router();
const promociones_controller = require('../controllers/promociones.controller');

// Rutas para promociones
router.get('/promociones', promociones_controller.get_crear_promocion);
router.get('/tarjeta', promociones_controller.get_editar_tarjeta);
router.get('/recompensas', promociones_controller.get_registrar_recompensa);

module.exports = router;
