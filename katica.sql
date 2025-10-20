-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 21, 2025 at 01:24 AM
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
-- Database: `katica`
--

-- --------------------------------------------------------

--
-- Table structure for table `forgalom`
--

CREATE TABLE `forgalom` (
  `id` int(11) NOT NULL,
  `termekId` int(11) NOT NULL,
  `vevoId` int(11) NOT NULL,
  `kategoriaId` int(11) DEFAULT NULL,
  `mennyiseg` int(11) NOT NULL CHECK (`mennyiseg` > 0),
  `nettoar` decimal(10,2) NOT NULL CHECK (`nettoar` >= 0),
  `egyseg` varchar(10) DEFAULT 'db',
  `kiadva` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Forgalom, értékesítések, tranzakciók';

--
-- Dumping data for table `forgalom`
--

INSERT INTO `forgalom` (`id`, `termekId`, `vevoId`, `kategoriaId`, `mennyiseg`, `nettoar`, `egyseg`, `kiadva`) VALUES
(1, 1, 4, 10, 2, 350.00, 'db', 1),
(2, 2, 2, 2, 3, 290.00, 'db', 1),
(3, 3, 3, 1, 1, 450.00, 'db', 1),
(4, 4, 4, 6, 5, 520.00, 'kg', 1),
(5, 5, 5, 4, 2, 890.00, 'db', 0),
(9, 9, 1, 6, 2, 950.00, 'kg', 0),
(11, 2, 2, 6, 10, 1.00, 'db', 0),
(12, 2, 5, 3, 55, 10000.00, 'db', 0),
(13, 6, 16, 10, 1000, 1.00, 'db', 0);

-- --------------------------------------------------------

--
-- Table structure for table `kategoria`
--

CREATE TABLE `kategoria` (
  `id` int(11) NOT NULL,
  `kategoriaNev` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Termékkategóriák táblája';

--
-- Dumping data for table `kategoria`
--

INSERT INTO `kategoria` (`id`, `kategoriaNev`) VALUES
(1, 'Élelmiszer'),
(6, 'Gyümölcs'),
(3, 'Háztartás'),
(10, 'Help me'),
(2, 'Ital'),
(7, 'Pékáru'),
(13, 'Teszt'),
(4, 'Vegyiáru'),
(5, 'Zöldséggggg');

-- --------------------------------------------------------

--
-- Table structure for table `termek`
--

CREATE TABLE `termek` (
  `id` int(11) NOT NULL,
  `termekNev` varchar(100) NOT NULL,
  `kategoriaId` int(11) NOT NULL,
  `egyseg` varchar(10) DEFAULT 'db',
  `nettoar` decimal(10,2) NOT NULL CHECK (`nettoar` >= 0),
  `mennyiseg` int(11) DEFAULT 0 CHECK (`mennyiseg` >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Termékek és készletadatok';

--
-- Dumping data for table `termek`
--

INSERT INTO `termek` (`id`, `termekNev`, `kategoriaId`, `egyseg`, `nettoar`, `mennyiseg`) VALUES
(1, 'Kenyér', 6, 'db', 350.00, 100),
(2, 'Tej 1L', 2, 'db', 290.00, 200),
(3, 'Cukor 1kg', 1, 'db', 450.00, 80),
(4, 'Alma', 6, 'kg', 520.00, 50),
(5, 'Mosogatószer', 4, 'db', 890.00, 40),
(6, 'Sör 0.5L', 2, 'db', 490.00, 120),
(7, 'Liszt 1kg', 1, 'db', 420.00, 90),
(8, 'Paprika', 5, 'kg', 780.00, 35),
(9, 'Narancs', 6, 'kg', 950.00, 45);

-- --------------------------------------------------------

--
-- Table structure for table `vevo`
--

CREATE TABLE `vevo` (
  `id` int(11) NOT NULL,
  `vevoNev` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Vevők adatai';

--
-- Dumping data for table `vevo`
--

INSERT INTO `vevo` (`id`, `vevoNev`) VALUES
(1, 'Kiss Péter'),
(2, 'Nagy Anna'),
(3, 'Szabó László'),
(4, 'Tóth Gábor'),
(5, 'Kovács Eszter'),
(16, 'a2g2'),
(17, 'Új hozzárendelve');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `forgalom`
--
ALTER TABLE `forgalom`
  ADD PRIMARY KEY (`id`),
  ADD KEY `termekId` (`termekId`),
  ADD KEY `vevoId` (`vevoId`),
  ADD KEY `kategoriaId` (`kategoriaId`);

--
-- Indexes for table `kategoria`
--
ALTER TABLE `kategoria`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kategoriaNev` (`kategoriaNev`);

--
-- Indexes for table `termek`
--
ALTER TABLE `termek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategoriaId` (`kategoriaId`);

--
-- Indexes for table `vevo`
--
ALTER TABLE `vevo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `forgalom`
--
ALTER TABLE `forgalom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `kategoria`
--
ALTER TABLE `kategoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `termek`
--
ALTER TABLE `termek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `vevo`
--
ALTER TABLE `vevo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `forgalom`
--
ALTER TABLE `forgalom`
  ADD CONSTRAINT `forgalom_ibfk_1` FOREIGN KEY (`termekId`) REFERENCES `termek` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `forgalom_ibfk_2` FOREIGN KEY (`vevoId`) REFERENCES `vevo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `forgalom_ibfk_3` FOREIGN KEY (`kategoriaId`) REFERENCES `kategoria` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `termek`
--
ALTER TABLE `termek`
  ADD CONSTRAINT `termek_ibfk_1` FOREIGN KEY (`kategoriaId`) REFERENCES `kategoria` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
