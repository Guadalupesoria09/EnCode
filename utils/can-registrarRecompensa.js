module.exports = (request, response, next) => {

    let canRegistrarRecompensa = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'registrar recompensa') {
            canRegistrarRecompensa = true;
        }
    }

    if (canRegistrarRecompensa) {
        next();
    } else {
        return response.render('404');
    }

}

