const express = require('express');
const router = express.Router();

const isAuth=require('../utils/is-auth');

const promociones_controller = require('../controllers/promociones.controller');

//rutas crear promocion
router.get('/promociones', isAuth, promociones_controller.get_promo);
router.post('/promociones', isAuth, promociones_controller.post_promo);

//rutas editar tarjeta
router.get('/tarjeta', isAuth, promociones_controller.get_tarjeta);

// rutas registrar recompensa
router.get('/recompensas', isAuth, promociones_controller.get_recompensas);
router.post('/recompensas', isAuth, promociones_controller.post_recompensas)


module.exports = router;
