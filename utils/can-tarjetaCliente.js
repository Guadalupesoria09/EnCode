module.exports = (request, response, next) => {

    let canTarjetacliente = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'tarjeta cliente') {
            canTarjetacliente = true;
        }
    }

    if (canTarjetacliente) {
        next();
    } else {
        return response.render('404');
    }

}
