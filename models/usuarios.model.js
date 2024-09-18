const db = require('../utils/database');

module.exports = class Usuario {

    constructor(mi_IDUsuario, mi_nombre, mi_password) {
        this.IDUsuario = mi_IDUsuario;
        this.NombreUsuario = mi_nombre;
        this.Contrasenia = mi_password;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM usuario');
    }

    static fetchOne(IDUsuario) {
        return db.execute('SELECT * FROM usuario WHERE IDUsuario = ?', [IDUsuario]);
    }

    static fetchOne(telefono) {
        return db.execute('SELECT * FROM usuario WHERE NumTelefono = ?', [telefono]);
    }

    static fetchOneByTelefono(telefono) {
        return db.execute('SELECT IDUsuario, NombreUsuario, Contrasenia FROM usuario WHERE NumTelefono = ?', [telefono]);
    }

    static fetch(telefono){
        if(telefono){
            return this.fetchOne(telefono);
        } else {
            return this.fetchAll();
        }
    }

    static fetch(IDUsuario) {
        if (IDUsuario) {
            return this.fetchOne(IDUsuario);
        } else {
            return this.fetchAll();
        }
    }

    static getPrivilegios(IDUsuario) {
        return db.execute(
            `SELECT Actividad as Privilegio 
            FROM usuario u, usuariorol ur, rol r, rolprivilegios rp, privilegio p 
            WHERE u.IDUsuario = ur.IDUsuario AND ur.IDRol = rIDRol
            AND rp.IDRol = r.IDRol AND rp.IDPrivilegio = p.IDPrivilegio
            AND u.NombreUsuario = ?`, 
            [IDUsuario]
        );
    }
}
