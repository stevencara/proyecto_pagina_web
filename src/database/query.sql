CREATE DATABASE Prueba02;

USE Prueba02;

CREATE TABLE personas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    age INT
);

SELECT *FROM personas;

CREATE USER 'prueba02'@'localhost' IDENTIFIED BY 'prueba02';
GRANT ALL PRIVILEGES ON prueba02.* TO 'prueba02'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'prueba02'@'localhost';