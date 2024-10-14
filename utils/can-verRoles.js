
module.exports = (request, response, next) => {
    let canVerroles = false;

    for (let privilegio of request.session.privilegios) {
        if (privilegio.Privilegio === 'ver roles') {
            canVerroles = true;
            break;
        }
    }

    if (canVerroles) {
        next();
    } else {
        return response.render('404');
    }
};
