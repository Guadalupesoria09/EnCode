module.exports = (request, response, next) => {
    let canVerconfiguracion = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'ver configuración') {
            canVerconfiguracion = true;
            break;
        }
    }

    if (canVerconfiguracion) {
        next();
    } else {
        return response.render('404');
    }
};

