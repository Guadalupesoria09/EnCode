const express = require('express');
const router = express.Router();

// Ruta para mostrar el formulario de inicio de sesión
router.get('/login', (req, res) => {
    res.render('login'); // Renderiza la vista login.ejs
});

// Ruta para manejar el formulario de inicio de sesión
router.post('/login', (req, res) => {
    const { telefono, contrasena } = req.body;
    // Lógica de autenticación
    res.redirect('/home'); // Redirige al usuario tras el login exitoso
});

module.exports = router;
