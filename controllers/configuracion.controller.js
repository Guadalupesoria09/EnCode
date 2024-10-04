const Rol = require('../models/rol.model');
const RolPriv = require('../models/rolPriv.model')

exports.get_crearRol = (request, response, next) => {
    let mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje = '';
    }	

    RolPriv.fetchActividades().then(([privilegios,fieldData]) => {
        response.render('crearRol', {
	    privilegios: privilegios,
            mensaje: mensaje,
	    username: request.session.NombreUsuario,
	    csrfToken: request.csrfToken(),
        });
    });
};

exports.post_crearRol = (request, response, next) => { 
    const rol = new Rol(request.body.TipoRol, request.body.Actividad);
    rol.save()
        .then(() => {
            request.session.mensaje = 'Rol creado';
	    response.redirect('/home')

	}).catch((error) => {
            console.log(error);
            request.session.mensaje ='El Rol ya existe'
	    response.redirect('crearRol')
	});
};

exports.get_roles = (request, response, next) => {
  
    let mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje = '';
    }
    
    RolPriv.fetchAll().then(async([roles, fieldData]) => {
        for(let rol of roles){
            let[Actividades, fieldData] = await RolPriv.fetchPrivilegios(rol.IDRol);
	        Rol.Actividad = Actividades;
        } 
        return response.render('roles', {
            mensaje: mensaje,
            username: request.session.NombreUsuario || '',
            csrfToken: request.csrfToken(),
        });
    }).catch((error) => {
        console.log(error)
    });
};

exports.get_general = (request, response, next) => {
    response.render('general',{
        username: request.body.NombreUsuario || '',
        csrfToken: request.csrfToken(),
	});
};
