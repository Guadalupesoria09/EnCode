// models/estadisticas.model.js

const db = require('../utils/database');

class Estadisticas {

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

    
    // Método para obtener la cantidad de compras por un usuario en una sucursal
    static fetchComprasSucursal(idSucursal) {
        return db.execute(
            `SELECT u.NombreUsuario, COUNT(c.IDSello) AS TotalCompras
             FROM compra c
             JOIN tarjeta t ON c.IDTarjeta = t.IDTarjeta
             JOIN tarjetaSucursal ts ON t.IDTarjeta = ts.IDTarjeta
             JOIN usuario u ON c.IDUsuario = u.IDUsuario
             WHERE ts.IDSucursal = ?
             GROUP BY u.NombreUsuario`,  [idSucursal]
            );
        }    

        // Método para obtener la cantidad de reclamos de promociones por usuario en una sucursal
    static fetchReclamoPromoSucursal(idSucursal) {
        return db.execute(
            `SELECT u.NombreUsuario, COUNT(r.IDReclamo) AS TotalReclamos
             FROM reclama r
             JOIN promocion p ON r.IDPromocion = p.IDPromocion
             JOIN promocionSucursal ps ON p.IDPromocion = ps.IDPromocion
             JOIN usuario u ON r.IDUsuario = u.IDUsuario
             WHERE ps.IDSucursal = ?
             GROUP BY u.NombreUsuario`,  [idSucursal]
            );
        }  
        
        
        // Método para obtener ventas totales por mes en una sucursal
    static fetchVentasPorMes(idSucursal) {
        return db.execute(
            `SELECT MONTH(c.FechaSello) AS Mes, COUNT(c.IDSello) AS TotalVentas
             FROM compra c
             JOIN tarjetaSucursal ts ON c.IDTarjeta = ts.IDTarjeta
             WHERE ts.IDSucursal = ?
             GROUP BY MONTH(c.FechaSello)`, [idSucursal]
            );
        }  

        // Método para obtener promociones activas en una sucursal
    static fetchPromoSucursal(idSucursal) {
        return db.execute(
            `SELECT p.NombrePromocion, p.FechaInicio, p.FechaCaducidad
             FROM promocion p
             JOIN promocionSucursal ps ON p.IDPromocion = ps.IDPromocion
             WHERE ps.IDSucursal = ?
             AND p.Activo = 1`,  [idSucursal]
        );
    }
}

module.exports = Estadisticas;