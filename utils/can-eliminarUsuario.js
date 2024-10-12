module.exports = (request, response, next) => {

    let canEliminarusuario = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'eliminar usuario') {
            canEliminarusuario = true;
        }
    }

    if (canEliminarusuario) {
        next();
    } else {
        return response.render('404');
    }

}
