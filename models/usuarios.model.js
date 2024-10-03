const db = require('../utils/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario {
    constructor(miNombreUsuario, miNumTelefono, miFechaNacimiento, miContrasenia, miGenero, miDireccion, miCiudad, miEstado, miTipoRol, miNombreSucursal) {
        this.NombreUsuario = miNombreUsuario;
	this.NumTelefono = miNumTelefono;
	this.FechaNacimiento = miFechaNacimiento    
        this.Contrasenia = miContrasenia;
	this.Genero = miGenero ;
	this.Direccion = miDireccion ;
	this.Ciudad = miCiudad ;
	this.Estado = miEstado;
	this.TipoRol = miTipoRol || null;
	this.NombreSucursal = miNombreSucursal || null;
    }

    save() {
        let IDUsuario;
        return bcrypt.hash(this.Contrasenia, 12)
            .then((Contrasenia_cifrada) => {
                return db.execute(
                    'INSERT INTO Usuario(NombreUsuario, NumTelefono, FechaNacimiento, Contrasenia, Genero, Direccion, Ciudad, Estado) VALUES (?,?,?,?,?,?,?,?)',
                    [this.NombreUsuario, this.NumTelefono, this.FechaNacimiento, Contrasenia_cifrada,
                    this.Genero, this.Direccion, this.Ciudad, this.Estado]
                );
            })
            .then(([result]) => {
                IDUsuario = result.insertId;
                return db.execute('SELECT IDRol FROM Rol WHERE TipoRol = ?', [this.TipoRol]);
            })
            .then(([rows]) => {
                if (rows.length > 0) {
                    const IDRol = rows[0].IDRol;
                    return db.execute(
                        'INSERT INTO UsuarioRol(IDUsuario, IDRol) VALUES (?, ?)',
                        [IDUsuario, IDRol]
                    );
                } else {
                    throw new Error('El rol especificado no existe');
                }
            })
            .then(() => {
		console.log('NombreSucursal a buscar:', this.NombreSucursal);
                return db.execute('SELECT IDSucursal FROM Sucursal WHERE NombreSucursal = ?', [this.NombreSucursal]);
            })
            .then(([rows]) => {
                if (rows.length > 0) {
                    const IDSucursal = rows[0].IDSucursal;
                    return db.execute(
                        'INSERT INTO Pertenece(IDUsuario, IDSucursal) VALUES (?, ?)',
                        [IDUsuario, IDSucursal]
                    );
                } else {
                    throw new Error('La sucursal especificada no existe');
                }
            })
            .catch(error => console.log(error));
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
