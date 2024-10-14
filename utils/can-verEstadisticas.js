
module.exports = (request, response, next) => {
    let canVerestadisticas = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'ver estadísticas') {
            canVerestadisticas = true;
            break;
        }
    }

    if (canVerestadisticas) {
        next();
    } else {
        return response.render('404');
    }
};
