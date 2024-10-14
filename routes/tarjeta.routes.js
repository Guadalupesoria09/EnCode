const express = require('express');
const router = express.Router();

const isAuth=require('../utils/is-auth');
const canVerTarjeta = require('../utils/can-verTarjeta');
const canEditarTarjeta = require('../utils/can-editarTarjeta');
const canEditorTarjeta = require('../utils/can-editorTarjeta');


const tarjetaController = require('../controllers/tarjeta.controller');

router.get('/tarjeta', isAuth, canVerTarjeta, tarjetaController.get_tarjeta);

router.get('/editorTarjeta', isAuth, canEditorTarjeta, tarjetaController.get_editorTarjeta);

module.exports = router;
