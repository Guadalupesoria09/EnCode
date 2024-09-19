const express = require('express');
const router = express.Router();

<<<<<<< HEAD
const sucursalController = require('../controllers/sucursal.controller');

//Registrar Sucursal
router.get('/registrarSucursal', sucursalController.get_registrarSucursal);
router.post('/registrarSucursal', sucursalController.post_registrarSucursal);

//Registrar dueño
router.get('/registrarDueno', sucursalController.get_registrarDueno);

//Menu sucursales
router.get('/sucursales', sucursalController.get_sucursales);
=======
// Rutas para sucursales
router.get('/registrarSucursales', sucursales_controller.get_registrar_sucursales);
router.get('/registrarDueno', sucursales_controller.get_registrar_dueno);
router.get('/sucursales', sucursales_controller.get_sucursales);
>>>>>>> neto/logindb

module.exports = router;
