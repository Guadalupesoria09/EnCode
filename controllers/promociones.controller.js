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
                    username: request.session.NombreUsuario || '', 
                    csrfToken: request.csrfToken(),
                    editar: true,
                });
            });
        } else {
            return response.render('404', {
                username: request.session.NombreUsuario || '',
                csrfToken: request.csrfToken(),
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
                username: request.session.NombreUsuario || '',  
                editar: false,
                mensaje: mensaje,
                csrfToken: request.csrfToken(),
            }); 
        }).catch((error) => {
            console.log(error);
        });
};

exports.post_crear = (request, response, next) => {

    console.log(request.body);

    const idRecompensa = request.body.recompensa;

    const promocion = new Promociones(
        request.body.nombrePromo, 
        request.body.fechaInicio,
        request.body.fechaFin, 
        request.body.valor, 
        request.body.estatus
    );

    request.session.mensaje = 'Promoción creada';

    promocion.save().then(() => {

        Promociones.fetchIDPROMO(request.body.nombrePromo).then(([promociones, fieldData]) => {
            const idPromo = promociones[0].IDPromocion;
            
            const promoRecomps = new PromoRecomp(
                idPromo,
                idRecompensa
            );
            
            promoRecomps.save()
                .then(() => {
                    return response.redirect('/promo/promociones');
                }).catch((error) => { 
                    console.log(error);
            });

        }).catch((error) => { 
            console.log(error);
        });

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

    PromoRecomp.fetchAll().then(([promoRecomps, fieldData]) => {
        return Recompensas.fetchAll().then(([recompensas, fieldData]) => {
            return Promociones.fetchAll()
                .then(([promociones, fieldData]) => {
                    const recompensasRelacionadasPromises = promociones.map(promo => {
                        return PromoRecomp.fetchAllnombreR(promo.IDPromocion).then(([nombreRecompensa]) => {
                            return {
                                IDPromocion: promo.IDPromocion,
                                NombreRecompensa: nombreRecompensa.length ? nombreRecompensa[0].NombreRecompensa : "Sin recompensa"
                            };
                        });
                    });
                    Promise.all(recompensasRelacionadasPromises).then(recompensasRelacionadas => {
                        return response.render('promociones', {
                        promoRecomps: promoRecomps,
                        promociones: promociones,
                        recompensasRelacionadas: recompensasRelacionadas,
                        recompensas: recompensas,
                        mensaje: mensaje,
                        username: request.session.NombreUsuario || '',  
                        csrfToken: request.csrfToken(),
                    });
                });
            });
        });
    }).catch((error) => { 
        console.log(error);
    });
};

exports.post_promo = (request, response, next) => {
    console.log(request.body);
    
    
    
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
