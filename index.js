var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

   // Your port; if not 3306
   port: 3306,

   // Your username
    user: "root",

 // Your password
    password: "itt$itbsUe!imaPbaEwrRwcsdN4evrAttdTiwUftRmAwtb!L",
    database: "employeeTracker_DB"
});

 // connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
  // run the start function after the connection is made to prompt the user
    start();
});

// function which department the employee is in
function start() {
    inquirer
    .prompt({
      name: "mainMenu",
      type: "list",
      message: "What would you like to do?", 
      choices:  [{name:"View all employees", value: "VIEW_ALL_EMPLOYEES"},{name:"View all departments", value: "VIEW_ALL_DEPARTMENTS"}, {name:"View all roles", value: "VIEW_ALL_ROLES"}, {name:"Update all employees ", value: "UPDATE_ALL_EMPLOYEES"},{name:"Update all departments", value: "ADD_ALL_DEPARTMENTS"},  {name:"Update all roles", value: "UPDATE_ALL_ROLES"}, {name:"Delete any employees", value: "DELETE_ANY_EMPLOYEES"}, {name:"Delete any  departments", value: "DELETE_ANY_DEPARTMENTS"},{name:"Delete any roles", value: "DELETE_ANY_ROLES"} ]
    })
.then(function(answer) {
    //  Select what you want
    if (answer.mainMenu === "VIEW_ALL_EMPLOYEES") {
        viewAllEmployees();
    }
    else if(answer.mainMenu ==="VIEW_ALL_DEPARTMENTS") {
        viewAllDepartments();
    } else {
        connection.end();
    }
}); 
}

// function to track department, role, and employee
function viewAllEmployees() {
    // inquirer must choose from the 3 catagories to determine login
    const employees = connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id")
  console.log (employees)      
} 
   
   

function viewAllDepartments() {
    // query the database for all choices to be selected
connection.query("SELECT * FROM departments", function(err, results) {
if (err) throw err;
// once you have figured out your choices, please select
inquirer
.prompt([
{
    name: "departments",
    type: "id and name",
    choices: function() {
        var choiceArray = [];
        for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].item_name);
        }
        return choiceArray; 
    },
    message: "What department are you in?"
},
{
    name: "employees",
    type: "input",
    message: "What is your name?" 
}
])
.then(function(answer) {
// get the information of the chosen item 
    var chosenItem;
    for (var i = 0; i < results.length; i++) {
        if (results[i].item_name === answer.choice) {
            chosenItem = results[i];
        }
      }

      inquirer
      .prompt([
      {
      name: "roles",
      type: "salary",
      choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_name);
          }
          return choiceArray; 
        }
        },


       inquirer
       .prompt([
           {
      name: "update all departments",
      type: "id and name",
      choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_name);
          }
          return choiceArray; 
      },



      name: "update all employees",
      type: "id and name",
      choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_name);
          }
          return choiceArray; 
      },


      name: "update all roles",
      type: "id and name",
      choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_name);
          }
          return choiceArray; 
      },


      name: "delete any departments",
      type: "id and name",
      choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_name);
          }
          return choiceArray; 
      },


      name: "delete any employees",
      type: "id and name",
      choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_name);
          }
          return choiceArray; 
      },



      name: "delete any roles",
      type: "id and name",
      choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_name);
          }
          return choiceArray; 
      },


      // Make sure to choose what you want to change from the mainMenu
    if (_chosenItem.mainMenu< parseInt(answer.viewAllDepartments)) {
      // Changes have been made
        connection.query(
            "UPDATE MAINMENU SET ? VIEW_ALL_DEPARTMENTS ?",
            [
              {
                mainMenu: answer.viewAllDepartments
              },
              {
                id: chosenItem.id
                }
              ],
            function(error) {
                if (error) throw err;
                console.log("Changes have been made!");
                start();
             }
           );
         }
        else {
          // If changes have not been made, try again
            console.log("Changes have not been made!");
            start();
        }
    });
});
}
