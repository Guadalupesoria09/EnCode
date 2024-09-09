const sucursal = require('../models/sucursal.model');

exports.get_registrarSucursal = (request, response, next) => {
    response.render('registrarSucursal', {
        username: request.session.username,
        //csfrToken: request.csrfToken(),
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

