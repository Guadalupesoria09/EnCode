const db = require('../utils/database');

module.exports = class Promociones {
     //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
     constructor(mi_nombrePromo, mi_fechaInicio, mi_fechaFin, mi_compra,mi_precio) {
        this.NombrePromocion = mi_nombrePromo;
        this.FechaInicio = mi_fechaInicio;
        this.FechaCaducidad = mi_fechaFin;
        this.compra = mi_compra;
        this.Precio = mi_precio;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(
        `INSERT INTO promocion(NombrePromocion, FechaInicio, FechaCaducidad, Compra, Precio) VALUES(?, ?, ?, ?, ?)`, 
        [this.NombrePromocion, this.FechaInicio, this.FechaCaducidad, this.compra, this.Precio]);
    }

    static fetchID() {
        return db.execute(
            `SELECT IDPromocion
            FROM promocion`);
    }

    static fetchIDPROMO(NombrePromocion) {
        return db.execute(
            `SELECT IDPromocion
            FROM promocion
            WHERE NombrePromocion = ?`, [NombrePromocion]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute(
            `SELECT *
            FROM promocion`);
    }

    static fetchOne(idPromocion) {
        return db.execute('SELECT * FROM promocion WHERE IDPromocion = ?', [idPromocion]);
    }
    
    static fetch(idPromocion) {
        if (idPromocion) {
            return this.fetchOne(idPromocion);
        } else {
            return this.fetchAll();
        }
    }

    static edit(idPromocion, nuevoNombrePromo, nuevoFechaInicio, nuevoFechaFin, nuevaCompra, nuevoPrecio) {
        return db.execute(`
            UPDATE promocion SET NombrePromocion = ?, FechaInicio = ?, FechaCaducidad = ?, Compra = ?, Precio = ?
            WHERE IDPromocion = ?`, 
            [nuevoNombrePromo, nuevoFechaInicio, nuevoFechaFin,nuevaCompra,nuevoPrecio, idPromocion]);
    }

    static deletePromo(idPromocion){
        return db.execute(`UPDATE promocion SET deleted_at = CURRENT_TIMESTAMP WHERE IDPromocion = ?`, [idPromocion]);
    };
    
}