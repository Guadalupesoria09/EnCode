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

    console.log(id);

    PromoRecomp.fetchPromoRecomp(id).then(async ([promociones, fieldData]) => {
        for (let promo of promociones) {
            let [recompensas, fieldData] = await PromoRecomp.fetchAllnombreR(promo.IDPromocion);
            promo.recompensas = recompensas;
        }
        
        //promociones[0].FechaInicio = promociones[0].FechaInicio.getFullYear()+'-'+promociones[0].FechaInicio.getMonth()+'-'+promociones[0].FechaInicio.getDate();
        let fecha = promociones[0].FechaInicio.toISOString();
        console.log(fecha);
        promociones[0].FechaInicio = fecha.split('T')[0];

        let fechaC = promociones[0].FechaCaducidad.toISOString();
        console.log(fechaC);
        promociones[0].FechaCaducidad = fechaC.split('T')[0];

        console.log(promociones);
        return Recompensas.fetchAll().then(([recompensas, fieldData]) => {
            return response.render('crearPromocion', {
            promociones: promociones[0],
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
        request.body.fechaFin, request.body.compra, request.body.precio)
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
        request.body.compra, 
        request.body.precio,
    );

    promocion.save().then(() => {

        Promociones.fetchIDPROMO(request.body.nombrePromo).then(async ([promociones, fieldData]) => {
            const idPromo = promociones[0].IDPromocion;
            
            let promoRecomps = '';
            
            for (let recomp in idRecompensa) {
                promoRecomps = new PromoRecomp(
                    idPromo, 
                    idRecompensa[recomp],  
                );
                console.log(promoRecomps);
                try {
                    await promoRecomps.save();
                } catch(error) {
                    console.log(error);
                }
            }
            
            request.session.mensaje = 'Promoción creada';
            return response.redirect('/promo/promociones');

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

    let estatus = request.body.estatus || '';

    if (request.body.estatus) {
        request.body.estatus = ''
    } else {
        estatus = 0;
    }

    Promociones.updatePromo(estatus, request.body.id).then((rows, fieldData) => {
        request.session.mensaje = 'Estatus cambiado con exito';
        return response.redirect('/promo/promociones');
    }).catch((error) => { 
        console.log(error); 
    });   
    
}; 

exports.get_deletePromo = (request, response, next) => {
    const id = request.params.id;
   
    Promociones.deletePromo(id).then(() => {
            request.session.mensaje = "Promocion eliminada";
            return response.redirect('/promo/promociones');
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

exports.get_editorTarjeta = (request, response, next) => {
    console.log('Ruta /promo/editorTarjeta');

    response.render('editorTarjeta', {
            username: request.session.NombreUsuario || '', 
            csrfToken: request.csrfToken(),
    });
  
};

exports.post_editorTarjeta = (request, response, next) => {
    console.log(request.file);

      
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

exports.get_agregarRecompensas = (request, response, next) => {
    console.log('Ruta /promo/recompensas/agregar');
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

exports.post_agregarRecompensas = (request, response, next) => {
    console.log(request.body);

    const recompensas = new Recompensas(request.body.NombreRecompensa);

    request.session.mensaje = 'Recompensa creada';

    recompensas.save()
        .then(() => {
            return response.redirect('/promo/recompensas');
        }).catch((error) => {
            console.log(error);
            request.session.mensaje = 'Ya existe una recompensa con este nombre'
            return response.redirect('/promo/recompensas/agregar');
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
            return response.render('recompensas', {
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
}
