const Tarjeta = require('../models/tarjeta.model.js')
const Promocion = require('../models/promocionRecompensa.model.js')

//Controlador para cargar la página de editar el formato de la tarjeta 
exports.get_editorTarjeta = (request, response, next) => {
    response.render('editorTarjeta', {
            username: request.session.NombreUsuario || '', 
            csrfToken: request.csrfToken(),
    });
  
};

//Controlador para cargar la pagina de visualizar y editar los parametros de la  tarjeta.
exports.get_tarjeta = (request, response, next) => {
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
            response.redirect('/error');
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
       response.redirect('editarTarjeta');
    })
    .catch((error) => {
        console.log(error);  // En caso de error.
        request.session.mensaje = 'No se pudieron guardar los parametros';  // Mensaje de error.
        response.redirect('editarTarjeta');  // Redirige de vuelta a la página de editar tarjeta.
    });
};

