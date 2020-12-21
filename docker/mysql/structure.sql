START TRANSACTION;
CREATE TABLE `links`
(
    `id`        int(11) NOT NULL,
    `slug`      char(6)       NOT NULL,
    `host`      varchar(200)  NOT NULL,
    `is_secure` tinyint(1) NOT NULL,
    `path`      varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `host` (`host`,`is_secure`),
  ADD KEY `path` (`path`(20));


ALTER TABLE `links`
    MODIFY `id` int (11) NOT NULL AUTO_INCREMENT;
COMMIT;



ALTER TABLE `links` ADD `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `id`;
