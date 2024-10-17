const express = require('express');  // Importamos express para manejar las rutas.
const router = express.Router();  // Creamos un enrutador con express.

const isAuth = require('../utils/is-auth');  // Middleware para verificar si el usuario está autenticado.

const users_controller = require('../controllers/usuarios.controller');  // Importamos el controlador de usuarios.

// Ruta GET para mostrar el formulario de registro de usuario.
router.get('/registrar', users_controller.get_register);

// Ruta POST para registrar un nuevo usuario.
router.post('/registrar', users_controller.post_register);

// Ruta GET para mostrar la página de login.
router.get('/login', users_controller.get_login);

// Ruta POST para procesar el login de usuario.
router.post('/login', users_controller.post_login);

// Ruta GET para cerrar sesión.
router.get('/logout', users_controller.get_logout);

// Ruta GET para mostrar el home, accesible solo para usuarios autenticados.
router.get('/home', isAuth, users_controller.get_home);

// Ruta GET para mostrar la página de recuperación de contraseña.
router.get('/recuperar', users_controller.get_recuperar);

// Ruta POST para enviar el código de verificación de recuperación de contraseña.
router.post('/enviar-codigo', users_controller.post_codigo);

// Ruta GET para verificar el código enviado para la recuperación de contraseña.
router.get('/verificarCodigo', users_controller.get_verificar_codigo);

// Ruta GET para editar un usuario, accesible solo para usuarios autenticados. Recibe el ID del usuario como parámetro.
router.get('/editarUsuario/:IDUsuario', isAuth, users_controller.get_editarUsuario);

// Ruta POST para guardar los cambios al editar un usuario. Solo accesible para usuarios autenticados.
router.post('/editarUsuario', isAuth, users_controller.post_editarUsuario);

// Ruta GET para eliminar un usuario. Recibe el ID del usuario como parámetro.
router.get('/eliminarUsuario/:IDUsuario', users_controller.get_deleteUsuario);

// Ruta GET para redirigir a la raíz del sitio (posiblemente el login o home).
router.get('/', users_controller.get_root);

module.exports = router;  // Exportamos las rutas para que sean utilizadas en otras partes de la aplicación.
