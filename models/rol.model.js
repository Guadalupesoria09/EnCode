const db = require('../utils/database');

module.exports = class Rol {

    constructor(miTipoRol, miActividad) {
        this.TipoRol = miTipoRol;
        this.Actividad = miActividad;
    }


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

    static fetchRolByID(IDRol){
        return db.execute(`
            SELECT * FROM rol
            WHERE IDRol = ?;
            `,
            [IDRol]
        )
    }

    static editarRol(IDRol) {
        return db.execute('UPDATE Rol SET TipoRol = ? WHERE IDRol = ?', [IDRol])
            .then(result => {
                if (result.affectedRows === 0) {
                    throw new Error('No se encontró el rol para actualizar');
                }
                return result;
            })
            .catch(error => {
                console.error('Error al editar el rol:', error);
                throw error;
            });
    }

    static editarPrivilegios(IDRol, actividades) {
        return db.execute('DELETE FROM RolPrivilegio WHERE IDRol = ?', [IDRol])
            .then(() => {
                const promises = actividades.map((actividad) => {
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
            .catch(error => {
                console.error('Error al editar los privilegios del rol:', error);
                throw error;
            });
    }
};
