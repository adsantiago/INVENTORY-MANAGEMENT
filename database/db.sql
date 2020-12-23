CREATE DATABASE inventory_database;

-- Using database
USE inventory_database;

-- Reports table
CREATE TABLE reports (
	id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	month VARCHAR(20) NOT NULL,
	description VARCHAR(100) NOT NULL,
	created_at timestamp NOT NULL DEFAULT current_timestamp
);

-- Products table
CREATE TABLE products (
    id INT(10) AUTO_INCREMENT PRIMARY KEY,
    product VARCHAR(50) NOT NULL,
    value VARCHAR(100) NOT NULL,
    quantity VARCHAR(100) NOT NULL, 
    report_id INT(10) NOT NULL
);

-- Multiplicate product * quality
-- CREATE TRIGGER get_total BEFORE INSERT ON products FOR EACH ROW BEGIN UPDATE products SET total = NEW.value * NEW.quantity; END; $$