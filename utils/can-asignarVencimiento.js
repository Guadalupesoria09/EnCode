
module.exports = (request, response, next) => {
    let canAsignarvencimiento = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'asignar vencimiento') {
            canAsignarvencimiento = true;
            break;
        }
    }

    if (canAsignarvencimiento) {
        next();
    } else {
        return response.render('404');
    }
};
