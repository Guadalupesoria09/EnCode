
module.exports = (request, response, next) => {
    let canEliminarpromocion = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'eliminar promoción') {
            canEliminarpromocion = true;
            break;
        }
    }

    if (canEliminarpromocion) {
        next();
    } else {
        return response.render('404');
    }
};
