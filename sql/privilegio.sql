-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 12, 2024 at 07:04 PM
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
(1, 'registrar usuario'),
(2, 'modificar usuario'),
(3, 'eliminar usuario'),
(4, 'crear promoción'),
(5, 'modificar promoción'),
(6, 'eliminar promoción'),
(7, 'registrar recompensa'),
(8, 'modificar recompensa'),
(9, 'eliminar recompensa'),
(10, 'registrar sucursal'),
(11, 'modificar sucursal'),
(12, 'eliminar sucursal'),
(13, 'crear rol'),
(14, 'modificar rol'),
(15, 'eliminar rol'),
(16, 'ver estadísticas'),
(17, 'editar tarjeta'),
(21, 'asignar vencimiento'),
(22, 'tarjeta cliente'),
(23, 'ver compras'),
(24, 'cambiar estatus');

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
  MODIFY `IDPrivilegio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
