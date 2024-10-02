const express = require('express');
const router = express.Router();

const isAuth=require('../utils/is-auth');

const sucursalController = require('../controllers/sucursal.controller');

//Registrar Sucursal
router.get('/registrarSucursal', isAuth, sucursalController.get_registrarSucursal);
router.post('/registrarSucursal', isAuth, sucursalController.post_registrarSucursal);

//Menu sucursales
router.get('/sucursales', isAuth, sucursalController.get_sucursales);


module.exports = router;
