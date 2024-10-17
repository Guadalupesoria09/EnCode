const { response } = require('express');
const Rol = require('../models/rol.model');
const RolPriv = require('../models/rolPriv.model');
const Privilegios = require('../models/privilegio.model')

// Render the page to create a new role
exports.get_crearRol = (request, response, next) => {
    let mensaje = request.session.mensaje || '';
    if (request.session.mensaje) request.session.mensaje = '';

    RolPriv.fetchActividades()
        .then(([privilegios]) => {
            response.render('crearRol', {
                privilegios: privilegios,
                mensaje: mensaje,
                editar: false,
                csrfToken: request.csrfToken(),
                username: request.session.NombreUsuario || '',
            });
        })
        .catch(error => {
            console.error('Error recuperando los privilegios', error);
            response.redirect('/error');
        });
};

// Save a new role
exports.post_crearRol = (request, response, next) => {
    const nombreRol = request.body.TipoRol;
    const actividades = request.body.actividades || []; // Privilege IDs

    const rol = new Rol(nombreRol);
    rol.save(actividades)
        .then(() => {
            request.session.mensaje = 'Rol creado exitosamente';
            response.redirect('/config/roles');
        })
        .catch(error => {
            console.error('Error creating role:', error);
            request.session.mensaje = 'Error creando el rol';
            response.redirect('/config/crearRol');
        });
};

// Render edit role page
exports.get_editarRol = (request, response, next) => {
    const IDRol = request.params.IDRol;
    let mensaje = request.session.mensaje || '';
    console.log(`Editando rol
    ID Rol: `,IDRol)
    
    Promise.all([
        Rol.fetchRolByID(IDRol),
        RolPriv.fetchActividades(),
        RolPriv.fetchPrivilegios(IDRol)
    ]).then(([rol, [privilegios], [rolPrivilegios]]) => {
        response.render('crearRol', {
            rol: rol[0],
            privilegios: privilegios,
            rolPrivilegios: rolPrivilegios,
            mensaje: mensaje,
            editar: true,
            csrfToken: request.csrfToken(),
            username: request.session.NombreUsuario || ''
        });
    }).catch(error => {
        console.error('Error recuperando los privilegios', error);
        response.redirect('/config/roles');
    });
};

// Edit an existing role
exports.post_editarRol = (request, response, next) => {
    let IDRol = request.body.IDRol;
    const nombreRol = request.body.TipoRol;
    const actividades = request.body.actividades || [];

    console.log('IDRol:', IDRol); 
    console.log('TipoRol:', nombreRol);
    console.log('Actividades:', actividades);

    if (!IDRol || IDRol.trim() === '') {
        console.error('No se recibió un IDRol válido');
        response.redirect('/config/roles'); // Redirigir si falta IDRol
    }

    Rol.editarRol(IDRol, nombreRol, actividades)
        .then(() => {
            request.session.mensaje = 'Rol y privilegios editados exitosamente';
            response.redirect('/config/roles');
        })
        .catch(error => {
            console.error('Error actualizando los roles', error);
            request.session.mensaje = 'Error actualizando rol';
            response.redirect('/config/roles');
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

            return response.render('roles', {
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
