INSERT INTO department (name)
VALUES ("Finance"),
       ("HR"),
       ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Finance Analyst", "200000", 1),
       ("Recruiter", "150000", 2),
       ("Front-end", "180000", 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Mary", "Dillon", 1),
       ("John", "Doe", 2),
       ("Jane", "Smith", 3);