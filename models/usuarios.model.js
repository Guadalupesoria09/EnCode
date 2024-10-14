const db = require('../utils/database');  // Importamos la conexión a la base de datos.
const bcrypt = require('bcryptjs');  // Importamos bcrypt para encriptar las contraseñas.

module.exports = class Usuario {
    constructor(miNombreUsuario, miNumTelefono, miFechaNacimiento, miContrasenia, miGenero, miDireccion, miCiudad, miEstado, miIDRol, miNombreSucursal) {
        // Inicializamos las propiedades del usuario.
        this.NombreUsuario = miNombreUsuario;
        this.NumTelefono = miNumTelefono;
        this.FechaNacimiento = miFechaNacimiento;
        this.Contrasenia = miContrasenia;
        this.Genero = miGenero;
        this.Direccion = miDireccion;
        this.Ciudad = miCiudad;
        this.Estado = miEstado;
        this.IDRol = miIDRol || null;
        this.NombreSucursal = miNombreSucursal || null;
    }

    // Método para guardar un nuevo usuario en la base de datos, incluyendo la encriptación de la contraseña.
    save() {
        let IDUsuario;
        let IDRol;
        return bcrypt.hash(this.Contrasenia, 12)
            .then((Contrasenia_cifrada) => {
                // Insertamos el usuario en la base de datos.
                return db.execute(
                    'INSERT INTO Usuario(NombreUsuario, NumTelefono, FechaNacimiento, Contrasenia, Genero, Direccion, Ciudad, Estado) VALUES (?,?,?,?,?,?,?,?)',
                    [this.NombreUsuario, this.NumTelefono, this.FechaNacimiento, Contrasenia_cifrada,
                    this.Genero, this.Direccion, this.Ciudad, this.Estado]
                );
            })
            .then(([result]) => {
                // Obtenemos el ID del usuario recién creado.
                IDUsuario = result.insertId;
                return db.execute('SELECT IDRol FROM Rol WHERE IDRol = ?', [this.IDRol]);
            })
            .then(([rows]) => {
                // Verificamos si el rol especificado existe.
                if (rows.length > 0) {
                    IDRol = rows[0].IDRol;
                    return db.execute(
                        'INSERT INTO UsuarioRol(IDUsuario, IDRol) VALUES (?, ?)',
                        [IDUsuario, IDRol]
                    );
                } else {
                    throw Error('El rol especificado no existe');
                }
            })
            .then(() => {
                // Verificamos si la sucursal especificada existe.
                return db.execute('SELECT IDSucursal FROM Sucursal WHERE IDSucursal = ?', [this.NombreSucursal]);
            })
            .then(([rows]) => {
                if (rows.length > 0) {
                    const IDSucursal = rows[0].IDSucursal;
                    return db.execute(
                        'INSERT INTO usuarioSucursal(IDUsuario, IDSucursal) VALUES (?, ?)',
                        [IDUsuario, IDSucursal]
                   ).then(() => {
                    // Si el IDRol es igual a 2, insertar en Tarjeta y TarjetaSucursal
                    if (IDRol === 2) {
                        return db.execute(
                            'INSERT INTO Tarjeta(IDUsuario) VALUES (?)',
                            [IDUsuario]
                        )
                        .then(([result]) => {
                            const IDTarjeta = result.insertId;
                            return db.execute(
                                'INSERT INTO TarjetaSucursal(IDTarjeta, IDSucursal) VALUES (?, ?)',
                                [IDTarjeta, IDSucursal]
                            );
                        });
                    }
                });
            } else {
                throw new Error('La sucursal especificada no existe');
            }
        })
        .catch(error => console.log(error));
    } 

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM usuario');
    }

    // Método para buscar un usuario por número de teléfono.
    static fetchOneByTelefono(NumTelefono) {
        return db.execute('SELECT IDUsuario, NombreUsuario, Contrasenia FROM usuario WHERE NumTelefono = ?', [NumTelefono]);
    }

    // Método para buscar un usuario por ID.
    static fetchOneByID(IDUsuario) {
        return db.execute(`
            SELECT u.IDUsuario, u.NombreUsuario, u.NumTelefono, u.FechaNacimiento, u.Genero, u.Direccion, u.Ciudad, u.Estado, r.TipoRol
            FROM usuario u
            INNER JOIN UsuarioRol ur ON u.IDUsuario = ur.IDUsuario
            INNER JOIN Rol r ON ur.IDRol = r.IDRol
            WHERE u.IDUsuario = ?
        `, [IDUsuario]);
    }

    static fetch(IDUsuario) {
        if (IDUsuario) {
            return this.fetchOneByID(IDUsuario);
        } else {
            return this.fetchAll();
        }
    }


    // Método para obtener los privilegios de un usuario basados en su rol.
    static getPrivilegios(IDUsuario) {
        return db.execute(`
            SELECT Actividad as Privilegio 
            FROM usuario u
            JOIN usuariorol ur ON u.IDUsuario = ur.IDUsuario
            JOIN rol r ON ur.IDRol = r.IDRol
            JOIN rolprivilegio rp ON rp.IDRol = r.IDRol
            JOIN privilegio p ON rp.IDPrivilegio = p.IDPrivilegio
            WHERE u.IDUsuario = ?
        `, [IDUsuario]);
    }

    // Método para actualizar la contraseña de un usuario.
    static actualizarContrasena(IDUsuario, nuevaContrasenia) {
        return bcrypt.hash(nuevaContrasenia, 12)
            .then((Contrasenia_cifrada) => {
                return db.execute('UPDATE usuario SET Contrasenia = ? WHERE IDUsuario = ?', [Contrasenia_cifrada, IDUsuario]);
            })
            .catch(error => console.log(error));
    }

    // Método para actualizar los datos de un usuario.
    static update(IDUsuario, NombreUsuario, NumTelefono, FechaNacimiento, Genero, Direccion, Ciudad, Estado) {
        return db.execute(`
            UPDATE usuario 
            SET NombreUsuario = ?, NumTelefono = ?, FechaNacimiento = ?, Genero = ?, Direccion = ?, Ciudad = ?, Estado = ?
            WHERE IDUsuario = ?
        `, [NombreUsuario, NumTelefono, FechaNacimiento, Genero, Direccion, Ciudad, Estado, IDUsuario]);
    }

    // Método para actualizar el rol de un usuario.
    static updateRol(IDUsuario, IDRol) {
        return db.execute(`
            UPDATE usuarioRol 
            SET IDRol = ?
            WHERE IDUsuario = ?
        `, [IDRol, IDUsuario]);
    }

    // Método para obtener todos los roles disponibles.
    static fetchAllRoles() {
        return db.execute('SELECT * FROM Rol');
    }
 
    // Método para eliminar (de manera lógica) un usuario.
    static deleteUsuario(IDUsuario) {
        return db.execute('UPDATE usuario SET deleted_at = CURRENT_TIMESTAMP WHERE IDUsuario = ?', [IDUsuario]);
    }
};
