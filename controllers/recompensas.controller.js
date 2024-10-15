const Recompensas = require('../models/recompensas.model');

// METHODS GET & POST RECOMPENSAS
//Metodo GET para recuperar el formulario rellenado para editar una recompensa
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

//Metodo POST para editar la recompensa
exports.post_editarRecompensa = (request, response, next) => {
    console.log(request.body);

    Recompensas.edit(request.body.id, request.body.NombreRecompensa)
        .then((rows, fieldData) => {
            request.session.mensaje = 'Recompensa actualizada';
            return response.redirect('<%= process.env.PATH_ENV%>promo/recompensas');
        }).catch((error) => { 
            console.log(error); 
    });
    
};

// Metodo GET para eliminar una recompensa
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

//Metodo GET para recuperar el formulario de recompensas
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
            return response.redirect('<%= process.env.PATH_ENV%>promo/recompensas');
        });
};

// Metodo POST para agregar nuevas recompensas
exports.post_agregarRecompensas = (request, response, next) => {
    console.log(request.body);

    const recompensas = new Recompensas(request.body.NombreRecompensa);

    request.session.mensaje = 'Recompensa creada';

    recompensas.save()
        .then(() => {
            return response.redirect('<%= process.env.PATH_ENV%>promo/recompensas');
        }).catch((error) => {
            console.log(error);
            request.session.mensaje = 'Ya existe una recompensa con este nombre'
            return response.redirect('<%= process.env.PATH_ENV%>promo/recompensas/agregar');
        });
};

//Metodo get para recuperar todas las recompensas
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
            return response.redirect('<%= process.env.PATH_ENV%>promo/recompensas');
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
