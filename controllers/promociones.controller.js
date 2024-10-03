const Promociones = require('../models/promociones.model');
const Recompensas = require('../models/recompensas.model');
const PromoRecomp = require('../models/promocionRecompensa.model');

// METHODS GET & POST DE PROMOCIONES
exports.get_editarPromo = (request, response, next) => {
    console.log('Ruta editar/promo');
    let mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje = '';
    }

    const id = request.params.id;

    PromoRecomp.fetchPromoRecomp(id).then(async ([promociones, fieldData]) => {
        for (let promo of promociones) {
            let [recompensas, fieldData] = await PromoRecomp.fetchAllnombreR(promo.IDPromocion);
            promo.recompensas = recompensas;
        }
        return Recompensas.fetchAll().then(([recompensas, fieldData]) => {
            return response.render('crearPromocion', {
            promociones: promociones,
            mensaje: mensaje,
            recompensas: recompensas,
            username: request.session.NombreUsuario || '',  
            csrfToken: request.csrfToken(),
            editar: true, 
        });

        });
    }).catch((error) => { 
        console.log(error);
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
        request.session.mensaje = 'Ya existe un promoción con este nombre'
        return response.redirect('/promo/crearPromociones');
    });

};

exports.get_promo = (request, response, next) => {
    console.log('Ruta /promo/promociones');

    let mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje = '';
    }

    PromoRecomp.fetchAll().then(async ([promociones, fieldData]) => {
        for (let promo of promociones) {
            let [recompensas, fieldData] = await PromoRecomp.fetchAllnombreR(promo.IDPromocion);
            promo.recompensas = recompensas;
        }
        return response.render('promociones', {
            promociones: promociones,
            mensaje: mensaje,
            username: request.session.NombreUsuario || '',  
            csrfToken: request.csrfToken(),
        });
    }).catch((error) => { 
        console.log(error);
    });
};

exports.post_promo = (request, response, next) => {
    console.log(request.body);
    
    
    
}; 

exports.get_deletePromo = (request, response, next) => {
    const id = request.params.id;

    PromoRecomp.fetchIDPR(id).then(async ([promociones, fieldData]) => {
        for (let promo of promociones) {
            await PromoRecomp.deletePromo(promo.IDPromocionRecompensa);
        }
        Promociones.deletePromo(id).then(() => {
            request.session.mensaje = "Promocion eliminada";
            return response.redirect('/promo/promociones');
        })
    }).catch((error) => {
        console.log(error);
    });
}

// METHODS GET & POST DE TARJETA
exports.get_tarjeta = (request, response, next) => {
    console.log('Ruta /promo/tarjeta');
    response.render('editarTarjeta', {
        username: request.session.NombreUsuario || '', 
        csrfToken: request.csrfToken(),
    });  
};


// METHODS GET & POST RECOMPENSAS
exports.get_editarRecompensa = (request, response, next) => {
    console.log('Ruta /editRecompensas');

    let mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje = '';
    }

    const id = request.params.id;

    Recompensas.fetchOne(id).then(([editRecompensas, fieldData]) => {
        if (editRecompensas.length > 0) {
            return Recompensas.fetchAll().then(([recompensas, fieldData]) => {
                return response.render('registrarRecompensa', {
                    username: request.session.username || '',
                    csrfToken: request.csrfToken(),
                    editar: true,
                    mensaje: mensaje,
                    recompensas: recompensas,
                    editRecompensas: editRecompensas[0],
                }); 
            })
    }}).catch((error) => { 
        console.log(error); 
    });
};

exports.post_editarRecompensa = (request, response, next) => {
    console.log(request.body);

    Recompensas.edit(request.body.id, request.body.NombreRecompensa)
        .then((rows, fieldData) => {
            request.session.mensaje = 'Recompensa actualizada';
            return response.redirect('/promo/recompensas');
        }).catch((error) => { 
            console.log(error); 
    });
    
};

exports.get_deleteRecomp = (request, response, next) => {
    const id = request.params.id;

    Recompensas.delete(id).then(() => {
        request.session.mensaje = "Recompensa eliminada";
        return response.redirect('/promo/recompensas');

    }).catch((error) => {
        console.log(error);
        request.session.mensaje = "Recompensa asociada con una promoción existente";
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
                editar: false,
            }); 
        }).catch((error) => {
            console.log(error);
            request.session.mensaje = 'Ya existe una recompensa con este nombre'
            return response.redirect('/promo/recompensas');
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
            request.session.mensaje = 'Ya existe una recompensa con este nombre'
            return response.redirect('/promo/recompensas');
        });
};
