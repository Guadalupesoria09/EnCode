
module.exports = (request, response, next) => {
    let canModificarusuario = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'modificar usuario') {
            canModificarusuario = true;
            break;
        }
    }

    if (canModificarusuario) {
        next();
    } else {
        return response.render('404');
    }
};
