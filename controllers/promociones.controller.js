const Promociones = require('../models/promociones.model');

exports.get_promo = (request, response, next) => {
    console.log('Ruta /promo/promociones');

    let mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje = '';
    }

    Promociones.fetchAll()
        .then(([promociones, fieldData]) => {
            return response.render('crearPromocion', {
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

    const promocion = new Promociones(request.body.NombrePromocion, request.body.FechaInicio,
        request.body.FechaCaducidad, request.body.Valor, request.body.Estatus);
    
    request.session.mensaje = 'Promocion creada';
    
    promocion.save()
        .then(() => {
            return response.redirect('/promo/promociones');
        }).catch((error) => {
            console.log(error);
        });
} 

exports.get_tarjeta = (request, response, next) => {
    console.log ('Ruta /promo/tarjeta');
    response.render('editarTarjeta'); //Renderiza la vista editarTarjeta   
}

exports.get_recompensas = (request, response, next) => {
    console.log('Ruta /promo/recompensas');
    response.render('registrarRecompensa');
}