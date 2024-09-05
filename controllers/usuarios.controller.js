exports.get_login = (request, response, next) => {
    response.render('login', {
        username: request.session.username || '',
    });
};

exports.post_login = (req, res, next) => {
    
    // validar el usuario y obtener el teléfono desde la base de datos

    const username = req.body.username;
    const telefono = req.body.telefono; // Asumiendo que obtienes el teléfono también

    req.session.username = username;
    req.session.telefono = telefono; // Guarda el teléfono en la sesión
    res.redirect('/home');
};


exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};

exports.get_home = (req, res, next) => {
    const username = req.session.username || '';
    const telefono = req.session.telefono || ''; //guardar el teléfono en la sesión
    res.render('home', {
        username: username,
        telefono: telefono
    });
};


