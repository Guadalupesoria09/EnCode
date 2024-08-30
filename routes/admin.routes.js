const express = require('express');
const router = express.Router();


router.get('/registrarSucursales', (request, response) => {
    response.render('registrarSucursales'); // Renderiza la vista 'crearPromocion.ejs'
});

router.get('/registrarDueno', (request, response) => {
    response.render('registrarDueno'); // Renderiza la vista 'crearPromocion.ejs'
});

router.get('/sucursales', (request, response) => {
    response.render('sucursales'); // Renderiza la vista 'crearPromocion.ejs'
});

module.exports = router;
