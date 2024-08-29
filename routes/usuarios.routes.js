const express = require('express');
const router = express.Router();

// Ruta para mostrar el formulario de inicio de sesión
router.get('/login', (req, res) => {
    res.render('login'); // Renderiza la vista 'login.ejs'
});

// Ruta para manejar el formulario de inicio de sesión
router.post('/login', (req, res) => {
    const { telefono, contrasena } = req.body;
    // Aquí podrías agregar lógica para verificar credenciales

    // Redirige a /usuarios/home después del login exitoso
    res.redirect('/home'); 
});

// Ruta para mostrar la página home
router.get('/home', (req, res) => {
    res.render('home'); 
});

module.exports = router;
