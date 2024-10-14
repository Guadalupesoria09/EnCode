
module.exports = (request, response, next) => {
    let canVercompras = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'ver compras') {
            canVercompras = true;
            break;
        }
    }

    if (canVercompras) {
        next();
    } else {
        return response.render('404');
    }
};
