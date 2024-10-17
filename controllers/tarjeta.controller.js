const Tarjeta = require('../models/tarjeta.model.js')
const PromoRecomp = require('../models/promoSucurRecomp.model.js')
const Vista = require('../models/vista.model.js')
const UserSucur = require('../models/userSucur.model.js')


//Controlador para cargar la página de editar el formato de la tarjeta 
exports.get_editorTarjeta = (request, response, next) => {

    let mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje = '';
    }

    Vista.fetchAll().then(async ([vistas, fieldData]) => {
        for (let vis of vistas) {
            let [NumSucursal, fieldData] = await Vista.fetchNumSucursal(vis.IDVista);
            vis.NumSucursal = NumSucursal;
        }

        for (let vis of vistas) {
            let [NombreSucursal, fieldData] = await Vista.fetchNameSucursal(vis.IDVista);
            vis.NombreSucursal = NombreSucursal;
        }

        return response.render('editorTarjeta', {
            vistas: vistas,
            mensaje: mensaje,
            username: request.session.NombreUsuario || '', 
            csrfToken: request.csrfToken(),
        });
    }).catch((error) => {
        console.log(error);  // En caso de error.
    });

};

exports.post_editorTarjeta = (request, response, next) => {
    console.log(request.file);
    idUsuario = request.session.IDUsuario;

    UserSucur.fetchSucursalporUsuario(idUsuario).then(([sucursal, fieldData]) => {
        const idSucursal = sucursal[0].IDSucursal;

        const vista = new Vista (
            request.body.nombreTarjeta,
            request.file.filename,
            request.body.color,
            request.body.font,
            idSucursal,
        );
    
       vista.save().then(() => {
            request.session.mensaje = 'Nueva vista de tarjeta creada'
            response.redirect('editorTarjeta');
            })
            .catch((error) => {
                console.log(error);  // En caso de error.
        });

    })

};

//Controlador para cargar la pagina de visualizar y editar los parametros de la  tarjeta.
exports.get_tarjeta = (request, response, next) => {
    Tarjeta.fetchTarjetaDueno()
    PromoRecomp.fetchAll()
        .then(([promociones, fieldData]) => {
            response.render('editarTarjeta',{
		promociones: promociones,
                username: request.session.NombreUsuario || '', 
                csrfToken: request.csrfToken(),
            });  
        })
	.catch((error) => {
            console.error('Error al obtener promociones:', error);
            response.redirect(`${process.env.PATH_ENV}error`);
        });
};

//Controlador para manejar la solicitud POST al registrar nuevos parametros a la tarjeta
exports.post_tarjeta = (request, response, next) => {
    const tarjeta = new Tarjeta(
        request.body.Limite,
	request.body.Vigencia,
    );

    tarjeta.save()
    .then(() => {
       request.session.mensaje = 'Parametros actualizados';  // Mensaje de éxito.
       response.redirect('tarjeta');
    })
    .catch((error) => {
        console.log(error);  // En caso de error.
        request.session.mensaje = 'No se pudieron guardar los parametros';  // Mensaje de error.
        response.redirect('tarjeta');  // Redirige de vuelta a la página de editar tarjeta.
    });
};
