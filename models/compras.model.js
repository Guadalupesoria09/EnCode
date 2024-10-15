const db = require('../utils/database');

module.exports = class Compra {

    // Método para obtener las compras por sucursal por usuario
    exports.getComprasSucursal = async (request, response) => {
        const { idSucursal } = request.query; // ID de la sucursal desde la URL

        try {
            const [comprasPorUsuario] = await Estadisticas.fetchComprasSucursal(idSucursal);
            response.json(comprasPorUsuario);
        } catch (error) {
            console.error('Error al obtener las compras por usuario en la sucursal:', error);
            response.status(500).json({ message: 'Error al obtener las compras por usuario en la sucursal' });
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

}

};


}
