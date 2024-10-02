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

exports.post_register = (request, response, next) => {
    const nuevo_usuario = new Usuario(
	request.body.NombreUsuario, request.body.NumTelefono, request.body.FechaNacimiento, request.body.Contrasenia,
        request.body.Genero, request.body.Direccion, request.body.Ciudad, request.body.Estado, request.body.TipoRol);
  
    nuevo_usuario.save().then(() => {
	return response.redirect('/sucur/sucursales');
    }).catch((error) => {
       console.log(error);
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