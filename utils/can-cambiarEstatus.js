
module.exports = (request, response, next) => {
    let canCambiarestatus = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'cambiar estatus') {
            canCambiarestatus = true;
            break;
        }
    }

    if (canCambiarestatus) {
        next();
    } else {
        return response.render('/promo/promociones');
    }
};
