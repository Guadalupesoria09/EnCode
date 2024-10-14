const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios.model');
const { userInfo } = require('os');

const twilio = require('twilio');
const { request } = require('http');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const UserSucur = require('../models/userSucur.model');

/**
 * Renderiza la página de registro de usuarios.
 */
exports.get_register = (request, response, next) => {
    Promise.all([UserSucur.fetchAll(), Usuario.fetchAllRoles()])
        .then(([sucursales, roles]) => {
            response.render('registrar', {
                sucursales: sucursales[0],
                roles: roles[0],
                usuario: {},
                username: request.session.NombreUsuario || '',
                csrfToken: request.csrfToken(),
                editar: false,
            });
        })
        .catch((err) => {
            console.error('Error al cargar las sucursales o roles:', err);
            response.redirect('/sucur/sucursales');
        });
};

/**
 * Guarda un nuevo usuario en la base de datos y redirige a la lista de sucursales.
 */
exports.post_register = (request, response, next) => {
    const nuevo_usuario = new Usuario(
        request.body.NombreUsuario,
        request.body.NumTelefono,
        request.body.FechaNacimiento,
        request.body.Contrasenia,
        request.body.Genero,
        request.body.Direccion,
        request.body.Ciudad,
        request.body.Estado,
        request.body.IDRol,
        request.body.IDSucursal
    );
    console.log('Usuario Registrado:', request.body);
    nuevo_usuario
        .save()
        .then(() => response.redirect('/sucur/sucursales'))
        .catch((error) => {
            console.error('Error al guardar el usuario:', error);
        });
};

/**
 * Muestra los usuarios de una sucursal específica.
 */
exports.get_usuariosDeSucursal = (request, response, next) => {
    const IDSucursal = request.params.IDSucursal;

    Usuario.fetchUsuariosPorSucursal(IDSucursal)
        .then(([usuarios]) => {
            response.render('listarUsuarios', {
                usuarios: usuarios,
                username: request.session.NombreUsuario || '',
                csrfToken: request.csrfToken(),
            });
        })
        .catch((err) => {
            console.error('Error al obtener usuarios de la sucursal:', err);
            response.redirect('/sucur/sucursales');
        });
};

/**
 * Renderiza la página para editar un usuario existente.
 */
exports.get_editarUsuario = (request, response, next) => {
    const IDUsuario = request.params.IDUsuario;
    let usuarioData;
    let fecha;

    Usuario.fetchOneByID(IDUsuario)
        .then(([usuario]) => {
            if (!usuario || usuario.length === 0) {
                return response.redirect('/error');
            }
            usuarioData = usuario[0];
            fecha = usuario[0].FechaNacimiento.toISOString();
            usuario[0].FechaNacimiento = fecha.split('T')[0];
            return Promise.all([UserSucur.fetchAll(), Usuario.fetchAllRoles()]);
        })
        .then(([sucursales, roles]) => {
            response.render('registrar', {
                usuario: usuarioData,
                sucursales: sucursales[0],
                roles: roles[0],
                username: request.session.NombreUsuario || '',
                csrfToken: request.csrfToken(),
                editar: true,
            });
        })
        .catch((err) => {
            console.error('Error al cargar los datos del usuario o las sucursales:', err);
            response.redirect('/sucur/sucursales');
        });
};

/**
 * Actualiza la información de un usuario existente y redirige a la lista de sucursales.
 */
exports.post_editarUsuario = (request, response, next) => {
    const IDUsuario = request.body.IDUsuario;
    const { NombreUsuario, NumTelefono, FechaNacimiento, Genero, Direccion, Ciudad, Estado, IDSucursal, IDRol } =
        request.body;

    Usuario.update(IDUsuario, NombreUsuario, NumTelefono, FechaNacimiento, Genero, Direccion, Ciudad, Estado)
        .then(() => Usuario.updateSucursal(IDUsuario, IDSucursal))
        .then(() => Usuario.updateRol(IDUsuario, IDRol))
        .then(() => {
            request.session.mensaje = 'Usuario, sucursal y rol modificados exitosamente';
            response.redirect('/sucur/sucursales');
        })
        .catch((err) => {
            console.error('Error al modificar los datos del usuario o la sucursal:', err);
            response.redirect(`/editarUsuario/${IDUsuario}`);
        });
};

/**
 * Elimina un usuario específico de la base de datos.
 */
exports.get_deleteUsuario = (req, res, next) => {
    const IDUsuario = req.params.IDUsuario;

    Usuario.deleteUsuario(IDUsuario)
        .then(() => {
            req.session.mensaje = 'Usuario eliminado exitosamente';
            res.redirect('/sucur/sucursales');
        })
        .catch((err) => {
            console.error('Error al eliminar el usuario:', err);
            res.redirect('/sucur/sucursales');
        });
};

/**
 * Renderiza la página principal.
 */
exports.get_root = (request, response, next) => {
    response.render('login', {
        csrfToken: request.csrfToken(),
        mensaje: request.session.mensaje || '',
    });
};

/**
 * Renderiza la página de inicio de sesión.
 */
