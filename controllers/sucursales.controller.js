exports.get_registrar_sucursales = (request, response, next) => {
    response.render('registrarSucursales');
};

exports.get_registrar_dueno = (request, response, next) => {
    response.render('registrarDueno');
};

exports.get_sucursales = (request, response, next) => {
    response.render('sucursales');
};
