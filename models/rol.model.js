const db = require('../utils/database');

module.exports = class Rol {
    constructor(miTipoRol) {
        this.TipoRol = miTipoRol;
    }

    // Save new role with assigned privileges
    async save(actividades) {
        try {
            const IDRol = await this.insertRol();
            await this.assignPrivileges(IDRol, actividades);
        } catch (error) {
            console.error('Error guardando rol y privilegios:', error);
            throw error;
        }
    }

    // Insert the role in the database
    async insertRol() {
        const [result] = await db.execute(
            'INSERT INTO rol (TipoRol) VALUES (?)',
            [this.TipoRol]
        );
        return result.insertId;
    }

    // Assign privileges to the role
    async assignPrivileges(IDRol, actividades) {
        const promises = actividades.map(async (IDPrivilegio) => {
            return await db.execute(
                'INSERT INTO rolprivilegio (IDRol, IDPrivilegio) VALUES (?, ?)',
                [IDRol, IDPrivilegio]
            );
        });
        return Promise.all(promises);
    }

    // Static method to edit an existing role and update its privileges
    static async editarRol(IDRol, nuevoNombre, actividades) {
        try {
            // Update role name
            await db.execute('UPDATE rol SET TipoRol = ? WHERE IDRol = ?', [nuevoNombre, IDRol]);

            // Remove old privileges
            await db.execute('DELETE FROM rolprivilegio WHERE IDRol = ?', [IDRol]);

            // Add new privileges
            const promises = actividades.map((IDPrivilegio) => {
                return db.execute(
                    'INSERT INTO rolprivilegio (IDRol, IDPrivilegio) VALUES (?, ?)',
                    [IDRol, IDPrivilegio]
                );
            });

            return Promise.all(promises);
        } catch (error) {
            console.error('Error actualizando rol y privilegios:', error);
            throw error;
        }
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
        return db.execute('UPDATE rol SET TipoRol = ? WHERE IDRol = ?', [IDRol])
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
        return db.execute('DELETE FROM rolprivilegio WHERE IDRol = ?', [IDRol])
            .then(() => {
                const promises = actividades.map((IDPrivilegio) => { // Cambia 'actividad' a 'IDPrivilegio'
                    return db.execute(
                        'INSERT INTO rolprivilegio (IDRol, IDPrivilegio) VALUES (?, ?)',
                        [IDRol, IDPrivilegio] // Aquí asegurándote de que se usa el IDPrivilegio
                    );
                });
                return Promise.all(promises);
            })
            .catch(error => {
                console.error('Error al editar los privilegios del rol:', error);
                throw error;
            });
    }
    
};
