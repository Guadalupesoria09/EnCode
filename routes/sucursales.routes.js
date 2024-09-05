const express = require('express');
const router = express.Router();
const sucursales_controller = require('../controllers/sucursales.controller');

// Rutas para sucursales
router.get('/registrarSucursales', (request, response, next) => {
    console.log(response.locals.telefono);  // Imprime el valor de telefono en la consola
    sucursales_controller.get_registrar_sucursales(request, response, next);
});

router.get('/registrarDueno', (request, response, next) => {
    console.log(response.locals.telefono);  // Imprime el valor de telefono en la consola
    sucursales_controller.get_registrar_dueno(request, response, next);
});

router.get('/sucursales', (request, response, next) => {
    console.log(response.locals.telefono);  // Imprime el valor de telefono en la consola
    sucursales_controller.get_sucursales(request, response, next);
});

module.exports = router;
