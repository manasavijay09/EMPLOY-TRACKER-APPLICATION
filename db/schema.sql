DROP DATABASE IF EXISTS employ_db;
CREATE DATABASE employ_db;

USE employ_db_db;

CREATE TABLE department (
  id INT NOT NULL,
  name  VARCHAR(30) NOT NULL
  
);

CREATE TABLE role (
  id INT NOT NULL,
  title  VARCHAR(30) NOT NULL,
  salary Decimal NOT NULL,
  department_id INT NOT NULL
  
);
CREATE TABLE employee (
  id INT NOT NULL,
  first_name  VARCHAR(30) NOT NULL,
  last_name  VARCHAR(30) NOT NULL,
  department_id INT NOT NULL,
  role_id INT NOT NULL,
  manger_id INT NOT NULL
  
);