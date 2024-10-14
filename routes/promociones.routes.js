const express = require('express');
const router = express.Router();

const isAuth = require('../utils/is-auth');

const canVerPromociones = require('../utils/can-verPromociones');
const canCrearPromocion = require('../utils/can-crearPromocion');
const canModificarPromocion = require('../utils/can-modificarPromocion');
const canEliminarPromocion = require('../utils/can-eliminarPromocion');
const canCambiarEstatus = require('../utils/can-cambiarEstatus');

const canVerRecompensas = require('../utils/can-verRecompensas');
const canRegistrarRecompensa = require('../utils/can-registrarRecompensa');
const canModificarRecompensa = require('../utils/can-modificarRecompensa');
const canEliminarRecompensa = require('../utils/can-modificarRecompensa');

const promociones_controller = require('../controllers/promociones.controller');

//rutas crear promocion
router.get('/promociones', isAuth, canVerPromociones, promociones_controller.get_promo);
router.post('/promociones', isAuth, canCambiarEstatus, promociones_controller.post_promo);
router.get('/crearPromociones', isAuth, canCrearPromocion, promociones_controller.get_crear);
router.post('/crearPromociones', isAuth, canCrearPromocion, promociones_controller.post_crear);
router.get('/editarPromo/:id', isAuth, canModificarPromocion, promociones_controller.get_editarPromo);
router.post('/editarPromo', isAuth, canModificarPromocion, promociones_controller.post_editarPromo);
router.get('/deletePromo/:id', isAuth, canEliminarPromocion, promociones_controller.get_deletePromo);

// rutas registrar recompensa
router.get('/delete/:id', isAuth, canEliminarRecompensa, promociones_controller.get_deleteRecomp);
router.get('/editRecompensas/:id', isAuth, canModificarRecompensa, promociones_controller.get_editarRecompensa);
router.post('/editRecompensas', isAuth, canModificarRecompensa, promociones_controller.post_editarRecompensa);
router.get('/recompensas/agregar', isAuth, canRegistrarRecompensa, promociones_controller.get_agregarRecompensas);
router.post('/recompensas/agregar', isAuth, canRegistrarRecompensa, promociones_controller.post_agregarRecompensas);
router.get('/recompensas', isAuth, canVerRecompensas, promociones_controller.get_recompensas);

module.exports = router;
