CREATE SCHEMA IF NOT EXISTS `outvoice` DEFAULT CHARACTER SET utf8 ;
USE `outvoice` ;

DROP TABLE IF EXISTS `outvoice`.`users` ;

CREATE TABLE IF NOT EXISTS `outvoice`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NULL,
  `password` VARCHAR(100) NULL,
  `email` VARCHAR(100) NULL,
  `status` TINYINT NOT NULL DEFAULT 0,
  `createDate` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO `outvoice`.`users` (`username`, `password`, `email`) VALUES ('admin', 'admin', 'admin@test.example.com');