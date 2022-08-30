DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
    id INT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    -- FOREIGN KEY (department_id)
    -- REFERENCES departments(id)
    -- ON DELETE SET NULL
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id VARCHAR(30),
    manager_id INT,
    PRIMARY KEY(id)
    -- FOREIGN KEY (role_id)
    -- REFERENCES roles(id)
    -- ON DELETE SET NULL
);
