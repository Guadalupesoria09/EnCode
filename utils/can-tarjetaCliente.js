
module.exports = (request, response, next) => {
    let canTarjetacliente = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'tarjeta cliente') {
            canTarjetacliente = true;
            break;
        }
    }

    if (canTarjetacliente) {
        next();
    } else {
        return response.render('404');
    }
};
