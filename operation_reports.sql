SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `operation_reports` (
  `id` int(11) NOT NULL,
  `product_code` varchar(255) CHARACTER SET utf8 NOT NULL,
  `delivery_time` datetime DEFAULT NULL,
  `delivery_issue` varchar(255) CHARACTER SET utf8 NOT NULL,
  `delivery_efficiency` enum('ดีมาก','ดี','พอใช้','แย่','แย่มาก') CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `operation_reports` (`id`,`product_code`, `delivery_time`, `delivery_issue`, `delivery_efficiency`) VALUES
(1,'TH1', '', 'aaa','ดีมาก'),
(3,'TH3', '', 'bbb','ดี'),
(4,'TH4', '', 'bbb','พอใช้'),
(5,'TH5', '', 'bbb','แย่'),
(6,'TH6', '', 'bbb','แย่มาก');

ALTER TABLE `operation_reports`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `operation_reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;
