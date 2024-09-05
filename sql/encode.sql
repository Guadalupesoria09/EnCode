create database EnCode;
use EnCode;

CREATE TABLE Usuario(
IDUsuario INT NOT NULL AUTO_INCREMENT,
NombreUsuario VARCHAR(50),
NumTelefono VARCHAR(12),
FechaNacimiento DATE,
Contrasenia VARCHAR (20),
Genero VARCHAR (20),
Direccion VARCHAR (100),
PRIMARY KEY (IDUsuario)
);

INSERT INTO Usuario(IDUsuario, NombreUsuario, NumTelefono, FechaNacimiento, Contrasenia, Genero, Direccion)
 VALUES
(1, 'Daniel', '1234567890', '1988-02-22', 'dani', 'Masculino', 'Calle 1, Ciudad A'),
(2, 'Lupita', '1234567891', '1999-02-28', 'lupis', 'Femenino', 'Calle 2, Ciudad B'),
(3, 'Neto', '1234567892', '1998-04-10', 'neto', 'Masculino', 'Calle 3, Ciudad C'),
(4, 'Kate', '1234567893', '2001-05-05', 'kate', 'Femenino', 'Calle 4, Ciudad D'),
(5, 'JuanMa', '1234567894', '2002-10-07', 'admin1', 'Masculino', 'Calle 5, Ciudad E'),
(6, 'Carlos', '1234567895', '2003-05-07', 'admin2', 'Masculino', 'Calle 6, Ciudad F'),
(7, 'Ana García', '1234567896', '1990-01-01', 'ana1990', 'Femenino', 'Calle 7, Ciudad G'),
(8, 'Miguel Pérez', '1234567897', '1990-02-02', 'miguel1991', 'Masculino', 'Calle 8, Ciudad H'),
(9, 'Laura Rodríguez', '1234567898', '1992-03-03', 'laura1992', 'Femenino', 'Calle 9, Ciudad I'),
(10, 'David Hernández', '1234567899', '1991-04-04', 'david1993', 'Masculino', 'Calle 10, Ciudad J'),
(11, 'María López', '1234567800', '1994-05-05', 'maria1994', 'Femenino', 'Calle 11, Ciudad K'),
(12, 'Carlos Sánchez', '1234567801', '1995-06-06', 'carlos1995', 'Masculino', 'Calle 12, Ciudad L'),
(13, 'Andrea Gómez', '1234567802', '1992-07-07', 'andrea1996', 'Femenino', 'Calle 13, Ciudad M'),
(14, 'Luis Martínez', '1234567803', '1992-08-08', 'luis1997', 'Masculino', 'Calle 14, Ciudad N'),
(15, 'Paula Fernández', '1234567804', '1991-09-09', 'paula1998', 'Femenino', 'Calle 15, Ciudad O'),
(16, 'José Ramírez', '1234567805', '1999-10-10', 'jose1999', 'Masculino', 'Calle 16, Ciudad P'),
(17, 'Elena Torres', '1234567806', '2000-11-11', 'elena2000', 'Femenino', 'Calle 17, Ciudad Q'),
(18, 'Diego Morales', '1234567807', '2000-12-12', 'diego2001', 'Masculino', 'Calle 18, Ciudad R'),
(19, 'Isabel Romero', '1234567808', '2000-01-13', 'isabel2002', 'Femenino', 'Calle 19, Ciudad S'),
(20, 'Sergio Vázquez', '1234567809', '2001-02-14', 'sergio2003', 'Masculino', 'Calle 20, Ciudad T'),
(21, 'Lucía Domínguez', '1234567810', '2001-03-15', 'lucia2004', 'Femenino', 'Calle 21, Ciudad U'),
(22, 'Jorge Gil', '1234567811', '2001-04-16', 'jorge2005', 'Masculino', 'Calle 22, Ciudad V'),
(23, 'Raquel Ortega', '1234567812', '2002-05-17', 'raquel2006', 'Femenino', 'Calle 23, Ciudad W'),
(24, 'Ignacio Rivas', '1234567813', '2002-06-18', 'ignacio2007', 'Masculino', 'Calle 24, Ciudad X'),
(25, 'Carmen Ruiz', '1234567814', '2002-07-19', 'carmen2008', 'Femenino', 'Calle 25, Ciudad Y'),
(26, 'Fernando Navarro', '1234567815', '2002-08-20', 'fernando2009', 'Masculino', 'Calle 26, Ciudad Z'),
(27, 'Marta Castro', '1234567816', '2002-09-21', 'marta2010', 'Femenino', 'Calle 27, Ciudad AA'),
(28, 'Alberto Medina', '1234567817', '2002-10-22', 'alberto2011', 'Masculino', 'Calle 28, Ciudad AB'),
(29, 'Silvia Paredes', '1234567818', '2002-11-23', 'silvia2012', 'Femenino', 'Calle 29, Ciudad AC'),
(30, 'Gustavo Aguirre', '1234567819', '2003-12-24', 'gustavo2013', 'Masculino', 'Calle 30, Ciudad AD'),
(31, 'Beatriz Cabrera', '1234567820', '2003-01-25', 'beatriz2014', 'Femenino', 'Calle 31, Ciudad AE'),
(32, 'Rodrigo Campos', '1234567821', '2005-02-26', 'rodrigo2015', 'Masculino', 'Calle 32, Ciudad AF'),
(33, 'Natalia Vega', '1234567822', '2006-03-27', 'natalia2016', 'Femenino', 'Calle 33, Ciudad AG'),
(34, 'Vicente Herrera', '1234567823', '2007-04-28', 'vicente2017', 'Masculino', 'Calle 34, Ciudad AH'),
(35, 'Sara Escobar', '1234567824', '2006-05-29', 'sara2018', 'Femenino', 'Calle 35, Ciudad AI'),
(36, 'Ricardo Márquez', '1234567825', '2004-06-30', 'ricardo2019', 'Masculino', 'Calle 36, Ciudad AJ'),
(37, 'Pilar León', '1234567826', '2003-07-30', 'pilar2020', 'Femenino', 'Calle 37, Ciudad AK'),
(38, 'Héctor Solís', '1234567827', '2002-08-01', 'hector2021', 'Masculino', 'Calle 38, Ciudad AL'),
(39, 'Alicia Méndez', '1234567828', '2005-09-02', 'alicia2022', 'Femenino', 'Calle 39, Ciudad AM'),
(40, 'Esteban Jiménez', '1234567829', '2006-10-03', 'esteban2023', 'Masculino', 'Calle 40, Ciudad AN'),
(41, 'Verónica Peña', '1234567830', '2006-11-04', 'veronica2024', 'Femenino', 'Calle 41, Ciudad AO'),
(42, 'Andrés Roldán', '1234567831', '2007-12-05', 'andres2025', 'Masculino', 'Calle 42, Ciudad AP'),
(43, 'Rosa Ibáñez', '1234567832', '2006-01-06', 'rosa2026', 'Femenino', 'Calle 43, Ciudad AQ'),
(44, 'Tomás Serrano', '1234567833', '2007-02-07', 'tomas2027', 'Masculino', 'Calle 44, Ciudad AR'),
(45, 'Carolina Ruiz', '1234567834', '2008-03-08', 'carolina2028', 'Femenino', 'Calle 45, Ciudad AS'),
(46, 'Guillermo Sosa', '1234567835', '2009-04-09', 'guillermo2029', 'Masculino', 'Calle 46, Ciudad AT'),
(47, 'Mónica Ponce', '1234567836', '2008-05-10', 'monica2030', 'Femenino', 'Calle 47, Ciudad AU'),
(48, 'Adrián Molina', '1234567837', '2009-06-11', 'adrian2031', 'Masculino', 'Calle 48, Ciudad AV'),
(49, 'Patricia Cano', '1234567838', '2007-07-12', 'patricia2032', 'Femenino', 'Calle 49, Ciudad AW'),
(50, 'Enrique Núñez', '1234567839', '2008-08-13', 'enrique2033', 'Masculino', 'Calle 50, Ciudad AX'),
(51, 'Laura Fernández', '1234567840', '2009-09-14', 'laura2034', 'Femenino', 'Calle 51, Ciudad AY'),
(52, 'Oscar Ríos', '1234567841', '2007-10-15', 'oscar2035', 'Masculino', 'Calle 52, Ciudad AZ'),
(53, 'Estela Garza', '1234567842', '2008-11-16', 'estela2036', 'Femenino', 'Calle 53, Ciudad BA'),
(54, 'Jorge Santos', '1234567843', '2009-12-17', 'jorge2037', 'Masculino', 'Calle 54, Ciudad BB'),
(55, 'Carla Vargas', '1234567844', '2007-01-18', 'carla2038', 'Femenino', 'Calle 55, Ciudad BC'),
(56, 'Luis Gómez', '1234567845', '2008-02-19', 'luis2039', 'Masculino', 'Calle 56, Ciudad BD'),
(57, 'Ana Martínez', '1234567846', '2009-03-20', 'ana2040', 'Femenino', 'Calle 57, Ciudad BE'),
(58, 'Fernando Méndez', '1234567847', '2007-04-21', 'fernando2041', 'Masculino', 'Calle 58, Ciudad BF'),
(59, 'Gabriela Ríos', '1234567848', '2008-05-22', 'gabriela2042', 'Femenino', 'Calle 59, Ciudad BG'),
(60, 'Eduardo Navarro', '1234567849', '2009-06-23', 'eduardo2043', 'Masculino', 'Calle 60, Ciudad BH'),
(61, 'Isabel Pérez', '1234567850', '2008-07-24', 'isabel2044', 'Femenino', 'Calle 61, Ciudad BI'),
(62, 'Mario Ruiz', '1234567851', '2007-08-25', 'mario2045', 'Masculino', 'Calle 62, Ciudad BJ'),
(63, 'Elena Ramírez', '1234567852', '2009-09-26', 'elena2046', 'Femenino', 'Calle 63, Ciudad BK'),
(64, 'Julio Gutiérrez', '1234567853', '2008-10-27', 'julio2047', 'Masculino', 'Calle 64, Ciudad BL'),
(65, 'Patricia Martínez', '1234567854', '2009-11-28', 'patricia2048', 'Femenino', 'Calle 65, Ciudad BM'),
(66, 'Ricardo López', '1234567855', '2007-12-29', 'ricardo2049', 'Masculino', 'Calle 66, Ciudad BN'),
(67, 'Lucía Torres', '1234567856', '2008-01-30', 'lucia2050', 'Femenino', 'Calle 67, Ciudad BO'),
(68, 'Tomás Fernández', '1234567857', '2009-02-28','tomas2051', 'Masculino', 'Calle 68, Ciudad BP'),
(69, 'Raquel Gálvez', '1234567858', '2007-03-01', 'raquel2052', 'Femenino', 'Calle 69, Ciudad BQ'),
(70, 'Esteban Jiménez', '1234567859', '2008-04-02', 'esteban2053', 'Masculino', 'Calle 70, Ciudad BR'),
(71, 'Verónica Núñez', '1234567860', '2007-05-03', 'veronica2054', 'Femenino', 'Calle 71, Ciudad BS'),
(72, 'Enrique Vázquez', '1234567861', '2008-06-04', 'enrique2055', 'Masculino', 'Calle 72, Ciudad BT'),
(73, 'Beatriz Ortega', '1234567862', '2009-07-05', 'beatriz2056', 'Femenino', 'Calle 73, Ciudad BU'),
(74, 'Roberto López', '1234567863', '2007-08-06', 'roberto2057', 'Masculino', 'Calle 74, Ciudad BV'),
(75, 'Marta González', '1234567864', '2008-09-07', 'marta2058', 'Femenino', 'Calle 75, Ciudad BW'),
(76, 'Álvaro Castro', '1234567865', '2009-10-08', 'alvaro2059', 'Masculino', 'Calle 76, Ciudad BX'),
(77, 'Claudia Pérez', '1234567866', '2007-11-09', 'claudia2060', 'Femenino', 'Calle 77, Ciudad BY'),
(78, 'Pablo Fernández', '1234567867', '2008-12-10', 'pablo2061', 'Masculino', 'Calle 78, Ciudad BZ'),
(79, 'Ana Romero', '1234567868', '2009-01-11', 'ana2062', 'Femenino', 'Calle 79, Ciudad CA'),
(80, 'Luis Martínez', '1234567869', '2007-02-12', 'luis2063', 'Masculino', 'Calle 80, Ciudad CB'),
(81, 'Elena Navarro', '1234567870', '2008-03-13', 'elena2064', 'Femenino', 'Calle 81, Ciudad CC'),
(82, 'Mario Jiménez', '1234567871', '2009-04-14', 'mario2065', 'Masculino', 'Calle 82, Ciudad CD'),
(83, 'Paola Gutiérrez', '1234567872', '2007-05-15', 'paola2066', 'Femenino', 'Calle 83, Ciudad CE'),
(84, 'Ignacio Ramírez', '1234567873', '2008-06-16', 'ignacio2067', 'Masculino', 'Calle 84, Ciudad CF'),
(85, 'Lucía Hernández', '1234567874', '2009-07-17', 'lucia2068', 'Femenino', 'Calle 85, Ciudad CG'),
(86, 'Sergio Torres', '1234567875', '2007-08-18', 'sergio2069', 'Masculino', 'Calle 86, Ciudad CH'),
(87, 'Carmen Díaz', '1234567876', '2008-09-19', 'carmen2070', 'Femenino', 'Calle 87, Ciudad CI'),
(88, 'Jorge Ruiz', '1234567877', '2009-10-20', 'jorge2071', 'Masculino', 'Calle 88, Ciudad CJ'),
(89, 'Verónica Rodríguez', '1234567878', '2007-11-21', 'veronica2072', 'Femenino', 'Calle 89, Ciudad CK'),
(90, 'Carlos López', '1234567879', '2008-12-22', 'carlos2073', 'Masculino', 'Calle 90, Ciudad CL'),
(91, 'Elena Romero', '1234567880', '2007-01-23', 'elena2074', 'Femenino', 'Calle 91, Ciudad CM'),
(92, 'Fernando González', '1234567881', '2008-02-24', 'fernando2075', 'Masculino', 'Calle 92, Ciudad CN'),
(93, 'María Fernández', '1234567882', '2009-03-25', 'maria2076', 'Femenino', 'Calle 93, Ciudad CO'),
(94, 'Luis Castro', '1234567883', '2007-04-26', 'luis2077', 'Masculino', 'Calle 94, Ciudad CP'),
(95, 'Laura Méndez', '1234567884', '2008-05-27', 'laura2078', 'Femenino', 'Calle 95, Ciudad CQ'),
(96, 'Miguel Suárez', '1234567885', '2009-06-28', 'miguel2079', 'Masculino', 'Calle 96, Ciudad CR'),
(97, 'Andrea Delgado', '1234567886', '2007-07-29', 'andrea2080', 'Femenino', 'Calle 97, Ciudad CS'),
(98, 'Javier Molina', '1234567887', '2008-08-30', 'javier2081', 'Masculino', 'Calle 98, Ciudad CT'),
(99, 'Ana Gómez', '1234567888', '2009-09-28','ana2082', 'Femenino', 'Calle 99, Ciudad CU'),
(100, 'Diego Herrera', '1234567889', '2007-10-01', 'diego2083', 'Masculino', 'Calle 100, Ciudad CV');

