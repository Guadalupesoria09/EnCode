module.exports = (request, response, next) => {

    let canCrearrol = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'crear rol') {
            canCrearrol = true;
        }
    }

    if (canCrearrol) {
        next();
    } else {
        return response.render('404');
    }

}
