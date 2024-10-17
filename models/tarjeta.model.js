const db = require('../utils/database');  // Importamos la conexión a la base de datos.

module.exports = class Tarjeta {
    constructor(miLimite, miVigencia) {
        // Inicializamos las propiedades de la clase con los datos de la tarjeta.
        this.Limite = miLimite;
        this.CP = miVigencia;
    }

    // Método para guardar datos en la tarjeta.
    save() {
        return db.execute(
            'INSERT INTO Tarjeta (Limite, Vigenica) VALUES(?,?)',
            [this.Limite, this.Vigencia]
        );
    }

    static fetchTarjetaDueno(){
        return db.execute(
            `SELECT 
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
                 AND IDSucursal = 1
                 LIMIT 1;`
	)
    } 

}
