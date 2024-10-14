
module.exports = (request, response, next) => {
    let canVerpromociones = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'ver promociones') {
            canVerpromociones = true;
            break;
        }
    }

    if (canVerpromociones) {
        next();
    } else {
        return response.render('404');
    }
};
