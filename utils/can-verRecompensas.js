
module.exports = (request, response, next) => {
    let canVerrecompensas = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'ver recompensas') {
            canVerrecompensas = true;
            break;
        }
    }

    if (canVerrecompensas) {
        next();
    } else {
        return response.render('404');
    }
};
