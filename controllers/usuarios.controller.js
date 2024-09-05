exports.get_login = (request, response, next) => {
    response.render('login', {
        username: request.session.username || '',
    });
};

exports.post_login = (request, response, next) => {
    request.session.username = request.body.username;
    response.redirect('/home');
};

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('login'); 
    });
};

exports.get_home=(request, response, next) => {
    response.render('home', {
        username: request.session.username || '',
    });
};

