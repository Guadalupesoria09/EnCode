const db = require('../utils/database');  // Importamos la conexión a la base de datos.

module.exports = class Sucursal {
    constructor(miDireccion, miCP, miCiudad, miEstado, miNumSucursal, miNombreSucursal) {
        // Inicializamos las propiedades de la clase con los datos de la sucursal.
        this.Direccion = miDireccion;
        this.CP = miCP;
        this.Ciudad = miCiudad;
        this.Estado = miEstado;
        this.NumSucursal = miNumSucursal;
        this.NombreSucursal = miNombreSucursal;
    }

    // Método para guardar una nueva sucursal en la base de datos.
    save() {
        return db.execute(
            'INSERT INTO Sucursal (Direccion, CP, Ciudad, Estado, NumSucursal, NombreSucursal) VALUES(?,?,?,?,?,?)',
            [this.Direccion, this.CP, this.Ciudad, this.Estado, this.NumSucursal, this.NombreSucursal]
        );
    }

    // Método estático para editar una sucursal existente.
    static editarSucursales(IDSucursal, Direccion, CP, Ciudad, Estado, NumSucursal, NombreSucursal) {
        return db.execute(
            'UPDATE Sucursal SET Direccion = ?, CP = ?, Ciudad = ?, Estado = ?, NumSucursal = ?, NombreSucursal = ? WHERE IDSucursal = ?',
            [Direccion, CP, Ciudad, Estado, NumSucursal, NombreSucursal, IDSucursal]
        );
    }

    // Método estático para obtener una sucursal por su ID.
    static fetchSucursalByID(IDSucursal) {
        return db.execute(
            'SELECT * FROM sucursal WHERE IDSucursal = ?',
            [IDSucursal]
        );
    }

    // Método estático para "eliminar" una sucursal estableciendo la marca de tiempo de eliminación.
    static deleteSucursal(IDSucursal) {
        return db.execute(
            'UPDATE sucursal SET deleted_at = CURRENT_TIMESTAMP WHERE IDSucursal = ?',
            [IDSucursal]
        );
    }
};
