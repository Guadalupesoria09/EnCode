-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 14, 2024 at 10:20 PM
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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carcasa`
--
ALTER TABLE `carcasa`
  ADD PRIMARY KEY (`IDCarcasa`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carcasa`
--
ALTER TABLE `carcasa`
  MODIFY `IDCarcasa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
