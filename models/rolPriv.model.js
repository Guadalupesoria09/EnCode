const db = require('../utils/database');

module.exports = class rolPriv {
    /**
     * Obtiene todos los roles disponibles en la base de datos.
     * @returns {Promise<Array>} Promesa que se resuelve con la lista de roles.
     */
    static fetchAll() {
        return db.execute('SELECT * FROM Rol;');
    }

    /**
     * Obtiene los privilegios asociados a un rol específico.
     * @param {number} IDRol - El ID del rol para el cual se desean obtener los privilegios.
     * @returns {Promise<Array>} Promesa que se resuelve con la lista de privilegios asociados.
     */
    static fetchPrivilegios(IDRol) {
        return db.execute(
            `SELECT Privilegio.Actividad
            FROM RolPrivilegio
            INNER JOIN Privilegio ON RolPrivilegio.IDPrivilegio = Privilegio.IDPrivilegio
            WHERE RolPrivilegio.IDRol = ?`, [IDRol]
        );
    }

    /**
     * Obtiene todas las actividades disponibles en la tabla Privilegio.
     * @returns {Promise<Array>} Promesa que se resuelve con la lista de actividades.
     */
    static fetchActividades() {
        return db.execute('SELECT Privilegio.Actividad FROM Privilegio;');
    }
};
