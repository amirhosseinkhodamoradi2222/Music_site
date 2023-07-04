-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 21, 2021 at 05:57 PM
-- Server version: 10.5.4-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `music site`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `user_name` varchar(10) COLLATE utf8_persian_ci NOT NULL,
  `password` varchar(20) COLLATE utf8_persian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`user_name`, `password`) VALUES
('3790467006', '123456789');

-- --------------------------------------------------------

--
-- Table structure for table `advertising`
--

DROP TABLE IF EXISTS `advertising`;
CREATE TABLE IF NOT EXISTS `advertising` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `src` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `link` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `advertising`
--

INSERT INTO `advertising` (`id`, `src`, `link`) VALUES
(7, 'images (1).jfif', 'یبسبسب'),
(8, 'images.jfif', 'ظزطرطزر');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) COLLATE utf8_persian_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `text` text COLLATE utf8_persian_ci NOT NULL,
  `id_music` int(11) NOT NULL,
  `condition` int(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_music` (`id_music`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `name`, `email`, `text`, `id_music`, `condition`) VALUES
(10, 'علی', 'amirhossenkhodamoradi@gmail.com', 'عاللی بود', 3, 1),
(18, 'khodamoradi', 'amirhossenkhodamoradi@gmail.com', 'سلام', 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `concert`
--

DROP TABLE IF EXISTS `concert`;
CREATE TABLE IF NOT EXISTS `concert` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `img` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `text` text COLLATE utf8_persian_ci NOT NULL,
  `history` varchar(20) COLLATE utf8_persian_ci NOT NULL,
  `link` varchar(40) COLLATE utf8_persian_ci NOT NULL,
  `date` varchar(20) COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `concert`
--

INSERT INTO `concert` (`id`, `title`, `img`, `text`, `history`, `link`, `date`) VALUES
(1, 'کنسرت محمدرضا گلزار \r\n', 'golzar.jpg', 'کنسرت محمدرضا گلزار خواننده پاپ کشور شامگاه جمعه در سالن میلاد نمایشگاه بین المللی تهران برگزار میشود.', '10/11/1399', 'https://www.iranconcert.com/', '5:20'),
(4, 'کنسرت جدید هوروش بند', 'سسسسسش.jpg', '<p>کنسرت جدید هوروش بند</p>\r\n', '10/02/1400', 'dd', '10');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
CREATE TABLE IF NOT EXISTS `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `text` text COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `name`, `email`, `text`) VALUES
(3, 'رضا', 'amirhossenkhodamoradi@gmail.com', 'سلام'),
(11, 'امیر حسین', 'amirhossenkhodamoradi@gmail.com', 'salam');

-- --------------------------------------------------------

--
-- Table structure for table `cotgory`
--

