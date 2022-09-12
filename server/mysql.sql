CREATE DATABASE IF NOT EXISTS crud_subject;

USE crud_subject;

CREATE TABLE subject_db (
  `id` INT NOT NULL AUTO_INCREMENT,
  `subject` VARCHAR(100) NOT NULL,
  `lecturer` VARCHAR(100) NOT NULL,
  `load` INT NOT NULL,
  PRIMARY KEY (`id`));


INSERT INTO subject_db(subject, lecturer, work_load) VALUES('Kotijooks', 'Kott Jooks', 10);