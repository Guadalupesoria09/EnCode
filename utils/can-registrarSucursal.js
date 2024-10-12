module.exports = (request, response, next) => {

    let canRegistrarsucursal = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'registrar sucursal') {
            canRegistrarsucursal = true;
        }
    }

    if (canRegistrarsucursal) {
        next();
    } else {
        return response.render('404');
    }

}
