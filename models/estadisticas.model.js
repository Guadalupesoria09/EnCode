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


    // Método para obtener las estadisticas de las promociones activas y las compras generadas
    static fetchPromocionesActivas() {
        return db.execute(
           `SELECT NombrePromocion, Compra
            FROM promocion
            WHERE Activo = 1`
        );
    }


    // Método para obtener el conteo de reclamos por promoción
    static fetchReclamosPorPromocion() {
        return db.execute(
            `SELECT IDPromocion, COUNT(IDReclamo) AS totalReclamos
             FROM reclama
             GROUP BY IDPromocion`
        );
    }


    // Método para obtener la cantidad de recompensas reclamadas asociadas a cada promoción
    static fetchRecompensaReclamadaPorPromocion() {
        return db.execute(
            `SELECT p.NombrePromocion AS Promocion, COUNT(r.IDReclamo) AS TotalReclamaciones
             FROM Reclama r
             JOIN Promocion p ON r.IDPromocion = p.IDPromocion
             GROUP BY p.NombrePromocion`
            );
        }

};