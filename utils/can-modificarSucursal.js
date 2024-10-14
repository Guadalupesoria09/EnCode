
module.exports = (request, response, next) => {
    let canModificarsucursal = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'modificar sucursal') {
            canModificarsucursal = true;
            break;
        }
    }

    if (canModificarsucursal) {
        next();
    } else {
        return response.render('404');
    }
};
