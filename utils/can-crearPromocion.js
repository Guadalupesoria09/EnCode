
module.exports = (request, response, next) => {
    let canCrearpromocion = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'crear promoción') {
            canCrearpromocion = true;
            break;
        }
    }

    if (canCrearpromocion) {
        next();
    } else {
        return response.render('404');
    }
};
