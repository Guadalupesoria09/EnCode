const db = require('../utils/database');

module.exports = class Usuario {
    constructor(miNombreUsuario, miNumTelefono, miContrasenia, miFechaNacimiento, miGenero, miDireccion, miCiudad, miEstado) {
        this.NombreUsuario = miNombreUsuario;
	this.NumTelefono = miNumTelefono;
        this.Contrasenia = miContrasenia;
	this.FechaNacimiento = miFechaNacimiento;
	this.Genero = miGenero;
	this.Direccion = miDireccion;
	this.Ciudad = miCiudad;
	this.Estado = miEstado;
    }

    static fetchOneByTelefono(telefono) {
        return db.execute('SELECT IDUsuario, NombreUsuario, Contrasenia FROM usuario WHERE NumTelefono = ?', [telefono]);
    }

    save() {
        return db.execute(
        'INSERT INTO Usuario (NombreUsuario, NumTelefono, Contrasenia, FehcaNacimiento, Genero, Direccion, Ciudad, Estado) VALUES (?,?,?,?,?,?,?,?)',
        [this.NombreUsuario, this.Numtelefono, this.Contrasenia, this.Contrasenia, this.FechaNacimiento, this.Genero, this.Direccion, this.Ciudad, this.Estado]);
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
}
