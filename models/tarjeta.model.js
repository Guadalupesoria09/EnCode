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

}
