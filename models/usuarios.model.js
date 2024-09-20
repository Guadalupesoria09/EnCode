const db = require('../utils/database');
const bcrypt = require('bcryptjs');

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

    save() {
	return bcrypt.hash(this.Contrasenia, 12)
            .then((Contrasenia_cifrada) => {
                return db.execute(
                    'INSERT INTO Usuario(NombreUsuario, NumTelefono, Contrasenia, FehcaNacimiento, Genero, Direccion, Ciudad, Estado) VALUES (?,?,?,?,?,?,?,?)',
                 [this.NombreUsuario, this.NumTelefono, Contrasenia_cifrada, this.FechaNacimiento,
	         this.Genero, this.Direccion, this.Ciudad, this.Estado]);
	}).catch(error => console.log(error));
    }

    static fetchOneByTelefono(NumTelefono) {
        return db.execute('SELECT IDUsuario, NombreUsuario, Contrasenia FROM usuario WHERE NumTelefono = ?',[NumTelefono]);
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
