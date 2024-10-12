module.exports = (request, response, next) => {

    let canVercompras = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'ver compras') {
            canVercompras = true;
        }
    }

    if (canVercompras) {
        next();
    } else {
        return response.render('404');
    }

}
