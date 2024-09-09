const sucursal = require('../models/sucursal.model');

exports.get_registrarSucursal = (request, response, next) => {
    response.render('registrarSucursal', {
        username: request.session.username,
        //csfrToken: request.csrfToken(),
    });
};

exports.post_registrarSucursal = (request, response, next) => {
    const sucursal = new sucursal(request.body);
    sucursal.save()
        .then(() => {
	    request.session.mensaje = 'Sucursal creada con éxito.';
            response.redirect('/registrarDueno');
	}).catch((error) => {
            console.log(error);
        });
};

exports.get_registrarDueno = (request, response, next) => {
    response.render('registrarDueno', {
        username: request.session.username,
    	//csfrToken: request.csrfToken(),
    });
};

exports.get_sucursales = (request, response, next) => {
    response.render('sucursales', {
        username: request.session.username || '',
    	//csfrToken: request.csrfToken(),
    });
};