CREATE TABLE Promocion(
IDPromocion INT NOT NULL AUTO_INCREMENT,
NombrePromocion VARCHAR(100),
FechaInicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FechaCaducidad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
Estatus VARCHAR (20),
PRIMARY KEY (IDPromocion)
);

INSERT INTO Promocion(IDPromocion,NombrePromocion, Fechainicio,FechaCaducidad,Estatus) 
VALUES
(1, 'chilaquiles sencillos salsa verde y café', '2024-01-01', '2024-01-30', 'Activo'),
(2, 'chilaquiles sencillos salsa roja y café', '2024-10-01', '2024-10-30', 'Activo'),
(3, 'chilaquiles sencillos salsa mole y café', '2024-01-01', '2024-01-30', 'Activo'),
(4, 'chilaquiles sencillos salsa morita y café', '2024-03-01', '2024-04-30', 'Activo'),
(5, 'chilaquiles con proteína con pollo y café', '2024-03-01', '2024-03-30', 'Activo'),
(6, 'chilaquiles con proteína con huevo estrellado y café', '2024-01-01', '2024-02-28', 'Activo'),
(7, 'chilaquiles con proteína con huevo revuelto y café', '2024-06-01', '2024-08-30', 'Activo');

CREATE TABLE Recompensa(
IDRecompensa INT NOT NULL AUTO_INCREMENT,
NombreRecompensa VARCHAR(50),
PRIMARY KEY (IDRecompensa)
);

