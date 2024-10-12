module.exports = (request, response, next) => {

    let canEditartarjeta = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'editar tarjeta') {
            canEditartarjeta = true;
        }
    }

    if (canEditartarjeta) {
        next();
    } else {
        return response.render('404');
    }

}
