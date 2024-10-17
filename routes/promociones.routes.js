const express = require('express');
const router = express.Router();

const isAuth = require('../utils/is-auth');

const canVerPromociones = require('../utils/can-verPromociones');
const canCrearPromocion = require('../utils/can-crearPromocion');
const canModificarPromocion = require('../utils/can-modificarPromocion');
const canEliminarPromocion = require('../utils/can-eliminarPromocion');
const canCambiarEstatus = require('../utils/can-cambiarEstatus');

const promociones_controller = require('../controllers/promociones.controller');

//rutas crear promocion
router.get('/promociones', isAuth, canVerPromociones, promociones_controller.get_promo);
router.post('/promociones', isAuth, canCambiarEstatus, promociones_controller.post_promo);
router.get('/crearPromociones', isAuth, canCrearPromocion, promociones_controller.get_registrar);
router.post('/crearPromociones', isAuth, canCrearPromocion, promociones_controller.post_registrar);
router.get('/editarPromo/:id', isAuth, canModificarPromocion, promociones_controller.get_editarPromo);
router.post('/editarPromo', isAuth, canModificarPromocion, promociones_controller.post_editarPromo);
router.get('/deletePromo/:id', isAuth, canEliminarPromocion, promociones_controller.get_deletePromo);


module.exports = router;
