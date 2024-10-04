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
    
    static fetchOneByID(IDUsuario) {
        return db.execute(`
            SELECT u.IDUsuario, u.NombreUsuario, u.NumTelefono, u.FechaNacimiento, u.Genero, u.Direccion, u.Ciudad, u.Estado, r.TipoRol
            FROM usuario u
            INNER JOIN UsuarioRol ur ON u.IDUsuario = ur.IDUsuario
            INNER JOIN Rol r ON ur.IDRol = r.IDRol
            WHERE u.IDUsuario = ?`, [IDUsuario]);
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

    //actualizar la contraseña de un usuario
    static actualizarContrasena(IDUsuario, nuevaContrasenia) {
        return bcrypt.hash(nuevaContrasenia, 12)
            .then((Contrasenia_cifrada) => {
                return db.execute('UPDATE usuario SET Contrasenia = ? WHERE IDUsuario = ?', [Contrasenia_cifrada, IDUsuario]);
            })
            .catch(error => console.log(error));
    }

    static update(IDUsuario, NombreUsuario, NumTelefono, FechaNacimiento, Genero, Direccion, Ciudad, Estado, Rol) {
        return db.execute(`
            UPDATE usuario 
            SET NombreUsuario = ?, NumTelefono = ?, FechaNacimiento = ?, Genero = ?, Direccion = ?, Ciudad = ?, Estado = ?
            WHERE IDUsuario = ?`, 
            [NombreUsuario, NumTelefono, FechaNacimiento, Genero, Direccion, Ciudad, Estado, IDUsuario]);
    }
    
    
    static updateSucursal(IDUsuario, IDSucursal) {
        return db.execute(`
            UPDATE pertenece 
            SET IDSucursal = ?
            WHERE IDUsuario = ?`, 
            [IDSucursal, IDUsuario]);
    }
    
    static updateRol(IDUsuario, IDRol) {
    return db.execute(`
        UPDATE usuarioRol 
        SET IDRol = ?
        WHERE IDUsuario = ?`, 
        [IDRol, IDUsuario]);
    }

    
    static fetchUsuariosPorSucursal(IDSucursal) {
        return db.execute(`
            SELECT Usuario.IDUsuario, Usuario.NombreUsuario, Usuario.NumTelefono, Rol.TipoRol
            FROM Pertenece
            INNER JOIN Usuario ON Pertenece.IDUsuario = Usuario.IDUsuario
            INNER JOIN UsuarioRol ON Usuario.IDUsuario = UsuarioRol.IDUsuario
            INNER JOIN Rol ON UsuarioRol.IDRol = Rol.IDRol
            WHERE Pertenece.IDSucursal = ? AND Usuario.deleted_at IS NULL
        `, [IDSucursal]);
    }
    
    
    static deleteUsuario(IDUsuario) {
        return db.execute(`UPDATE usuario SET deleted_at = CURRENT_TIMESTAMP WHERE IDUsuario = ?`, [IDUsuario]);
    }
    

}
