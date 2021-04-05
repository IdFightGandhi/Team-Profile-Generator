DROP DATABASE IF EXISTS team_db;

CREATE DATABASE team_db;

USE team_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(65,2) NOT NULL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

INSERT INTO department (name) 
VALUES ("Sales"), ("Human Resources"), ("Logistics"), ("Legal"), ("Accounting"), ("Development"), ("Management");

INSERT INTO role (title, salary, department_id)
VALUES ("Project Manager", "120000", "1"), ("Junior Developer", "85000", "2"), ("Senior Deveolper", "150000", "2"), ("Website Sales", "100000", "3"), ("Server Sales", "100000", "3"), ("Human Resources Specialist", "65000", "4"),
("Office Manager", "60000", "5") , ("Lawyer", "150000", "6"), ("Accountant", "85000", "7");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Will", "Thorne",1,NULL);