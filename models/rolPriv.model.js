const db = require('../utils/database');

module.exports = class rolPriv {

    static fetchAll() {
        return db.execute(`SELECT DISTINCT r.IDRol, TipoRol, deleted_at
            FROM RolPrivilegio rp, rol r
            WHERE rp.IDRol = r.IDRol AND deleted_at IS NULL`);
    }

    static fetchTipoRol(IDRol) {
        return db.execute(`SELECT p.Actividad, rp.IDRol
            FROM RolPrivilegio rp
            INNER JOIN privilegio p ON
            rp.IDPrivilegio = p.IDPrivilegio
            WHERE rp.IDRol = ?`, [IDRol])
    }

    static fetchRolPriv(IDRol) {
        return db.execute(`SELECT DISTINCT r.IDRol, TipoRol, deleted_at
            FROM RolPrivilegio rp, rol r
            WHERE rp.IDRol = r.IDRol AND deleted_at IS NULL AND rp.IDRol = ?`, [IDRol]);
    }


    static fetchPrivilegios(IDRol) {
        return db.execute(
            `SELECT Privilegio.Actividad
            FROM RolPrivilegio
            INNER JOIN Privilegio ON RolPrivilegio.IDPrivilegio = Privilegio.IDPrivilegio
            WHERE RolPrivilegio.IDRol = ?`, [IDRol]
        );
    }


    static fetchActividades() {
        return db.execute('SELECT Privilegio.Actividad FROM Privilegio;');
    }
};
