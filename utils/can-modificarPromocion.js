
module.exports = (request, response, next) => {
    let canModificarpromocion = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'modificar promoción') {
            canModificarpromocion = true;
            break;
        }
    }

    if (canModificarpromocion) {
        next();
    } else {
        return response.render('404');
    }
};
