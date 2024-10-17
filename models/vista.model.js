const db = require('../utils/database');  // Importamos la conexión a la base de datos.

module.exports = class Vista {
    constructor(miNombre,miLogo, miColor, miFont, miIDSucursal) {
        // Inicializamos las propiedades de la clase con los datos de la tarjeta.
        this.nombreTarjeta = miNombre;
        this.Logo = miLogo;
        this.Color = miColor;
        this.Font = miFont;
        this.IDSucursal = miIDSucursal;
    }

    // Método para guardar datos en la tarjeta.
    save() {
        return db.execute(
            'INSERT INTO vista (nombreTarjeta, Logo, Color, Font, IDSucursal) VALUES(?, ?, ?, ?, ?)',
            [this.nombreTarjeta, this.Logo, this.Color, this.Font, this.IDSucursal]
        );
    }

    static fetchAll(){
        return db.execute('SELECT * FROM vista');
    }

    static fetchNumSucursal(IDsucursal){
        return db.execute(`SELECT
                            NumSucursal
                        FROM
                            sucursal s,
                            vista v
                        WHERE
                            s.IDSucursal = v.IDSucursal AND s.IDSucursal = ?`, [IDsucursal]);
    }
}
