
module.exports = (request, response, next) => {
    let canEliminarsucursal = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'eliminar sucursal') {
            canEliminarsucursal = true;
            break;
        }
    }

    if (canEliminarsucursal) {
        next();
    } else {
        return response.render('404');
    }
};
