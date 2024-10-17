-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 14, 2024 at 10:03 PM
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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `rolPrivilegio`
--
ALTER TABLE `rolPrivilegio`
  ADD PRIMARY KEY (`IDRolPrivilegio`),
  ADD KEY `IDPrivilegio` (`IDPrivilegio`),
  ADD KEY `IDRol` (`IDRol`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rolPrivilegio`
--
ALTER TABLE `rolPrivilegio`
  MODIFY `IDRolPrivilegio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `rolPrivilegio`
--
ALTER TABLE `rolPrivilegio`
  ADD CONSTRAINT `rolprivilegio_ibfk_1` FOREIGN KEY (`IDPrivilegio`) REFERENCES `privilegio` (`IDPrivilegio`),
  ADD CONSTRAINT `rolprivilegio_ibfk_2` FOREIGN KEY (`IDRol`) REFERENCES `rol` (`IDRol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
