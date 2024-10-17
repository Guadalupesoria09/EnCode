
module.exports = (request, response, next) => {
    let canVersucursales = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'ver sucursales') {
            canVersucursales = true;
            break;
        }
    }

    if (canVersucursales) {
        next();
    } else {
        return response.render('404');
    }
};