INSERT INTO Recompensa(IDRecompensa, NombreRecompensa)
VALUES
(1, 'chilaquiles sencillos salsa verde'),
(2, 'chilaquiles sencillos salsa roja'),
(3, 'chilaquiles sencillos salsa mole'),
(4, 'chilaquiles sencillos salsa morita'),
(5, 'chilaquiles sencillos salsa habanera'),
(6, 'chilaquiles c/ proteína pollo'),
(7, 'chilaquiles c/ proteína huevo estrellado'),
(8, 'chilaquiles c/ proteína huevo revuelto'),
(9, 'Café americano'),
(10, 'Refresco coca cola'),
(11, 'Refresco fanta naranja'),
(12, 'Refresco sprite'),
(13, 'Refresco sidral mundet manzana'),
(14, 'Refresco fresca toronja'),
(15, 'Brownie de Chocolate'),
(16, 'Mousse de Fresa'),
(17, 'Mousse de Durazno'),
(18, 'Carlota de Limón'),
(19, 'Torta de Chilaquiles c/ proteína, pollo'),
(20, 'Torta de Chilaquiles c/ proteína, huevo estrellado'),
(21, 'Torta de Chilaquiles c/ proteína, huevo revuelto'),
(22, 'Torta de Chilaquiles c/ proteína, salsa verde'),
(23, 'Torta de Chilaquiles c/ proteína, salsa roja'),
(24, 'Torta de Chilaquiles c/ proteína, salsa mole'),
(25, 'Torta de Chilaquiles c/ proteína, salsa morita'),
(26, 'Torta de Chilaquiles c/ proteína, salsa habanera');


