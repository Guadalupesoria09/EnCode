const express = require('express');
const router = express.Router();

// Ruta para mostrar el formulario de crear promocion
router.get('/promociones', (request, response) => {
    response.render('crearPromocion'); // Renderiza la vista 'crearPromocion.ejs'
});

module.exports = router;