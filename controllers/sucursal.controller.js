const Sucursal = require('../models/sucursal.model');
const UserSucur = require('../models/userSucur.model');

exports.get_registrarSucursal = (request, response, next) => {
    response.render('registrarSucursal', {
        	
        username: request.session.NombreUsuario ||'',
        csrfToken: request.csrfToken(),
    });
};

exports.post_registrarSucursal = (request, response, next) => {
    console.log(request.body);
    const sucursal = new Sucursal(request.body.Direccion, request.body.CP, request.body.Ciudad,
	request.body.Estado, request.body.NumSucursal, request.body.NombreSucursal);
     
    request.session.sucursal = sucursal;
    response.redirect('/registrar');
		
};

exports.get_sucursales = (request, response, next) => {
   
    let mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje = '';
    }

    UserSucur.fetchAll().then(async([sucursales, fieldData]) => {
        for (let sucursal of sucursales){
            let[usuarios, fielData] = await UserSucur.fetchDuenos(sucursal.IDSucursal);
	    sucursal.NombreUsuario = usuarios;
	}
        return response.render('sucursales', {
            sucursales: sucursales,     
	    mensaje: mensaje,
            username: request.session.NombreUsuario || '',
            csrfToken: request.csrfToken(),
        });
    }).catch((error) => { 
        console.log(error);
    });
};
