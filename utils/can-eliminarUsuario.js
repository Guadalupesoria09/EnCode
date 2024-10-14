
module.exports = (request, response, next) => {
    let canEliminarusuario = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'eliminar usuario') {
            canEliminarusuario = true;
            break;
        }
    }

    if (canEliminarusuario) {
        next();
    } else {
        return response.render('404');
    }
};
