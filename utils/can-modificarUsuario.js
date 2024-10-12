module.exports = (request, response, next) => {

    let canModificarusuario = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'modificar usuario') {
            canModificarusuario = true;
        }
    }

    if (canModificarusuario) {
        next();
    } else {
        return response.render('404');
    }

}
