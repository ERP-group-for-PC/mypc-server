DROP DATABASE IF EXISTS mypc;
CREATE DATABASE IF NOT EXISTS mypc;
USE mypc;

DROP TABLE IF EXISTS sys_relate_list;
DROP TABLE IF EXISTS sys_dic;
DROP TABLE IF EXISTS sys_dic_value;
DROP TABLE IF EXISTS sys_role;
DROP TABLE IF EXISTS sys_post;
DROP TABLE IF EXISTS sys_department;
DROP TABLE IF EXISTS sys_user;
DROP TABLE IF EXISTS sys_factory;
DROP TABLE IF EXISTS sys_bom;
DROP TABLE IF EXISTS sys_craft_path;
DROP TABLE IF EXISTS sys_storage;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS customer_address;
DROP TABLE IF EXISTS report_product;
DROP TABLE IF EXISTS report_seller;
DROP TABLE IF EXISTS market_order;
DROP TABLE IF EXISTS market_order_detail;
DROP TABLE IF EXISTS market_cancel_detail;
DROP TABLE IF EXISTS supplier;
DROP TABLE IF EXISTS supplier_detail;
DROP TABLE IF EXISTS purchase_order;
DROP TABLE IF EXISTS purchase_order_detail;
DROP TABLE IF EXISTS purchase_cancel_detail;
DROP TABLE IF EXISTS work_order;
DROP TABLE IF EXISTS factory_info;
DROP TABLE IF EXISTS material_list;
DROP TABLE IF EXISTS work_mission;

