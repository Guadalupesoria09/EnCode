
module.exports = (request, response, next) => {
    let canEliminarrol = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'eliminar rol') {
            canEliminarrol = true;
            break;
        }
    }

    if (canEliminarrol) {
        next();
    } else {
        return response.render('404');
    }
};
