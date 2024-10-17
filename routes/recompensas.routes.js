const express = require('express');
const router = express.Router();

const isAuth = require('../utils/is-auth');

const canVerRecompensas = require('../utils/can-verRecompensas');
const canRegistrarRecompensa = require('../utils/can-registrarRecompensa');
const canModificarRecompensa = require('../utils/can-modificarRecompensa');
const canEliminarRecompensa = require('../utils/can-modificarRecompensa');

const recompensas_controller = require('../controllers/recompensas.controller');

// rutas editar & eliminar recompensa
router.get('/delete/:id', isAuth, canEliminarRecompensa, recompensas_controller.get_deleteRecomp);
router.get('/editRecompensas/:id', isAuth, canModificarRecompensa, recompensas_controller.get_editarRecompensa);
router.post('/editRecompensas', isAuth, canModificarRecompensa, recompensas_controller.post_editarRecompensa);

// rutas registrar recompensa
router.get('/agregar', isAuth, canRegistrarRecompensa, recompensas_controller.get_agregarRecompensas);
router.post('/agregar', isAuth, canRegistrarRecompensa, recompensas_controller.post_agregarRecompensas);

// ruta recuperar todas las recompensas
router.get('/buscar/:valor_busqueda', isAuth, canVerRecompensas, recompensas_controller.get_buscar);
router.get('/recompensas', isAuth, canVerRecompensas, recompensas_controller.get_recompensas);

module.exports = router;