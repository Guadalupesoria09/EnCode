const sucursal = require('../models/sucursal.model');

exports.get_registrarSucursal = (request, response, next) => {
    response.render('registrarSucursal', {
        username: request.session.username,
        //csfrToken: request.csrfToken(),
    });
};

exports.post_registrarSucursal = (request, response, next) => {
    console.log(request.body);
    const sucursal = new sucursal(request.body.Direccion, request.body.CP, request.body.Ciudad,
	request.body.Estado, request.body.NumSucursal, request.body.NombreSucursal);
    sucursal.save()
        .then(() => { 
            response.redirect('registrarDueno');
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
