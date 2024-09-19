const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios.model');

// Controlador para mostrar la página de registro
exports.get_register = (req, res, next) => {
    res.render('registrar',{
        telefono: req.session.telefono ||'',
        csrfToken: req.csrfToken()
    }); // Renderiza la página de registro

};

// Controlador para registrar usuarios
exports.post_register = (req, res, next) => {
    const nombreUsuario = req.body.NombreUsuario;
    const telefono = req.body.telefono;
    const password = req.body.password;

    // Verifica si el usuario ya existe
    Usuario.fetchOneByTelefono(telefono)
        .then(([usuario, fieldData]) => {
            if (usuario.length > 0) {
                req.session.mensaje = 'El usuario ya existe';
                return res.redirect('/registrar');
            } else {
                // Hashea la contraseña antes de guardarla
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        console.log('Error al hashear la contraseña:', err);
                        req.session.mensaje = 'Error 500: Error del servidor';
                        return res.redirect('/registrar');
                    }

                    // Crea el nuevo usuario en la base de datos
                    Usuario.create({
                        NombreUsuario: nombreUsuario,
                        telefono: telefono,
                        Contrasenia: hash
                    })
                    .then(() => {
                        console.log('Usuario creado exitosamente');
                        req.session.mensaje = 'Usuario registrado correctamente';
                        res.redirect('/login');
                    })
                    .catch(err => {
                        console.log('Error al crear el usuario:', err);
                        req.session.mensaje = 'Error 500: Error del servidor';
                        res.redirect('/registrar');
                    });
                });
            }
        })
        .catch(err => {
            console.log('Error al verificar el usuario:', err);
            req.session.mensaje = 'Error 500: Error del servidor';
            res.redirect('/registrar');
        });
};

exports.get_login = (req, res, next) => {
    res.render('login', {
        csrfToken: req.csrfToken()
    });

};

// Controlador para iniciar sesión
exports.post_login = (req, res, next) => {
    const telefono = req.body.telefono;

    Usuario.fetchOneByTelefono(telefono)

        .then(([usuario, fieldData]) => {
            
            if (usuario.length > 0) {
                // Comparar la contraseña ingresada con el hash almacenado
                bcrypt.compare(req.body.password, usuario[0].Contrasenia)
                    .then(doMatch => {
                        if (doMatch) {
                            req.session.isLoggedIn = true;
                            req.session.NombreUsuario = usuario[0].NombreUsuario;
                            req.session.IDUsuario = usuario[0].IDUsuario;

                            // Obtener privilegios del usuario
                            Usuario.getPrivilegios(usuario[0].IDUsuario)
                                .then(([privilegios, fieldData]) => {
                                    req.session.privilegios = privilegios;
                                    return req.session.save(err => {
                                        res.redirect('/home');
                                    });
                                })
                                .catch(err => {
                                    console.log('Error al obtener privilegios:', err);
                                    res.redirect('/login');
                                });
                        } else {
                            req.session.mensaje = 'El usuario y/o contraseña no coinciden';
                            res.redirect('/login');
                        }
                    })
                    .catch(err => {
                        console.log('Error al comparar contraseñas:', err);
                        res.redirect('/login');
                    });
            } else {
                req.session.mensaje = 'El usuario no existe';
                res.redirect('/login');
            }
        })
        .catch(err => {
            req.session.mensaje = 'Error 500: Error del servidor';
            res.redirect('/login');
        });
};

exports.get_logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};

exports.get_home = (req, res, next) => {
    res.render('home', { 
        username: req.session.NombreUsuario || '', 
        csrfToken: req.csrfToken()
    });
};