-- phpMyAdmin SQL Dump
-- version 2.11.6
-- http://www.phpmyadmin.net
--
-- Hoszt: localhost
-- Létrehozás ideje: 2013. Máj 21. 02:51
-- Szerver verzió: 5.0.51
-- PHP Verzió: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Adatbázis: `complementer`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet: `jatekszam`
--

CREATE TABLE `jatekszam` (
  `azon` int(11) NOT NULL auto_increment,
  `jatekneve` text collate latin2_hungarian_ci NOT NULL,
  `jatekos` text collate latin2_hungarian_ci NOT NULL,
  PRIMARY KEY  (`azon`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin2 COLLATE=latin2_hungarian_ci AUTO_INCREMENT=8 ;

--
-- Tábla adatok: `jatekszam`
--

INSERT INTO `jatekszam` (`azon`, `jatekneve`, `jatekos`) VALUES
(3, 'traditional 4x5', 'aa'),
(4, 'traditional 4x5', 'bb'),
(5, 'traditional 4x5', 'cc'),
(6, 'traditional 4x5', 'dd'),
(7, 'traditional 4x5', 'ee');

-- --------------------------------------------------------

--
-- Tábla szerkezet: `toplista`
--

CREATE TABLE `toplista` (
  `id` int(11) NOT NULL auto_increment,
  `nev` text collate latin2_hungarian_ci NOT NULL,
  `pont` double NOT NULL,
  `ido` text collate latin2_hungarian_ci NOT NULL,
  `jatekfajta` text collate latin2_hungarian_ci NOT NULL,
  `mikor` date NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin2 COLLATE=latin2_hungarian_ci AUTO_INCREMENT=77 ;

--
-- Tábla adatok: `toplista`
--

INSERT INTO `toplista` (`id`, `nev`, `pont`, `ido`, `jatekfajta`, `mikor`) VALUES
(65, 'aa', 48.54, '0.206', 'traditional 4x5', '2013-05-19'),
(66, 'bb', 41.84, '0.239', 'traditional 4x5', '2013-05-19'),
(67, 'dd', 41.67, '0.24', 'traditional 4x5', '2013-05-19'),
(68, 'ee', 10.98, '0.911', 'traditional 4x5', '2013-05-19'),
(69, 'ff', 36.5, '0.274', 'traditional 4x5', '2013-05-19'),
(71, 'ii', 19.01, '0.526', 'traditional 4x5', '2013-05-19'),
(72, 'aa', 48.54, '0.206', 'traditional 4x5', '2013-05-19'),
(73, 'bb', 46.73, '0.214', 'traditional 4x5', '2013-05-19'),
(74, 'cc', 26.67, '0.375', 'traditional 4x5', '2013-05-19'),
(75, 'dd', 12.17, '0.822', 'traditional 4x5', '2013-05-19'),
(76, 'ee', 33.9, '0.295', 'traditional 4x5', '2013-05-19');
