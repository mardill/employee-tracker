const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express')
const mysql = require('mysql2');
const cTable = require('console.table')

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'password',
        database: 'employee_db'
    },
    console.log(`Connected to the movies_db database.`)
);

const prompt = () => {
inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Departments',
            'View All Roles',
            'View All Employees',
        'Quit'],
        name: 'options'
    }
]).then((responses) => {
    if (responses.options === 'View All Departments') {
        viewAllDepts();
    };
    if (responses.options === 'View All Roles') {
        viewAllRoles();
    };
    if (responses.options === "View All Employees") {
        viewAllEmps();
    }
    if(responses.options === 'Quit'){
        db.end();
    }
})
}

const viewAllDepts = () => {
    var query = `select name, id from department`;
    db.query(query, function (err, results) {
        console.table(results);
        prompt()
    })
}

const viewAllRoles = () => {
    var query = `select 
     r.title as job_title, 
     r.id as role_id, 
     r.salary, 
     d.name as dept_name
     from role r 
     inner join department d on r.department_id = d.id`;
    db.query(query, function (err, results) {
        console.table(results);
        prompt();
    })
}

const viewAllEmps = () => {
    var query = `select e.id as emp_id, 
    e.first_name, 
    e.last_name, 
    r.title, 
    r.salary, 
    d.name as dept_name 
    from employee e 
    inner join role r on r.id = e.role_id 
    inner join department d on d.id = r.department_id`;
    db.query(query, function (err, results) {
        console.table(results);
        prompt();
    })
}

prompt()