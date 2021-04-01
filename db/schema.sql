DROP DATABASE IF EXISTS team_db;

CREATE DATABASE team_db;

CREATE TABLE department (

    id INTEGER(10) AUTO_INCREMENT NOT NULL;
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INTEGER(30) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INTEGER(30) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    role_id INT NOT NULL,
    manager_id VARCHAR NOT NULL,

);



