const Tarjeta = require('../models/tarjeta.model.js')
const PromoRecomp = require('../models/promoSucurRecomp.model.js')
const Vista = require('../models/vista.model.js')
const UserSucur = require('../models/userSucur.model.js')

//Controlador para cargar la pagina de visualizar y editar los parametros de la  tarjeta.
exports.get_tarjeta = (request, response, next) => {
    const IDUsuario = request.session.IDUsuario;
    UserSucur.fetchSucursalporUsuario(IDUsuario).then(async([sucursal, fieldData]) => {
        const IDSucursal = sucursal[0].IDSucursal;
	await Tarjeta.fetchTarjetaDueno(IDSucursal).then(async([tarjeta, fieldData]) => {
	    const IDTarjeta = tarjeta[0].IDTarjeta;
            let fecha = tarjeta[0].Vigencia.toISOString();
	    tarjeta[0].Vigencia=fecha.split('T')[0];
	    await PromoRecomp.fetchAll().then(async([promociones, fieldData]) => {
                response.render('editarTarjeta',{
	            tarjeta: tarjeta[0],
		    promociones: promociones,
                    username: request.session.NombreUsuario || '', 
                    csrfToken: request.csrfToken(),
		    
		});  
            })
	})
    })
	.catch((error) => {
            console.error('Error al obtener promociones:', error);
            response.redirect(`${process.env.PATH_ENV}error`);
        });
};

//Controlador para manejar la solicitud POST al registrar nuevos parametros a la tarjeta
exports.post_tarjeta = (request, response, next) => {
    console.log(request.body);	
    Tarjeta.editParametros(
	    request.body.IDTarjeta, 
	    request.body.Limite, 
	    request.body.Vigencia,)
    .then(() => {
       request.session.mensaje = 'Parametros actualizados';  // Mensaje de éxito.
       return response.redirect('editarTarjeta');
    })
    .catch((error) => {
        console.log(error);  // En caso de error.
        request.session.mensaje = 'No se pudieron guardar los parametros';  // Mensaje de error.
        response.redirect('editarTarjeta');  // Redirige de vuelta a la página de editar tarjeta.
    });
};

//Controlador para cargar la página de editar el formato de la tarjeta 
exports.get_editorTarjeta = (request, response, next) => {

    Vista.fetchAll().then(async ([vistas, fieldData]) => {
        for (let vis of vistas) {
            console.log('IDV',vis.IDVista,'IDS', vis.IDSucursal)
            let [NumSucursal, fieldData] = await Vista.fetchNumSucursal(vis.IDSucursal);
            vis.NumSucursal = NumSucursal;
        }
        return response.render('editorTarjeta', {
            vistas: vistas,
            username: request.session.NombreUsuario || '', 
            csrfToken: request.csrfToken(),
        });
    }).catch((error) => {
        console.log(error);  // En caso de error.
    });

};

exports.post_editorTarjeta = (request, response, next) => {
    console.log(request.file);


    const vista = new Vista (
        request.body.nombreTarjeta,
        request.file.filename,
        request.body.color,
        request.body.font,
        1,
    );

   vista.save().then(() => {
        response.redirect('tarjeta');
        })
        .catch((error) => {
            console.log(error);  // En caso de error.
    });

};
