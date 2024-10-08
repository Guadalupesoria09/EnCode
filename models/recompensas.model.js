const db = require('../utils/database');

module.exports = class Recompensas {
    constructor(mi_recompensa) {
        this.NombreRecompensa = mi_recompensa;
    }

    save() {
        return db.execute(
            'INSERT INTO recompensa(NombreRecompensa) VALUES(?)', 
            [this.NombreRecompensa]);
    }

    static fetchAll() {
        return db.execute(
            `SELECT *
            FROM recompensa 
            WHERE deleted_at IS NULL`);
    }

    static fetchID(){
        return db.execute(
            `SELECT IDRecompensa
            FROM recompensa`);
    }

    static fetchOne(idRecompensa) {
        return db.execute('SELECT * FROM recompensa WHERE IDRecompensa = ?', [idRecompensa]);
    }
    
    static fetch(idRecompensa) {
        if (idRecompensa) {
            return this.fetchOne(idRecompensa);
        } else {
            return this.fetchAll();
        }
    }    

    static edit(idRecompensa, nuevoNombreRecomp) {
        return db.execute(`
            UPDATE recompensa SET NombreRecompensa = ?
            WHERE IDRecompensa = ?`, 
            [nuevoNombreRecomp, idRecompensa]);
    }

    static delete(idRecompensa){
        return db.execute(`UPDATE recompensa SET deleted_at = CURRENT_TIMESTAMP WHERE IDRecompensa = ?`, [idRecompensa]);
    }
}