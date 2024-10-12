module.exports = (request, response, next) => {

    let canRegistrarrecompensa = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'registrar recompensa') {
            canRegistrarrecompensa = true;
        }
    }

    if (canRegistrarrecompensa) {
        next();
    } else {
        return response.render('404');
    }

}
