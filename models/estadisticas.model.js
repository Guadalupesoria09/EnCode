// models/estadisticas.model.js
const db = require('../utils/database'); 

module.exports = class Estadisticas {

    constructor(fechaSello, totalSellos) {
        this.fechaSello = fechaSello;
        this.totalSellos = totalSellos;
    }

    // Método para obtener el total de sellos asignados por día
    static fetchSellosPorDia() {
        return db.execute(`
            SELECT DATE(FechaSello) AS dia, COUNT(*) AS total_sellos
            FROM sello
            GROUP BY dia
            ORDER BY dia ASC
        `);
    }

    // Método para obtener el total de sellos en general
    static fetchTotalSellos() {
        return db.execute(`
            SELECT COUNT(*) AS total_sellos
            FROM sello
        `);
    }

}

  