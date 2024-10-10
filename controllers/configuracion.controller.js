const Rol = require('../models/rol.model');
const RolPriv = require('../models/rolPriv.model');

/**
 * Renderiza la página para crear un nuevo rol con la lista de privilegios disponibles.
 */
exports.get_crearRol = (request, response, next) => {
    let mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje = '';
    }

    RolPriv.fetchActividades()
        .then(([privilegios, fieldData]) => {
            response.render('crearRol', {
                privilegios: privilegios,
                mensaje: mensaje,
                username: request.session.NombreUsuario,
                csrfToken: request.csrfToken(),
            });
        })
        .catch((error) => {
            console.error('Error al obtener actividades para crear el rol:', error);
            response.redirect('/error');
        });
};

/**
 * Guarda un nuevo rol en la base de datos.
 */
exports.post_crearRol = (request, response, next) => {
    const rol = new Rol(request.body.TipoRol, request.body.Actividad);

    rol.save()
        .then(() => {
            request.session.mensaje = 'Rol creado';
            response.redirect('roles');
        })
        .catch((error) => {
            console.error('Error al crear el rol:', error);
            request.session.mensaje = 'El Rol ya existe';
            response.redirect('crearRol');
        });
};

/**
 * Obtiene y muestra la lista de roles disponibles, junto con sus privilegios.
 */
exports.get_roles = (request, response, next) => {
    let mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje = '';
    }

    RolPriv.fetchAll()
        .then(async ([roles, fieldData]) => {
            // Recorre cada rol y obtiene sus privilegios asociados.
            for (const rol of roles) {
                const [privilegios] = await RolPriv.fetchPrivilegios(rol.IDRol);
                rol.Actividad = privilegios;
            }

            response.render('roles', {
                roles: roles,
                mensaje: mensaje,
                username: request.session.NombreUsuario || '',
                csrfToken: request.csrfToken(),
            });
        })
        .catch((error) => {
            console.error('Error al obtener la lista de roles:', error);
            response.redirect('/error');
        });
};

/**
 * Renderiza la página general con el nombre de usuario actual.
 */
exports.get_general = (request, response, next) => {
    response.render('general', {
        username: request.body.NombreUsuario || '',
        csrfToken: request.csrfToken(),
    });
};   
