const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios.model');

// Controlador para mostrar la página de registro
exports.get_register = (request, response, next) => {
    response.render('registrar',{
        telefono: request.session.telefono ||'',
        username: request.session.NombreUsuario || '',  
        csrfToken: request.csrfToken()
    });

};

// Controlador para registrar usuarios
exports.post_register = (request, response, next) => {
    const nombreUsuario = request.body.NombreUsuario;
    const telefono = request.body.telefono;
    const password = request.body.password;

    // Verifica si el usuario ya existe
    Usuario.fetchOneByTelefono(telefono)
        .then(([usuario, fieldData]) => {
            if (usuario.length > 0) {
                request.session.mensaje = 'El usuario ya existe';
                return response.redirect('/registrar');
            } else {
                // Hashea la contraseña antes de guardarla
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        console.log('Error al hashear la contraseña:', err);
                        request.session.mensaje = 'Error 500: Error del servidor';
                        return response.redirect('/registrar');
                    }

                    // Crea el nuevo usuario en la base de datos
                    Usuario.create({
                        NombreUsuario: nombreUsuario,
                        telefono: telefono,
                        Contrasenia: hash
                    })
                    .then(() => {
                        console.log('Usuario creado exitosamente');
                        request.session.mensaje = 'Usuario registrado correctamente';
                        response.redirect('/login');
                    })
                    .catch(err => {
                        console.log('Error al crear el usuario:', err);
                        request.session.mensaje = 'Error 500: Error del servidor';
                        response.redirect('/registrar');
                    });
                });
            }
        })
        .catch(err => {
            console.log('Error al verificar el usuario:', err);
            request.session.mensaje = 'Error 500: Error del servidor';
            response.redirect('/registrar');
        });
};

exports.get_login = (request, response, next) => {
    response.render('login', {
        csrfToken: request.csrfToken()
    });

};

// Controlador para iniciar sesión
exports.post_login = (request, response, next) => {
    const telefono = request.body.telefono;

    Usuario.fetchOneByTelefono(telefono)

        .then(([usuario, fieldData]) => {
            
            if (usuario.length > 0) {
                // Comparar la contraseña ingresponseada con el hash almacenado
                bcrypt.compare(request.body.password, usuario[0].Contrasenia)
                    .then(doMatch => {
                        if (doMatch) {
                            request.session.isLoggedIn = true;
                            request.session.NombreUsuario = usuario[0].NombreUsuario;
                            request.session.IDUsuario = usuario[0].IDUsuario;

                            // Obtener privilegios del usuario
                            Usuario.getPrivilegios(usuario[0].IDUsuario)
                                .then(([privilegios, fieldData]) => {
                                    request.session.privilegios = privilegios;
                                    return request.session.save(err => {
                                        response.redirect('/home');
                                    });
                                })
                                .catch(err => {
                                    console.log('Error al obtener privilegios:', err);
                                    response.redirect('/login');
                                });
                        } else {
                            request.session.mensaje = 'El usuario y/o contraseña no coinciden';
                            response.redirect('/login');
                        }
                    })
                    .catch(err => {
                        console.log('Error al comparar contraseñas:', err);
                        response.redirect('/login');
                    });
            } else {
                request.session.mensaje = 'El usuario no existe';
                response.redirect('/login');
            }
        })
        .catch(err => {
            request.session.mensaje = 'Error 500: Error del servidor';
            response.redirect('/login');
        });
};

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/login');
    });
};

exports.get_home = (request, response, next) => {
    response.render('home', { 
        username: request.session.NombreUsuario || '', 
        csrfToken: request.csrfToken()
    });
};