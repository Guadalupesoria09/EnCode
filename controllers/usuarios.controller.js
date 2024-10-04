const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios.model');
const { userInfo } = require('os');

const twilio = require('twilio');
const { request } = require('http');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);
const UserSucur = require('../models/userSucur.model');

// Controlador para mostrar la página de registro
exports.get_register = (request, response, next) => {

    UserSucur.fetchAll().then(([sucursales, fieldData]) =>{
        response.render('registrar',{
	    sucursales: sucursales,
            telefono: request.session.telefono ||'',
            username: request.session.NombreUsuario || '',  
            usuario: request.session.NombreUsuario || '',
            csrfToken: request.csrfToken(),
            editar: false

        });
    }); 
};

exports.post_register = (request, response, next) => { 
    const nuevo_usuario = new Usuario(
	request.body.NombreUsuario, request.body.NumTelefono, request.body.FechaNacimiento,
	request.body.Contrasenia,request.body.Genero, request.body.Direccion, request.body.Ciudad,
	request.body.Estado, request.body.TipoRol, request.body.NombreSucursal);
    nuevo_usuario.save().then(() => {
	return response.redirect('/sucur/sucursales');
    }).catch((error) => {
       console.log(error);
    });
};

// Controlador para listar usuarios de una sucursal
exports.get_usuariosDeSucursal = (request, response, next) => {
    const IDSucursal = request.params.IDSucursal;
    
    Usuario.fetchUsuariosPorSucursal(IDSucursal)
        .then(([usuarios]) => {
            response.render('listarUsuarios', {
                usuarios: usuarios,
                username: request.session.NombreUsuario || '',
                csrfToken: request.csrfToken()
            });
        })
        .catch(err => {
            console.log('Error al obtener usuarios de la sucursal:', err);
            response.redirect('/sucur/sucursales');
        });
};

//editar usuario
exports.get_editarUsuario = (request, response, next) => {
    const IDUsuario = request.params.IDUsuario;

    let usuarioData;

    // Obtener datos del usuario
    Usuario.fetchOneByID(IDUsuario)
        .then(([usuario]) => {
            if (!usuario || usuario.length === 0) {
                return response.redirect('/error');
            }
            usuarioData = usuario[0];

            // Obtener todas las sucursales usando el modelo UserSucur
            return UserSucur.fetchAll();
        })
        .then(([sucursales]) => {
            response.render('registrar', {
                usuario: usuarioData,
                sucursales: sucursales,
                username: request.session.NombreUsuario || '',
                csrfToken: request.csrfToken(),
                editar: true
            });
            console.log('Datos:', usuarioData)
        })
        .catch(err => {
            console.log('Error al cargar los datos del usuario o las sucursales:', err);
            response.redirect('/sucur/sucursales');
        });
};

//guardar los cambios
exports.post_editarUsuario = (request, response, next) => {
    const IDUsuario = request.body.IDUsuario;
    const { NombreUsuario, NumTelefono, FechaNacimiento, Genero, Direccion, Ciudad, Estado, IDSucursal, IDRol } = request.body;

    // Asegurarse de que Rol (IDRol) está presente
    const rol = IDRol || null;

    // Actualizamos los datos del usuario
    Usuario.update(IDUsuario, NombreUsuario, NumTelefono, FechaNacimiento, Genero, Direccion, Ciudad, Estado, rol)
        .then(() => {
            // Actualizamos la sucursal en la tabla 'pertenece'
            return Usuario.updateSucursal(IDUsuario, IDSucursal);
        })
        .then(() => {
            request.session.mensaje = 'Usuario modificado exitosamente';
            response.redirect('/sucur/sucursales');
        })
        .catch(err => {
            console.log('Error al modificar los datos del usuario o la sucursal:', err);
            response.redirect(`/editarUsuario/${IDUsuario}`);
        });
};

