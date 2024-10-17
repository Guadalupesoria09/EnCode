const db = require('../utils/database');

module.exports = class rolPriv {

    // Fetch all roles along with privileges
    static fetchAll() {
        return db.execute(`
            SELECT r.IDRol, r.TipoRol, p.Actividad
            FROM rolprivilegio rp
            INNER JOIN rol r ON rp.IDRol = r.IDRol
            INNER JOIN privilegio p ON rp.IDPrivilegio = p.IDPrivilegio
            WHERE r.deleted_at IS NULL
        `);
    }

    static fetchTipoRol(IDRol) {
        return db.execute(`SELECT p.Actividad, rp.IDRol, rp.IDPrivilegio
            FROM rolprivilegio rp
            INNER JOIN privilegio p ON
            rp.IDPrivilegio = p.IDPrivilegio
            WHERE rp.IDRol = ?`, [IDRol])
    }

    static fetchRolPriv(IDRol) {
        return db.execute(`SELECT DISTINCT r.IDRol, TipoRol, deleted_at
            FROM rolprivilegio rp, rol r
            WHERE rp.IDRol = r.IDRol AND deleted_at IS NULL AND rp.IDRol = ?`, [IDRol]);
    }


    // Fetch privileges by role
    static fetchPrivilegios(IDRol) {
        return db.execute(`
            SELECT p.Actividad, p.IDPrivilegio
            FROM rolprivilegio rp
            INNER JOIN privilegio p ON rp.IDPrivilegio = p.IDPrivilegio
            WHERE rp.IDRol = ?
        `, [IDRol]);
    }


     // Fetch all available privileges
     static fetchActividades() {
        return db.execute('SELECT IDPrivilegio, Actividad FROM privilegio');
    }
};
