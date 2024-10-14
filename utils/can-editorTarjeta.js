
module.exports = (request, response, next) => {
    let canEditortarjeta = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'editor tarjeta') {
            canEditortarjeta = true;
            break;
        }
    }

    if (canEditortarjeta) {
        next();
    } else {
        return response.render('404');
    }
};
