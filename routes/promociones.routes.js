const express = require('express');
const router = express.Router();

const isAuth=require('../utils/is-auth');

const promociones_controller = require('../controllers/promociones.controller');

//rutas crear promocion
router.get('/promociones', isAuth, promociones_controller.get_promo);
router.post('/promociones', isAuth, promociones_controller.post_promo);
router.get('/promociones', isAuth, promociones_controller.get_promo);
router.post('/promociones', isAuth, promociones_controller.post_promo);
router.get('/crearPromociones', isAuth, promociones_controller.get_crear);
router.post('/crearPromociones', isAuth, promociones_controller.post_crear);
router.get('/editarPromo/:id', isAuth, promociones_controller.get_editarPromo);
router.post('/editarPromo', isAuth, promociones_controller.post_editarPromo);

//rutas editar tarjeta
router.get('/tarjeta', isAuth, promociones_controller.get_tarjeta);

// rutas registrar recompensa
router.get('/recompensas', isAuth, promociones_controller.get_recompensas);
router.post('/recompensas', isAuth, promociones_controller.post_recompensas)


module.exports = router;
