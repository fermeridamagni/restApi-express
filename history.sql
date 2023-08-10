CREATE TABLE `restapi`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `full_name` VARCHAR(45) GENERATED ALWAYS AS (concat(first_name,' ',last_name)) VIRTUAL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
PRIMARY KEY (`id`));