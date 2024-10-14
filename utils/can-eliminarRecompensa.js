
module.exports = (request, response, next) => {
    let canEliminarrecompensa = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'eliminar recompensa') {
            canEliminarrecompensa = true;
            break;
        }
    }

    if (canEliminarrecompensa) {
        next();
    } else {
        return response.render('404');
    }
};
