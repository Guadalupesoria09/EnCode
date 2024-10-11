module.exports = (request, response, next) => {

    let canModificarRecompensa = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'modificar recompensa') {
            canModificarRecompensa = true;
        }
    }

    if (canModificarRecompensa) {
        next();
    } else {
        return response.render('404');
    }

}

