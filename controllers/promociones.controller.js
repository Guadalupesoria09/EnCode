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

        for (let idPR of promociones){
            let [IDPromocionRecompensa, fieldData] = await PromoRecomp.fetchIDPR(idPR.IDPromocion);
            idPR.IDPromocionRecompensa = IDPromocionRecompensa;
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

    console.log('ID Promocion:', idPromo);
    console.log('Nuevas Recompensas:', nuevasRecompensas);

    // Validar que idPromo y nuevasRecompensas estén definidos
    if (!idPromo || !Array.isArray(nuevasRecompensas)) {
        request.session.mensaje = 'Datos inválidos';
        return response.redirect('/promo/promociones'); // O redirigir donde necesites
    }

    try {
        // Paso 1: Obtener las relaciones existentes para la promoción
        const [relacionesExistentes] = await PromoRecomp.fetchIDPR(idPromo);
        console.log('Relaciones Existentes:', relacionesExistentes);
        
        // Extraer IDs de las recompensas existentes y sus relaciones
        const recompensasExistentes = relacionesExistentes.map(rel => rel.IDRecompensa);
        const idPromocionRecompensas = relacionesExistentes.map(rel => rel.IDPromocionRecompensa); // Asegúrate de tener los IDs de las relaciones

        // Paso 2: Actualizar relaciones existentes
        for (let i = 0; i < recompensasExistentes.length; i++) {
            if (nuevasRecompensas[i] !== undefined) {
                // Solo actualizar si el ID de recompensa ha cambiado
                if (recompensasExistentes[i] !== nuevasRecompensas[i]) {
                    const idRelacion = idPromocionRecompensas[i]; // Obtener el ID de la relación
                    await PromoRecomp.editSingleRelation(idRelacion, nuevasRecompensas[i]); // Actualiza usando el ID de la relación
                }
            }
        }

        // Paso 3: Crear nuevas relaciones si hay recompensas adicionales
        for (let i = recompensasExistentes.length; i < nuevasRecompensas.length; i++) {
            // Verificamos que la nueva recompensa no exista ya en las recompensas existentes
            if (!recompensasExistentes.includes(nuevasRecompensas[i])) {
                const nuevaRelacion = new PromoRecomp(idPromo, nuevasRecompensas[i]);
                await nuevaRelacion.save(); // Guardamos la nueva relación
            }
        }

        request.session.mensaje = 'Promoción actualizada con éxito';
        response.redirect('/promo/promociones');
    } catch (error) {
        console.error(error);
        request.session.mensaje = 'Error al actualizar la promoción';
        response.redirect('/promo/promociones');
    }
};




// exports.post_editarPromo = (request, response, next) => {
//     console.log(request.body);

//     const idRecompensa = request.body.recompensa;

//     Promociones.edit(request.body.id, request.body.nombrePromo, request.body.fechaInicio,
//         request.body.fechaFin, request.body.compra, request.body.precio)
//         .then(() => {
//             // Manejamos las recompensas una por una usando map
//             const recompensasPromises = idRecompensa.map((recomp) => {
//                 // Editamos solo la relación específica entre la promoción y esta recompensa
//                 return PromoRecomp.editSingleRelation(request.body.id, recomp);
//             });
            
//             // Ejecutar todas las promesas de edición de recompensas
//             return Promise.all(recompensasPromises);
//         })
//         .then(() => {
//             // Mensaje de éxito cuando se edita correctamente
//             request.session.mensaje = 'Promoción actualizada correctamente';
//             return response.redirect('/promo/promociones');  // Redirigir a la página de promociones
//         })
//         .catch((error) => { 
//             console.log(error);
//             request.session.mensaje = 'Error al actualizar la promoción';
//             return response.redirect('/promo/promociones');  // Redirigir en caso de error
//         });
//         // Promociones.edit(request.body.id, request.body.nombrePromo, request.body.fechaInicio,
//         //     request.body.fechaFin, request.body.compra, request.body.precio)
//         //     .then(() => {
        
//         //         for (recomp in idRecompensa){
//         //             PromoRecomp.edit(request.body.id, idRecompensa[recomp])
        
//         //         }
               
//         //         // request.session.mensaje = 'Promocion actualizada';
//         //         // return response.redirect('/promo/promociones');
//         //     }).catch((error) => { 
//         //         console.log(error); 
//         // });
// };
    
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

    const limit = 6; // Número de recompensas por página
    const page = parseInt(request.query.page) || 1; // Página actual (default: 1)
    const offset = (page - 1) * limit; // Saltar recompensas de las páginas anteriores

    Recompensas.fetchPaginated(limit, offset) // Asumiendo que tienes un método para obtener recompensas paginadas
        .then(([recompensas, totalRecompensas]) => {
            const totalPages = Math.ceil(totalRecompensas / limit); // Total de páginas

            return response.render('recompensas', {
                username: request.session.NombreUsuario || '',
                csrfToken: request.csrfToken(),
                recompensas: recompensas,
                mensaje: mensaje,
                currentPage: page, // Página actual
                totalPages: totalPages, // Total de páginas
                editar: false,
            });
        }).catch((error) => {
            console.log(error);
            request.session.mensaje = 'Error al cargar las recompensas';
            return response.redirect('/promo/recompensas');
    });

    // Recompensas.fetchAll()
    //     .then(([recompensas, fieldData]) => {
    //         return response.render('recompensas', {
    //             username: request.session.NombreUsuario || '',  
    //             csrfToken: request.csrfToken(),
    //             recompensas: recompensas,
    //             mensaje: mensaje,
    //             editar: false,
    //         }); 
    //     }).catch((error) => {
    //         console.log(error);
    //         request.session.mensaje = 'Ya existe una recompensa con este nombre'
    //         return response.redirect('/promo/recompensas');
    // });
}
