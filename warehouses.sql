

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";



CREATE TABLE `warehouses` (
  `id` int(11) NOT NULL,
  `warehouse_area` int(11) NOT NULL,
  `product_storage` enum('ระบบชั้นวาง','พาเลท','RFID') CHARACTER SET utf8 NOT NULL,
  `area_arrangement` enum('อาหาร','ของใช้สำนักงาน','ของใช้ครัวเรือน','เฟอร์นิเจอร์','อุปกรณ์อิเล็กทรอนิกส์') CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `warehouses` (`id`, `warehouse_area`, `product_storage`, `area_arrangement`) VALUES
(1, 500, 'ระบบชั้นวาง','ของใช้สำนักงาน'),
(3, 242, 'พาเลท', 'อาหาร'),
(4, 1125, 'RFID', 'ของใช้ครัวเรือน'),
(5, 663, 'RFID', 'อุปกรณ์อิเล็กทรอนิกส์'),
(6, 136, 'ระบบชั้นวาง','เฟอร์นิเจอร์');

ALTER TABLE `warehouses`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `warehouses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;


