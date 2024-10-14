// models/estadisticas.model.js

const db = require('../utils/database');

module.exports = class Estadisticas {

    // Método para obtener las estadísticas de compras por usuario
    static fetchComprasPorUsuario() {
        return db.execute(
            `SELECT IDUsuario, COUNT(IDSello) AS totalCompras
             FROM compra
             GROUP BY IDUsuario`
        );
    }
};
