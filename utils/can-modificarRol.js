
module.exports = (request, response, next) => {
    let canModificarrol = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'modificar rol') {
            canModificarrol = true;
            break;
        }
    }

    if (canModificarrol) {
        next();
    } else {
        return response.render('404');
    }
};
