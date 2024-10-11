-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 09, 2024 at 01:24 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `encode_prueba`
--

-- --------------------------------------------------------

--
-- Table structure for table `compra`
--

CREATE TABLE `compra` (
  `IDSello` int(11) NOT NULL,
  `IDTarjeta` int(11) NOT NULL,
  `IDUsuario` int(11) NOT NULL,
  `FechaSello` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `compra`
--

INSERT INTO `compra` (`IDSello`, `IDTarjeta`, `IDUsuario`, `FechaSello`) VALUES
(1, 1, 34, '2024-01-01 06:00:00'),
(2, 1, 45, '2024-01-02 06:00:00'),
(3, 1, 48, '2024-01-03 06:00:00'),
(4, 1, 34, '2024-01-04 06:00:00'),
(5, 1, 45, '2024-01-05 06:00:00'),
(6, 1, 48, '2024-01-06 06:00:00'),
(7, 1, 34, '2024-01-07 06:00:00'),
(8, 1, 45, '2024-01-08 06:00:00'),
(9, 1, 48, '2024-01-09 06:00:00'),
(10, 1, 34, '2024-01-10 06:00:00'),
(11, 1, 45, '2024-01-11 06:00:00'),
(12, 1, 48, '2024-01-12 06:00:00'),
(13, 1, 34, '2024-01-13 06:00:00'),
(14, 1, 45, '2024-01-14 06:00:00'),
(15, 1, 48, '2024-01-15 06:00:00'),
(16, 1, 34, '2024-01-16 06:00:00'),
(17, 1, 45, '2024-01-17 06:00:00'),
(18, 2, 48, '2024-01-01 06:00:00'),
(19, 2, 34, '2024-01-02 06:00:00'),
(20, 2, 45, '2024-01-03 06:00:00'),
(21, 2, 48, '2024-01-04 06:00:00'),
(22, 2, 34, '2024-01-05 06:00:00'),
(23, 2, 45, '2024-01-06 06:00:00'),
(24, 2, 48, '2024-01-07 06:00:00'),
(25, 2, 34, '2024-01-08 06:00:00'),
(26, 2, 45, '2024-01-09 06:00:00'),
(27, 2, 48, '2024-01-10 06:00:00'),
(28, 2, 34, '2024-01-11 06:00:00'),
(29, 2, 45, '2024-01-12 06:00:00'),
(30, 2, 48, '2024-01-13 06:00:00'),
(31, 3, 34, '2024-01-01 06:00:00'),
(32, 3, 45, '2024-01-02 06:00:00'),
(33, 3, 48, '2024-01-03 06:00:00'),
(34, 3, 34, '2024-01-04 06:00:00'),
(35, 3, 45, '2024-01-05 06:00:00'),
(36, 4, 48, '2024-01-01 06:00:00'),
(37, 4, 34, '2024-01-02 06:00:00'),
(38, 4, 45, '2024-01-03 06:00:00'),
(39, 4, 48, '2024-01-04 06:00:00'),
(40, 4, 34, '2024-01-05 06:00:00'),
(41, 4, 45, '2024-01-06 06:00:00'),
(42, 4, 48, '2024-01-07 06:00:00'),
(43, 4, 34, '2024-01-08 06:00:00'),
(44, 4, 45, '2024-01-09 06:00:00'),
(45, 4, 48, '2024-01-10 06:00:00'),
(46, 5, 34, '2024-01-01 06:00:00'),
(47, 5, 45, '2024-01-02 06:00:00'),
(48, 5, 48, '2024-01-03 06:00:00'),
(49, 5, 34, '2024-01-04 06:00:00'),
(50, 5, 45, '2024-01-05 06:00:00'),
(51, 5, 48, '2024-01-06 06:00:00'),
(52, 5, 34, '2024-01-07 06:00:00'),
(53, 5, 45, '2024-01-08 06:00:00'),
(54, 5, 48, '2024-01-09 06:00:00'),
(55, 5, 34, '2024-01-10 06:00:00'),
(56, 5, 45, '2024-01-11 06:00:00'),
(57, 5, 48, '2024-01-12 06:00:00'),
(58, 5, 34, '2024-01-13 06:00:00'),
(59, 5, 45, '2024-01-14 06:00:00'),
(60, 5, 48, '2024-01-15 06:00:00'),
(61, 5, 34, '2024-01-16 06:00:00'),
(62, 5, 45, '2024-01-17 06:00:00'),
(63, 5, 48, '2024-01-18 06:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `privilegio`
--

CREATE TABLE `privilegio` (
  `IDPrivilegio` int(11) NOT NULL,
  `Actividad` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `privilegio`
--

INSERT INTO `privilegio` (`IDPrivilegio`, `Actividad`) VALUES
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

-- --------------------------------------------------------

--
-- Table structure for table `promocion`
--

CREATE TABLE `promocion` (
  `IDPromocion` int(11) NOT NULL,
  `NombrePromocion` varchar(100) DEFAULT NULL,
  `FechaInicio` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `FechaCaducidad` timestamp NOT NULL DEFAULT current_timestamp(),
  `Compra` int(11) NOT NULL,
  `Precio` float DEFAULT NULL,
  `Tarjeta` int(11) NOT NULL,
  `Activo` tinyint(1) NOT NULL DEFAULT 1,
  `deleted_at` timestamp(1) NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `promocion`
--

INSERT INTO `promocion` (`IDPromocion`, `NombrePromocion`, `FechaInicio`, `FechaCaducidad`, `Compra`, `Precio`, `Tarjeta`, `Activo`, `deleted_at`) VALUES
(1, 'chilaquiles sencillos salsa verde y café', '2024-01-01 06:00:00', '2024-01-30 06:00:00', 3, 0, 0, 1, NULL),
(2, 'chilaquiles sencillos salsa roja y café', '2024-10-01 06:00:00', '2024-10-30 06:00:00', 5, 0, 0, 1, NULL),
(3, 'chilaquiles sencillos salsa mole y café', '2024-01-01 06:00:00', '2024-01-30 06:00:00', 8, 0, 0, 1, NULL),
(4, 'chilaquiles sencillos salsa morita y café', '2024-03-01 06:00:00', '2024-04-30 06:00:00', 10, 150, 0, 1, NULL),
(5, 'chilaquiles con proteína con pollo y café', '2024-03-01 06:00:00', '2024-03-30 06:00:00', 4, 0, 1, 1, NULL),
(6, 'chilaquiles con proteína con huevo estrellado y café', '2024-01-01 06:00:00', '2024-02-28 06:00:00', 9, 100, 2, 1, NULL),
(7, 'chilaquiles con proteína con huevo revuelto y café', '2024-06-01 06:00:00', '2024-08-30 06:00:00', 10, 250, 3, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `promocionRecompensa`
--

CREATE TABLE `promocionRecompensa` (
  `IDPromocionRecompensa` int(11) NOT NULL,
  `IDPromocion` int(11) NOT NULL,
  `IDRecompensa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `promocionRecompensa`
--

INSERT INTO `promocionRecompensa` (`IDPromocionRecompensa`, `IDPromocion`, `IDRecompensa`) VALUES
(1, 1, 1),
(2, 1, 9),
(3, 2, 2),
(4, 2, 9),
(5, 3, 3),
(6, 3, 9),
(7, 4, 4),
(8, 4, 9),
(9, 5, 6),
(10, 5, 9),
(11, 6, 7),
(12, 6, 9),
(13, 7, 8),
(14, 7, 9);

-- --------------------------------------------------------

--
-- Table structure for table `promocionSucursal`
--

CREATE TABLE `promocionSucursal` (
  `IDPromocionSucursal` int(11) NOT NULL,
  `IDSucursal` int(11) NOT NULL,
  `IDPromocion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `promocionSucursal`
--

INSERT INTO `promocionSucursal` (`IDPromocionSucursal`, `IDSucursal`, `IDPromocion`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7);

-- --------------------------------------------------------

--
-- Table structure for table `reclama`
--

CREATE TABLE `reclama` (
  `IDReclamo` int(11) NOT NULL,
  `IDUsuario` int(11) NOT NULL,
  `IDPromocion` int(11) NOT NULL,
  `FechaReclamo` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reclama`
--

INSERT INTO `reclama` (`IDReclamo`, `IDUsuario`, `IDPromocion`, `FechaReclamo`) VALUES
(1, 7, 1, '2024-01-02 06:00:00'),
(2, 8, 1, '2024-01-02 06:00:00'),
(3, 9, 1, '2024-01-02 06:00:00'),
(4, 10, 1, '2024-01-02 06:00:00'),
(5, 11, 1, '2024-01-02 06:00:00'),
(6, 7, 2, '2024-01-03 06:00:00'),
(7, 8, 2, '2024-01-03 06:00:00'),
(8, 9, 2, '2024-01-03 06:00:00'),
(9, 10, 2, '2024-01-03 06:00:00'),
(10, 11, 2, '2024-01-03 06:00:00'),
(11, 7, 3, '2024-01-05 06:00:00'),
(12, 8, 3, '2024-01-05 06:00:00'),
(13, 9, 3, '2024-01-05 06:00:00'),
(14, 10, 3, '2024-01-05 06:00:00'),
(15, 11, 3, '2024-01-05 06:00:00'),
(16, 7, 4, '2024-01-07 06:00:00'),
(17, 8, 4, '2024-01-07 06:00:00'),
(18, 10, 4, '2024-01-07 06:00:00'),
(19, 11, 4, '2024-01-07 06:00:00'),
(20, 7, 5, '2024-01-11 06:00:00'),
(21, 8, 5, '2024-01-11 06:00:00'),
(22, 11, 5, '2024-01-11 06:00:00'),
(23, 7, 6, '2024-01-13 06:00:00'),
(24, 8, 6, '2024-01-13 06:00:00'),
(25, 11, 6, '2024-01-13 06:00:00'),
(26, 7, 7, '2024-01-17 06:00:00'),
(27, 11, 7, '2024-01-17 06:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `recompensa`
--

CREATE TABLE `recompensa` (
  `IDRecompensa` int(11) NOT NULL,
  `NombreRecompensa` varchar(50) DEFAULT NULL,
  `deleted_at` timestamp(1) NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recompensa`
--

INSERT INTO `recompensa` (`IDRecompensa`, `NombreRecompensa`, `deleted_at`) VALUES
(1, 'chilaquiles sencillos salsa verde', NULL),
(2, 'chilaquiles sencillos salsa roja', NULL),
(3, 'chilaquiles sencillos salsa mole', NULL),
(4, 'chilaquiles sencillos salsa morita', NULL),
(5, 'chilaquiles sencillos salsa habanera', NULL),
(6, 'chilaquiles c/ proteína pollo', NULL),
(7, 'chilaquiles c/ proteína huevo estrellado', NULL),
(8, 'chilaquiles c/ proteína huevo revuelto', NULL),
(9, 'Café americano', NULL),
(10, 'Refresco coca cola', NULL),
(11, 'Refresco fanta naranja', NULL),
(12, 'Refresco sprite', NULL),
(13, 'Refresco sidral mundet manzana', NULL),
(14, 'Refresco fresca toronja', NULL),
(15, 'Brownie de Chocolate', NULL),
(16, 'Mousse de Fresa', NULL),
(17, 'Mousse de Durazno', NULL),
(18, 'Carlota de Limón', NULL),
(19, 'Torta de Chilaquiles c/ proteína, pollo', NULL),
(20, 'Torta de Chilaquiles c/ proteína, huevo estrellado', NULL),
(21, 'Torta de Chilaquiles c/ proteína, huevo revuelto', NULL),
(22, 'Torta de Chilaquiles c/ proteína, salsa verde', NULL),
(23, 'Torta de Chilaquiles c/ proteína, salsa roja', NULL),
(24, 'Torta de Chilaquiles c/ proteína, salsa mole', NULL),
(25, 'Torta de Chilaquiles c/ proteína, salsa morita', NULL),
(26, 'Torta de Chilaquiles c/ proteína, salsa habanera', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rol`
--

CREATE TABLE `rol` (
  `IDRol` int(11) NOT NULL,
  `TipoRol` varchar(100) DEFAULT NULL,
  `deleted_at` timestamp(1) NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rol`
--

INSERT INTO `rol` (`IDRol`, `TipoRol`, `deleted_at`) VALUES
(1, 'Administrador', NULL),
(2, 'Dueño', NULL),
(3, 'Empleado', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rolPrivilegio`
--

CREATE TABLE `rolPrivilegio` (
  `IDRolPrivilegio` int(11) NOT NULL,
  `IDPrivilegio` int(11) NOT NULL,
  `IDRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rolPrivilegio`
--

INSERT INTO `rolPrivilegio` (`IDRolPrivilegio`, `IDPrivilegio`, `IDRol`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1),
(6, 6, 1),
(7, 7, 1),
(8, 8, 1),
(9, 9, 1),
(10, 10, 1),
(11, 11, 1),
(12, 12, 1),
(13, 13, 1),
(14, 14, 1),
(15, 15, 1),
(16, 16, 1),
(17, 17, 1),
(18, 1, 2),
(19, 2, 2),
(20, 3, 2),
(21, 4, 2),
(22, 5, 2),
(23, 6, 2),
(24, 7, 2),
(25, 8, 2),
(26, 9, 2),
(27, 10, 2),
(28, 11, 2),
(29, 12, 2),
(30, 13, 2),
(31, 14, 2),
(32, 15, 2),
(33, 16, 2),
(34, 17, 2),
(35, 18, 2),
(36, 19, 2),
(37, 20, 2),
(38, 21, 2),
(39, 22, 2),
(40, 23, 2);

-- --------------------------------------------------------

--
-- Table structure for table `sucursal`
--

CREATE TABLE `sucursal` (
  `IDSucursal` int(11) NOT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  `CP` varchar(5) DEFAULT NULL,
  `Ciudad` varchar(50) DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  `NumSucursal` varchar(12) DEFAULT NULL,
  `NombreSucursal` varchar(50) DEFAULT NULL,
  `deleted_at` timestamp(1) NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sucursal`
--

INSERT INTO `sucursal` (`IDSucursal`, `Direccion`, `CP`, `Ciudad`, `Estado`, `NumSucursal`, `NombreSucursal`, `deleted_at`) VALUES
(1, 'Calle Benito Juárez Nte. 127, Centro', '76000', 'Santiago de Querétaro', 'Querétaro', '524421234567', 'Chilako', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tarjeta`
--

CREATE TABLE `tarjeta` (
  `IDTarjeta` int(11) NOT NULL,
  `IDUsuario` int(11) NOT NULL,
  `SellosTotal` int(11) NOT NULL,
  `SellosActual` int(11) NOT NULL,
  `Limite` int(11) NOT NULL,
  `color` varchar(200) DEFAULT NULL,
  `background` varchar(200) DEFAULT NULL,
  `font` varchar(200) DEFAULT NULL,
  `Actual` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tarjeta`
--

INSERT INTO `tarjeta` (`IDTarjeta`, `IDUsuario`, `SellosTotal`, `SellosActual`, `Limite`, `color`, `background`, `font`, `Actual`) VALUES
(1, 7, 17, 37, 10, NULL, NULL, NULL, 1),
(2, 8, 13, 13, 10, NULL, NULL, NULL, 1),
(3, 9, 5, 5, 10, NULL, NULL, NULL, 1),
(4, 10, 10, 10, 10, NULL, NULL, NULL, 1),
(5, 11, 18, 18, 10, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tarjetaSucursal`
--

CREATE TABLE `tarjetaSucursal` (
  `IDTarjetaSucursal` int(11) NOT NULL,
  `IDSucursal` int(11) NOT NULL,
  `IDTarjeta` int(11) NOT NULL,
  `Actual` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tarjetaSucursal`
--

INSERT INTO `tarjetaSucursal` (`IDTarjetaSucursal`, `IDSucursal`, `IDTarjeta`, `Actual`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 1),
(3, 1, 3, 1),
(4, 1, 4, 1),
(5, 1, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `IDUsuario` int(11) NOT NULL,
  `NombreUsuario` varchar(50) DEFAULT NULL,
  `NumTelefono` varchar(12) DEFAULT NULL,
  `FechaNacimiento` date DEFAULT NULL,
  `Contrasenia` varchar(400) DEFAULT NULL,
  `Genero` varchar(20) DEFAULT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  `Ciudad` varchar(50) DEFAULT NULL,
  `Estado` varchar(30) DEFAULT NULL,
  `deleted_at` timestamp(1) NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`IDUsuario`, `NombreUsuario`, `NumTelefono`, `FechaNacimiento`, `Contrasenia`, `Genero`, `Direccion`, `Ciudad`, `Estado`, `deleted_at`) VALUES
(1, 'Daniel', '1234567890', NULL, 'dani', NULL, 'Calle 1', 'Querétaro', 'Querétaro', NULL),
(2, 'Lupita', '1234567891', NULL, 'lupis', NULL, 'Calle 2', 'Querétaro', 'Querétaro', NULL),
(3, 'Neto', '1234567892', NULL, 'neto', NULL, 'Calle 3', 'Querétaro', 'Querétaro', NULL),
(4, 'Kate', '1234567893', NULL, 'kate', NULL, 'Calle 4', 'Querétaro', 'Querétaro', NULL),
(5, 'JuanMa', '1234567894', NULL, 'admin1', NULL, 'Calle 5', 'Querétaro', 'Querétaro', NULL),
(6, 'Carlos', '1234567895', NULL, 'admin2', NULL, 'Calle 6', 'Querétaro', 'Querétaro', NULL),
(7, 'Ana García', '1234567896', '1950-01-01', NULL, NULL, 'Calle 7', 'Querétaro', 'Querétaro', NULL),
(8, 'Miguel Pérez', '1234567897', '1951-02-02', NULL, NULL, 'Calle 8', 'Querétaro', 'Querétaro', NULL),
(9, 'Laura Rodríguez', '1234567898', '1952-03-03', NULL, NULL, 'Calle 9', 'Querétaro', 'Querétaro', NULL),
(10, 'David Hernández', '1234567899', '1953-04-04', NULL, NULL, 'Calle 10', 'Querétaro', 'Querétaro', NULL),
(11, 'María López', '1234567800', '1954-05-05', NULL, NULL, 'Calle 11', 'Querétaro', 'Querétaro', NULL),
(12, 'Carlos Sánchez', '1234567801', '1955-06-06', NULL, NULL, 'Calle 12', 'Querétaro', 'Querétaro', NULL),
(13, 'Andrea Gómez', '1234567802', '1956-07-07', NULL, NULL, 'Calle 13', 'Querétaro', 'Querétaro', NULL),
(14, 'Luis Martínez', '1234567803', '1957-08-08', NULL, NULL, 'Calle 14', 'Querétaro', 'Querétaro', NULL),
(15, 'Paula Fernández', '1234567804', '1958-09-09', NULL, NULL, 'Calle 15', 'Querétaro', 'Querétaro', NULL),
(16, 'José Ramírez', '1234567805', '1959-10-10', NULL, NULL, 'Calle 16', 'Querétaro', 'Querétaro', NULL),
(17, 'Elena Torres', '1234567806', '1960-11-11', NULL, NULL, 'Calle 17', 'Querétaro', 'Querétaro', NULL),
(18, 'Diego Morales', '1234567807', '1961-12-12', NULL, NULL, 'Calle 18', 'Querétaro', 'Querétaro', NULL),
(19, 'Isabel Romero', '1234567808', '1962-01-13', NULL, NULL, 'Calle 19', 'Querétaro', 'Querétaro', NULL),
(20, 'Sergio Vázquez', '1234567809', '1963-02-14', NULL, NULL, 'Calle 20', 'Querétaro', 'Querétaro', NULL),
(21, 'Lucía Domínguez', '1234567810', '1964-03-15', NULL, NULL, 'Calle 21', 'Querétaro', 'Querétaro', NULL),
(22, 'Jorge Gil', '1234567811', '1965-04-16', NULL, NULL, 'Calle 22', 'Querétaro', 'Querétaro', NULL),
(23, 'Raquel Ortega', '1234567812', '1966-05-17', NULL, NULL, 'Calle 23', 'Querétaro', 'Querétaro', NULL),
(24, 'Ignacio Rivas', '1234567813', '1967-06-18', NULL, NULL, 'Calle 24', 'Querétaro', 'Querétaro', NULL),
(25, 'Carmen Ruiz', '1234567814', '1968-07-19', NULL, NULL, 'Calle 25', 'Querétaro', 'Querétaro', NULL),
(26, 'Fernando Navarro', '1234567815', '1969-08-20', NULL, NULL, 'Calle 26', 'Querétaro', 'Querétaro', NULL),
(27, 'Marta Castro', '1234567816', '1970-09-21', NULL, NULL, 'Calle 27', 'Querétaro', 'Querétaro', NULL),
(28, 'Alberto Medina', '1234567817', '1971-10-22', NULL, NULL, 'Calle 28', 'Querétaro', 'Querétaro', NULL),
(29, 'Silvia Paredes', '1234567818', '1972-11-23', NULL, NULL, 'Calle 29', 'Querétaro', 'Querétaro', NULL),
(30, 'Gustavo Aguirre', '1234567819', '1973-12-24', NULL, NULL, 'Calle 30', 'Querétaro', 'Querétaro', NULL),
(31, 'Beatriz Cabrera', '1234567820', '1974-01-25', NULL, NULL, 'Calle 31', 'Querétaro', 'Querétaro', NULL),
(32, 'Rodrigo Campos', '1234567821', '1975-02-26', NULL, NULL, 'Calle 32', 'Querétaro', 'Querétaro', NULL),
(33, 'Natalia Vega', '1234567822', '1976-03-27', NULL, NULL, 'Calle 33', 'Querétaro', 'Querétaro', NULL),
(34, 'Vicente Herrera', '1234567823', '1977-04-28', NULL, NULL, 'Calle 34', 'Querétaro', 'Querétaro', NULL),
(35, 'Sara Escobar', '1234567824', '1978-05-29', NULL, NULL, 'Calle 35', 'Querétaro', 'Querétaro', NULL),
(36, 'Ricardo Márquez', '1234567825', '1979-06-30', NULL, NULL, 'Calle 36', 'Querétaro', 'Querétaro', NULL),
(37, 'Pilar León', '1234567826', '1980-07-31', NULL, NULL, 'Calle 37', 'Querétaro', 'Querétaro', NULL),
(38, 'Héctor Solís', '1234567827', '1981-08-01', NULL, NULL, 'Calle 38', 'Querétaro', 'Querétaro', NULL),
(39, 'Alicia Méndez', '1234567828', '1982-09-02', NULL, NULL, 'Calle 39', 'Querétaro', 'Querétaro', NULL),
(40, 'Esteban Jiménez', '1234567829', '1983-10-03', NULL, NULL, 'Calle 40', 'Querétaro', 'Querétaro', NULL),
(41, 'Verónica Peña', '1234567830', '1984-11-04', NULL, NULL, 'Calle 41', 'Querétaro', 'Querétaro', NULL),
(42, 'Andrés Roldán', '1234567831', '1985-12-05', NULL, NULL, 'Calle 42', 'Querétaro', 'Querétaro', NULL),
(43, 'Rosa Ibáñez', '1234567832', '1986-01-06', NULL, NULL, 'Calle 43', 'Querétaro', 'Querétaro', NULL),
(44, 'Tomás Serrano', '1234567833', '1987-02-07', NULL, NULL, 'Calle 44', 'Querétaro', 'Querétaro', NULL),
(45, 'Carolina Ruiz', '1234567834', '1988-03-08', NULL, NULL, 'Calle 45', 'Querétaro', 'Querétaro', NULL),
(46, 'Guillermo Sosa', '1234567835', '1989-04-09', NULL, NULL, 'Calle 46', 'Querétaro', 'Querétaro', NULL),
(47, 'Mónica Ponce', '1234567836', '1990-05-10', NULL, NULL, 'Calle 47', 'Querétaro', 'Querétaro', NULL),
(48, 'Pedro Mora', '1234567837', '1991-06-11', NULL, NULL, 'Calle 48', 'Querétaro', 'Querétaro', NULL),
(49, 'Gabriela Barrios', '1234567838', '1992-07-12', NULL, NULL, 'Calle 49', 'Querétaro', 'Querétaro', NULL),
(50, 'Ramón Flores', '1234567839', '1993-08-13', NULL, NULL, 'Calle 50', 'Querétaro', 'Querétaro', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `usuarioRol`
--

CREATE TABLE `usuarioRol` (
  `IDUsuarioRol` int(11) NOT NULL,
  `IDUsuario` int(11) NOT NULL,
  `IDRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarioRol`
--

INSERT INTO `usuarioRol` (`IDUsuarioRol`, `IDUsuario`, `IDRol`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 2),
(6, 6, 2),
(7, 34, 3),
(8, 45, 3),
(9, 48, 3);

-- --------------------------------------------------------

--
-- Table structure for table `usuarioSucursal`
--

CREATE TABLE `usuarioSucursal` (
  `IDUsuarioSucursal` int(11) NOT NULL,
  `IDUsuario` int(11) NOT NULL,
  `IDSucursal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarioSucursal`
--

INSERT INTO `usuarioSucursal` (`IDUsuarioSucursal`, `IDUsuario`, `IDSucursal`) VALUES
(1, 5, 1),
(2, 6, 1),
(3, 34, 1),
(4, 45, 1),
(5, 48, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`IDSello`),
  ADD KEY `IDTarjeta` (`IDTarjeta`),
  ADD KEY `IDUsuario` (`IDUsuario`);

--
-- Indexes for table `privilegio`
--
ALTER TABLE `privilegio`
  ADD PRIMARY KEY (`IDPrivilegio`);

--
-- Indexes for table `promocion`
--
ALTER TABLE `promocion`
  ADD PRIMARY KEY (`IDPromocion`),
  ADD UNIQUE KEY `NombrePromocion` (`NombrePromocion`);

--
-- Indexes for table `promocionRecompensa`
--
ALTER TABLE `promocionRecompensa`
  ADD PRIMARY KEY (`IDPromocionRecompensa`),
  ADD KEY `IDPromocion` (`IDPromocion`),
  ADD KEY `IDRecompensa` (`IDRecompensa`);

--
-- Indexes for table `promocionSucursal`
--
ALTER TABLE `promocionSucursal`
  ADD PRIMARY KEY (`IDPromocionSucursal`),
  ADD KEY `IDSucursal` (`IDSucursal`),
  ADD KEY `IDPromocion` (`IDPromocion`);

--
-- Indexes for table `reclama`
--
ALTER TABLE `reclama`
  ADD PRIMARY KEY (`IDReclamo`),
  ADD KEY `IDUsuario` (`IDUsuario`),
  ADD KEY `IDPromocion` (`IDPromocion`);

--
-- Indexes for table `recompensa`
--
ALTER TABLE `recompensa`
  ADD PRIMARY KEY (`IDRecompensa`),
  ADD UNIQUE KEY `NombreRecompensa` (`NombreRecompensa`);

--
-- Indexes for table `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`IDRol`);

--
-- Indexes for table `rolPrivilegio`
--
ALTER TABLE `rolPrivilegio`
  ADD PRIMARY KEY (`IDRolPrivilegio`),
  ADD KEY `IDPrivilegio` (`IDPrivilegio`),
  ADD KEY `IDRol` (`IDRol`);

--
-- Indexes for table `sucursal`
--
ALTER TABLE `sucursal`
  ADD PRIMARY KEY (`IDSucursal`),
  ADD UNIQUE KEY `NumSucursal` (`NumSucursal`);

--
-- Indexes for table `tarjeta`
--
ALTER TABLE `tarjeta`
  ADD PRIMARY KEY (`IDTarjeta`),
  ADD KEY `IDUsuario` (`IDUsuario`);

--
-- Indexes for table `tarjetaSucursal`
--
ALTER TABLE `tarjetaSucursal`
  ADD PRIMARY KEY (`IDTarjetaSucursal`),
  ADD KEY `IDSucursal` (`IDSucursal`),
  ADD KEY `IDTarjeta` (`IDTarjeta`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`IDUsuario`),
  ADD UNIQUE KEY `NumTelefono` (`NumTelefono`);

--
-- Indexes for table `usuarioRol`
--
ALTER TABLE `usuarioRol`
  ADD PRIMARY KEY (`IDUsuarioRol`),
  ADD KEY `IDUsuario` (`IDUsuario`),
  ADD KEY `IDRol` (`IDRol`);

--
-- Indexes for table `usuarioSucursal`
--
ALTER TABLE `usuarioSucursal`
  ADD PRIMARY KEY (`IDUsuarioSucursal`),
  ADD KEY `IDUsuario` (`IDUsuario`),
  ADD KEY `IDSucursal` (`IDSucursal`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `compra`
--
ALTER TABLE `compra`
  MODIFY `IDSello` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `privilegio`
--
ALTER TABLE `privilegio`
  MODIFY `IDPrivilegio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `promocion`
--
ALTER TABLE `promocion`
  MODIFY `IDPromocion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `promocionRecompensa`
--
ALTER TABLE `promocionRecompensa`
  MODIFY `IDPromocionRecompensa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `promocionSucursal`
--
ALTER TABLE `promocionSucursal`
  MODIFY `IDPromocionSucursal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `reclama`
--
ALTER TABLE `reclama`
  MODIFY `IDReclamo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `recompensa`
--
ALTER TABLE `recompensa`
  MODIFY `IDRecompensa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `rol`
--
ALTER TABLE `rol`
  MODIFY `IDRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rolPrivilegio`
--
ALTER TABLE `rolPrivilegio`
  MODIFY `IDRolPrivilegio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `sucursal`
--
ALTER TABLE `sucursal`
  MODIFY `IDSucursal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tarjeta`
--
ALTER TABLE `tarjeta`
  MODIFY `IDTarjeta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tarjetaSucursal`
--
ALTER TABLE `tarjetaSucursal`
  MODIFY `IDTarjetaSucursal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `IDUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `usuarioRol`
--
ALTER TABLE `usuarioRol`
  MODIFY `IDUsuarioRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `usuarioSucursal`
--
ALTER TABLE `usuarioSucursal`
  MODIFY `IDUsuarioSucursal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`IDTarjeta`) REFERENCES `tarjeta` (`IDTarjeta`),
  ADD CONSTRAINT `compra_ibfk_2` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`);

--
-- Constraints for table `promocionRecompensa`
--
ALTER TABLE `promocionRecompensa`
  ADD CONSTRAINT `promocionrecompensa_ibfk_1` FOREIGN KEY (`IDPromocion`) REFERENCES `promocion` (`IDPromocion`),
  ADD CONSTRAINT `promocionrecompensa_ibfk_2` FOREIGN KEY (`IDRecompensa`) REFERENCES `recompensa` (`IDRecompensa`);

--
-- Constraints for table `promocionSucursal`
--
ALTER TABLE `promocionSucursal`
  ADD CONSTRAINT `promocionsucursal_ibfk_1` FOREIGN KEY (`IDSucursal`) REFERENCES `sucursal` (`IDSucursal`),
  ADD CONSTRAINT `promocionsucursal_ibfk_2` FOREIGN KEY (`IDPromocion`) REFERENCES `promocion` (`IDPromocion`);

--
-- Constraints for table `reclama`
--
ALTER TABLE `reclama`
  ADD CONSTRAINT `reclama_ibfk_1` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`),
  ADD CONSTRAINT `reclama_ibfk_2` FOREIGN KEY (`IDPromocion`) REFERENCES `promocion` (`IDPromocion`);

--
-- Constraints for table `rolPrivilegio`
--
ALTER TABLE `rolPrivilegio`
  ADD CONSTRAINT `rolprivilegio_ibfk_1` FOREIGN KEY (`IDPrivilegio`) REFERENCES `privilegio` (`IDPrivilegio`),
  ADD CONSTRAINT `rolprivilegio_ibfk_2` FOREIGN KEY (`IDRol`) REFERENCES `rol` (`IDRol`);

--
-- Constraints for table `tarjeta`
--
ALTER TABLE `tarjeta`
  ADD CONSTRAINT `tarjeta_ibfk_1` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`);

--
-- Constraints for table `tarjetaSucursal`
--
ALTER TABLE `tarjetaSucursal`
  ADD CONSTRAINT `tarjetasucursal_ibfk_1` FOREIGN KEY (`IDSucursal`) REFERENCES `sucursal` (`IDSucursal`),
  ADD CONSTRAINT `tarjetasucursal_ibfk_2` FOREIGN KEY (`IDTarjeta`) REFERENCES `tarjeta` (`IDTarjeta`);

--
-- Constraints for table `usuarioRol`
--
ALTER TABLE `usuarioRol`
  ADD CONSTRAINT `usuariorol_ibfk_1` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`),
  ADD CONSTRAINT `usuariorol_ibfk_2` FOREIGN KEY (`IDRol`) REFERENCES `rol` (`IDRol`);

--
-- Constraints for table `usuarioSucursal`
--
ALTER TABLE `usuarioSucursal`
  ADD CONSTRAINT `usuariosucursal_ibfk_1` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`),
  ADD CONSTRAINT `usuariosucursal_ibfk_2` FOREIGN KEY (`IDSucursal`) REFERENCES `sucursal` (`IDSucursal`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
