const Promociones = require('../models/promociones.model');
const Recompensas = require('../models/recompensas.model');

exports.get_promo = (request, response, next) => {
    console.log('Ruta /promo/promociones');

    let mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje = '';
    }

    Promociones.fetchAll()
        .then(([promociones, fieldData]) => {
            return response.render('crearPromocion', {
                username: request.session.NombreUsuario || '',  
                promociones: promociones,
                mensaje: mensaje,
                csrfToken: request.csrfToken(),
            }); 
        }).catch((error) => {
            console.log(error);
        });
};

exports.post_promo = (request, response, next) => {
    console.log(request.body);

    const promocion = new Promociones(
        request.body.nombrePromo, 
        request.body.fechaInicio,
        request.body.fechaFin, 
        request.body.valor, 
        request.body.estatus
    );

    request.session.mensaje = 'Promoción creada';

    promocion.save()
        .then(() => {
            return response.redirect('/promo/promociones');
        }).catch((error) => {
            console.log(error);
        });
};

exports.get_tarjeta = (request, response, next) => {
    console.log('Ruta /promo/tarjeta');
    response.render('editarTarjeta', {
        username: request.session.NombreUsuario || '', 
        csrfToken: request.csrfToken(),
    });  
};

exports.get_recompensas = (request, response, next) => {
    console.log('Ruta /promo/recompensas');
    let mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje = '';
    }

    Recompensas.fetchAll()
        .then(([recompensas, fieldData]) => {
            return response.render('registrarRecompensa', {
                username: request.session.NombreUsuario || '',  
                csrfToken: request.csrfToken(),
                recompensas: recompensas,
                mensaje: mensaje,
            }); 
        }).catch((error) => {
            console.log(error);
        });
};

exports.post_recompensas = (request, response, next) => {
    console.log(request.body);

    const recompensas = new Recompensas(request.body.NombreRecompensa);

    request.session.mensaje = 'Recompensa creada';

    recompensas.save()
        .then(() => {
            return response.redirect('/promo/recompensas');
        }).catch((error) => {
            console.log(error);
        });
};
