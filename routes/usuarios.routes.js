const express = require('express');
const router = express.Router();

const isAuth=require('../utils/is-auth');

const users_controller = require('../controllers/usuarios.controller');

router.get('/registrar', users_controller.get_register);
router.post('/registrar', users_controller.post_register); 

router.get('/login', users_controller.get_login); 
router.post('/login', users_controller.post_login); 

router.get('/logout', users_controller.get_logout); 
router.get('/home', isAuth, users_controller.get_home);
router.get('/recuperar',users_controller.get_recuperar);

router.post('/enviar-codigo', users_controller.post_codigo);
router.get('/verificar-codigo', users_controller.get_verificar_codigo);

router.get('/editar/:IDUsuario', users_controller.get_editarUsuario);
router.post('/editar/:IDUsuario', users_controller.post_editarUsuario);

router.get('/sucur/:IDSucursal/usuarios', isAuth, users_controller.get_usuariosDeSucursal);



router.get('/', users_controller.get_root);

module.exports = router;
