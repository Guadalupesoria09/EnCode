const express = require('express');
const router = express.Router();

const isAuth = require('../utils/is-auth');
const users_controller = require('../controllers/usuarios.controller');

/**
 * Ruta para registrar un nuevo usuario.
 */
router.get('/registrar', users_controller.get_register);
router.post('/registrar', users_controller.post_register);

/**
 * Rutas para iniciar sesión y cerrar sesión.
 */
router.get('/login', users_controller.get_login);
router.post('/login', users_controller.post_login);
router.get('/logout', users_controller.get_logout);

/**
 * Ruta para la página de inicio, protegida por autenticación.
 */
router.get('/home', isAuth, users_controller.get_home);

/**
 * Ruta para la recuperación de la contraseña.
 */
router.get('/recuperar', users_controller.get_recuperar);

/**
 * Rutas para enviar y verificar el código de recuperación.
 */
router.post('/enviar-codigo', users_controller.post_codigo);
router.get('/verificar-codigo', users_controller.get_verificar_codigo);

/**
 * Rutas para editar y eliminar un usuario específico.
 */
router.get('/editarUsuario/:IDUsuario', isAuth, users_controller.get_editarUsuario);
router.post('/editarUsuario', isAuth, users_controller.post_editarUsuario);
router.get('/eliminarUsuario/:IDUsuario', users_controller.get_deleteUsuario);

/**
 * Ruta para obtener los usuarios de una sucursal específica.
 */
router.get('/sucur/:IDSucursal/usuarios', isAuth, users_controller.get_usuariosDeSucursal);

/**
 * Ruta raíz que redirige a la página principal.
 */
router.get('/', users_controller.get_root);

module.exports = router;
