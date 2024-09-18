const db = require('../utils/database');

module.exports = class Promociones {
     //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
     constructor(mi_nombrePromo, mi_fechaInicio, mi_fechaFin, mi_valor, mi_estatus) {
        this.NombrePromocion = mi_nombrePromo;
        this.FechaInicio = mi_fechaInicio;
        this.FechaCaducidad = mi_fechaFin;
        this.Valor = mi_valor;
        this.Estatus = mi_estatus;
    }
    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(
            'INSERT INTO promocion(NombrePromocion, FechaInicio, FechaCaducidad, Valor, Estatus) VALUES(?, ?, ?, ?, ?)', 
            [this.NombrePromocion, this.FechaInicio, this.FechaCaducidad, this.Valor, this.Estatus]);
    }
    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute(
            `SELECT NombrePromocion, FechaInicio, FechaCaducidad, Valor, Estatus
            FROM promocion`);
    }
    static fetchOne(idPromocion) {
        return db.execute('SELECT * FROM ordenes WHERE IDPromocion = ?', [idPromocion]);
    }
    static fetch(idPromocion) {
        if (idPromocion) {
            return this.fetchOne(idPromocion);
        } else {
            return this.fetchAll();
        }
    }
}