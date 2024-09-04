const express = require('express');
const router = express.Router();


router.get('/registrarSucursales', (request, response) => {
    response.render('registrarSucursales'); // Renderiza la vista 'registrarSucursales.ejs'
});

router.get('/registrarDueno', (request, response) => {
    response.render('registrarDueno'); // Renderiza la vista 'registrarDueno.ejs'
});

router.get('/sucursales', (request, response) => {
    response.render('sucursales'); // Renderiza la vista 'sucursales.ejs'
});

module.exports = router;
