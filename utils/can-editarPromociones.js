module.exports = (request, response, next) => {

    let canViewPromociones = false;

    for (let permiso of request.session.permisos) {
        if (permiso.permiso == 'editar_promocion') {
            canViewPromociones = true;
        }
    }

    if(canViewPromociones) {
        next();
    } else {
        return response.render('404');    
    }

}