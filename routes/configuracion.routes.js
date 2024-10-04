const express = require('express');
const router = express.Router();

const isAuth = require('../utils/is-auth');
const configController = require('../controllers/configuracion.controller');

//Crear Rol
router.get('/crearRol', isAuth, configController.get_crearRol);
router.post('/crearRol', isAuth, configController.post_crearRol);

//Menu roles
router.get('/roles', isAuth, configController.get_roles);

//Configuración general
router.get('/general', isAuth, configController.get_general);

module.exports = router;