CREATE TABLE Reclama(
IDReclamo INT NOT NULL AUTO_INCREMENT,
IDUsuario INT NOT NULL,
IDPromocion INT NOT NULL,
FechaReclamo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (IDReclamo),
FOREIGN KEY (IDUsuario) REFERENCES Usuario (IDUsuario),
FOREIGN KEY (IDPromocion) REFERENCES Promocion (IDPromocion)
);

INSERT INTO Reclama(IDReclamo, IDUsuario, IDPromocion, FechaReclamo)
VALUES
(1,7,1, '2001-03-20');

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

INSERT INTO Sucursal(IDSucursal, Direccion,CP,Ciudad, Estado, NumSucursal, NombreSucursal)
VALUES 
(1, 'Calle Benito Juárez Nte. 127, Centro', '76000','Santiago de Querétaro','Qro.','524421234567', 'Chilako');

CREATE TABLE Rol(
IDRol INT NOT NULL AUTO_INCREMENT,
TipoRol VARCHAR(100),
PRIMARY KEY (IDRol)
);

INSERT INTO Rol (IDRol, TipoRol)
VALUES
(1, 'Administrador'),
(2, 'Dueño'),
(3, 'Empleado');

CREATE TABLE Privilegio(
IDPrivilegio INT NOT NULL AUTO_INCREMENT,
Actividad VARCHAR(100),
PRIMARY KEY (IDPrivilegio)
);

