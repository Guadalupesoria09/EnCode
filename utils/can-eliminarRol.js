module.exports = (request, response, next) => {

    let canEliminarrol = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'eliminar rol') {
            canEliminarrol = true;
        }
    }

    if (canEliminarrol) {
        next();
    } else {
        return response.render('404');
    }

}
