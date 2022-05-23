-- source seeds file to pre populate database
INSERT INTO department (name)
VALUES
("Sales"),
("Marketing"),
("Finance"),
("Customer Service"),
("Engineering");

INSERT INTO roles (title, salary, department_id)
VALUES
("Salesperson", 60000, 1),
("Marketing Director", 80000, 2),
("Accountant", 70000, 3),
("Customer Service Agent", 50000, 4),
("Engineer", 90000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("John", "Smith", 1, 2),
("Cary", "Logan", 2, NULL),
("Peter", "Park", 3, 4),
("James", "Carpenter", 4, 5),
("Jane", "Carter", 5, NULL );