const db = require('../utils/database');

module.exports = class Sucursal {

    constructor(miDireccion, miCP, miCiudad, miEstado, miNumSucursal, miNombreSucursal) {
        this.Direccion = miDireccion;
        this.CP = miCP;
        this.Ciudad = miCiudad;
        this.Estado = miEstado;
        this.NumSucursal = miNumSucursal;
        this.NombreSucursal = miNombreSucursal;
    }

    save(){
        return db.execute(
        'INSERT INTO Sucursal (Direccion, CP, Ciudad, Estado, NumSucursal, NombreSucursal) VALUES(?,?,?,?,?,?)',
	[this.Direccion, this.CP, this.Ciudad, this.Estado, this.NumSucursal, this.NombreSucursal]);
    }
   
    static editarSucursales(IDSucursal, Direccion, CP, Ciudad, Estado, NumSucursal, NombreSucursal) {
        return db.execute(
            'UPDATE Sucursal SET Direccion = ?, CP = ?, Ciudad = ?, Estado = ?, NumSucursal = ?, NombreSucursal = ? WHERE IDSucursal = ?',
            [Direccion, CP, Ciudad, Estado, NumSucursal, NombreSucursal, IDSucursal]
        );
    }
    

    static fetchSucursalByID (IDSucursal){
        return db.execute(`
            SELECT * From sucursal WHERE IDSucursal = ? `, [IDSucursal]
        );
    }

    static deleteSucursal(IDSucursal){
        return db.execute(`
            UPDATE sucursal 
            Set deleted_at = CURRENT_TIMESTAMP
            WHERE IDSucursal = ?`, [IDSucursal]);
    }
}
