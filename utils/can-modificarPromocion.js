module.exports = (request, response, next) => {

    let canModificarpromoción = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'modificar promoción') {
            canModificarpromoción = true;
        }
    }

    if (canModificarpromoción) {
        next();
    } else {
        return response.render('404');
    }

}
