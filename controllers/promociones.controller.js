exports.get_crear_promocion = (request, response, next) => {
    response.render('crearPromocion');
};

exports.get_editar_tarjeta = (request, response, next) => {
    response.render('editarTarjeta');
};

exports.get_registrar_recompensa = (request, response, next) => {
    response.render('registrarRecompensa');
};
