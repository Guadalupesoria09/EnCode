module.exports = (request, response, next) => {

    let canEliminarRecompensa = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'eliminar recompensa') {
            canEliminarRecompensa = true;
        }
    }

    if (canEliminarRecompensa) {
        next();
    } else {
        return response.render('404');
    }

}

