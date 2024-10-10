create database EnCode;
use EnCode;

CREATE TABLE Usuario(
IDUsuario INT NOT NULL AUTO_INCREMENT,
NombreUsuario VARCHAR(50),
NumTelefono VARCHAR(12),
FechaNacimiento DATE,
Contrasenia VARCHAR (400),
Genero VARCHAR (20),
Direccion VARCHAR (100),
Ciudad VARCHAR (50),
Estado VARCHAR (30),
PRIMARY KEY (IDUsuario)
);

CREATE TABLE Promocion (
IDPromocion INT NOT NULL AUTO_INCREMENT,
NombrePromocion VARCHAR(100),
FechaInicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FechaCaducidad TIMESTAMP,
Valor INT NOT NULL,
Estatus VARCHAR(20),
PRIMARY KEY (IDPromocion)
);


CREATE TABLE Recompensa(
IDRecompensa INT NOT NULL AUTO_INCREMENT,
NombreRecompensa VARCHAR(50),
PRIMARY KEY (IDRecompensa)
);

CREATE TABLE Reclama(
IDReclamo INT NOT NULL AUTO_INCREMENT,
IDUsuario INT NOT NULL,
IDPromocion INT NOT NULL,
FechaReclamo TIMESTAMP,
PRIMARY KEY (IDReclamo),
FOREIGN KEY (IDUsuario) REFERENCES Usuario (IDUsuario),
FOREIGN KEY (IDPromocion) REFERENCES Promocion (IDPromocion)
);

CREATE TABLE Sucursal(
IDSucursal INT NOT NULL AUTO_INCREMENT,
Direccion VARCHAR(100),
CP VARCHAR (5),
Ciudad VARCHAR (50),
Estado VARCHAR (50),
NumSucursal Varchar (12),
NombreSucursal VARCHAR(50),
PRIMARY KEY (IDSucursal)
);

CREATE TABLE Rol(
IDRol INT NOT NULL AUTO_INCREMENT,
TipoRol VARCHAR(100),
PRIMARY KEY (IDRol)
);

CREATE TABLE Privilegio(
IDPrivilegio INT NOT NULL AUTO_INCREMENT,
Actividad VARCHAR(100),
PRIMARY KEY (IDPrivilegio)
);

CREATE TABLE Tarjeta(
IDTarjeta INT NOT NULL AUTO_INCREMENT,
IDUsuario INT NOT NULL,
SellosTotal INT NOT NULL,
SellosActual INT NOT NULL,
PRIMARY KEY (IDTarjeta),
FOREIGN KEY (IDUsuario) references Usuario (IDUsuario)
);

CREATE TABLE UsuarioRol(
IDUsuarioRol INT NOT NULL AUTO_INCREMENT,
IDUsuario INT NOT NULL,
IDRol INT NOT NULL,
PRIMARY KEY (IDUsuarioRol),
FOREIGN KEY (IDUsuario) REFERENCES Usuario (IDUsuario),
FOREIGN KEY (IDRol) REFERENCES Rol (IDRol)
);

CREATE TABLE RolPrivilegios(
IDRolPrivilegios INT NOT NULL AUTO_INCREMENT,
IDPrivilegio INT NOT NULL,
IDRol INT NOT NULL,
PRIMARY KEY (IDRolPrivilegios),
FOREIGN KEY (IDPrivilegio) REFERENCES Privilegio (IDPrivilegio),
FOREIGN KEY (IDRol) REFERENCES Rol (IDRol)
);

CREATE TABLE PromocionRecompensa(
IDPromocionRecompensa INT NOT NULL AUTO_INCREMENT,
IDPromocion INT NOT NULL,
IDRecompensa INT NOT NULL,
PRIMARY KEY (IDPromocionRecompensa),
FOREIGN KEY (IDPromocion) REFERENCES Promocion (IDPromocion),
FOREIGN KEY (IDRecompensa) REFERENCES Recompensa (IDRecompensa)
);

CREATE TABLE Pertenece(
IDPertenece INT NOT NULL AUTO_INCREMENT,
IDUsuario INT NOT NULL,
IDSucursal INT NOT NULL,
PRIMARY KEY (IDPertenece),
FOREIGN KEY (IDUsuario) REFERENCES Usuario (IDUsuario),
FOREIGN KEY (IDSucursal) REFERENCES Sucursal (IDSucursal)
);

CREATE TABLE Asignado(
IDAsignado INT NOT NULL AUTO_INCREMENT,
IDSucursal INT NOT NULL,
IDPromocion INT NOT NULL,
PRIMARY KEY (IDAsignado),
FOREIGN KEY (IDSucursal) REFERENCES Sucursal (IDSucursal),
FOREIGN KEY (IDPromocion) REFERENCES Promocion(IDPromocion)
);

CREATE TABLE TarjetaSucursal(
IDTarjetaSucursal INT NOT NULL AUTO_INCREMENT,
IDSucursal INT NOT NULL,
IDTarjeta INT NOT NULL,
PRIMARY KEY (IDTarjetaSucursal),
FOREIGN KEY (IDSucursal) REFERENCES Sucursal (IDSucursal),
FOREIGN KEY (IDTarjeta) REFERENCES Tarjeta (IDTarjeta)
);

CREATE TABLE Sello(
IDSello INT NOT NULL AUTO_INCREMENT,
IDTarjeta INT NOT NULL,
IDUsuario INT NOT NULL,
FechaSello TIMESTAMP,
PRIMARY KEY (IDSello),
FOREIGN KEY (IDTarjeta) REFERENCES Tarjeta (IDTarjeta),
FOREIGN KEY (IDUsuario) REFERENCES Usuario (IDUsuario)
);
