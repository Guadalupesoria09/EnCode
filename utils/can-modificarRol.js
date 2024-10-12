module.exports = (request, response, next) => {

    let canModificarrol = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'modificar rol') {
            canModificarrol = true;
        }
    }

    if (canModificarrol) {
        next();
    } else {
        return response.render('404');
    }

}
