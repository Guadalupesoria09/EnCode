module.exports = (request, response, next) => {

    let canEliminarpromoción = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'eliminar promoción') {
            canEliminarpromoción = true;
        }
    }

    if (canEliminarpromoción) {
        next();
    } else {
        return response.render('404');
    }

}
