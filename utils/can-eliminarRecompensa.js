module.exports = (request, response, next) => {

    let canEliminarrecompensa = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'eliminar recompensa') {
            canEliminarrecompensa = true;
        }
    }

    if (canEliminarrecompensa) {
        next();
    } else {
        return response.render('404');
    }

}
