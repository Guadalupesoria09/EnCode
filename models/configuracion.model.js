const db = require('../utils/database');

module.exports = class Rol {

    constructor(miTipoRol, miActividad){
        this.TipoRol = miTipoRol;
	this.Actividad= miActividad; 
    }
   
    save(){
	let IDRol;
        return db.execute(
	    'INSERT INTO Rol(TipoRol) VALUES (?,?)',
	    [this.TipoRol]
	)
	.then(([result]) => {
            IDRol = result.insertId;
	    return db.execute('SELECT IDPrivilegio FROM Privilegio WHERE Actividad = ?',[this.miActividad])
	})
        .then(([rows]) => {
            if (rows.length > 0) {
                const IDPrivilegio = rows[0].IDPrivilegio;
                return db.execute(
                    'INSERT INTO RolPrivilegios (IDRol, IDPrivilegio) VALUES (?, ?)',
                    [IDRol, IDPrivilegio]
                );
            } else {
                throw new Error('La actividad especificada no existe');
            }
        })
        .catch(error => console.log(error));
    }
