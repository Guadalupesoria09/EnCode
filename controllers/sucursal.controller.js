const { SsmlBreak } = require('twilio/lib/twiml/VoiceResponse'); // Importamos un recurso de Twilio.
const Sucursal = require('../models/sucursal.model');  // Importamos el modelo de Sucursal.
const UserSucur = require('../models/userSucur.model');  // Importamos el modelo de UsuarioSucursal.

exports.get_usuariosDeSucursal = (request, response, next) => {
    const IDSucursal = request.params.IDSucursal;
    
    Sucursal.fetchSucursalByID(IDSucursal).then(([sucursal,fieldData]) => {
        return UserSucur.fetchUsuariosPorSucursal(IDSucursal)
        .then(([usuarios]) => {
            response.render('listarUsuarios', {
		sucursal: sucursal[0],
                usuarios: usuarios,
                username: request.session.NombreUsuario || '',
                csrfToken: request.csrfToken(),
            });
	})
    })
    .catch((err) => {
        console.error('Error al obtener usuarios de la sucursal:', err);
        response.redirect('/sucur/sucursales');
    });
};

// Controlador para eliminar una sucursal.
exports.get_deleteSucursal = (request, response, next) => {
    const IDSucursal = request.params.IDSucursal;  // Obtenemos el ID de la sucursal desde los parámetros de la solicitud.

    // Llamamos al modelo para eliminar la sucursal.
    Sucursal.deleteSucursal(IDSucursal)
        .then(() => {
            request.session.mensaje = "Sucursal eliminada exitosamente";  // Mensaje de éxito.
            return response.redirect('/sucur/sucursales');  // Redirigimos a la lista de sucursales.
        })
        .catch((err) => {
            console.log('Error al eliminar sucursal', err);  // En caso de error, lo registramos en la consola.
            return response.redirect('/sucur/sucursales');  // Redirigimos a la lista de sucursales en caso de error.
        });
};

// Controlador para cargar la página de registrar una nueva sucursal.
exports.get_registrarSucursal = (request, response, next) => {
    let mensaje = request.session.mensaje || '';  // Obtenemos cualquier mensaje de la sesión.
    
    if (request.session.mensaje) {
        request.session.mensaje = '';  // Limpiamos el mensaje después de mostrarlo.
    }

    // Renderizamos la vista de registro de sucursal.
    response.render('registrarSucursal', {
        mensaje: mensaje,
        username: request.session.NombreUsuario || '',  // Usamos el nombre del usuario si está disponible.
        csrfToken: request.csrfToken(),  // Incluimos el token CSRF para seguridad.
        editar: false,
          // Indicamos que no estamos en modo edición.
    });
};

// Controlador para manejar la solicitud POST al registrar una nueva sucursal.
exports.post_registrarSucursal = (request, response, next) => {
    // Creamos una nueva instancia del modelo Sucursal con los datos del formulario.
    const sucursal = new Sucursal(
        request.body.Direccion,
        request.body.CP,
        request.body.Ciudad,
        request.body.Estado,
        request.body.NumSucursal,
        request.body.NombreSucursal
    );

    // Guardamos la nueva sucursal en la base de datos.
    sucursal.save()
        .then(() => {
            request.session.mensaje = 'Sucursal creada';  // Mensaje de éxito.
            response.redirect('/registrar');  // Redirigimos a la página de registro.
        })
        .catch((error) => {
            console.log(error);  // En caso de error, lo registramos.
            request.session.mensaje = 'El nombre de la sucursal que intenta registrar ya existe';  // Mensaje de error.
            response.redirect('registrarSucursal');  // Redirigimos de vuelta a la página de registro.
        });
};

// Controlador para cargar la página de edición de una sucursal.
exports.get_editarSucursales = (request, response, next) => {
    const IDSucursal = request.params.IDSucursal;  // Obtenemos el ID de la sucursal desde los parámetros.
    let sucursalData = '';  // Variable para almacenar los datos de la sucursal.
    let mensaje = request.session.mensaje || '';  // Obtenemos cualquier mensaje de la sesión.

    // Llamamos al modelo para obtener los datos de la sucursal por su ID.
    Sucursal.fetchSucursalByID(IDSucursal)
        .then(([sucursal, fieldData]) => {
            if (!sucursal || sucursal.length === 0) {
                return response.redirect('/error');  // Redirigimos si no encontramos la sucursal.
            }
            sucursalData = sucursal[0];  // Asignamos los datos de la sucursal.
            return Promise.all([]);  // Usamos Promise.all si necesitamos múltiples promesas (vacío en este caso).
        })
        .then(() => {
            // Renderizamos la vista de registro, pero en modo edición.
            console.log(sucursalData);
            response.render('registrarSucursal', {
                sucursal: sucursalData,
                mensaje: mensaje,
                editar: true,  // Indicamos que estamos en modo edición.
                csrfToken: request.csrfToken(),
                username: request.session.NombreUsuario || ''  // Mostramos el nombre del usuario.
            });
        })
        .catch((err) => {
            console.log('Error al cargar los datos del usuario o las sucursales:', err);  // En caso de error, lo registramos.
            response.redirect('/sucur/sucursales');  // Redirigimos a la lista de sucursales en caso de error.
        });
};

// Controlador para manejar la solicitud POST al editar una sucursal.
exports.post_editarSucursales = (request, response, next) => {
    // Extraemos los datos del cuerpo de la solicitud.
    const {
        Direccion, CP, Ciudad, Estado, NumSucursal, NombreSucursal, IDSucursal
    } = request.body;
    // Llamamos al modelo para actualizar los datos de la sucursal.
    Sucursal.editarSucursales(IDSucursal, Direccion, CP, Ciudad, Estado, NumSucursal, NombreSucursal)
        .then(() => {
            request.session.mensaje = 'Sucursal modificada con éxito';  // Mensaje de éxito.
            response.redirect('/sucur/sucursales');  // Redirigimos a la lista de sucursales.
        })
        .catch((err) => {
            console.log('Error al modificar los datos de la sucursal', err);  // En caso de error, lo registramos.
            response.redirect('/sucur/sucursales');  // Redirigimos a la lista de sucursales en caso de error.
        });
};

// Controlador para obtener la lista de todas las sucursales.
exports.get_sucursales = (request, response, next) => {
    let mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje = '';
    }

    // Llamamos al modelo para obtener solo las sucursales activas (no eliminadas).
    Sucursal.fetchActiveSucursales()
        .then(async ([sucursales]) => {
            // Procesamos las sucursales.
            for (let sucursal of sucursales) {
                let [usuarios] = await UserSucur.fetchDuenos(sucursal.IDSucursal);
                sucursal.NombreUsuario = usuarios;
            }
            // Renderizamos la vista de las sucursales.
            return response.render('sucursales', {
                sucursales: sucursales,
                mensaje: mensaje,
                username: request.session.NombreUsuario || '',
                csrfToken: request.csrfToken(),
                privilegios: request.session.privilegios || [],
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

