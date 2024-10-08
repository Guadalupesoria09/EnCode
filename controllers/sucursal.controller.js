const Sucursal = require('../models/sucursal.model');
const UserSucur = require('../models/userSucur.model');

exports.get_registrarSucursal = (request, response, next) => { 

    let mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje = '';
    }	

    response.render('registrarSucursal', {
        mensaje:mensaje,
        username: request.session.NombreUsuario ||'',
        csrfToken: request.csrfToken(),
    });
};

exports.post_registrarSucursal = (request, response, next) => {
    const sucursal = new Sucursal(request.body.Direccion, request.body.CP, request.body.Ciudad,
	request.body.Estado, request.body.NumSucursal, request.body.NombreSucursal);
     
   sucursal.save()
   .then(() => {
	    request.session.mensaje = 'Sucursal creada';
            response.redirect('/registrar');
	
	}).catch((error) => {
	    console.log(error);	
	    request.session.mensaje = 'El nombre de la sucursal que intenta registrar ya existe';	
            reponse.redirect('registrarSucursal')
        });
};

exports.get_editarSucursales =(request, response, next) => {

}

exports.post_editarSucursales = (request, response, next) => {
    const sucursal = new Sucursal(request.body.Direccion, request.body.CP, request.body.Ciudad,
        request.body.Estado, request.body.NumSucursal, request.body.NombreSucursal);
    
    sucursal.editarSucursales()
    .then(() =>{
        request.session.mensaje = "Sucursal modificada exitosamente";
            response.redirect('/sucur/sucursales');
            
        }).catch((error) =>{ 
        console.log(error);
        request.session.mensaje = 'Error al modificar la sucursal';
            response.redirect ('/sucur/sucursales')
        });
}

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
