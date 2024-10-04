const db = require('../utils/database');

module.exports = class UserSucur{

	static fetchAll(){
            return db.execute(`
                SELECT * FROM Sucursal ;`);
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
    
}
