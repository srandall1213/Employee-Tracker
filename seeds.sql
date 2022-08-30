INSERT INTO departments (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES 
    ("Sales Lead", 100000, 1), ("Salesperson", 80000, 2), 
    ("Lead Engineer", 150000, 3), ("Software Engineer", 120000, 4), 
    ("Account Manager", 160000, 5), ("Accountant", 125000, 6),
    ("Legal Team Lead", 250000, 7), ("Lawyer", 190000, 8);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Doe", "Sales Lead", null), ("Mike", "Chan", "Salesperson", "John Doe"),
    ("Ashley", "Rodriguez", "Lead Engineer", null), ("Kevin", "Tupik", "Software Engineer", "Ashley Rodriguez"),
    ("Kunal", "Singh", "Account Manager", null), ("Malia", "Brown", "Accountant", "Kunal Singh"),
    ("Sarah", "Lourd", "Legal Team Lead", null), ("Tom", "Allen", "Lawyer", "Sarah Lourd");