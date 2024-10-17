const express = require('express');
const router = express.Router();

const isAuth=require('../utils/is-auth');
const canVerTarjeta = require('../utils/can-verTarjeta');
const canEditarTarjeta = require('../utils/can-editarTarjeta');
const canEditorTarjeta = require('../utils/can-editorTarjeta');

const tarjetaController = require('../controllers/tarjeta.controller');
const Tarjeta = require('../models/tarjeta.model');

router.get('/editarTarjeta', isAuth, canVerTarjeta, tarjetaController.get_tarjeta);
router.post('/editarTarjeta', isAuth, canVerTarjeta, tarjetaController.post_tarjeta);

router.get('/editorTarjeta', isAuth, canVerTarjeta, tarjetaController.get_editorTarjeta);
router.post('/editorTarjeta', isAuth, canEditorTarjeta,tarjetaController.post_editorTarjeta);

module.exports = router;
