const db = require('../utils/database');

module.exports = class Usuario {
    constructor(mi_IDUsuario, mi_nombre, mi_password) {
        this.IDUsuario = mi_IDUsuario;
        this.NombreUsuario = mi_nombre;
        this.Contrasenia = mi_password;
    }

    static fetchOneByTelefono(telefono) {
        return db.execute('SELECT IDUsuario, NombreUsuario, Contrasenia FROM usuario WHERE NumTelefono = ?', [telefono]);
    }

    static create(usuarioData) {
        return db.execute(
            'INSERT INTO usuario (NombreUsuario, NumTelefono, Contrasenia) VALUES (?, ?, ?)',
            [usuarioData.NombreUsuario, usuarioData.telefono, usuarioData.Contrasenia]
        );
    }

    static getPrivilegios(IDUsuario) {
        return db.execute(`
            SELECT Actividad as Privilegio 
            FROM usuario u
            JOIN usuariorol ur ON u.IDUsuario = ur.IDUsuario
            JOIN rol r ON ur.IDRol = r.IDRol
            JOIN rolprivilegios rp ON rp.IDRol = r.IDRol
            JOIN privilegio p ON rp.IDPrivilegio = p.IDPrivilegio
            WHERE u.IDUsuario = ?
        `, [IDUsuario]);
    }
};
