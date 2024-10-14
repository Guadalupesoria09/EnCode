module.exports = (request, response, next) => {
    let canVertarjeta = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'ver tarjeta') {
            canVertarjeta = true;
            break;
        }
    }

    if (canVertarjeta) {
        next();
    } else {
        return response.render('404');
    }
};

