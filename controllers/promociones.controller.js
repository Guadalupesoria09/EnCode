const Promociones = require('../models/promociones.model');
const Recompensas = require('../models/recompensas.model');
const PromoRecomp = require('../models/promocionRecompensa.model');

exports.get_editarPromo = (request, response, next) => {
    console.log('Ruta editar/promo');

    const id = request.params.id;
    

    Promociones.fetchOne(id).then(([promociones, fieldData]) => {
        if(promociones.length > 0){
            return Recompensas.fetchAll()
                .then (([recompensas, fieldData]) => {
                    return response.render('crearPromocion', {
                    promociones: promociones[0],
                    recompensas: recompensas,
                    //csrfToken: request.csrfToken(),
                    editar: true,
                });
            });
        } else {
            return response.render('404', {
                //username: request.session.username || '',
            });
        }
    });
};

exports.post_editarPromo = (request, response, next) => {
    console.log(request.body);

    Promociones.edit(request.body.id, request.body.nombrePromo, request.body.fechaInicio,
        request.body.fechaFin, request.body.valor, request.body.estatus)
        .then((rows, fieldData) => {
            request.session.mensaje = 'Promocion actualizada';
            return response.redirect('/promo/promociones');
        }).catch((error) => { 
            console.log(error); 
    });
}

exports.get_crear = (request, response, next) => {
    console.log('Ruta /promo/crearPromociones')

    let mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje = '';
    }

    Recompensas.fetchAll()
        .then(([recompensas, fieldData]) => {
            return response.render('crearPromocion', {
                recompensas: recompensas,
                mensaje: mensaje,
                //csrfToken: request.csrfToken(),
            }); 
        }).catch((error) => {
            console.log(error);
    });
};

exports.post_crear = (request, response, next) => {

    console.log(request.body);

    const promocion = new Promociones(request.body.nombrePromo, request.body.fechaInicio,
        request.body.fechaFin, request.body.valor, request.body.estatus);
    
    request.session.mensaje = 'Promocion creada';
    
    promocion.save()
        .then(() => {
            return response.redirect('/promo/promociones');
        }).catch((error) => {
            console.log(error);
    });
};

exports.get_promo = (request, response, next) => {
    console.log('Ruta /promo/promociones');

    let mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje = '';
    }

    // Comparacion de los promoRecomps
    PromoRecomp.fetchAll()
        .then(([promoRecomps, fieldData]) => {
            return Recompensas.fetchAll()
                .then(([recompensas, fieldData]) => {
                    return Promociones.fetchAll()
                        .then(([promociones, fieldData]) => {
                            return response.render('promociones', {
                            promociones: promociones,
                            recompensas: recompensas,
                            promoRecomps: promoRecomps,
                            mensaje: mensaje,
                            editar: false,
                            //csrfToken: request.csrfToken(),
                        });
                    });
                });
        }).catch((error) => { 
        console.log(error); 
    });
};

exports.post_promo = (request, response, next) => {
    console.log(request.body);
    
    
    
} 

exports.get_tarjeta = (request, response, next) => {
    console.log ('Ruta /promo/tarjeta');
    response.render('editarTarjeta'); //Renderiza la vista editarTarjeta   
}

exports.get_recompensas = (request, response, next) => {
    console.log('Ruta /promo/recompensas');
    let mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje = '';
    }

    Recompensas.fetchAll()
        .then(([recompensas, fieldData]) => {
            return response.render('registrarRecompensa', {
                recompensas: recompensas,
                mensaje: mensaje,
                //csrfToken: request.csrfToken(),
            }); 
        }).catch((error) => {
            console.log(error);
    });
}

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
} 

