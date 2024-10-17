const express = require('express');  // Importamos express para manejar las rutas.
const router = express.Router();  // Creamos un enrutador con express.

const isAuth = require('../utils/is-auth');  // Middleware para verificar si el usuario está autenticado.
const canVerSucursal = require('../utils/can-verSucursal');  // Middleware para verificar si el usuario puede ver su sucursal.
const canVerSucursales = require('../utils/can-verSucursales');  // Middleware para verificar si el usuario puede ver todas las sucursales.
const canRegistrarSucursal = require('../utils/can-registrarSucursal');  // Middleware para verificar si el usuario puede registrar una sucursal.
const canModificarSucursal = require('../utils/can-modificarSucursal');  // Middleware para verificar si el usuario puede modificar una sucursal.
const canEliminarSucursal = require('../utils/can-eliminarSucursal');  // Middleware para verificar si el usuario puede eliminar una sucursal.

const sucursalController = require('../controllers/sucursal.controller');  // Importamos el controlador de sucursales.

// Ruta POST para registrar una sucursal. Solo accesible para usuarios autenticados.
router.post('/registrarSucursal', isAuth, canRegistrarSucursal, sucursalController.post_registrarSucursal);

// Ruta GET para editar una sucursal. Recibe el ID de la sucursal como parámetro y solo está disponible para usuarios autenticados.
router.get('/editarSucursal/:IDSucursal', isAuth, canModificarSucursal, sucursalController.get_editarSucursales);

// Ruta POST para guardar los cambios al editar una sucursal. Solo accesible para usuarios autenticados.
router.post('/editarSucursal', isAuth, canModificarSucursal, sucursalController.post_editarSucursales);

// Ruta GET para eliminar una sucursal. Recibe el ID de la sucursal como parámetro.
router.get('/eliminarSucursal/:IDSucursal', canEliminarSucursal, sucursalController.get_deleteSucursal);

// Ruta GET para mostrar el formulario de registro de una sucursal. Solo accesible para usuarios autenticados.
router.get('/registrarSucursal', isAuth, canRegistrarSucursal, sucursalController.get_registrarSucursal);

// Ruta GET para obtener los usuarios asociados a una sucursal específica. Solo accesible para usuarios autenticados.
router.get('/:IDSucursal/usuarios', isAuth, canVerSucursal, sucursalController.get_usuariosDeSucursal);

// Ruta GET para ver el menú/listado de sucursales. Solo accesible para usuarios autenticados.
router.get('/sucursales', isAuth, canVerSucursales, sucursalController.get_sucursales);

module.exports = router;  // Exportamos las rutas para que sean utilizadas en otras partes de la aplicación.
