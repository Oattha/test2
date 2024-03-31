

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `shipments` (
  `id` char(10) NOT NULL,
  `product_code` varchar(255) CHARACTER SET utf8 NOT NULL,
  `source_destination` varchar(255) CHARACTER SET utf8 NOT NULL,
  `delivery_status` enum('รอการจัดส่ง','กำลังจัดส่ง','จัดส่งแล้ว') CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `shipments` (`id`, `product_code`, `source_destination`, `delivery_status`) VALUES
(1, 'aaa', 'aaa','รอการจัดส่ง'),
(3, 'bbb', 'bbb','กำลังจัดส่ง'),
(4, 'bbb', 'bbb','จัดส่งแล้ว'),
(5, 'bbb', 'bbb','กำลังจัดส่ง'),
(6, 'bbb', 'bbb','รอการจัดส่ง');



ALTER TABLE `shipments`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `shipments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;
