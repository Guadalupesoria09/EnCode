-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-10-2024 a las 22:40:45
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `encode`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignado`
--

CREATE TABLE `asignado` (
  `IDAsignado` int(11) NOT NULL,
  `IDSucursal` int(11) NOT NULL,
  `IDPromocion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asignado`
--

INSERT INTO `asignado` (`IDAsignado`, `IDSucursal`, `IDPromocion`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pertenece`
--

CREATE TABLE `pertenece` (
  `IDPertenece` int(11) NOT NULL,
  `IDUsuario` int(11) NOT NULL,
  `IDSucursal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pertenece`
--

INSERT INTO `pertenece` (`IDPertenece`, `IDUsuario`, `IDSucursal`) VALUES
(1, 5, 1),
(2, 6, 1),
(3, 34, 1),
(4, 45, 1),
(5, 48, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `privilegio`
--

CREATE TABLE `privilegio` (
  `IDPrivilegio` int(11) NOT NULL,
  `Actividad` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `privilegio`
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
-- Estructura de tabla para la tabla `promocion`
--

CREATE TABLE `promocion` (
  `IDPromocion` int(11) NOT NULL,
  `NombrePromocion` varchar(100) DEFAULT NULL,
  `FechaInicio` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `FechaCaducidad` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `Valor` int(11) NOT NULL,
  `Estatus` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `promocion`
--

INSERT INTO `promocion` (`IDPromocion`, `NombrePromocion`, `FechaInicio`, `FechaCaducidad`, `Valor`, `Estatus`) VALUES
(1, 'chilaquiles sencillos salsa verde y café', '2024-01-01 06:00:00', '2024-01-30 06:00:00', 2, 'Activo'),
(2, 'chilaquiles sencillos salsa roja y café', '2024-10-01 06:00:00', '2024-10-30 06:00:00', 3, 'Activo'),
(3, 'chilaquiles sencillos salsa mole y café', '2024-01-01 06:00:00', '2024-01-30 06:00:00', 5, 'Activo'),
(4, 'chilaquiles sencillos salsa morita y café', '2024-03-01 06:00:00', '2024-04-30 06:00:00', 7, 'Activo'),
(5, 'chilaquiles con proteína con pollo y café', '2024-03-01 06:00:00', '2024-03-30 06:00:00', 11, 'Activo'),
(6, 'chilaquiles con proteína con huevo estrellado y café', '2024-01-01 06:00:00', '2024-02-28 06:00:00', 13, 'Activo'),
(7, 'chilaquiles con proteína con huevo revuelto y café', '2024-06-01 06:00:00', '2024-08-30 06:00:00', 17, 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promocionrecompensa`
--

CREATE TABLE `promocionrecompensa` (
  `IDPromocionRecompensa` int(11) NOT NULL,
  `IDPromocion` int(11) NOT NULL,
  `IDRecompensa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `promocionrecompensa`
--

INSERT INTO `promocionrecompensa` (`IDPromocionRecompensa`, `IDPromocion`, `IDRecompensa`) VALUES
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
-- Estructura de tabla para la tabla `reclama`
--

CREATE TABLE `reclama` (
  `IDReclamo` int(11) NOT NULL,
  `IDUsuario` int(11) NOT NULL,
  `IDPromocion` int(11) NOT NULL,
  `FechaReclamo` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reclama`
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
-- Estructura de tabla para la tabla `recompensa`
--

CREATE TABLE `recompensa` (
  `IDRecompensa` int(11) NOT NULL,
  `NombreRecompensa` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recompensa`
--

INSERT INTO `recompensa` (`IDRecompensa`, `NombreRecompensa`) VALUES
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `IDRol` int(11) NOT NULL,
  `TipoRol` varchar(100) DEFAULT NULL,
  `deleted_at` timestamp(1) NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`IDRol`, `TipoRol`, `deleted_at`) VALUES
(1, 'Administrador', NULL),
(2, 'Dueño', NULL),
(3, 'Empleado', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rolprivilegios`
--

CREATE TABLE `rolprivilegios` (
  `IDRolPrivilegios` int(11) NOT NULL,
  `IDPrivilegio` int(11) NOT NULL,
  `IDRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rolprivilegios`
--

INSERT INTO `rolprivilegios` (`IDRolPrivilegios`, `IDPrivilegio`, `IDRol`) VALUES
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
-- Estructura de tabla para la tabla `sello`
--

CREATE TABLE `sello` (
  `IDSello` int(11) NOT NULL,
  `IDTarjeta` int(11) NOT NULL,
  `IDUsuario` int(11) NOT NULL,
  `FechaSello` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sello`
--

INSERT INTO `sello` (`IDSello`, `IDTarjeta`, `IDUsuario`, `FechaSello`) VALUES
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
-- Estructura de tabla para la tabla `sucursal`
--

CREATE TABLE `sucursal` (
  `IDSucursal` int(11) NOT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  `CP` varchar(5) DEFAULT NULL,
  `Ciudad` varchar(50) DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  `NumSucursal` varchar(12) DEFAULT NULL,
  `NombreSucursal` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sucursal`
--

INSERT INTO `sucursal` (`IDSucursal`, `Direccion`, `CP`, `Ciudad`, `Estado`, `NumSucursal`, `NombreSucursal`) VALUES
(1, 'Calle Benito Juárez Nte. 127, Centro', '76000', 'Santiago de Querétaro', 'Querétaro', '524421234567', 'Chilako'),
(2, 'calle 5', '23423', 'Queretaro', 'Querétaro', '12345678', 'Manada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjeta`
--

CREATE TABLE `tarjeta` (
  `IDTarjeta` int(11) NOT NULL,
  `IDUsuario` int(11) NOT NULL,
  `SellosTotal` int(11) NOT NULL,
  `SellosActual` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tarjeta`
--

INSERT INTO `tarjeta` (`IDTarjeta`, `IDUsuario`, `SellosTotal`, `SellosActual`) VALUES
(1, 7, 17, 37),
(2, 8, 13, 13),
(3, 9, 5, 5),
(4, 10, 10, 10),
(5, 11, 18, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjetasucursal`
--

CREATE TABLE `tarjetasucursal` (
  `IDTarjetaSucursal` int(11) NOT NULL,
  `IDSucursal` int(11) NOT NULL,
  `IDTarjeta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tarjetasucursal`
--

INSERT INTO `tarjetasucursal` (`IDTarjetaSucursal`, `IDSucursal`, `IDTarjeta`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `IDUsuario` int(11) NOT NULL,
  `NombreUsuario` varchar(50) DEFAULT NULL,
  `NumTelefono` varchar(13) DEFAULT NULL,
  `FechaNacimiento` date DEFAULT NULL,
  `Contrasenia` varchar(400) DEFAULT NULL,
  `Genero` varchar(20) DEFAULT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  `Ciudad` varchar(50) DEFAULT NULL,
  `Estado` varchar(30) DEFAULT NULL,
  `deleted_at` timestamp(1) NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`IDUsuario`, `NombreUsuario`, `NumTelefono`, `FechaNacimiento`, `Contrasenia`, `Genero`, `Direccion`, `Ciudad`, `Estado`, `deleted_at`) VALUES
(1, 'Daniel', '1234567890', NULL, 'dani', NULL, 'Calle 1', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(2, 'Lupita', '1234567891', NULL, 'lupis', NULL, 'Calle 2', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(3, 'Neto', '1234567892', NULL, 'neto', NULL, 'Calle 3', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(4, 'Kate', '1234567893', NULL, 'kate', NULL, 'Calle 4', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(5, 'JuanMa', '1234567894', NULL, 'admin1', NULL, 'Calle 5', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(6, 'Carlos', '1234567895', NULL, 'admin2', NULL, 'Calle 6', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(7, 'Ana García', '1234567896', '1950-01-01', NULL, NULL, 'Calle 7', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(8, 'Miguel Pérez', '1234567897', '1951-02-02', NULL, NULL, 'Calle 8', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(9, 'Laura Rodríguez', '1234567898', '1952-03-03', NULL, NULL, 'Calle 9', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(10, 'David Hernández', '1234567899', '1953-04-04', NULL, NULL, 'Calle 10', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(11, 'María López', '1234567800', '1954-05-05', NULL, NULL, 'Calle 11', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(12, 'Carlos Sánchez', '1234567801', '1955-06-06', NULL, NULL, 'Calle 12', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(13, 'Andrea Gómez', '1234567802', '1956-07-07', NULL, NULL, 'Calle 13', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(14, 'Luis Martínez', '1234567803', '1957-08-08', NULL, NULL, 'Calle 14', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(15, 'Paula Fernández', '1234567804', '1958-09-09', NULL, NULL, 'Calle 15', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(16, 'José Ramírez', '1234567805', '1959-10-10', NULL, NULL, 'Calle 16', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(17, 'Elena Torres', '1234567806', '1960-11-11', NULL, NULL, 'Calle 17', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(18, 'Diego Morales', '1234567807', '1961-12-12', NULL, NULL, 'Calle 18', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(19, 'Isabel Romero', '1234567808', '1962-01-13', NULL, NULL, 'Calle 19', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(20, 'Sergio Vázquez', '1234567809', '1963-02-14', NULL, NULL, 'Calle 20', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(21, 'Lucía Domínguez', '1234567810', '1964-03-15', NULL, NULL, 'Calle 21', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(22, 'Jorge Gil', '1234567811', '1965-04-16', NULL, NULL, 'Calle 22', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(23, 'Raquel Ortega', '1234567812', '1966-05-17', NULL, NULL, 'Calle 23', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(24, 'Ignacio Rivas', '1234567813', '1967-06-18', NULL, NULL, 'Calle 24', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(25, 'Carmen Ruiz', '1234567814', '1968-07-19', NULL, NULL, 'Calle 25', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(26, 'Fernando Navarro', '1234567815', '1969-08-20', NULL, NULL, 'Calle 26', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(27, 'Marta Castro', '1234567816', '1970-09-21', NULL, NULL, 'Calle 27', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(28, 'Alberto Medina', '1234567817', '1971-10-22', NULL, NULL, 'Calle 28', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(29, 'Silvia Paredes', '1234567818', '1972-11-23', NULL, NULL, 'Calle 29', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(30, 'Gustavo Aguirre', '1234567819', '1973-12-24', NULL, NULL, 'Calle 30', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(31, 'Beatriz Cabrera', '1234567820', '1974-01-25', NULL, NULL, 'Calle 31', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(32, 'Rodrigo Campos', '1234567821', '1975-02-26', NULL, NULL, 'Calle 32', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(33, 'Natalia Vega', '1234567822', '1976-03-27', NULL, NULL, 'Calle 33', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(34, 'Vicente Herrera', '1234567823', '1977-04-28', NULL, NULL, 'Calle 34', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(35, 'Sara Escobar', '1234567824', '1978-05-29', NULL, NULL, 'Calle 35', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(36, 'Ricardo Márquez', '1234567825', '1979-06-30', NULL, NULL, 'Calle 36', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(37, 'Pilar León', '1234567826', '1980-07-31', NULL, NULL, 'Calle 37', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(38, 'Héctor Solís', '1234567827', '1981-08-01', NULL, NULL, 'Calle 38', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(39, 'Alicia Méndez', '1234567828', '1982-09-02', NULL, NULL, 'Calle 39', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(40, 'Esteban Jiménez', '1234567829', '1983-10-03', NULL, NULL, 'Calle 40', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(41, 'Verónica Peña', '1234567830', '1984-11-04', NULL, NULL, 'Calle 41', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(42, 'Andrés Roldán', '1234567831', '1985-12-05', NULL, NULL, 'Calle 42', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(43, 'Rosa Ibáñez', '1234567832', '1986-01-06', NULL, NULL, 'Calle 43', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(44, 'Tomás Serrano', '1234567833', '1987-02-07', NULL, NULL, 'Calle 44', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(45, 'Carolina Ruiz', '1234567834', '1988-03-08', NULL, NULL, 'Calle 45', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(46, 'Guillermo Sosa', '1234567835', '1989-04-09', NULL, NULL, 'Calle 46', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(47, 'Mónica Ponce', '1234567836', '1990-05-10', NULL, NULL, 'Calle 47', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(48, 'Pedro Mora', '1234567837', '1991-06-11', NULL, NULL, 'Calle 48', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(49, 'Gabriela Barrios', '1234567838', '1992-07-12', NULL, NULL, 'Calle 49', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(50, 'Ramón Flores', '1234567839', '1993-08-13', NULL, NULL, 'Calle 50', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(51, 'Lorena Montero', '1234567840', '1994-09-14', NULL, NULL, 'Calle 51', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(52, 'Julio Arroyo', '1234567841', '1995-10-15', NULL, NULL, 'Calle 52', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(53, 'Rafael Bautista', '1234567842', '1996-11-16', NULL, NULL, 'Calle 53', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(54, 'Patricia Velázquez', '1234567843', '1997-12-17', NULL, NULL, 'Calle 54', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(55, 'Emilio Vargas', '1234567844', '1998-01-18', NULL, NULL, 'Calle 55', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(56, 'Manuela Quiroz', '1234567845', '1999-02-19', NULL, NULL, 'Calle 56', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(57, 'Eduardo Salazar', '1234567846', '2000-03-20', NULL, NULL, 'Calle 57', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(58, 'Luisa Mendoza', '1234567847', '2001-04-21', NULL, NULL, 'Calle 58', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(59, 'Fabián Paredes', '1234567848', '2002-05-22', NULL, NULL, 'Calle 59', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(60, 'Sonia Quintero', '1234567849', '2003-06-23', NULL, NULL, 'Calle 60', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(61, 'Javier Cuevas', '1234567850', '2004-07-24', NULL, NULL, 'Calle 61', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(62, 'Ángela Villarreal', '1234567851', '2005-08-25', NULL, NULL, 'Calle 62', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(63, 'Arturo Cornejo', '1234567852', '2006-09-26', NULL, NULL, 'Calle 63', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(64, 'Valeria Cano', '1234567853', '2007-10-27', NULL, NULL, 'Calle 64', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(65, 'Mauricio Prieto', '1234567854', '2008-11-28', NULL, NULL, 'Calle 65', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(66, 'Adriana Méndez', '1234567855', '2009-12-29', NULL, NULL, 'Calle 66', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(67, 'Roberto Maldonado', '1234567856', '2010-01-30', NULL, NULL, 'Calle 67', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(68, 'Marina Sáenz', '1234567857', '1952-08-01', NULL, NULL, 'Calle 68', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(69, 'Ernesto Gutiérrez', '1234567858', '1968-09-02', NULL, NULL, 'Calle 69', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(70, 'Claudia Lozano', '1234567859', '1975-10-03', NULL, NULL, 'Calle 70', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(71, 'Pablo Valencia', '1234567860', '1989-11-04', NULL, NULL, 'Calle 71', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(72, 'Alejandra Ortega', '1234567861', '1958-12-05', NULL, NULL, 'Calle 72', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(73, 'Cristina Reyes', '1234567862', '1999-01-06', NULL, NULL, 'Calle 73', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(74, 'Felipe Castro', '1234567863', '1972-02-07', NULL, NULL, 'Calle 74', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(75, 'Eva Delgado', '1234567864', '2001-03-08', NULL, NULL, 'Calle 75', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(76, 'Roberto Estrada', '1234567865', '1957-04-09', NULL, NULL, 'Calle 76', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(77, 'Lidia Ortiz', '1234567866', '1984-05-10', NULL, NULL, 'Calle 77', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(78, 'Marcos Escamilla', '1234567867', '1995-06-11', NULL, NULL, 'Calle 78', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(79, 'Susana Cruz', '1234567868', '1979-07-12', NULL, NULL, 'Calle 79', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(80, 'Nicolás Martínez', '1234567869', '1953-08-13', NULL, NULL, 'Calle 80', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(81, 'Blanca Zamora', '1234567870', '1961-09-14', NULL, NULL, 'Calle 81', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(82, 'Gonzalo Durán', '1234567870', '1971-10-15', NULL, NULL, 'Calle 82', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(83, 'Blanca Flores', '1234567871', '1986-11-16', NULL, NULL, 'Calle 83', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(84, 'Rubén Castañeda', '1234567872', '1998-12-17', NULL, NULL, 'Calle 84', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(85, 'Elisa Ramírez', '1234567873', '1963-01-18', NULL, NULL, 'Calle 85', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(86, 'Mario Luna', '1234567874', '1988-02-19', NULL, NULL, 'Calle 86', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(87, 'Verónica Guzmán', '1234567875', '2002-03-20', NULL, NULL, 'Calle 87', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(88, 'Ricardo Silva', '1234567876', '1955-04-21', NULL, NULL, 'Calle 88', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(89, 'Ana María Ruiz', '1234567877', '1974-05-22', NULL, NULL, 'Calle 89', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(90, 'Daniela Sánchez', '1234567878', '1960-06-23', NULL, NULL, 'Calle 90', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(91, 'Julio César Álvarez', '1234567879', '1991-07-24', NULL, NULL, 'Calle 91', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(92, 'María Teresa Fernández', '1234567880', '2003-08-25', NULL, NULL, 'Calle 92', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(93, 'José Luis Rivera', '1234567881', '1954-09-26', NULL, NULL, 'Calle 93', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(94, 'Laura Espinoza', '1234567882', '1980-10-27', NULL, NULL, 'Calle 94', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(95, 'Raúl Jiménez', '1234567883', '1959-11-28', NULL, NULL, 'Calle 95', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(96, 'Patricia Garza', '1234567884', '1996-12-29', NULL, NULL, 'Calle 96', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(97, 'Eduardo Treviño', '1234567885', '1978-01-30', NULL, NULL, 'Calle 97', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(98, 'Mónica Navarro', '1234567886', '0000-00-00', NULL, NULL, 'Calle 98', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(99, 'Carlos Domínguez', '1234567887', '1969-03-01', NULL, NULL, 'Calle 99', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(100, 'Sandra Aguilar', '1234567888', '2004-04-02', NULL, NULL, 'Calle 100', 'Querétaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(101, 'Ernesto', '+524421243142', NULL, '$2a$10$a3Mn2m7PlteDTw8nGqV3Gur2lZnNSVFkjf4WuGbkOMJ6sGRm6U2d.', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00.0'),
(102, 'Mar', '+524425796513', NULL, '$2a$10$EsYni7klTrOCNR5f8Y0zYOhyUp9rgRKhngKxGZJsOfxj/3yAmozmS', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00.0'),
(103, 'Daniel', '1234567', '2024-09-19', '$2a$12$X4SR1bYG1cPt51nDjycmlOt8VDWGGzsQO8rUBZTjh/thUc.aXND92', 'Masculino', 'tec qro', 'Queretaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(104, 'DROP DATABASE encode', 'DROP DATABAS', NULL, '$2a$10$xhhC2KiBhDu7WDhJGXZYc.XfCXGQi4zt5hzsT14Xec0Zs2ntj92C6', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00.0'),
(105, 'Erick', '12345', '2003-04-07', '$2a$12$Pvlj6zX99paRLUaq3V34qOn/2qhKE97KjtpWZ1XfS3pkhKBvyGPly', 'Masculino', 'aqui', 'Tapachula', 'Chiapas', '0000-00-00 00:00:00.0'),
(106, 'Kate', '528714579729', '2004-06-14', '$2a$12$h57E8IsFCVEQNVfv0IPlTeYsCChChZwwS8.hzXSqR8igQu5.GjDgS', 'Femenino', 'Chiapas sur', 'Queretaro', 'Querétaro', '0000-00-00 00:00:00.0'),
(107, 'ernesto', '123456', '2003-06-15', '$2a$12$F/lbDvfcM1U7oyrwfIV4meNTjKqNU1j.h43P0iNoq0cRl4oagp7h6', 'Femenino', 'Chiapas sur', 'Queretaro', 'Querétaro', '0000-00-00 00:00:00.0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariorol`
--

CREATE TABLE `usuariorol` (
  `IDUsuarioRol` int(11) NOT NULL,
  `IDUsuario` int(11) NOT NULL,
  `IDRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuariorol`
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
(10, 101, 1),
(11, 105, 2),
(12, 106, 2),
(13, 107, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignado`
--
ALTER TABLE `asignado`
  ADD PRIMARY KEY (`IDAsignado`),
  ADD KEY `IDSucursal` (`IDSucursal`),
  ADD KEY `IDPromocion` (`IDPromocion`);

--
-- Indices de la tabla `pertenece`
--
ALTER TABLE `pertenece`
  ADD PRIMARY KEY (`IDPertenece`),
  ADD KEY `IDUsuario` (`IDUsuario`),
  ADD KEY `IDSucursal` (`IDSucursal`);

--
-- Indices de la tabla `privilegio`
--
ALTER TABLE `privilegio`
  ADD PRIMARY KEY (`IDPrivilegio`);

--
-- Indices de la tabla `promocion`
--
ALTER TABLE `promocion`
  ADD PRIMARY KEY (`IDPromocion`);

--
-- Indices de la tabla `promocionrecompensa`
--
ALTER TABLE `promocionrecompensa`
  ADD PRIMARY KEY (`IDPromocionRecompensa`),
  ADD KEY `IDPromocion` (`IDPromocion`),
  ADD KEY `IDRecompensa` (`IDRecompensa`);

--
-- Indices de la tabla `reclama`
--
ALTER TABLE `reclama`
  ADD PRIMARY KEY (`IDReclamo`),
  ADD KEY `IDUsuario` (`IDUsuario`),
  ADD KEY `IDPromocion` (`IDPromocion`);

--
-- Indices de la tabla `recompensa`
--
ALTER TABLE `recompensa`
  ADD PRIMARY KEY (`IDRecompensa`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`IDRol`);

--
-- Indices de la tabla `rolprivilegios`
--
ALTER TABLE `rolprivilegios`
  ADD PRIMARY KEY (`IDRolPrivilegios`),
  ADD KEY `IDPrivilegio` (`IDPrivilegio`),
  ADD KEY `IDRol` (`IDRol`);

--
-- Indices de la tabla `sello`
--
ALTER TABLE `sello`
  ADD PRIMARY KEY (`IDSello`),
  ADD KEY `IDTarjeta` (`IDTarjeta`),
  ADD KEY `IDUsuario` (`IDUsuario`);

--
-- Indices de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  ADD PRIMARY KEY (`IDSucursal`);

--
-- Indices de la tabla `tarjeta`
--
ALTER TABLE `tarjeta`
  ADD PRIMARY KEY (`IDTarjeta`),
  ADD KEY `IDUsuario` (`IDUsuario`);

--
-- Indices de la tabla `tarjetasucursal`
--
ALTER TABLE `tarjetasucursal`
  ADD PRIMARY KEY (`IDTarjetaSucursal`),
  ADD KEY `IDSucursal` (`IDSucursal`),
  ADD KEY `IDTarjeta` (`IDTarjeta`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`IDUsuario`);

--
-- Indices de la tabla `usuariorol`
--
ALTER TABLE `usuariorol`
  ADD PRIMARY KEY (`IDUsuarioRol`),
  ADD KEY `IDUsuario` (`IDUsuario`),
  ADD KEY `IDRol` (`IDRol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asignado`
--
ALTER TABLE `asignado`
  MODIFY `IDAsignado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `pertenece`
--
ALTER TABLE `pertenece`
  MODIFY `IDPertenece` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `privilegio`
--
ALTER TABLE `privilegio`
  MODIFY `IDPrivilegio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `promocion`
--
ALTER TABLE `promocion`
  MODIFY `IDPromocion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `promocionrecompensa`
--
ALTER TABLE `promocionrecompensa`
  MODIFY `IDPromocionRecompensa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `reclama`
--
ALTER TABLE `reclama`
  MODIFY `IDReclamo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `recompensa`
--
ALTER TABLE `recompensa`
  MODIFY `IDRecompensa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `IDRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `rolprivilegios`
--
ALTER TABLE `rolprivilegios`
  MODIFY `IDRolPrivilegios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `sello`
--
ALTER TABLE `sello`
  MODIFY `IDSello` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  MODIFY `IDSucursal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tarjeta`
--
ALTER TABLE `tarjeta`
  MODIFY `IDTarjeta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tarjetasucursal`
--
ALTER TABLE `tarjetasucursal`
  MODIFY `IDTarjetaSucursal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `IDUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT de la tabla `usuariorol`
--
ALTER TABLE `usuariorol`
  MODIFY `IDUsuarioRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asignado`
--
ALTER TABLE `asignado`
  ADD CONSTRAINT `asignado_ibfk_1` FOREIGN KEY (`IDSucursal`) REFERENCES `sucursal` (`IDSucursal`),
  ADD CONSTRAINT `asignado_ibfk_2` FOREIGN KEY (`IDPromocion`) REFERENCES `promocion` (`IDPromocion`);

--
-- Filtros para la tabla `pertenece`
--
ALTER TABLE `pertenece`
  ADD CONSTRAINT `pertenece_ibfk_1` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`),
  ADD CONSTRAINT `pertenece_ibfk_2` FOREIGN KEY (`IDSucursal`) REFERENCES `sucursal` (`IDSucursal`);

--
-- Filtros para la tabla `promocionrecompensa`
--
ALTER TABLE `promocionrecompensa`
  ADD CONSTRAINT `promocionrecompensa_ibfk_1` FOREIGN KEY (`IDPromocion`) REFERENCES `promocion` (`IDPromocion`),
  ADD CONSTRAINT `promocionrecompensa_ibfk_2` FOREIGN KEY (`IDRecompensa`) REFERENCES `recompensa` (`IDRecompensa`);

--
-- Filtros para la tabla `reclama`
--
ALTER TABLE `reclama`
  ADD CONSTRAINT `reclama_ibfk_1` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`),
  ADD CONSTRAINT `reclama_ibfk_2` FOREIGN KEY (`IDPromocion`) REFERENCES `promocion` (`IDPromocion`);

--
-- Filtros para la tabla `rolprivilegios`
--
ALTER TABLE `rolprivilegios`
  ADD CONSTRAINT `rolprivilegios_ibfk_1` FOREIGN KEY (`IDPrivilegio`) REFERENCES `privilegio` (`IDPrivilegio`),
  ADD CONSTRAINT `rolprivilegios_ibfk_2` FOREIGN KEY (`IDRol`) REFERENCES `rol` (`IDRol`);

--
-- Filtros para la tabla `sello`
--
ALTER TABLE `sello`
  ADD CONSTRAINT `sello_ibfk_1` FOREIGN KEY (`IDTarjeta`) REFERENCES `tarjeta` (`IDTarjeta`),
  ADD CONSTRAINT `sello_ibfk_2` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`);

--
-- Filtros para la tabla `tarjeta`
--
ALTER TABLE `tarjeta`
  ADD CONSTRAINT `tarjeta_ibfk_1` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`);

--
-- Filtros para la tabla `tarjetasucursal`
--
ALTER TABLE `tarjetasucursal`
  ADD CONSTRAINT `tarjetasucursal_ibfk_1` FOREIGN KEY (`IDSucursal`) REFERENCES `sucursal` (`IDSucursal`),
  ADD CONSTRAINT `tarjetasucursal_ibfk_2` FOREIGN KEY (`IDTarjeta`) REFERENCES `tarjeta` (`IDTarjeta`);

--
-- Filtros para la tabla `usuariorol`
--
ALTER TABLE `usuariorol`
  ADD CONSTRAINT `usuariorol_ibfk_1` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`),
  ADD CONSTRAINT `usuariorol_ibfk_2` FOREIGN KEY (`IDRol`) REFERENCES `rol` (`IDRol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
