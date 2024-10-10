const express = require('express');
const router = express.Router();

const isAuth=require('../utils/is-auth');

const sucursalController = require('../controllers/sucursal.controller');

router.post('/registrarSucursal', isAuth, sucursalController.post_registrarSucursal);

router.get('/editarSucursal/:IDSucursal', isAuth, sucursalController.get_editarSucursales);
router.post('/editarSucursal', isAuth, sucursalController.post_editarSucursales);
router.get('/eliminarSucursal/:IDSucursal', sucursalController.get_deleteSucursal);

//Registrar Sucursal
router.get('/registrarSucursal', isAuth, sucursalController.get_registrarSucursal);

//Menu sucursales
router.get('/sucursales', isAuth, sucursalController.get_sucursales);


module.exports = router;