-- COMMENT: 这个表用来存储外键信息，`main_table`是主表名, `slave_table`是从表名
CREATE TABLE IF NOT EXISTS sys_relate_list
(
    `id` INT(5) NOT NULL AUTO_INCREMENT,
    `main_table` VARCHAR(30) NOT NULL,
    `main_key` VARCHAR(30) NOT NULL,
    `slave_table` VARCHAR(30) NOT NULL,
    `slave_key` VARCHAR(30) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS sys_dic
(
    `id` INT(3) NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(30) NOT NULL,
    `const` TINYINT(1) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS sys_dic_value
(
    `id` INT(3) NOT NULL,
    `value` VARCHAR(30) NOT NULL,
    `default` VARCHAR(30) NOT NULL,
    `stable` TINYINT(1) NOT NULL,
    PRIMARY KEY (`id`)
);
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_dic', 'id', 'sys_dic_value', 'id');

CREATE TABLE IF NOT EXISTS sys_role
(
    `id` INT(3) NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(10) NOT NULL,
    PRIMARY KEY (`id`, `role`)
);

CREATE TABLE IF NOT EXISTS sys_post
(
    `id` INT(3) NOT NULL AUTO_INCREMENT,
    `post` VARCHAR(30) NOT NULL,
    `short` VARCHAR(10),
    `role_id` INT(3) NOT NULL,
    PRIMARY KEY (`id`)
);
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_role', 'id', 'sys_post', 'role_id');

CREATE TABLE IF NOT EXISTS sys_department
(
    `id` INT(3) NOT NULL AUTO_INCREMENT,
    `department` VARCHAR(15) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS sys_user
(
    `id` VARCHAR(5) NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `account` VARCHAR(30) NOT NULL,
    `password` VARCHAR(30) NOT NULL,
    `gender` INT,
    `age` INT,
    `department_id` INT NOT NULL,
    `post_id` INT NOT NULL,
    PRIMARY KEY (`id`)
);
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_department', 'id', 'sys_user', 'department_id');
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_post', 'id', 'sys_user', 'post_id');

CREATE TABLE IF NOT EXISTS sys_factory
(
    `id` INT(3) NOT NULL AUTO_INCREMENT,
    `center_num` INT NOT NULL,
    `comment` VARCHAR(255),
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS sys_bom
(
    `id` INT(5) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS sys_craft_path
(
    `id` INT(5) NOT NULL AUTO_INCREMENT,
    `procedure` VARCHAR(5) NOT NULL, 
    `material_id` INT(5) NOT NULL,
    `father` INT(5) NOT NULL,
    `duration` INT NOT NULL,
    `factory_id` INT(3) NOT NULL,
    PRIMARY KEY (`id`)
);
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_bom', 'id', 'sys_craft_path', 'material_id');
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_bom', 'id', 'sys_craft_path', 'father');
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_factory', 'id', 'sys_craft_path', 'factory_id');

CREATE TABLE IF NOT EXISTS sys_storage
(
    `id` INT(3) NOT NULL AUTO_INCREMENT,
    `capacity` INT NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS customer
(
    `id` INT(5) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `tel` VARCHAR(15),
    `email` VARCHAR(30),
    `level` FLOAT NOT NULL,
    `tags` VARCHAR(15),
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS customer_address
(
    `id` INT(5) NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`, `address`)
);
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('customer', 'id', 'customer_address', 'id');

CREATE TABLE IF NOT EXISTS report_product
(
    `date` DATE NOT NULL,
    `material_id` INT(5) NOT NULL,
    `sales` INT NOT NULL,
    PRIMARY KEY (`date`, `material_id`)
);
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_bom', 'id', 'report_product', 'material_id');

CREATE TABLE IF NOT EXISTS report_seller
(
    `date` DATE NOT NULL,
    `staff_id` VARCHAR(5) NOT NULL,
    `sales` INT NOT NULL,
    PRIMARY KEY (`date`, `staff_id`)
);
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_user', 'id', 'report_seller', 'staff_id');

CREATE TABLE IF NOT EXISTS market_order
(
    `id` INT(5) NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `customer_id` INT(5) NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `staff_id` VARCHAR(5) NOT NULL,
    PRIMARY KEY (`id`)
);
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('customer', 'id', 'market_order', 'customer_id');
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_user', 'id', 'market_order', 'staff_id');


CREATE TABLE IF NOT EXISTS market_order_detail
(
    `order_id` INT(5) NOT NULL,
    `material_id` INT(5) NOT NULL,
    `number` INT NOT NULL,
    PRIMARY KEY (`order_id`, `material_id`)
);
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('market_order', 'id', 'market_order_detail', 'order_id');
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_bom', 'id', 'market_order', 'material_id');

CREATE TABLE IF NOT EXISTS market_cancel_detail
(
    `order_id` INT(5) NOT NULL,
    `date` DATE NOT NULL,
    `material_id` INT(5) NOT NULL,
    `number` INT NOT NULL,
    PRIMARY KEY (`order_id`, `material_id`, `date`)
);
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('market_order', 'id', 'market_order_detail', 'order_id');
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_user', 'id', 'market_order', 'staff_id');

CREATE TABLE IF NOT EXISTS supplier
(
    `id` INT(5) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `tel` VARCHAR(15),
    `email` VARCHAR(30),
    `level` FLOAT NOT NULL,
    `tags` VARCHAR(15),
    `discount` FLOAT NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS supplier_detail
(
    `supplier_id` INT(5) NOT NULL,
    `material_id` INT(5) NOT NULL,
    PRIMARY KEY (`supplier_id`, `material_id`)
);
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('supplier', 'id', 'supplier_detail', 'supplier_id');
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_bom', 'id', 'supplier_detail', 'material_id');

CREATE TABLE IF NOT EXISTS purchase_order
(
    `id` INT(5) NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `supplier_id` INT(5) NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `staff_id` VARCHAR(5) NOT NULL,
    PRIMARY KEY (`id`)
);
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('supplier', 'id', 'purchase_order', 'supplier_id');
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_user', 'id', 'purchase_order', 'staff_id');

CREATE TABLE IF NOT EXISTS purchase_order_detail
(
    `order_id` INT(5) NOT NUll,
    `material_id` INT(5) NOT NULL,
    `number` INT NOT NULL,
    PRIMARY KEY (`order_id`, `material_id`)
);
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('purchase_order', 'id', 'purchase_order_detail', 'order_id');
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_bom', 'id', 'purchase_order_detail', 'material_id');

CREATE TABLE IF NOT EXISTS purchase_cancel_detail
(
    `order_id` INT(5) NOT NULL,
    `date` DATE NOT NULL,
    `material_id` INT(5) NOT NULL,
    `number` INT NOT NULL,
    PRIMARY KEY (`order_id`, `material_id`, `date`)
);
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('purchase_order', 'id', 'purchase_cancel_detail', 'order_id');
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_bom', 'id', 'purchase_cancel_detail', 'material_id');

CREATE TABLE IF NOT EXISTS work_order
(
    `id` VARCHAR(15) NOT NULL,
    `priority` FLOAT NOT NULL,
    `date` DATE NOT NULL,
    `procedure_id` VARCHAR(5) NOT NULL,
    `staff_id` VARCHAR(5) NOT NULL,
    PRIMARY KEY (`id`)
);
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_craft_path', 'id', 'work_order', 'procedure_id');
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_user', 'id', 'work_order', 'staff_id');

CREATE TABLE IF NOT EXISTS factory_info
(
    `factory_id` INT(3) NOT NULL,
    `staff_id` VARCHAR(5) NOT NULL,
    PRIMARY KEY (`factory_id`, `staff_id`)
);
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_factory', 'id', 'factory_info', 'factory_id');
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_user', 'id', 'factory_info', 'staff_id');

CREATE TABLE IF NOT EXISTS material_list
(
    `staff_id` VARCHAR(5) NOT NULL,
    `date` DATE NOT NULL,
    `material_id` INT(5) NOT NULL,
    `num` INT NOT NULL,
    PRIMARY KEY (`staff_id`, `material_id`)
);
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_user', 'id', 'material_list', 'staff_id');
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_bom', 'id', 'material_list', 'material_id');

CREATE TABLE IF NOT EXISTS work_mission
(
    `procedure_id` INT(3) NOT NULL,
    `start` DATE NOT NULL,
    `end` DATE NOT NULL,
    `num` INT NOT NULL,
    PRIMARY KEY (`procedure_id`)
);
INSERT INTO sys_relate_list (`main_table`, `main_key`, `slave_table`, `slave_key`) 
VALUES ('sys_craft_path', 'id', 'work_mission', 'procedure_id');


