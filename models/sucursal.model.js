const db = require('../utils/database');

module.exports = class sucursal {

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
        'INSERT INTO Sucursal (Direccion, CP, Ciudad, Estado, NumSucursal, NombreSucursal) VALUES(?,?,?,?,?,?)'
	[this.Direccion, this.CP, this.Ciudad, this.Estado, this.NumSucursal, this.NombreSucursal]);
    }
}
