
module.exports = (request, response, next) => {
    let canVersucursal = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'ver sucursal') {
            canVersucursal = true;
            break;
        }
    }

    if (canVersucursal) {
        next();
    } else {
        return response.render('404');
    }
};