DROP TABLE IF EXISTS `cotgory`;
CREATE TABLE IF NOT EXISTS `cotgory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `cotgory`
--

INSERT INTO `cotgory` (`id`, `name`) VALUES
(1, 'پاپ'),
(2, 'شاد '),
(3, 'غمگین'),
(4, 'سنتی'),
(5, 'مداحی'),
(6, 'دمو'),
(7, 'در انتظار پخش'),
(9, 'رپ'),
(10, 'مجلسی');

-- --------------------------------------------------------

--
-- Table structure for table `music`
--

DROP TABLE IF EXISTS `music`;
CREATE TABLE IF NOT EXISTS `music` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) COLLATE utf8_persian_ci NOT NULL,
  `id_singer` int(11) NOT NULL,
  `history` varchar(10) COLLATE utf8_persian_ci NOT NULL,
  `text` text COLLATE utf8_persian_ci NOT NULL,
  `img` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  `music` varchar(100) COLLATE utf8_persian_ci NOT NULL,
  `id_catgory` int(11) NOT NULL,
  `new_music` int(1) NOT NULL,
  `popular` int(1) NOT NULL,
  `condition` int(1) NOT NULL,
  `title` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_singer` (`id_singer`),
  KEY `id_catgory` (`id_catgory`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `music`
--

INSERT INTO `music` (`id`, `name`, `id_singer`, `history`, `text`, `img`, `music`, `id_catgory`, `new_music`, `popular`, `condition`, `title`) VALUES
(1, 'amir  ', 1, '10/11/1399', '<p>دانلود آهنگ جدید بنیامین بهادری رفیق هم اکنون رسانه آپ موزیک ترانه رفیق از بنیامین بهادری را برای شما کاربران آماده کرده است</p>\r\n', 'dsf.jpg', 'Amir Tataloo -  Navazesh [320].mp3', 1, 1, 1, 1, ' بنیامین بهادری رفیق'),
(2, 'دلم تنگه  ', 1, '10/21/1399', '<p>در این ساعت از رسانه موزیکفا شنونده ♫ آهنگ با انگشت همه نشون میدن منو از هوروش باند به همراه تکست و بهترین کیفیت باشید ♫</p>\r\n', 'dsf.jpg', 'horosh.mp3', 1, 1, 1, 1, 'اهنگ هوروش بند'),
(3, 'کربلا  ', 1, '10/11/1399', '<p>کربلا کربلا کربلااللهم ارزقنا کربلا کربلا کربلااللهم ارزقنا از کوچکی عشق تو شد برا دلم بهونه&zwnj;ای اونقده عاشقت شدم همه میگن دیوونه&zwnj;ای اون زمونا تا میدیدم دلم اسیر ماتمه صدایی تو دلم میگفت بیا که باز محرمه کربلا کربلا کربلااللهم ارزقنا کربلا کربلا کربلااللهم ارزقنا از کوچه&zwnj;های عشق تو خاطره&zwnj;ها تو سرمه از کوچه&zwnj;های عشق تو خاطره&zwnj;ها تو سرمه لباس سیامو میبینی این هدیه&zwnj;ی مادرمه لباس سیامو میبینی این هدیه ی مادرمه بازم صدایی تو دلم میگه بهار ماتمه لباس سیامو بیارین ماه خدا محرمه کربلا کربلا کربلااللهم ارزقنا کربلا کربلا کربلااللهم ارزقنا دانلود مداحی کربلا کربلا اللهم ارزقنا بنی فاطمه یه دل دارم مال تو همیشه دنبال تو از اون قدیم وابسته&zwnj;ی سیاهیه شال تو دلی که مست عشق توست خسته از این زمونه شد بوی محرم و شنید یه بار دیگه دیوونه شد کربلا کربلا کربلااللهم ارزقنا کربلا کربلا کربلااللهم ارزقنا کوچیک بودم که مادرم حرز تو گردنم میکرد وقتی محرم می&zwnj;اومد لباس سیاه تنم میکرد بزرگترای من منو به مجلس تو برده&zwnj;اند هوام و داشته باش آقا منو به تو سپرده&zwnj;اند علقمه علقمه علقمه اللهم ارزقنا علقمه علقمه علقمه اللهم ارزقنا قتلگاه قتلگاه قتلگاه اللهم ارزقنا خیمه گاه خیمه گاه خیمه گاه اللهم ارزقنا مست تؤام مست تؤام باده به پیمانه بریز کبوتر بام تؤام برای من دونه بریز هر کی به من دونه بده من سر بامش نمیرم هر کی به من دونه بده من سر بامش نمیرم اگه تو سنگم بزنی از بام تو نمی پرم کربلا کربلا کربلااللهم ارزقنا علقمه علقمه علقمه اللهم ارزقنا بنی فاطمه</p>\r\n', 'dsf.jpg', 'یی', 5, 0, 0, 1, 'کربلا'),
(34, 'محمدرضا گلزار به دادم برس  ', 9, '21/11/1399', '<p>تند رفتی من ازت جا موندم دنیا با من نساخت از همون موقع بچه که بودم&nbsp;<strong>♫♪♭</strong><br />\r\nبهترینم آخر باهام رو به رو شد واسه من دنیا همون موقع که تو رفتی تموم شد<br />\r\nبعد از تو هر کی باز بیاد پر نمیکنه جای خالیتو&nbsp;<strong>♫♪♭</strong><br />\r\nمن صبح تا شب دنبالتم چجوری چرا انقد بی خیالی تو<br />\r\nبه دادم برسدستامو بگیر من قلاب نیستم و ماهی تو&nbsp;<strong>♫♪♭</strong><br />\r\nبه خاطر روزای خوبمون بیا بذار جلو پام یه راهی تو<br />\r\nبعد از تو هر کی باز بیاد پر نمیکنه جای خالیتو&nbsp;<strong>♫♪♭</strong><br />\r\nمن صبح تا شب دنبالتم چجوری چرا انقد بی خیالی تو</p>\r\n', 'Golzar.jpg', 'Mohammadreza Golzar _ Be Dadam Beres (128).mp3', 1, 1, 0, 1, 'به دادم برس');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `img` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `text` text COLLATE utf8_persian_ci NOT NULL,
  `date` varchar(20) COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `img`, `text`, `date`) VALUES
