const db = require('../utils/database');

module.exports = class Rol {
    /**
     * Crea una instancia de la clase Rol.
     * @param {string} miTipoRol - El tipo de rol.
     * @param {Array} miActividad - Lista de actividades asociadas al rol.
     */
    constructor(miTipoRol, miActividad) {
        this.TipoRol = miTipoRol;
        this.Actividad = miActividad;
    }

    /**
     * Guarda el rol y sus privilegios asociados en la base de datos.
     * @returns {Promise} Promesa que se resuelve cuando las inserciones se completen.
     */
    save() {
        let IDRol;
        return db.execute(
            'INSERT INTO Rol(TipoRol) VALUES (?)',
            [this.TipoRol]
        )
            .then(([result]) => {
                IDRol = result.insertId;

                // Usar map para recorrer las actividades y ejecutar las consultas e inserciones
                const promises = this.Actividad.map((actividad) => {
                    return db.execute(
                        'SELECT IDPrivilegio FROM Privilegio WHERE Actividad = ?',
                        [actividad]
                    )
                        .then(([rows]) => {
                            if (rows.length > 0) {
                                const IDPrivilegio = rows[0].IDPrivilegio;
                                return db.execute(
                                    'INSERT INTO RolPrivilegio (IDRol, IDPrivilegio) VALUES (?, ?)',
                                    [IDRol, IDPrivilegio]
                                );
                            } else {
                                throw new Error('La actividad especificada no existe');
                            }
                        });
                });

                return Promise.all(promises);
            })
            .catch((error) => {
                console.error('Error al guardar el rol y sus privilegios:', error);
                throw error;
            });
    }
};
