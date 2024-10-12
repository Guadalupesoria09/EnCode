module.exports = (request, response, next) => {

    let canAsignarvencimiento = false;

    for (let privilegio of request.session.permisos) {
        if (privilegio.Actividad == 'asignar vencimiento') {
            canAsignarvencimiento = true;
        }
    }

    if (canAsignarvencimiento) {
        next();
    } else {
        return response.render('404');
    }

}
