const db = require('../utils/database');

module.exports = class Privilegios {

    constructor(miTipoRol, miActividad) {
        this.TipoRol = miTipoRol;
        this.Actividad = miActividad;
    }

    static fetchAll(){
        return db.execute(`SELECT * FROM privilegio`);
    }
    
}