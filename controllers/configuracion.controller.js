const { response } = require('express');
const Rol = require('../models/rol.model');
const RolPriv = require('../models/rolPriv.model');
const Privilegios = require('../models/privilegio.model')


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
                editar: false,
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
            //Recorre cada rol y obtiene sus privilegios asociados.
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

exports.get_editarRol = (request, response, next) => {
    let mensaje = request.session.mensaje || '';

    const IDRol =  request.params.IDRol;

    RolPriv.fetchRolPriv(IDRol)
        .then(async ([rol, fieldData]) => {
            for (let r of rol){
                let [privilegios, fieldData] = await RolPriv.fetchTipoRol(r.IDRol);
                r.privilegios = privilegios;
            }
        
            return Privilegios.fetchAll().then(([privilegios, fieldData]) => {                
                return response.render('crearRol', {
                    rol: rol[0],
                    privilegios: privilegios,
                    mensaje: mensaje,
                    editar: true,
                    csrfToken: request.csrfToken(),
                    username: request.session.NombreUsuario || '',
                });
            });
        })
        .catch((error) => {
            console.log('Error al cargar los datos del rol: ', error);
            response.redirect('/config/roles');
        });
};

//Controlador para manejar la solicitud POST al editar un srol.
exports.post_editarRol = (request, response, next) => {
    //Extraemos los datos del cuerpo de la solicitud.
    const { IDRol, actividades } = request.body;
    console.log('IDRol:', IDRol);
    console.log(request.body.Actividad);

    //Llamamos al modelo para actualizar el rol.
    Rol.editarRol(IDRol)
        .then(() => {
            //Llamamos al modelo para actualizar los privilegios del rol.
            return Rol.editarPrivilegios(IDRol, actividades);
        })
        .then(() => {
            request.session.mensaje = 'Rol y privilegios modificados con éxito';  //Mensaje de éxito.
            response.redirect('/config/roles');  //Redirigimos a la lista de roles.
        })
        .catch((err) => {
            console.log('Error al modificar los datos del rol', err);  //En caso de error, lo registramos.
            response.redirect('/config/roles');  //Redirigimos a la lista de roles en caso de error.
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
