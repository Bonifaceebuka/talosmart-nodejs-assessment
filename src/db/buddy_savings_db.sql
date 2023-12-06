-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 28, 2023 at 07:02 PM
-- Server version: 5.6.51-log
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `buddy_savings_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `savings_groups`
--

CREATE TABLE `savings_groups` (
  `id` int(11) NOT NULL,
  `group_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group_creator` int(11) DEFAULT NULL,
  `group_description` text COLLATE utf8mb4_unicode_ci,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `savings_groups`
--

INSERT INTO `savings_groups` (`id`, `group_name`, `group_creator`, `group_description`, `createdAt`, `updatedAt`) VALUES
(1, 'boniface@ghh.com', 1, '0090090000', '2023-02-28 12:07:25', '2023-02-28 12:07:25');

-- --------------------------------------------------------

--
-- Table structure for table `savings_groups_invites`
--

CREATE TABLE `savings_groups_invites` (
  `id` int(11) NOT NULL,
  `status` tinyint(4) DEFAULT '0',
  `sender_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `password` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `password`, `email`, `updatedAt`, `createdAt`) VALUES
(1, '$2b$15$Fy3cK8kTRAcET3B14nWbleNn05vTp.ZFl1uOiMaOWAytNFzjBNs52', 'boniface@ghh.com', '2023-02-27 18:06:54', '2023-02-27 18:06:54'),
(2, '$2b$15$yYjYhCsHWxvwm2VvL3Bj2OMG81dmisx7dmQjcxz.3mgh9o7A30yTO', 'boniface@ghh.comx', '2023-02-28 13:28:04', '2023-02-28 13:28:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `savings_groups`
--
ALTER TABLE `savings_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK__users` (`group_creator`);

--
-- Indexes for table `savings_groups_invites`
--
ALTER TABLE `savings_groups_invites`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `FK__users` (`sender_id`) USING BTREE,
  ADD KEY `FK_savings_groups_invites_users` (`receiver_id`),
  ADD KEY `FK_savings_groups_invites_savings_groups` (`group_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `savings_groups`
--
ALTER TABLE `savings_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `savings_groups_invites`
--
ALTER TABLE `savings_groups_invites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `savings_groups`
--
ALTER TABLE `savings_groups`
  ADD CONSTRAINT `FK__users` FOREIGN KEY (`group_creator`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `savings_groups_invites`
--
ALTER TABLE `savings_groups_invites`
  ADD CONSTRAINT `FK_savings_groups_invites_savings_groups` FOREIGN KEY (`group_id`) REFERENCES `savings_groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_savings_groups_invites_users` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `savings_groups_invites_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
