
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
    password: 'Password',
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
      choices: ["view All Department",
        "view All Roles",
        "view All Employees",
        "add Department",
        "add Role",
        "add An Employee",
        "update Employee Role",
        "Exit App"]
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
      case "add Role":
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
  inquirer
    .prompt([
      {
        name: "title",
        message: "Enter role title:",
        type: "input"
      },
      {
        name: "salary",
        message: "Enter salary:",
        type: "input"
      },
      {
        name: "department_id",
        message: "Enter department ID:",
        type: "input"
      }
    ])
    .then(function ({ title, salary, department_id }) {
      db.query("INSERT INTO role SET ?",
        {
          title: title,
          salary: salary,
          department_id: department_id,
        },
        function (err, data) {
          if (err) throw err;
          console.table(data);
          startMenu()


        })
    })
}

function addAnEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        message: "Enter employee first name:",
        type: "input"
      },
      {
        name: "last_name",
        message: "Enter employee last name:",
        type: "input"
      },
      {
        name: "role_id",
        message: "Enter role ID:",
        type: "input",
      },
      {
        name: "manager_id",
        message: "Enter manager ID:",
        type: "input",
      }
    ])
    .then(function ({ first_name, last_name, role_id, }) {
      db.query("INSERT INTO employee SET ?",
        {
          first_name: first_name,
          last_name: last_name,
          role_id: role_id,

        },
        function (err, data) {
          if (err) throw err;
          console.table(data);
          startMenu()

        })
    })
}

function updateEmployeeRole() {
  db.query(
    "SELECT * FROM employee",
    function (err, res) {
      if (err) throw err;
      const roles = res;
      console.table(roles);
      inquirer
        .prompt([
          {
            type: "input",
            message: "Enter employee's ID:",
            name: "employee_id"
          },
          {
            type: "list",
            message: "Choose new employee role:",
            choices: function () {
              const choiceArray = [];
              for (let i = 0; i < employee.length; i++) {
                choiceArray.push(`${res[i].id} ${res[i].title}`);
              }
              return choiceArray;
            },
            name: "chosenRole"
          }
        ])
        .then(function ({ employee_id, chosenRole }) {
          console.log("Updating employee role...\n");
          db.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                role_id: chosenRole.split(" ")[0]
              },
              {
                id: employee_id
              }
            ],
            function (err, data) {
              if (err) throw err;
              console.table(data);
              startMenu()
              
            }
          );
        })
    })
}








startMenu();
