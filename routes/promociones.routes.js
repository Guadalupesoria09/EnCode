const express = require('express');
const router = express.Router();

const isAuth=require('../utils/is-auth');

const promociones_controller = require('../controllers/promociones.controller');


router.get('/promociones', isAuth, promociones_controller.get_promo);
router.post('/promociones', isAuth, promociones_controller.post_promo);
router.get('/tarjeta', isAuth, promociones_controller.get_tarjeta);
router.get('/recompensas', isAuth, promociones_controller.get_recompensas);


module.exports = router;
