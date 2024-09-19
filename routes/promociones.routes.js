const express = require('express');
const router = express.Router();
const promociones_controller = require('../controllers/promociones.controller');

<<<<<<< HEAD
const promociones_controller = require('../controllers/promociones.controller');

router.get('/promociones', promociones_controller.get_promo);
router.post('/promociones', promociones_controller.post_promo);
router.get('/tarjeta', promociones_controller.get_tarjeta);
router.get('/recompensas', promociones_controller.get_recompensas);

=======
// Rutas para promociones
router.get('/promociones', promociones_controller.get_crear_promocion);
router.get('/tarjeta', promociones_controller.get_editar_tarjeta);
router.get('/recompensas', promociones_controller.get_registrar_recompensa);

>>>>>>> neto/logindb
module.exports = router;
