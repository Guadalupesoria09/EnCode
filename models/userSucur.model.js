const db = require('../utils/database');

module.exports = class UserSucur {
    /**
     * Obtiene todas las sucursales disponibles en la base de datos.
     * @returns {Promise<Array>} Promesa que se resuelve con la lista de sucursales.
     */
    static fetchAll() {
        return db.execute('SELECT * FROM Sucursal;');
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
            `SELECT Usuario.NombreUsuario, Rol.TipoRol
            FROM usuarioSucursal
            INNER JOIN Usuario ON usuarioSucursal.IDUsuario = Usuario.IDUsuario
            INNER JOIN UsuarioRol ON Usuario.IDUsuario = UsuarioRol.IDUsuario
            INNER JOIN Rol ON UsuarioRol.IDRol = Rol.IDRol
            WHERE Rol.TipoRol = 'Dueño' AND Usuario.deleted_at IS NULL AND usuarioSucursal.IDSucursal = ?`, [IDSucursal]
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
            'INSERT INTO usuarioSucursal(IDUsuario, IDSucursal) VALUES (?, ?)', [IDUsuario, IDSucursal]
        );
    }

    static updateSucursal(IDUsuario, IDSucursal) {
        return db.execute(`
            UPDATE usuarioSucursal 
            SET IDSucursal = ?
            WHERE IDUsuario = ?`, 
            [IDSucursal, IDUsuario]);
    }
    
    // Método para obtener todos los usuarios de una sucursal específica.
    static fetchUsuariosPorSucursal(IDSucursal) {
        return db.execute(`
            SELECT Usuario.IDUsuario, Usuario.NombreUsuario, Usuario.NumTelefono, Rol.TipoRol
            FROM usuarioSucursal
            INNER JOIN Usuario ON usuarioSucursal.IDUsuario = Usuario.IDUsuario
            INNER JOIN UsuarioRol ON Usuario.IDUsuario = UsuarioRol.IDUsuario
            INNER JOIN Rol ON UsuarioRol.IDRol = Rol.IDRol
            WHERE usuarioSucursal.IDSucursal = ? AND Usuario.deleted_at IS NULL
        `, [IDSucursal]);
    }

};
