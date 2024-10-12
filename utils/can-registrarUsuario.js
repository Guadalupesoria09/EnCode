module.exports = (request, response, next) => {

    let canRegistrarusuario = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'registrar usuario') {
            canRegistrarusuario = true;
        }
    }

    if (canRegistrarusuario) {
        next();
    } else {
        return response.render('404');
    }

}
