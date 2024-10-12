const express = require('express');
const router = express.Router();

const isAuth=require('../utils/is-auth');

const tarjetaController = require('../controllers/tarjeta.controller');

router.get('/tarjeta', isAuth, tarjetaController.get_tarjeta);

router.get('/editorTarjeta', isAuth, tarjetaController.get_editorTarjeta);

module.exports = router;