exports.get_login = (request, response, next) => {
    response.render('login', {
        csrfToken: request.csrfToken(),
        mensaje: request.session.mensaje || '',
    });
};

/**
 * Inicia sesión de usuario después de verificar las credenciales.
 */
exports.post_login = (request, response, next) => {
    const telefono = request.body.telefono;

    Usuario.fetchOneByTelefono(telefono)
        .then(([usuario, fieldData]) => {
            if (usuario.length > 0) {
                // Comparar la contraseña ingresada con el hash almacenado
                bcrypt.compare(request.body.password, usuario[0].Contrasenia)
                    .then((doMatch) => {
                        if (doMatch) {
                            request.session.isLoggedIn = true;
                            request.session.NombreUsuario = usuario[0].NombreUsuario;
                            request.session.IDUsuario = usuario[0].IDUsuario;
                            console.log('ID de usuario:', usuario[0].IDUsuario);

                            Usuario.getPrivilegios(usuario[0].IDUsuario)
                                .then(([privilegios, fieldData]) => {
                                    request.session.privilegios = privilegios;
                                    console.log('Usuario privilegios:', privilegios);

                                    request.session.save((err) => {
                                        if (err) {
                                            console.error('Error al guardar la sesión:', err);
                                            return response.redirect('/login');
                                        }
                                        response.redirect('/home');
                                    });
                                })
                                .catch((err) => {
                                    console.error('Error al obtener privilegios:', err);
                                    response.redirect('/login');
                                });
                        } else {
                            request.session.mensaje = 'El usuario y/o contraseña no coinciden';
                            response.redirect('/login');
                        }
                    })
                    .catch((err) => {
                        console.error('Error al comparar contraseñas:', err);
                        response.redirect('/login');
                    });
            } else {
                request.session.mensaje = 'El usuario no existe';
                response.redirect('/login');
            }
        })
        .catch((err) => {
            console.error('Error al buscar el teléfono en la base de datos:', err);
            request.session.mensaje = 'Error 500: Error del servidor';
            response.redirect('/login');
        });
};

/**
 * Cierra la sesión del usuario y redirige a la página de inicio de sesión.
 */
exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/login');
    });
};

/**
 * Renderiza la página de inicio.
 */
exports.get_home = (request, response, next) => {
    Usuario.fetch(request.params.IDUsuario)
        .then(([usuarios, fieldData]) => {
            response.render('home', {
                usuarios: usuarios,
                username: request.session.NombreUsuario || '',
                csrfToken: request.csrfToken(),
                mensaje: request.session.mensaje || '',
                privilegios: request.session.privilegios || [],
            });
        })
        .catch(err => {
            console.error(err);
            next(err);
        });
};


/**
 * Renderiza la página de recuperación de contraseña.
 */
exports.get_recuperar = (request, response, next) => {
    response.render('recuperar', {
        csrfToken: request.csrfToken(),
        username: request.session.username || '',
        mensaje: request.session.mensaje || '',
    });
};

/**
 * Enviar un código de verificación por SMS utilizando Twilio.
 */
exports.post_codigo = (request, response, next) => {
    let telefono = request.body.telefono;
    console.log('Número de teléfono recibido:', telefono);

    // Limpiar el número de teléfono, eliminar espacios en blanco
    telefono = telefono.trim();

    Usuario.fetchOneByTelefono(telefono)
        .then(([usuario]) => {
            if (usuario.length > 0) {
                console.log('Usuario encontrado con el número:', telefono);

                // Agregar el prefijo `+` y el código de país (por ejemplo, +52 para México)
                if (!telefono.startsWith('+')) {
                    telefono = '+52' + telefono; // Cambia +52 por el código de país que corresponda
                }

                console.log('Número de teléfono con formato internacional:', telefono);

                client.verify.services(process.env.TWILIO_VERIFY_SERVICE_SID)
                    .verifications.create({ to: telefono, channel: 'sms' })
                    .then(() => {
                        console.log('Código de verificación enviado al número:', telefono);
                        request.session.telefono = telefono;
                        response.redirect('/verificar-codigo');
                    })
                    .catch((error) => {
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
        .catch((error) => {
            console.error('Error al buscar el teléfono en la base de datos:', error);
            request.session.mensaje = 'Error al procesar la solicitud. Inténtalo de nuevo.';
            response.redirect('/recuperar');
        });
};

/**
 * Verifica el código de verificación recibido por SMS.
 */
exports.get_verificar_codigo = (request, response, next) => {
    const telefono = request.session.telefono;
    const codigo = request.body.codigo;

    client.verify.services(process.env.TWILIO_VERIFY_SERVICE_SID)
        .verificationChecks.create({ to: telefono, code: codigo })
        .then((verification_check) => {
            if (verification_check.status === 'approved') {
                // Verificación realizada correctamente
                response.redirect('/cambiar-contrasenia');
            } else {
                console.log('Código incorrecto');
                response.redirect('/verificar-codigo');
            }
        })
        .catch((error) => {
            console.error('Error al verificar el código:', error);
            response.redirect('/verificar-codigo');
        });
};

