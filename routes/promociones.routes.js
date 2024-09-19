const express = require('express');
const router = express.Router();
const promociones_controller = require('../controllers/promociones.controller');

//rutas crear promocion
router.get('/promociones', promociones_controller.get_promo);
router.post('/promociones', promociones_controller.post_promo);

//rutas editar tarjeta
router.get('/tarjeta', promociones_controller.get_tarjeta);

// rutas registrar recompensa
router.get('/recompensas', promociones_controller.get_recompensas);
router.post('/recompensas', promociones_controller.post_recompensas)


module.exports = router;