INSERT INTO Privilegio(IDPrivilegio, Actividad)
VALUES
(1, 'registrar usuario'),
(2, 'eliminar usuario'),
(3, 'crear promoción'),
(4, 'eliminar promoción'),
(5, 'modificar promoción'),
(6, 'cambiar estatus de promoción'),
(7, 'registrar recompensa'),
(8, 'eliminar recompensa'),
(9, 'modificar recompensa'),
(10, 'consultar estadísticas'),
(11, 'asignar rol'),
(12, 'modificar rol'),
(13, 'eliminar rol'),
(14, 'ver tarjeta de cliente'),
(15, 'editar tarjeta'),
(16, 'asignar fecha vencimiento tarjeta'),
(17, 'consultar sellos asignados por empleado'),
(18, 'registrar dueño'),
(19, 'modificar dueño'),
(20, 'eliminar dueño'),
(21, 'registrar sucursal'),
(22, 'modificar sucursal'),
(23, 'eliminar sucursal');

CREATE TABLE Tarjeta(
IDTarjeta INT NOT NULL AUTO_INCREMENT,
IDUsuario INT NOT NULL,
NumAsociado VARCHAR(12),
NumSellos INT,
LimiteSellos INT,
PRIMARY KEY (IDTarjeta),
FOREIGN KEY (IDUsuario) references Usuario (IDUsuario)
);

INSERT INTO Tarjeta(IDTarjeta, IDUsuario, NumAsociado, NumSellos,LimiteSellos)
VALUES
(1,5,'524421263947', 8, 20);

CREATE TABLE UsuarioRol(
IDUsuarioRol INT NOT NULL AUTO_INCREMENT,
IDUsuario INT NOT NULL,
IDRol INT NOT NULL,
PRIMARY KEY (IDUsuarioRol),
FOREIGN KEY (IDUsuario) REFERENCES Usuario (IDUsuario),
FOREIGN KEY (IDRol) REFERENCES Rol (IDRol)
);

INSERT INTO UsuarioRol(IDUsuarioRol, IDUsuario, IDRol)
VALUES
(1,1,1),
(2,2,1),
(3,3,1),
(4,4,1),
(5,5,2),
(6,6,2);

