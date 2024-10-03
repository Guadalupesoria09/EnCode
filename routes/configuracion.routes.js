const express = require('express');
const router = express.Router();

const isAuth = require('../utils/is-auth');
const configuracionController = ('../controllers/configuracion.controller');

router.get('/crearRol', isAuth, configuracionController.get_crearRol);
router.post('/crearRol', isAuth, configuracionController.post_crearRol);

router.get('/general', isAuth, configuracionController.get_general);

module.exports = router;
