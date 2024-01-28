DROP DATABASE IF EXISTS employ_db;
CREATE DATABASE employ_db;

USE employ_db;

CREATE TABLE department (
  id INT NOT NULL,
  name  VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
  
);

CREATE TABLE role (
  id INT NOT NULL PRIMARY KEY,
  title  VARCHAR(30) NOT NULL,
  salary Decimal NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
  
  );

CREATE TABLE employee (
  id INT NOT NULL,
  first_name  VARCHAR(30) NOT NULL,
  last_name  VARCHAR(30) NOT NULL,
  department_id INT NOT NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL,
  manger_id INT NULL,
  FOREIGN KEY (manger_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
  
);