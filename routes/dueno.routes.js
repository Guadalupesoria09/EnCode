const express = require('express');
const router = express.Router();

// Ruta para mostrar el formulario de crear promocion
router.get('/promociones', (request, response) => {
    response.render('crearPromocion'); // Renderiza la vista 'crearPromocion.ejs'
});

router.get('/tarjeta',(request, response)=> {
    response.render('editarTarjeta'); //Renderiza la vista editarTarjeta
})

// Ruta para mostrar el formulario de registrar recompensa
router.get('/recompensas', (request, response) => {
    response.render('registrarRecompensa'); // Renderiza la vista 'registrarRecompensa.ejs'
});


module.exports = router;