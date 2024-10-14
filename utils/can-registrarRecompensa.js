
module.exports = (request, response, next) => {
    let canRegistrarrecompensa = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'registrar recompensa') {
            canRegistrarrecompensa = true;
            break;
        }
    }

    if (canRegistrarrecompensa) {
        next();
    } else {
        return response.render('404');
    }
};
