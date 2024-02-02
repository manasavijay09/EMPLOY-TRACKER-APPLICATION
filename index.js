
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

//prompt questions
function startMenu() {
  inquirer.prompt([
    {
      type: "list",
      name: "options",
      message: "What would you like to do?",
      choices: ["view all Department", "view All Roles", "view All Employees", "add Department", "add Role", "add An Employee", "update Employee Role", "Exit App"]
    }
  ]).then(({ options }) => {
    switch (options) {
      case "view All Department":
        viewAllDepartment();
        break;
      case "view All Roles":
        viewAllRoles();
        break;
      case "view All Employees":
        viewAllEmployees();
        break;
      case "add Department":
        addDepartment();
        break;
      case "add  Role":
        addRole();
        break;
      case "add An Employee":
        addAnEmployee();
        break;
      case "update Employee Role":
        updateEmployeeRole();
        break;
      default:
        db.end();
        process.exit(0)
    }
  })
}


function viewAllDepartment() {
  console.log("department")
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
      db.query("INSERT INTO role(name) VALUES(? );", title,salary,department_list, function (err, data) {
        if (err) throw err;
        console.table(data);
        startMenu()
      });
    });
  });
}



startMenu();
