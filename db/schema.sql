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

INSERT INTO department (name) 
VALUES ("Sales"), ("Human Resources"), ("Logistics"), ("Legal"), ("Accounting"), ("Development"), ("Management");

INSERT INTO role (title, salary, department_id)
VALUES ("Project Manager", "120000", "1"), ("Junior Developer", "85000", "2"), ("Senior Deveolper", "150000", "2"), ("Website Sales", "100000", "3"), ("Server Sales", "100000", "3"), ("Human Resources Specialist", "65000", "4"),
("Office Manager", "60000", "5") , ("Lawyer", "150000", "6"), ("Accountant", "85000", "7")



