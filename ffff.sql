-- Table structure for table `warehouses`
--
CREATE TABLE `warehouses` (
  `id` int(11) NOT NULL,
  `warehouse_area` varchar(255) NOT NULL,
  `product_storage` varchar(255) NOT NULL,
  `area_arrangement` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
--
-- Table structure for table `operation_reports`
--
CREATE TABLE `operation_reports` (
  `id` int(11) NOT NULL,
  `delivery_time` datetime DEFAULT NULL,
  `delivery_issue` text,
  `delivery_efficiency` enum('ดีมาก','ดี','พอใช้','แย่','แย่มาก') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `shipments`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `warehouses`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `operation_reports`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `shipments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `warehouses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `operation_reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
