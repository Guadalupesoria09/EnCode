const db = require('../utils/database');

module.exports = class rolPriv {  
    
    static fetchAll (){
        return db.execute(
	    'SELECT * FROM Rol;');
    }

    static fetchPrivilegios(IDRol){
        return db.execute(`
            SELECT Privilegio.Actividad
	    FROM RolPrivilegios
	    INNER JOIN Privilegio ON RolPrivilegios.IDPrivilegio = Privilegio.IDPrivilegio
	    WHERE RolPrivilegio.IDRol = ?`,[IDRol])
    }

    static fetchActividades(){
        return db.execute(
        'Select Privilegio.Actividad FROM Privilegio;');
    }
    

}
