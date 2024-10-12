module.exports = (request, response, next) => {

    let canCambiarestatus = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'cambiar estatus') {
            canCambiarestatus = true;
        }
    }

    if (canCambiarestatus) {
        next();
    } else {
        return response.render('404');
    }

}