exports.get_deleteUsuario = (req, res, next) => {
    const IDUsuario = req.params.IDUsuario;

    Usuario.deleteUsuario(IDUsuario)
        .then(() => {
            req.session.mensaje = "Usuario eliminado exitosamente";
            return res.redirect('/sucur/sucursales');  // Redirigir a la vista de sucursales
        })
        .catch(err => {
            console.log('Error al eliminar el usuario:', err);
            return res.redirect('/sucur/sucursales');  // Redirigir en caso de error
        });
};

exports.get_root = (request, response, next) => {
    response. render('login',{
    csrfToken: request.csrfToken(),
    mensaje: request.session.mensaje || ''  
    });
};


exports.get_login = (request, response, next) => {
    response.render('login', {
        csrfToken: request.csrfToken(),
        mensaje: request.session.mensaje || ''  
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
                            console.log('ID de usuario:', usuario[0].IDUsuario);
                            
                            // Obtener privilegios del usuario
                            Usuario.getPrivilegios(usuario[0].IDUsuario)
                                .then(([privilegios, fieldData]) => {
                                    request.session.privilegios = privilegios;
                                    console.log('Usuario privilegios: ', privilegios);

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
        csrfToken: request.csrfToken(),
        mensaje: request.session.mensaje || ''        
    });
    // console.log('Roles:', Usuario.getPrivilegios())
};

exports.get_recuperar = (request, response, next) => {
    response.render('recuperar', {
        csrfToken: request.csrfToken(),
        username: request.session.username || '', 
        mensaje: request.session.mensaje || ''  
    });
};


exports.post_codigo = (request, response, next) => {
    const telefono = request.body.telefono;
    console.log('Número de teléfono recibido:', telefono);

    //Limpiar el número de teléfono, eliminar espacios en blanco
    telefono = telefono.trim();

    //Verificar si el número existe en la base de datos
    Usuario.fetchOneByTelefono(telefono)
        .then(([usuario]) => {
            if (usuario.length > 0) {
                console.log('Usuario encontrado con el número:', telefono);

                // Agregar el prefijo `+` y el código de país (por ejemplo, +52 para México)
                if (!telefono.startsWith('+')) {
                    telefono = '+52' + telefono;  // Cambia +52 por el código de país que corresponda
                }

                console.log('Número de teléfono con formato internacional:', telefono);

                // Enviar el código de verificación usando Twilio
                client.verify.services(process.env.TWILIO_VERIFY_SERVICE_SID)
                    .verifications
                    .create({ to: telefono, channel: 'sms' })
                    .then(() => {
                        console.log('Código de verificación enviado al número:', telefono);
                        request.session.telefono = telefono;
                        response.redirect('/verificar-codigo');
                    })
                    .catch(error => {
                        console.error('Error al enviar el código de verificación:', error);
                        request.session.mensaje = 'Error al enviar el código. Inténtalo nuevamente.';
                        response.redirect('/recuperar');
                    });
            } else {
                console.log('Número no encontrado en la base de datos:', telefono);
                request.session.mensaje = 'Número de teléfono no registrado';
                response.redirect('/recuperar');
            }
        })
        .catch(error => {
            console.error('Error al buscar el teléfono en la base de datos:', error);
            request.session.mensaje = 'Error al procesar la solicitud. Inténtalo de nuevo.';
            response.redirect('/recuperar');
        });
};


//verificar el código de verificación
exports.get_verificar_codigo = (request, response, next) => {
    const telefono = request.session.telefono;
    const codigo = request.body.codigo;

    // Verificar el código usando Twilio
    client.verify.services(process.env.TWILIO_VERIFY_SERVICE_SID)
        .verificationChecks
        .create({ to: telefono, code: codigo })
        .then(verification_check => {
            if (verification_check.status === 'approved') {

                ///Verificación realizada correctamente
                response.redirect('/cambiar-contrasenia'); 
            } else {
                console.log('Código incorrecto');
                response.redirect('/verificar-codigo');
            }
        })
        .catch(error => {
            console.error('Error al verificar el código:', error);
            response.redirect('/verificar-codigo');
        });
};
