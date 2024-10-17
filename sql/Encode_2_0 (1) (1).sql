-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2024 at 10:12 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
-- Table structure for table `carcasa`
--

CREATE TABLE `carcasa` (
  `IDCarcasa` int(11) NOT NULL,
  `nombreTarjeta` varchar(100) DEFAULT NULL,
  `Logo` varchar(100) DEFAULT NULL,
  `Color` varchar(100) DEFAULT NULL,
  `Font` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carcasa`
--

INSERT INTO `carcasa` (`IDCarcasa`, `nombreTarjeta`, `Logo`, `Color`, `Font`) VALUES
(1, 'DUPER REWARDS', '1728925782806Dupper-brands-logo.png', '#2141de', 'Times New Roman'),
(3, 'CAFELE REWARDS', '1728927656718coffeeShop.png', '#4d0000', 'Arial'),
(4, 'Chilaquiles', '1728928537569chilaquilesRojos.png', '#4b3f3f', 'Cambria'),
(5, 'Times New Roman', 'PRueba', '1728931802822TRYBUENA.png', '#e9e2c4'),
(6, 'PIZZERIA REWARDS', '1728931907798TRYBUENA.png', '#f0e4c1', 'Times New Roman'),
(7, 'Los Pambazitos', '1728932016233pambazoMigue.png', '#ce2727', 'Georgia');

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
(32, 'registrar usuario'),
(33, 'modificar usuario'),
(34, 'eliminar usuario'),
(35, 'crear promoción'),
(36, 'modificar promoción'),
(37, 'eliminar promoción'),
(38, 'cambiar estatus'),
(39, 'ver promociones'),
(40, 'registrar recompensa'),
(41, 'modificar recompensa'),
(42, 'eliminar recompensa'),
(43, 'ver recompensas'),
(44, 'registrar sucursal'),
(45, 'modificar sucursal'),
(46, 'eliminar sucursal'),
(47, 'ver sucursales'),
(48, 'ver sucursal'),
(49, 'crear rol'),
(50, 'modificar rol'),
(51, 'eliminar rol'),
(52, 'ver roles'),
(53, 'editar tarjeta'),
(54, 'asignar vencimiento'),
(55, 'tarjeta cliente'),
(56, 'editor tarjeta'),
(57, 'ver estadísticas'),
(58, 'ver compras'),
(59, 'ver clientes'),
(60, 'ver configuración'),
(61, 'ver tarjeta');

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
(1, 'chilaquiles sencillos salsa verde y café', '2024-10-14 20:26:44', '2024-01-30 06:00:00', 3, 0, 0, 0, NULL),
(2, ' chilaquiles sencillos salsa roja y café ', '2024-10-15 15:09:12', '2024-10-30 06:00:00', 5, 0, 0, 1, NULL),
(3, 'chilaquiles sencillos salsa mole y café', '2024-10-14 20:26:45', '2024-01-30 06:00:00', 8, 0, 0, 0, NULL),
(4, 'chilaquiles sencillos salsa morita y café', '2024-10-10 16:46:16', '2024-04-30 06:00:00', 10, 150, 0, 1, '2024-10-10 16:46:16.0'),
(5, '   chilaquiles con proteína con pollo y café   ', '2024-10-14 20:26:47', '2024-03-30 06:00:00', 4, 0, 1, 0, NULL),
(6, 'chilaquiles con proteína con huevo estrellado y café', '2024-10-10 16:44:11', '2024-02-28 06:00:00', 9, 100, 2, 1, '2024-10-10 16:44:11.0'),
(7, 'chilaquiles con proteína con huevo revuelto y café', '2024-10-10 16:43:57', '2024-08-30 06:00:00', 10, 250, 3, 0, '2024-10-10 16:43:57.0');

-- --------------------------------------------------------

--
-- Table structure for table `promocionsucursalrecompensa`
--

CREATE TABLE `promocionsucursalrecompensa` (
  `IDPromocionSucurRecompensa` int(11) NOT NULL,
  `IDPromocion` int(11) NOT NULL,
  `IDRecompensa` int(11) NOT NULL,
  `IDSucursal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `promocionsucursalrecompensa`
--

INSERT INTO `promocionsucursalrecompensa` (`IDPromocionSucurRecompensa`, `IDPromocion`, `IDRecompensa`, `IDSucursal`) VALUES
(1, 1, 1, 1),
(2, 1, 9, 1),
(3, 2, 2, 1),
(4, 2, 9, 1),
(5, 3, 4, 1),
(6, 3, 18, 1),
(7, 4, 4, 1),
(8, 4, 9, 1),
(9, 5, 1, 1),
(10, 5, 10, 1),
(11, 6, 7, 1),
(12, 6, 9, 1),
(13, 7, 8, 1),
(14, 7, 9, 1),
(19, 5, 15, 1),
(20, 3, 18, 1);

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
(26, ' Torta de Chilaquiles c/ proteína, salsa habanera ', NULL);

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
(3, 'Empleado', NULL),
(4, 'Rol1', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rolprivilegio`
--

CREATE TABLE `rolprivilegio` (
  `IDRolPrivilegio` int(11) NOT NULL,
  `IDPrivilegio` int(11) NOT NULL,
  `IDRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rolprivilegio`
--

INSERT INTO `rolprivilegio` (`IDRolPrivilegio`, `IDPrivilegio`, `IDRol`) VALUES
(67, 32, 1),
(68, 33, 1),
(69, 34, 1),
(70, 35, 1),
(71, 36, 1),
(72, 37, 1),
(73, 38, 1),
(74, 39, 1),
(75, 40, 1),
(76, 41, 1),
(77, 42, 1),
(78, 43, 1),
(79, 44, 1),
(80, 45, 1),
(81, 46, 1),
(82, 47, 1),
(83, 48, 1),
(84, 49, 1),
(85, 50, 1),
(86, 51, 1),
(87, 52, 1),
(88, 53, 1),
(89, 54, 1),
(90, 55, 1),
(91, 56, 1),
(92, 57, 1),
(93, 58, 1),
(94, 59, 1),
(95, 32, 2),
(96, 33, 2),
(97, 34, 2),
(98, 35, 2),
(99, 36, 2),
(100, 37, 2),
(101, 38, 2),
(102, 39, 2),
(103, 40, 2),
(104, 41, 2),
(105, 42, 2),
(106, 43, 2),
(107, 48, 2),
(108, 49, 2),
(109, 50, 2),
(110, 51, 2),
(111, 52, 2),
(112, 53, 2),
(113, 54, 2),
(114, 55, 2),
(115, 56, 2),
(116, 57, 2),
(117, 58, 2),
(118, 59, 2),
(119, 60, 1),
(120, 60, 2),
(121, 61, 1),
(122, 61, 2);

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
  `Actual` tinyint(1) NOT NULL DEFAULT 1,
  `IDSucursal` int(11) NOT NULL,
  `IDCarcasa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tarjeta`
--

INSERT INTO `tarjeta` (`IDTarjeta`, `IDUsuario`, `SellosTotal`, `SellosActual`, `Limite`, `Actual`, `IDSucursal`, `IDCarcasa`) VALUES
(1, 7, 17, 37, 10, 1, 1, 1),
(2, 8, 13, 13, 10, 1, 1, 1),
(3, 9, 5, 5, 10, 1, 1, 1),
(4, 10, 10, 10, 10, 1, 1, 1),
(5, 11, 18, 18, 10, 1, 1, 1),
(6, 84, 0, 0, 0, 1, 1, 1);

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
(5, 'JuanMa', '1234567894', NULL, 'admin1', NULL, 'Calle 5', 'Querétaro', 'Querétaro', '2024-10-10 16:52:31.0'),
(6, 'Carlos', '1234567895', NULL, 'admin2', NULL, 'Calle 6', 'Querétaro', 'Querétaro', '2024-10-10 16:52:42.0'),
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
(50, 'Ramón Flores', '1234567839', '1993-08-13', NULL, NULL, 'Calle 50', 'Querétaro', 'Querétaro', NULL),
(82, 'Kate Rodriguez ', '123', '2024-06-14', '$2a$12$3O0xKt7AYX2u1Lbc7Od7pucUxcBumQgev/JtGolgo68HiT69pT8Hu', 'Femenino', 'lol', 'Torreon', 'Coahuila', NULL),
(84, 'Kate Duenia', '124', '2024-10-02', '$2a$12$kSZ6z/jHGckAeWIbIKTECO0YNJ25WgLinBXOASTRD2Xm6biAp.kiG', 'Femenino', 'las villas', 'Torreon', 'Coahuila', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `usuariorol`
--

CREATE TABLE `usuariorol` (
  `IDUsuarioRol` int(11) NOT NULL,
  `IDUsuario` int(11) NOT NULL,
  `IDRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuariorol`
--

INSERT INTO `usuariorol` (`IDUsuarioRol`, `IDUsuario`, `IDRol`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 2),
(6, 6, 2),
(7, 34, 3),
(8, 45, 3),
(9, 48, 3),
(10, 82, 1),
(11, 84, 2);

-- --------------------------------------------------------

--
-- Table structure for table `usuariosucursal`
--

CREATE TABLE `usuariosucursal` (
  `IDUsuarioSucursal` int(11) NOT NULL,
  `IDUsuario` int(11) NOT NULL,
  `IDSucursal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuariosucursal`
--

INSERT INTO `usuariosucursal` (`IDUsuarioSucursal`, `IDUsuario`, `IDSucursal`) VALUES
(1, 5, 1),
(2, 6, 1),
(3, 34, 1),
(4, 45, 1),
(5, 48, 1),
(6, 82, 1),
(7, 84, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carcasa`
--
ALTER TABLE `carcasa`
  ADD PRIMARY KEY (`IDCarcasa`);

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
-- Indexes for table `promocionsucursalrecompensa`
--
ALTER TABLE `promocionsucursalrecompensa`
  ADD PRIMARY KEY (`IDPromocionSucurRecompensa`),
  ADD KEY `IDPromocion` (`IDPromocion`),
  ADD KEY `IDRecompensa` (`IDRecompensa`),
  ADD KEY `fk_sucursal` (`IDSucursal`);

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
-- Indexes for table `rolprivilegio`
--
ALTER TABLE `rolprivilegio`
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
  ADD KEY `IDUsuario` (`IDUsuario`),
  ADD KEY `fk_tarjeta` (`IDCarcasa`),
  ADD KEY `sucursal_fk` (`IDSucursal`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`IDUsuario`),
  ADD UNIQUE KEY `NumTelefono` (`NumTelefono`);

--
-- Indexes for table `usuariorol`
--
ALTER TABLE `usuariorol`
  ADD PRIMARY KEY (`IDUsuarioRol`),
  ADD KEY `IDUsuario` (`IDUsuario`),
  ADD KEY `IDRol` (`IDRol`);

--
-- Indexes for table `usuariosucursal`
--
ALTER TABLE `usuariosucursal`
  ADD PRIMARY KEY (`IDUsuarioSucursal`),
  ADD KEY `IDUsuario` (`IDUsuario`),
  ADD KEY `IDSucursal` (`IDSucursal`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carcasa`
--
ALTER TABLE `carcasa`
  MODIFY `IDCarcasa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `compra`
--
ALTER TABLE `compra`
  MODIFY `IDSello` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `privilegio`
--
ALTER TABLE `privilegio`
  MODIFY `IDPrivilegio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `promocion`
--
ALTER TABLE `promocion`
  MODIFY `IDPromocion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `promocionsucursalrecompensa`
--
ALTER TABLE `promocionsucursalrecompensa`
  MODIFY `IDPromocionSucurRecompensa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
  MODIFY `IDRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `rolprivilegio`
--
ALTER TABLE `rolprivilegio`
  MODIFY `IDRolPrivilegio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `sucursal`
--
ALTER TABLE `sucursal`
  MODIFY `IDSucursal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tarjeta`
--
ALTER TABLE `tarjeta`
  MODIFY `IDTarjeta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `IDUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `usuariorol`
--
ALTER TABLE `usuariorol`
  MODIFY `IDUsuarioRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `usuariosucursal`
--
ALTER TABLE `usuariosucursal`
  MODIFY `IDUsuarioSucursal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
-- Constraints for table `promocionsucursalrecompensa`
--
ALTER TABLE `promocionsucursalrecompensa`
  ADD CONSTRAINT `fk_sucursal` FOREIGN KEY (`IDSucursal`) REFERENCES `sucursal` (`IDSucursal`),
  ADD CONSTRAINT `promocionsucursalrecompensa_ibfk_1` FOREIGN KEY (`IDPromocion`) REFERENCES `promocion` (`IDPromocion`),
  ADD CONSTRAINT `promocionsucursalrecompensa_ibfk_2` FOREIGN KEY (`IDRecompensa`) REFERENCES `recompensa` (`IDRecompensa`);

--
-- Constraints for table `reclama`
--
ALTER TABLE `reclama`
  ADD CONSTRAINT `reclama_ibfk_1` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`),
  ADD CONSTRAINT `reclama_ibfk_2` FOREIGN KEY (`IDPromocion`) REFERENCES `promocion` (`IDPromocion`);

--
-- Constraints for table `rolprivilegio`
--
ALTER TABLE `rolprivilegio`
  ADD CONSTRAINT `rolprivilegio_ibfk_1` FOREIGN KEY (`IDPrivilegio`) REFERENCES `privilegio` (`IDPrivilegio`),
  ADD CONSTRAINT `rolprivilegio_ibfk_2` FOREIGN KEY (`IDRol`) REFERENCES `rol` (`IDRol`);

--
-- Constraints for table `tarjeta`
--
ALTER TABLE `tarjeta`
  ADD CONSTRAINT `fk_tarjeta` FOREIGN KEY (`IDCarcasa`) REFERENCES `carcasa` (`IDCarcasa`),
  ADD CONSTRAINT `sucursal_fk` FOREIGN KEY (`IDSucursal`) REFERENCES `sucursal` (`IDSucursal`),
  ADD CONSTRAINT `tarjeta_ibfk_1` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`);

--
-- Constraints for table `usuariorol`
--
ALTER TABLE `usuariorol`
  ADD CONSTRAINT `usuariorol_ibfk_1` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`),
  ADD CONSTRAINT `usuariorol_ibfk_2` FOREIGN KEY (`IDRol`) REFERENCES `rol` (`IDRol`);

--
-- Constraints for table `usuariosucursal`
--
ALTER TABLE `usuariosucursal`
  ADD CONSTRAINT `usuariosucursal_ibfk_1` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`),
  ADD CONSTRAINT `usuariosucursal_ibfk_2` FOREIGN KEY (`IDSucursal`) REFERENCES `sucursal` (`IDSucursal`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
