module.exports = (request, response, next) => {

    let canCrearpromoción = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'crear promoción') {
            canCrearpromoción = true;
        }
    }

    if (canCrearpromoción) {
        next();
    } else {
        return response.render('404');
    }

}
