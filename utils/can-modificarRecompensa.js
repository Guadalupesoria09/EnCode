
module.exports = (request, response, next) => {
    let canModificarrecompensa = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'modificar recompensa') {
            canModificarrecompensa = true;
            break;
        }
    }

    if (canModificarrecompensa) {
        next();
    } else {
        return response.render('404');
    }
};
