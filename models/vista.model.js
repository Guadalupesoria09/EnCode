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

    static fetchNumSucursal(IDvista){
        return db.execute(
            `SELECT
                NumSucursal
            FROM
                vista v
            INNER JOIN sucursal s ON
                v.IDSucursal = s.IDSucursal
            WHERE
                 v.IDVista = ?`, [ IDvista]);
    }

    static fetchNameSucursal(IDvista){
        return db.execute(
            `SELECT
                NombreSucursal
            FROM
                vista v
            INNER JOIN sucursal s ON
                v.IDSucursal = s.IDSucursal
            WHERE
                 v.IDVista = ?`, [ IDvista]);
    }

    static fetchVISTA(IDvista){
        return db.execute(
            `SELECT
                IDVista, nombreTarjeta, Logo, Color, Font, NombreSucursal, NumSucursal
            FROM
                vista v
            INNER JOIN sucursal s ON
                v.IDSucursal = s.IDSucursal
            WHERE
                v.IDVista = ?`, [ IDvista]);
    }
}
