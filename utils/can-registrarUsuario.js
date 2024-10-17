
module.exports = (request, response, next) => {
    let canRegistrarusuario = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'registrar usuario') {
            canRegistrarusuario = true;
            break;
        }
    }

    if (canRegistrarusuario) {
        next();
    } else {
        return response.render('404');
    }
};
