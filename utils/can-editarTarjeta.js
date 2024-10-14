
module.exports = (request, response, next) => {
    let canEditartarjeta = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'editar tarjeta') {
            canEditartarjeta = true;
            break;
        }
    }

    if (canEditartarjeta) {
        next();
    } else {
        return response.render('404');
    }
};
