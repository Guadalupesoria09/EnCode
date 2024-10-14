
module.exports = (request, response, next) => {
    let canCrearrol = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'crear rol') {
            canCrearrol = true;
            break;
        }
    }

    if (canCrearrol) {
        next();
    } else {
        return response.render('404');
    }
};
