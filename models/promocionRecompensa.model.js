const db = require('../utils/database');

module.exports = class promoRecomp {
    constructor(miIDpromo, miIDrecomp) {
        this.IDpromocion = miIDpromo;
        this.IDrecompensa = miIDrecomp;
    }

    save() {
        return db.execute(
            'INSERT INTO promocionrecompensa(IDPromocion, IDRecompensa) VALUES(?,?)', 
            [this.IDpromocion, this.IDrecompensa]);
    }

    static fetchAll() {
        return db.execute(
            `SELECT DISTINCT p.IDPromocion, NombrePromocion, FechaInicio, FechaCaducidad, Estatus, Valor
            FROM promocionrecompensa pr, promocion p
            WHERE pr.IDPromocion = p.IDPromocion`);
    }
    
    static fetchAllnombreR(idPromo) {
        return db.execute(
            `SELECT
                r.NombreRecompensa, pr.IDPromocion
            FROM
                promocionrecompensa pr
            INNER JOIN recompensa r ON
                pr.IDRecompensa = r.IDRecompensa
            WHERE
                pr.IDPromocion = ?`, [idPromo]
        );
    }

    static fetchPromoRecomp(idPromo){
        return db.execute(`SELECT p.IDPromocion, NombrePromocion, FechaInicio, FechaCaducidad, Estatus, Valor
                            FROM promocionrecompensa pr, promocion p
                            WHERE pr.IDPromocion = ?`, [idPromo]);

    }

    static fetchOne(IDpromorecomp) {
        return db.execute('SELECT * FROM promocionrecompensa WHERE IDPromocionRecompensa = ?', [IDpromorecomp]);
    }
    
    static fetchIDPR(idPromo) {
        return db.execute('SELECT IDPromocionRecompensa FROM promocionrecompensa WHERE IDPromocion = ?', [idPromo])
    }

    static fetch(IDpromorecomp) {
        if (IDpromorecomp) {
            return this.fetchOne(IDpromorecomp);
        } else {
            return this.fetchAll();
        }
    }   

    static deletePromo(idPromorecomp){
        return db.execute(`DELETE FROM promocionrecompensa WHERE promocionrecompensa.IDPromocionRecompensa = ?`, [idPromorecomp]);
    }
}