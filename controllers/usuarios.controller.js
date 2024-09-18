const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios.model');

exports.post_login = (req, res, next) => {
    const telefono = req.body.telefono;

    req.session.mensaje = '';
    console.log('Intentando iniciar sesión con teléfono:', telefono);
    console.log('Contraseña ingresada:', req.body.password);

    Usuario.fetchOneByTelefono(telefono)
        .then(([usuario, fieldData]) => {
            if (usuario.length > 0) {
                console.log('Usuario encontrado:', usuario[0].NombreUsuario);
                console.log('Hash de contraseña almacenada:', usuario[0].Contrasenia);
                // Compara la contraseña ingresada con el hash almacenado
                bcrypt.compare(req.body.password, usuario[0].Contrasenia)
                    .then(doMatch => {
                        if (doMatch) {
                            console.log('Contraseña correcta. Iniciando sesión...');

                            // Guardar información del usuario en la sesión
                            req.session.isLoggedIn = true;
                            req.session.NombreUsuario = usuario[0].NombreUsuario;
                            req.session.IDUsuario = usuario[0].IDUsuario;

                            // Obtener privilegios del usuario
                            Usuario.getPrivilegios(usuario[0].IDUsuario)
                                .then(([privilegios, fieldData]) => {
                                    req.session.privilegios = privilegios;
                                    console.log('Privilegios obtenidos:', privilegios);

                                    // Guardar la sesión y redirigir
                                    return req.session.save(err => {
                                        if (err) {
                                            console.log('Error al guardar la sesión:', err);
                                            return res.redirect('/login');
                                        }
                                        console.log('Sesión guardada. Redirigiendo a /home...');
                                        res.redirect('/home');
                                    });
                                })
                                .catch(err => {
                                    console.log('Error al obtener privilegios:', err);
                                    req.session.mensaje = 'Error 500: Error del servidor';
                                    return res.redirect('/login');
                                });
                        } else {
                            console.log('Contraseña incorrecta');
                            req.session.mensaje = 'El usuario y/o contraseña no coinciden';
                            return res.redirect('/login');
                        }
                    })
                    .catch(err => {
                        console.log('Error al comparar contraseñas:', err);
                        req.session.mensaje = 'El usuario y/o contraseña no coinciden';
                        return res.redirect('/login');
                    });
            } else {
                console.log('Usuario no encontrado');
                req.session.mensaje = 'El usuario no existe';
                return res.redirect('/login');
            }
        })
        .catch(err => {
            console.log('Error al buscar el usuario:', err);
            req.session.mensaje = 'Error 500: Error del servidor';
            return res.redirect('/login');
        });
};

exports.get_home = (req, res, next) => {
    const username = req.session.NombreUsuario || '';
    const telefono = req.session.telefono || '';
    res.render('home', {
        username: username,
        telefono: telefono
    });
};

exports.get_login = (req, res, next) => {
    res.render('login'); 
};

exports.get_logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};
