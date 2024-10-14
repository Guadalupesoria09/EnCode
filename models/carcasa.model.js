const db = require('../utils/database');  // Importamos la conexión a la base de datos.

module.exports = class Carcasa {
    constructor(miNombre,miLogo, miColor, miFont,) {
        // Inicializamos las propiedades de la clase con los datos de la tarjeta.
        this.nombreTarjeta = miNombre;
        this.Logo = miLogo;
        this.Color = miColor;
        this.Font = miFont;
    }

    // Método para guardar datos en la tarjeta.
    save() {
        return db.execute(
            'INSERT INTO Carcasa (nombreTarjeta, Logo, Color, Font) VALUES(?, ?,?, ?)',
            [this.nombreTarjeta, this.Logo, this.Color, this.Font]
        );
    }

    static fetchAll(){
        return db.execute('SELECT * FROM Carcasa');
    }

}