CREATE TABLE RolPrivilegios(
IDRolPrivilegios INT NOT NULL AUTO_INCREMENT,
IDPrivilegio INT NOT NULL,
IDRol INT NOT NULL,
PRIMARY KEY (IDRolPrivilegios),
FOREIGN KEY (IDPrivilegio) REFERENCES Privilegio (IDPrivilegio),
FOREIGN KEY (IDRol) REFERENCES Rol (IDRol)
);

INSERT INTO RolPrivilegios(IDRolPrivilegios, IDPrivilegio, IDRol)
VALUES
(1,1,1),
(2,1,2),
(3,1,3),
(4,1,2),
(5,1,1),
(6,1,1),
(7,1,2),
(8,1,3),
(9,1,1),
(10,1,1),
(11,1,1),
(12,1,2),
(13,1,1),
(14,1,1),
(15,1,1),
(16,1,1),
(17,1,1),
(18,2,1),
(19,2,2),
(20,2,3),
(21,2,2),
(22,2,2),
(23,2,2),
(24,2,3),
(25,2,3),
(26,2,3),
(27,2,1),
(28,2,1),
(29,2,2),
(30,2,3),
(31,2,1),
(32,2,1),
(33,2,1),
(34,2,2),
(35,2,3),
(36,2,1),
(37,2,2),
(38,2,1),
(39,2,2);

CREATE TABLE PromocionRecompensa(
IDPromocionRecompensa INT NOT NULL AUTO_INCREMENT,
IDPromocion INT NOT NULL,
IDRecompensa INT NOT NULL,
PRIMARY KEY (IDPromocionRecompensa),
FOREIGN KEY (IDPromocion) REFERENCES Promocion (IDPromocion),
FOREIGN KEY (IDRecompensa) REFERENCES Recompensa (IDRecompensa)
);

INSERT INTO PromocionRecompensa(IDPromocionRecompensa, IDPromocion, IDRecompensa)
VALUES
(1,1,1),
(2,1,9),
(3,2,2),
(4,2,9),
(5,3,3),
(6,3,9),
(7,4,4),
(8,4,9),
(9,5,6),
(10,5,9),
(11,6,7),
(12,6,9),
(13,7,8),
(14,7,9);

CREATE TABLE Pertenece(
IDPertenece INT NOT NULL AUTO_INCREMENT,
IDUsuario INT NOT NULL,
IDSucursal INT NOT NULL,
PRIMARY KEY (IDPertenece),
FOREIGN KEY (IDUsuario) REFERENCES Usuario (IDUsuario),
FOREIGN KEY (IDSucursal) REFERENCES Sucursal (IDSucursal)
);

INSERT INTO Pertenece(IDPertenece, IDUsuario, IDSucursal)
VALUES
(1,5,1),
(2,6,1);

CREATE TABLE Asignado(
IDAsignado INT NOT NULL AUTO_INCREMENT,
IDSucursal INT NOT NULL,
IDPromocion INT NOT NULL,
PRIMARY KEY (IDAsignado),
FOREIGN KEY (IDSucursal) REFERENCES Sucursal (IDSucursal),
FOREIGN KEY (IDPromocion) REFERENCES Promocion(IDPromocion)
);

INSERT INTO Asignado(IDAsignado, IDSucursal, IDPromocion)
VALUES
(1,1,1),
(2,1,2),
(3,1,3),
(4,1,4),
(5,1,5),
(6,1,6),
(7,1,7);


CREATE TABLE TarjetaSucursal(
IDTarjetaSucursal INT NOT NULL AUTO_INCREMENT,
IDSucursal INT NOT NULL,
IDTarjeta INT NOT NULL,
PRIMARY KEY (IDTarjetaSucursal),
FOREIGN KEY (IDSucursal) REFERENCES Sucursal (IDSucursal),
FOREIGN KEY (IDTarjeta) REFERENCES Tarjeta (IDTarjeta)
);

INSERT INTO TarjetaSucursal(IDTarjetaSucursal,IDSucursal, IDTarjeta)
VALUES
(1,1,1);

CREATE TABLE Sello(
IDSello INT NOT NULL AUTO_INCREMENT,
IDTarjeta INT NOT NULL,
IDUsuario INT NOT NULL,
FechaSello TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (IDSello),
FOREIGN KEY (IDTarjeta) REFERENCES Tarjeta (IDTarjeta),
FOREIGN KEY (IDUsuario) REFERENCES Usuario (IDUsuario)
);

INSERT INTO Sello(IDSello, IDTarjeta, IDUsuario, FechaSello)
VALUES
(1,1,1,'2001-05-25');