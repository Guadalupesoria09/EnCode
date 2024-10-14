const express = require('express');
const router = express.Router();

const isAuth = require('../utils/is-auth'); // Middleware para verificar si el usuario está autenticado.
const canVerConfiguracion = require('../utils/can-verConfiguracion') // Middleware para verificar si el usuario puede ver configuraciones.
const canVerRoles = require('../utils/can-verRoles');  // Middleware para verificar si el usuario puede ver roles.
const canCrearRol = require('../utils/can-crearRol');  // Middleware para verificar si el usuario puede crear un rol.
const canModificarRol = require('../utils/can-modificarRol');  // Middleware para verificar si el usuario puede modificar un rol.
const canEliminarRol = require('../utils/can-eliminarRol');  // Middleware para verificar si el usuario puede eliminar un rol.

const configController = require('../controllers/configuracion.controller');

//Crear Rol
router.get('/crearRol', isAuth, canCrearRol, configController.get_crearRol);
router.post('/crearRol', isAuth, canCrearRol, configController.post_crearRol);

//Menu roles
router.get('/roles', isAuth, canVerRoles, configController.get_roles);

//Configuración general
router.get('/general', isAuth, canVerConfiguracion, configController.get_general);

module.exports = router;
