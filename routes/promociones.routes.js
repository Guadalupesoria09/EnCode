const express = require('express');
const router = express.Router();
const promociones_controller = require('../controllers/promociones.controller');

//rutas crear promocion
router.get('/promociones', promociones_controller.get_promo);
router.post('/promociones', promociones_controller.post_promo);
router.get('/crearPromociones', promociones_controller.get_crear);
router.post('/crearPromociones', promociones_controller.post_crear);
router.get('/editarPromo/:id', promociones_controller.get_editarPromo);
router.post('/editarPromo', promociones_controller.post_editarPromo);

//rutas editar tarjeta
router.get('/tarjeta', promociones_controller.get_tarjeta);

// rutas registrar recompensa
router.get('/recompensas', promociones_controller.get_recompensas);
router.post('/recompensas', promociones_controller.post_recompensas)


module.exports = router;
