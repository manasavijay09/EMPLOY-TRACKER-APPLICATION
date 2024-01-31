
// Import and require mysql2
const mysql = require('mysql2');

const inquirer = require("inquirer");
require("dotenv").config()
require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: process.env.DB_PASSWORD,
    database: 'employee_db'
  },

  console.log(`Connected to the employee_db database.`)

);


function startMenu() {
  inquirer.prompt([
    {
      type: "list",
      name: "options",
      message: "What would you like to do?",
      choices: ["View all Department", "view All Roles", "view All Employees", "Add Department","Add Role","Add an employ", "update Employee Role","Exit App"]
    }
  ]).then(({ options }) => {
    switch (options) {
      case "View all Department":
        viewDepartment();
        break;
      case "view all Roles":
        viewAllRoles();
        break;
      case "view all employees":
        viewAllEmployees();
        break;
      case "Add Department":
        addDepartment();
        break;
        case "Add  Role":
        addRole();
        break;
        case "Add an employ":
          addRole();
          break;
        case "update employee role":
          updateEmployeeRole();
        break;
        default:
        db.end();
        process.exit(0)
    }
  })
}


function viewDepartment() {
  db.query("SELECT * FROM department;", function (err, data) {
    if (err) throw err;
    console.table(data);
    startMenu()
  })
}

function viewAllRoles() {
  db.query("SELECT * FROM role;", function (err, data) {
    if (err) throw err;
    console.table(data);
    startMenu()
  })
}
function viewAllEmployees() {
  db.query("SELECT * FROM employee;", function (err, data) {
    if (err) throw err;
    console.table(data);
    startMenu()
  })
}

function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      name: "department_name",
      message: "Enter Department name?"
    }
  ]).then(({ department_name }) => {
    db.query("INSERT INTO department(name) VALUES(?);", department_name, function (err, data) {
      if (err) throw err;
      console.table(data);
      startMenu()
    })
  })

}
function addRole() {

  db.query("SELECT * FROM department;", function (err, data) {
    if (err) throw err;
    let department_list = []
    for (let i = 0; i < data.length; i++) {
      department_list.push({
        name: data[i].name,
        value: data[i].id
      })
    }


    inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Enter Role title?"
      },
      {
        type: "input",
        name: "salary",
        message: "Enter Salary for Role?"
      },
      {
        type: "list",
        name: "department_id",
        message: "Select Department for this role?",
        choices: "department_list"
      }
    ]).then(({ department_name }) => {
      db.query("INSERT INTO department(name) VALUES(?);", [department_name], function (err, data) {
        if (err) throw err;
        console.table(data);
        startMenu()
      })
    })
  })
}

function AddanEmploy() {

  db.query("SELECT * FROM role;", function (err, data) {
    if (err) throw err;
    let department_list = []
    for (let i = 0; i < data.length; i++) {
      department_list.push({
        name: data[i].name,
        value: data[i].id
      })
    }


    inquirer.prompt([
      {
        type: "input",
        name: "firstname",
        message: "Enter First Name?"
      },
      {
        type: "input",
        name: "lastname",
        message: "Enter Last name?"
      },
      {
        type: "input",
        name: "salary",
        message: "Enter Salary for Role?"
      },
      {
        type: "list",
        name: "department_id",
        message: "Select Department for this role?",
        choices: "department_list"
      }
    ]).then(({ department_name }) => {
      db.query("INSERT INTO department(name) VALUES(?);", [department_name], function (err, data) {
        if (err) throw err;
        console.table(data);
        startMenu()
      })
    })
  })
}


startMenu();
