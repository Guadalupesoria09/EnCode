const Tarjeta = require('../models/tarjeta.model.js')
const PromoRecomp = require('../models/promocionRecompensa.model.js')

/*
Renderiza la página para editar la tarjeta con las promociones disponibles.
*/
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

exports.get_editorTarjeta = (request, response, next) => {
    response.render('editorTarjeta', {
            username: request.session.NombreUsuario || '', 
            csrfToken: request.csrfToken(),
    });
  
};

