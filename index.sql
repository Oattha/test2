SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `warehouses` (
  `id` char(10) NOT NULL,
  `warehouse_area` int(11) NOT NULL,
  `product_storage` enum('ระบบชั้นวาง','พาเลท','RFID') CHARACTER SET utf8 NOT NULL,
  `area_arrangement` enum('อาหาร','ของใช้สำนักงาน','ของใช้ครัวเรือน','เฟอร์นิเจอร์','อุปกรณ์อิเล็กทรอนิกส์') CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `warehouses` (`id`, `warehouse_area`, `product_storage`, `area_arrangement`) VALUES
('TH11', 500, 'ระบบชั้นวาง','ของใช้สำนักงาน'),
('TH12', 242, 'พาเลท', 'อาหาร'),
('TH13', 1125, 'RFID', 'ของใช้ครัวเรือน'),
('TH14', 663, 'RFID', 'อุปกรณ์อิเล็กทรอนิกส์'),
('TH15', 136, 'ระบบชั้นวาง','เฟอร์นิเจอร์');

CREATE TABLE `operation_reports` (
  `id` char(10) NOT NULL,
  `delivery_time` datetime DEFAULT NULL,
  `delivery_issue` varchar(255) CHARACTER SET utf8 NOT NULL,
  `delivery_efficiency` enum('ดีมาก','ดี','พอใช้','แย่','แย่มาก') CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `operation_reports` (`id`, `delivery_time`, `delivery_issue`, `delivery_efficiency`) VALUES
('TH11', '', 'aaa','ดีมาก'),
('TH12', '', 'bbb','ดี'),
('TH13', '', 'bbb','พอใช้'),
('TH14', '', 'bbb','แย่'),
('TH15', '', 'bbb','แย่มาก');

CREATE TABLE `shipments` (
  `id` char(10) NOT NULL,
  `product_code` varchar(255) CHARACTER SET utf8 NOT NULL,
  `source_destination` varchar(255) CHARACTER SET utf8 NOT NULL,
  `delivery_status` enum('รอการจัดส่ง','กำลังจัดส่ง','จัดส่งแล้ว') CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `shipments` (`id`, `product_code`, `source_destination`, `delivery_status`) VALUES
('TH11', 'aaa', 'aaa','รอการจัดส่ง'),
('TH12', 'bbb', 'bbb','กำลังจัดส่ง'),
('TH13', 'bbb', 'bbb','จัดส่งแล้ว'),
('TH14', 'bbb', 'bbb','กำลังจัดส่ง'),
('TH15', 'bbb', 'bbb','รอการจัดส่ง');
