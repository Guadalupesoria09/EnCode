
module.exports = (request, response, next) => {
    let canRegistrarsucursal = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'registrar sucursal') {
            canRegistrarsucursal = true;
            break;
        }
    }

    if (canRegistrarsucursal) {
        next();
    } else {
        return response.render('404');
    }
};
