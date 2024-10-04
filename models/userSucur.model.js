const db = require('../utils/database');

module.exports = class UserSucur{

	static fetchAll(){
        return db.execute(`
            SELECT * FROM Sucursal ;`);
	}

    static fetchAllUsuario(IDSucursal){
        return db.execute(`
            SELECT DISTINCT NombreUsuario, NumTelefono, FechaNacimiento, Contrasenia, Genero, Direccion, Ciudad, TipoRol,
            Estado
            FROM usuario u, pertenece p, rol r, usuariorol ur
            WHERE p.IDUsuario = u.IDUsuario AND IDSucursal = ? AND u.IDUsuario = ur.IDUsuario AND ur.IDRol = r.IDRol` ,[IDSucursal]) 
    }
    
	static fetchDuenos(IDSucursal){
        return db.execute(`
            SELECT  Usuario.NombreUsuario, Rol.TipoRol
            FROM Pertenece
            INNER JOIN Usuario ON Pertenece.IDUsuario = Usuario.IDUsuario
            INNER JOIN UsuarioRol ON Usuario.IDUsuario = UsuarioRol.IDUsuario
            INNER JOIN Rol ON UsuarioRol.IDRol = Rol.IDRol
            WHERE Rol.TipoRol = 'Dueño' AND Pertenece.IDSucursal = ?`,[IDSucursal]); 

	}
 
    save(){
        return db.execute(
	        'INSERT INTO Pertenece(IDUsuario, IDSucursal VALUES (?,?)', [IDUsuario, IDSucursal]);
	}

}
