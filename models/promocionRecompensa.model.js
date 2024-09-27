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
            `SELECT IDPromocion, IDRecompensa
            FROM promocionrecompensa`);
    }

    static fetchIDPromo(){
        return db.execute(
            `SELECT IDPromocion
            FROM promocionrecompensa`);
    }

    static fetchIDRecomp(){
        return db.execute(
            `SELECT IDRecompensa
            FROM promocionrecompensa`);
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

    static fetchOne(IDpromorecomp) {
        return db.execute('SELECT * FROM promocionrecompensa WHERE IDPromocionRecompensa = ?', [IDpromorecomp]);
    }
    
    static fetch(IDpromorecomp) {
        if (IDpromorecomp) {
            return this.fetchOne(IDpromorecomp);
        } else {
            return this.fetchAll();
        }
    }   
    
    static compare(idpromocion){
        return db.execute(`
            SELECT IDRecompensa 
            FROM promocionrecompensa pr INNER JOIN promocion p 
            WHERE pr.IDPromocion = p.IDPromocion = ?; 
            `
        )
    }
}