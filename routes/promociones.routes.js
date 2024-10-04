const express = require('express');
const router = express.Router();

const isAuth=require('../utils/is-auth');

const promociones_controller = require('../controllers/promociones.controller');

//rutas crear promocion
router.get('/promociones', isAuth, promociones_controller.get_promo);
router.post('/promociones', isAuth, promociones_controller.post_promo);
router.get('/crearPromociones', isAuth, promociones_controller.get_crear);
router.post('/crearPromociones', isAuth, promociones_controller.post_crear);
router.get('/editarPromo/:id', isAuth, promociones_controller.get_editarPromo);
router.post('/editarPromo', isAuth, promociones_controller.post_editarPromo);
router.get('/deletePromo/:id', isAuth, promociones_controller.get_deletePromo);

//rutas editar tarjeta
router.get('/tarjeta', isAuth, promociones_controller.get_tarjeta);
router.get('/editorTarjeta', isAuth, promociones_controller.get_editorTarjeta);

// rutas registrar recompensa
router.get('/delete/:id', isAuth, promociones_controller.get_deleteRecomp);
router.get('/editRecompensas/:id', isAuth, promociones_controller.get_editarRecompensa);
router.post('/editRecompensas', isAuth, promociones_controller.post_editarRecompensa);
router.get('/recompensas/agregar', isAuth, promociones_controller.get_agregarRecompensas);
router.post('/recompensas/agregar', isAuth, promociones_controller.post_agregarRecompensas);
router.get('/recompensas', isAuth, promociones_controller.get_recompensas);

module.exports = router;
