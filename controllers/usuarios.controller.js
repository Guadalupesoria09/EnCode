const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios.model');

// Registrar usuario
exports.get_register = (request, response, next) => {
    response.render('registrar');
};

exports.post_register = (request, response, next) => {
    console.log(request.body);
    const usuario = new Usuario(request.body.NombreUsuario, request.body.NumTelefono,
	request.body.FechaNacimiento, request.body.Contrasenia, request.body.Genero,
	request.body.Direccion, request.body.Ciudad, request.body.Estado);
    
    Usuario.fetchOneByTelefono(NumTelefono)
	.then(([usuario, fieldData) => {
            if (usuario.length > 0) {
                request.session.mensaje = 'El usuario ya existe'
		return response.redirect('registrar');
	    }else{
              bcrypt.hash(password, 10(err, hash) => {
                  if (err){
                     console.log('Error al hashear la contraseña', err);
                     req.session.mensaje = 'Error 500: Error del servidor';
                     return res.redirect('registrar');
                  }
		  usuario.save()
		      .then(() =>{
	    		  consele.log('usuario creado exitosamente');
	       		  request.session.mensaje = 'Usuario registrado correctamente';
	       		  response.redirect('sucursal');
		      })
	     	      .catch(err => {
	     	          console.log('Error al crear el usuario', err);
	    		  request.session.mensaje = 'Error 500: Error del servidor';
	    		  response.redirect('sucursal');
	    	      });
	          });
	      }     
	  })
	  .catch(err => {
             console.log('Error al verificar el usuario:', err);
             req.session.mensaje = 'Error 500: Error del servidor';
             res.redirect('/registrar');
          });
};
    


exports.get_login = (request, response, next) => {
    response.render('login'); 
};

// Controlador para iniciar sesión
exports.post_login = (req, res, next) => {
    const telefono = req.body.telefono;

    Usuario.fetchOneByTelefono(telefono)
        .then(([usuario, fieldData]) => {
            if (usuario.length > 0) {
                // Comparar la contraseña ingresada con el hash almacenado
                bcrypt.compare(req.body.password, usuario[0].Contrasenia)
                    .then(doMatch => {
                        if (doMatch) {
                            req.session.isLoggedIn = true;
                            req.session.NombreUsuario = usuario[0].NombreUsuario;
                            req.session.IDUsuario = usuario[0].IDUsuario;

                            // Obtener privilegios del usuario
                            Usuario.getPrivilegios(usuario[0].IDUsuario)
                                .then(([privilegios, fieldData]) => {
                                    req.session.privilegios = privilegios;
                                    return req.session.save(err => {
                                        res.redirect('/home');
                                    });
                                })
                                .catch(err => {
                                    console.log('Error al obtener privilegios:', err);
                                    res.redirect('/login');
                                });
                        } else {
                            req.session.mensaje = 'El usuario y/o contraseña no coinciden';
                            res.redirect('/login');
                        }
                    })
                    .catch(err => {
                        console.log('Error al comparar contraseñas:', err);
                        res.redirect('/login');
                    });
            } else {
                req.session.mensaje = 'El usuario no existe';
                res.redirect('/login');
            }
        })
        .catch(err => {
            req.session.mensaje = 'Error 500: Error del servidor';
            res.redirect('/login');
        });
};

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/login');
    });
};

exports.get_home = (request, response, next) => {
    const username = request.session.NombreUsuario || '';
    response.render('home', { username });
};
