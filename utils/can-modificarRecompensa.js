module.exports = (request, response, next) => {

    let canModificarrecompensa = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'modificar recompensa') {
            canModificarrecompensa = true;
        }
    }

    if (canModificarrecompensa) {
        next();
    } else {
        return response.render('404');
    }

}
