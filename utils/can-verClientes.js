
module.exports = (request, response, next) => {
    let canVerclientes = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'ver clientes') {
            canVerclientes = true;
            break;
        }
    }

    if (canVerclientes) {
        next();
    } else {
        return response.render('404');
    }
};
