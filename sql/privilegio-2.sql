-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 14, 2024 at 10:02 PM
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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `privilegio`
--
ALTER TABLE `privilegio`
  ADD PRIMARY KEY (`IDPrivilegio`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `privilegio`
--
ALTER TABLE `privilegio`
  MODIFY `IDPrivilegio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
