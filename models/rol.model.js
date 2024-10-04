const db = require('../utils/database');

module.exports = class Rol {

    constructor(miTipoRol, miActividad){
        this.TipoRol = miTipoRol;
	this.Actividad= miActividad; 
    }
   
   save() {
    let IDRol;
    return db.execute(
        'INSERT INTO Rol(TipoRol) VALUES (?)',
        [this.TipoRol]
    )
    .then(([result]) => {
        IDRol = result.insertId;

        // Usa map para recorrer las actividades y ejecutar las consultas y las inserciones
        const promises = this.Actividad.map((actividad) => {
            return db.execute(
                'SELECT IDPrivilegio FROM Privilegio WHERE Actividad = ?',
                [actividad]
            )
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
            });
        });
        
        return Promise.all(promises);
    })
    .catch(error => {
        console.error(error);
        throw error;
    });
}
 
}
