const Sucursal = require('../models/sucursal.model');
const UserSucur = require('../models/userSucur.model');

exports.get_deleteSucursal = (request, response, next) => {
    const IDSucursal = request.params.IDSucursal;

    Sucursal.deleteSucursal(IDSucursal)
        .then(() => {
            request.session.mensaje = "Sucursal eliminado exitosamente";
            return response.redirect('/sucur/sucursales');  
        })
        .catch(err => {
            console.log('Error al eliminar sucursal', err);
            return response.redirect('/sucur/sucursales');  
        });
};

exports.get_registrarSucursal = (request, response, next) => { 

    let mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje = '';
    }	

    response.render('registrarSucursal', {
        mensaje:mensaje,
        username: request.session.NombreUsuario ||'',
        csrfToken: request.csrfToken(),
        editar: false
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

exports.get_editarSucursales = (request, response, next) => {
    const IDSucursal= request.params.IDSucursal;
    let sucursalData;
    let mensaje = request.session.mensaje || '';

    Sucursal.fetchSucursalByID(IDSucursal)
        .then((sucursal)=> {
            if(!sucursal || sucursal.length === 0) {
                return response.redirect('/error');
            }
            sucursalData = sucursal[0];
            return Promise.all([])
        })
        .then(([sucursal]) => {
            response.render('registrarSucursal', {
                sucursal:sucursal,
                mensaje:mensaje,
                sucursal:sucursalData,
                editar: true,
                csrfToken: request.csrfToken(),
                username:request.session.NombreUsuario || '',
            });
        })
        .catch(err =>{
            console.log('Error al cargar los datos del usuario o las sucursales:', err);
            response.redirect('/sucur/sucursales');
        })
}

exports.post_editarSucursales = (request, response, next) => {
    const { Direccion, CP, Ciudad, Estado, NumSucursal, NombreSucursal, IDSucursal } = request.body;

    Sucursal.editarSucursales(IDSucursal, Direccion, CP, Ciudad, Estado, NumSucursal, NombreSucursal)
        .then(() => {
            request.session.mensaje = 'Sucursal modificada con éxito';
            response.redirect('/sucur/sucursales');
        })
        .catch(err => {
            console.log('Error al modificar los datos de la sucursal', err);
            response.redirect(`/editarSucursal/${IDSucursal}`);
        });
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
