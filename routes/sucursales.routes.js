const express = require('express');
const router = express.Router();

const sucursalController = require('../controllers/sucursal.controller');

//Registrar Sucursal
router.get('/registrarSucursal', sucursalController.get_registrarSucursal);
router.post('/registrarSucursal', sucursalController.post_registrarSucursal);

//Registrar dueño
router.get('/registrarDueno', sucursalController.get_registrarDueno);

//Menu sucursales
router.get('/sucursales', sucursalController.get_sucursales);


module.exports = router;