(1, 'درگذشت محمد رضا شجریان       ', 'shajrean.jpg', '<p>درباره خسرو آواز ایران نوشتن و از روزهای آخرش شنیدن، سخت است. چشم&zwnj;هایم در حین مصاحبه چند بار پر می&zwnj;شوند. تصویرها در ذهنم می&zwnj;روند و می&zwnj;آیند و گاهی از بعد زمان خارج می&zwnj;شوم اما او آن قدر خوش&zwnj;سخن است که دوباره مرا برمی&zwnj;گرداند پای همان میز شیشه&zwnj;ای دفتر ریاست بیمارستان. &laquo;بابک حیدری اقدم&raquo; که به همراه دکتر عباسی و کادر درمان همه این سال&zwnj;ها را بالای سر شجریان بودند، حالا در گفت&zwnj;وگویی با همشهری از روز آخر می&zwnj;گوید؛ از سختی پزشک معالج شجریان بودن، وقتی هم عاشق باشی، هم مسئول. دکتر حیدری اقدم در خلال مصاحبه بارها تاکید می&zwnj;کند که تمام پرسنل بیمارستان به استاد ارادت خاصی داشتند و برای همین هرگز به خود اجازه ندادند <strong>عکسی</strong> از حال نامساعد ایشان بردارند یا منتشر کنند. خودش می&zwnj;گوید روز آخر که کار تمام شد، بیمارستان را ترک می&zwnj;کند و می&zwnj;رود در کنج تنهایی&zwnj;اش یک دل سیر گریه می&zwnj;کند که باور دنیای بدون شجریان برای همه انگار، ممکن نیست.</p>\r\n', '1400');

-- --------------------------------------------------------

--
-- Table structure for table `send_music`
--

DROP TABLE IF EXISTS `send_music`;
CREATE TABLE IF NOT EXISTS `send_music` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) COLLATE utf8_persian_ci NOT NULL,
  `family` varchar(60) COLLATE utf8_persian_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `src_music` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `singer`
--

DROP TABLE IF EXISTS `singer`;
CREATE TABLE IF NOT EXISTS `singer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `singer`
--

INSERT INTO `singer` (`id`, `name`) VALUES
(1, 'بنیامین بهادری'),
(2, 'هوروش بند '),
(3, 'رادین  '),
(5, 'امو بند '),
(6, 'رضا بهرام'),
(7, 'محسن ابراهیم زاده'),
(8, 'مهدی احمدوند'),
(9, 'محمد رضا گلزار');

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
CREATE TABLE IF NOT EXISTS `video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(40) COLLATE utf8_persian_ci NOT NULL,
  `src` varchar(40) COLLATE utf8_persian_ci NOT NULL,
  `condition` int(1) NOT NULL,
  `text` text COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`id`, `title`, `src`, `condition`, `text`) VALUES
(13, 'موزیک ویدئو جدید هوروش بند', 'horosh.mp4', 1, '<p>متن آهنگ آخر منو به باد داد هوروش باند پنهون نشو هی رو برنگردون دیوونه میشم این رسمش نبود که عاشق کنی و نمونی پیشم تو خوابم نمیدیدم زندگیمو وقف تو باشه آره راحت میگفتم جونمو بره من عاشق نمیشم</p>\r\n');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`id_music`) REFERENCES `music` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `music`
--
ALTER TABLE `music`
  ADD CONSTRAINT `id_catgory` FOREIGN KEY (`id_catgory`) REFERENCES `cotgory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `music_ibfk_1` FOREIGN KEY (`id_singer`) REFERENCES `singer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
