module.exports = (request, response, next) => {

    let canModificarsucursal = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'modificar sucursal') {
            canModificarsucursal = true;
        }
    }

    if (canModificarsucursal) {
        next();
    } else {
        return response.render('404');
    }

}
