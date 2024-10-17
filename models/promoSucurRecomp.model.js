const db = require('../utils/database');

module.exports = class promoSucurRecomp {
    constructor(miIDpromo, miIDrecomp, miIDsucur) {
        this.IDpromocion = miIDpromo;
        this.IDrecompensa = miIDrecomp;
        this.IDsucursal = miIDsucur;
    }

    save() {
        return db.execute(
            'INSERT INTO promocionsucursalrecompensa(IDPromocion, IDRecompensa, IDSucursal) VALUES(?,?,?)', 
            [this.IDpromocion, this.IDrecompensa, this.IDsucursal]);
    }

    static fetchAll() {
        return db.execute(
            `SELECT DISTINCT p.IDPromocion, NombrePromocion, FechaInicio, FechaCaducidad, Compra, Precio, Activo, deleted_at
            FROM promocionsucursalrecompensa pr, promocion p
            WHERE pr.IDPromocion = p.IDPromocion  AND deleted_at IS NULL`);
    }
    
    static fetchAllnombreR(idPromo) {
        return db.execute(
            `SELECT
                r.NombreRecompensa, pr.IDPromocion
            FROM
                promocionsucursalrecompensa pr
            INNER JOIN recompensa r ON
                pr.IDRecompensa = r.IDRecompensa
            WHERE
                pr.IDPromocion = ?`, [idPromo]
        );
    }

    static fetchPromoRecomp(idPromo){
        return db.execute(`SELECT DISTINCT p.IDPromocion, NombrePromocion, FechaInicio, FechaCaducidad, Compra, Precio, Activo
                FROM promocionsucursalrecompensa pr, promocion p WHERE pr.IDPromocion = p.IDPromocion 
                AND pr.IDPromocion = ?`, [idPromo]);

    }

    static fetchOne(IDpromorecomp) {
        return db.execute('SELECT * FROM promocionsucursalrecompensa WHERE IDPromocionSucurRecompensa = ?', [IDpromorecomp]);
    }
    
    static fetchIDPR(idPromo) {
        return db.execute('SELECT IDPromocionSucurRecompensa FROM promocionsucursalrecompensa WHERE IDPromocion = ?', [idPromo])
    }

    static fetch(IDpromorecomp) {
        if (IDpromorecomp) {
            return this.fetchOne(IDpromorecomp);
        } else {
            return this.fetchAll();
        }
    }
    
    static edit(idPromocion, idRecompensa) {
        return db.execute(`
            UPDATE promocionsucursalrecompensa SET IDRecompensa = ?
            WHERE IDPromocion = ?`, 
            [idRecompensa, idPromocion]);
    }

    static editSingleRelation(idpromocionsucursalrecompensa, nuevaIDRecompensa) {
        return db.execute(
            `UPDATE promocionsucursalrecompensa 
             SET IDRecompensa = ? 
             WHERE IDPromocionSucurRecompensa = ?`, 
            [nuevaIDRecompensa, idpromocionsucursalrecompensa] // Asegúrate de que ambos valores no sean undefined
        );
    }

    static fetchRecompensasActivas(){
        return db.execute(
	    `SELECT recompensa.NombreRecompensa, COUNT(recompensa.NombreRecompensa) AS Cantidad
                 FROM promocionsucursalrecompensa
                 JOIN recompensa ON promocionsucursalrecompensa.IDRecompensa = recompensa.IDRecompensa
                 GROUP BY recompensa.NombreRecompensa
                 ORDER BY Cantidad DESC
	    `);
    }

    
}
