module.exports = (request, response, next) => {

    let canEliminarsucursal = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'eliminar sucursal') {
            canEliminarsucursal = true;
        }
    }

    if (canEliminarsucursal) {
        next();
    } else {
        return response.render('404');
    }

}
