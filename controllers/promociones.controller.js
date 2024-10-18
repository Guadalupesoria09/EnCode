const Promociones = require('../models/promociones.model');
const Recompensas = require('../models/recompensas.model');
const PromoSucurRecomp = require('../models/promoSucurRecomp.model');
const UserSucur = require('../models/userSucur.model');


// METHODS GET & POST DE PROMOCIONES
exports.get_editarPromo = (request, response, next) => {
    console.log('Ruta editar/promo');
    let mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje = '';
    }

    const id = request.params.id;

    console.log(id);

    PromoSucurRecomp.fetchPromoRecomp(id).then(async ([promociones, fieldData]) => {
        for (let promo of promociones) {
            let [recompensas, fieldData] = await PromoSucurRecomp.fetchAllnombreR(promo.IDPromocion);
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

exports.post_editarPromo = async (request, response, next) => {
    const idPromo = request.body.id; // ID de la promoción a editar
    const nuevasRecompensas = request.body.recompensa; // Array de nuevas IDRecompensa
    const idUsuario = request.session.IDUsuario;

    console.log('ID Promocion:', idPromo);
    console.log('Nuevas Recompensas:', nuevasRecompensas);

    UserSucur.fetchSucursalporUsuario(idUsuario).then(async ([sucursal, fieldData]) => {
        const idSucursal = sucursal[0].IDSucursal;

        await Promociones.edit(idPromo, 
            request.body.nombrePromo, 
            request.body.fechaInicio,
            request.body.fechaFin, 
            request.body.compra, 
            request.body.precio,).then(async () => {
    
                // Validar que idPromo y nuevasRecompensas estén definidos
                if (!idPromo || !Array.isArray(nuevasRecompensas)) {
                    request.session.mensaje = 'Datos inválidos';
                    return response.redirect(`${process.env.PATH_ENV}promo/promociones`); // O redirigir donde necesites
                }
    
                try {
            
                    // Paso 1: Obtener las relaciones existentes para la promoción
                    const [relacionesExistentes] = await PromoSucurRecomp.fetchIDPR(idPromo);
                    console.log('Relaciones Existentes:', relacionesExistentes);
                    
                    // Extraer IDs de las recompensas existentes y sus relaciones
                    const recompensasExistentes = relacionesExistentes.map(rel => rel.IDRecompensa);
                    const idPromocionSucurRecompensas = relacionesExistentes.map(rel => rel.IDPromocionSucurRecompensa); // Asegúrate de tener los IDs de las relaciones
            
                    // Paso 2: Actualizar relaciones existentes
                    for (let i = 0; i < recompensasExistentes.length; i++) {
                        if (nuevasRecompensas[i] !== undefined) {
                            // Solo actualizar si el ID de recompensa ha cambiado
                            if (recompensasExistentes[i] !== nuevasRecompensas[i]) {
                                const idRelacion = idPromocionSucurRecompensas[i]; // Obtener el ID de la relación
                                await PromoSucurRecomp.editSingleRelation(idRelacion, nuevasRecompensas[i]); // Actualiza usando el ID de la relación
                            }
                        }
                    }
            
                    // Paso 3: Crear nuevas relaciones si hay recompensas adicionales
                    for (let i = recompensasExistentes.length; i < nuevasRecompensas.length; i++) {
                        // Verificamos que la nueva recompensa no exista ya en las recompensas existentes
                        if (!recompensasExistentes.includes(nuevasRecompensas[i])) {
                            const nuevaRelacion = new PromoSucurRecomp(idPromo, nuevasRecompensas[i], idSucursal);
                            await nuevaRelacion.save(); // Guardamos la nueva relación
                        }
                    }
            
                    request.session.mensaje = 'Promoción actualizada con éxito';
                    response.redirect(`${process.env.PATH_ENV}promo/promociones`);
                } catch (error) {
                    console.error(error);
                    request.session.mensaje = 'Error al actualizar la promoción';
                    response.redirect(`${process.env.PATH_ENV}promo/promociones`);
                }
    
        })
    })
    
};
    
exports.get_registrar = (request, response, next) => {
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
                privilegios: request.session.privilegios || [],
                mensaje: mensaje,
                csrfToken: request.csrfToken(),
            }); 
        }).catch((error) => {
            console.log(error);

        });
};

exports.post_registrar = (request, response, next) => {

    const idUsuario = request.session.IDUsuario;

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

        UserSucur.fetchSucursalporUsuario(idUsuario).then(async ([sucursal, fieldData]) => {
            const idSucursal = sucursal[0].IDSucursal;

            Promociones.fetchIDPROMO(request.body.nombrePromo).then(async ([promociones, fieldData]) => {
                const idPromo = promociones[0].IDPromocion;
                
                let promoRecomps = '';
                
                for (let recomp in idRecompensa) {
                    promoSucurRecomps = new PromoSucurRecomp(
                        idPromo, 
                        idRecompensa[recomp],
                        idSucursal,
    
                    );
                    console.log(promoSucurRecomps);
                    try {
                        await promoSucurRecomps.save();
                    } catch(error) {
                        console.log(error);
                    }
                }
                
                request.session.mensaje = 'Promoción creada';
                return response.redirect(`${process.env.PATH_ENV}promo/promociones`);
    
            }).catch((error) => { 
                console.log(error);
            });

        }).catch((error) => { 
            request.session.mensaje = 'Error al recuperar sucursal'
            console.log(error);
        });

    }).catch((error) => { 
        console.log(error);
        request.session.mensaje = 'Ya existe un promoción con este nombre'
        return response.redirect(`${process.env.PATH_ENV}promo/crearPromociones`);
    });

};

exports.get_promo = (request, response, next) => {
    console.log('Ruta /promo/promociones');

    let mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje = '';
    }

    PromoSucurRecomp.fetchAll().then(async ([promociones, fieldData]) => {
        for (let promo of promociones) {
            let [recompensas, fieldData] = await PromoSucurRecomp.fetchAllnombreR(promo.IDPromocion);
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
        return response.redirect(`${process.env.PATH_ENV}promo/promociones`);
    }).catch((error) => { 
        console.log(error); 
    });   
    
}; 

exports.get_deletePromo = (request, response, next) => {
    const id = request.params.id;
   
    Promociones.deletePromo(id).then(() => {
            request.session.mensaje = "Promocion eliminada";
            return response.redirect(`${process.env.PATH_ENV}promo/promociones`);
        }).catch((error) => {
        console.log(error);
    });
}

