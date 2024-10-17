const db = require('../utils/database');

module.exports = class UserSucur {
    /**
     * Obtiene todas las sucursales disponibles en la base de datos.
     * @returns {Promise<Array>} Promesa que se resuelve con la lista de sucursales.
     */
    static fetchAll() {
        return db.execute('SELECT * FROM sucursal;');
    }

    /**
     * Obtiene todos los usuarios asociados a una sucursal específica.
     * @param {number} IDSucursal - El ID de la sucursal para la cual se desean obtener los usuarios.
     * @returns {Promise<Array>} Promesa que se resuelve con la lista de usuarios.
     */
    static fetchAllUsuario(IDSucursal) {
        return db.execute(
            `SELECT DISTINCT NombreUsuario, NumTelefono, FechaNacimiento, Contrasenia, Genero, Direccion, Ciudad, TipoRol, Estado
            FROM usuario u
            INNER JOIN usuarioSucursal p ON p.IDUsuario = u.IDUsuario
            INNER JOIN usuariorol ur ON u.IDUsuario = ur.IDUsuario
            INNER JOIN rol r ON ur.IDRol = r.IDRol
            WHERE p.IDSucursal = ?`, [IDSucursal]
        );
    }

    /**
     * Obtiene los dueños asociados a una sucursal específica.
     * @param {number} IDSucursal - El ID de la sucursal para la cual se desean obtener los dueños.
     * @returns {Promise<Array>} Promesa que se resuelve con la lista de dueños.
     */
    static fetchDuenos(IDSucursal) {
        return db.execute(
            `SELECT usuario.NombreUsuario, Rol.TipoRol
            FROM usuariosucursal
            INNER JOIN usuario ON usuarioSucursal.IDUsuario = Usuario.IDUsuario
            INNER JOIN usuarioRol ON usuario.IDUsuario = UsuarioRol.IDUsuario
            INNER JOIN Rol ON usuarioRol.IDRol = rol.IDRol
            WHERE rol.TipoRol = 'Dueño' AND usuario.deleted_at IS NULL AND usuarioSucursal.IDSucursal = ?`, [IDSucursal]
        );
    }

    /**
     * Guarda una relación entre un usuario y una sucursal en la base de datos.
     * @param {number} IDUsuario - El ID del usuario a asociar con la sucursal.
     * @param {number} IDSucursal - El ID de la sucursal a asociar con el usuario.
     * @returns {Promise<void>} Promesa que se resuelve cuando la inserción se complete.
     */
    save(IDUsuario, IDSucursal) {
        return db.execute(
            'INSERT INTO usuariosucursal(IDUsuario, IDSucursal) VALUES (?, ?)', [IDUsuario, IDSucursal]
        );
    }

    static updateSucursal(IDUsuario, IDSucursal) {
        return db.execute(`
            UPDATE usuariosucursal 
            SET IDSucursal = ?
            WHERE IDUsuario = ?`, 
            [IDSucursal, IDUsuario]);
    }
    
    // Método para obtener todos los usuarios de una sucursal específica.
    static fetchUsuariosPorSucursal(IDSucursal) {
        return db.execute(`
            SELECT usuario.IDUsuario, usuario.NombreUsuario, usuario.NumTelefono, rol.TipoRol,
	    usuario.FechaNacimiento, usuario.Genero, usuario.Ciudad, usuario.Estado
            FROM usuarioSucursal
            INNER JOIN usuario ON usuarioSucursal.IDUsuario = usuario.IDUsuario
            INNER JOIN usuarioRol ON usuario.IDUsuario = usuariorol.IDUsuario
            INNER JOIN rol ON usuariorol.IDRol = rol.IDRol
            WHERE usuariosucursal.IDSucursal = ? AND usuario.deleted_at IS NULL
        `, [IDSucursal]);
    }

    static fetchSucursalporUsuario(IDUsuario) {
        return db.execute(`SELECT us.IDSucursal
            FROM usuariosucursal us, sucursal s
            WHERE us.IDSucursal = s.IDSucursal AND IDUsuario = ? AND s.deleted_at IS NULL`, ([IDUsuario]));
    }

};
