const express = require('express');  // Importamos express para manejar las rutas.
const router = express.Router();  // Creamos un enrutador con express.

const isAuth = require('../utils/is-auth');  // Middleware para verificar si el usuario está autenticado.

const sucursalController = require('../controllers/sucursal.controller');  // Importamos el controlador de sucursales.

// Ruta POST para registrar una sucursal. Solo accesible para usuarios autenticados.
router.post('/registrarSucursal', isAuth, sucursalController.post_registrarSucursal);

// Ruta GET para editar una sucursal. Recibe el ID de la sucursal como parámetro y solo está disponible para usuarios autenticados.
router.get('/editarSucursal/:IDSucursal', isAuth, sucursalController.get_editarSucursales);

// Ruta POST para guardar los cambios al editar una sucursal. Solo accesible para usuarios autenticados.
router.post('/editarSucursal', isAuth, sucursalController.post_editarSucursales);

// Ruta GET para eliminar una sucursal. Recibe el ID de la sucursal como parámetro.
router.get('/eliminarSucursal/:IDSucursal', sucursalController.get_deleteSucursal);

// Ruta GET para mostrar el formulario de registro de una sucursal. Solo accesible para usuarios autenticados.
router.get('/registrarSucursal', isAuth, sucursalController.get_registrarSucursal);

// Ruta GET para ver el menú/listado de sucursales. Solo accesible para usuarios autenticados.
router.get('/sucursales', isAuth, sucursalController.get_sucursales);

module.exports = router;  // Exportamos las rutas para que sean utilizadas en otras partes de la aplicación.
