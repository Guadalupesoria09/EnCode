const db = require('../utils/database');

module.exports = class Compra {

    // Método para obtener la cantidad de compras por un usuario en una sucursal
    static fetchComprasSucursal(idSucursal) {
        return db.execute(
            `SELECT u.NombreUsuario, COUNT(c.IDSello) AS TotalCompras
             FROM compra c
             JOIN tarjeta t ON c.IDTarjeta = t.IDTarjeta
             JOIN tarjetasucursal ts ON t.IDTarjeta = ts.IDTarjeta
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
             JOIN promocionsucursal ps ON p.IDPromocion = ps.IDPromocion
             JOIN usuario u ON r.IDUsuario = u.IDUsuario
             WHERE ps.IDSucursal = ?
             GROUP BY u.NombreUsuario`,  [idSucursal]);
    }

}


