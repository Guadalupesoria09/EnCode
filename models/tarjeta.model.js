const db = require('../utils/database');  // Importamos la conexión a la base de datos.

module.exports = class Tarjeta {
    constructor(miLimite, miVigencia) {
        // Inicializamos las propiedades de la clase con los datos de la tarjeta.
	this.Limite = miLimite;
        this.CP = miVigencia;
    }

    // Método para guardar datos en la tarjeta.
    static editParametros(IDTarjeta, Limite, Vigencia) {
        return db.execute(
            `UPDATE tarjeta SET Limite = ?, Vigencia = ? WHERE IDTarjeta = ?;`,
            [Limite, Vigencia, IDTarjeta]);
    }

    static fetchTarjetaDueno(IDSucursal){
        return db.execute(
            `SELECT
	         tarjeta.IDTarjeta,
                 tarjeta.IDUsuario,
                 tarjeta.Limite,
                 tarjeta.Vigencia,
                 tarjeta.IDSucursal,
                 usuariorol.IDRol
             FROM
                 tarjeta
             INNER JOIN usuariorol ON tarjeta.IDUsuario = usuariorol.IDUsuario
             WHERE 
                 IDRol = 2 
                 AND IDSucursal = ?
                 LIMIT 1;`,[IDSucursal]);
    } 

}
