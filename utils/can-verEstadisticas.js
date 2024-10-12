module.exports = (request, response, next) => {

    let canVerestadísticas = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'ver estadísticas') {
            canVerestadísticas = true;
        }
    }

    if (canVerestadísticas) {
        next();
    } else {
        return response.render('404');
    }

}
