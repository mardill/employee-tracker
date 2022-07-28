const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express')
const mysql = require('mysql2');


const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      database: 'movie_db'
    },
    console.log(`Connected to the movies_db database.`)
  );

inquirer.prompt(
    [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees'],
        name: 'options'
    }
]
)
.then((responses) => {

        if(responses.options === 'View All Departments'){
            console.log(db.query('select name, id from department'))
        };
        if(responses.options === 'View All Roles'){
            return db.query('select title as r.job_title, r.id as role_id, r.salary, d.name from role r inner join department d on r.department_id = d.id')
        };
        if(responses.options === "View All Employees"){
            return db.query('select e.id as emp_id, e.first_name, e.last_name, r.title, r.salary, d.name as dept_name from employee e inner join role r on r.id = e.role_id inner join department d on d.id = r.department_id')
        }
 })
