var mysql = require('mysql');
var connection = mysql.createConnection({
  host: '107.180.1.16',
  user: 'springa2023team7',
  password: 'springa2023team7',
  database:'springa2023team7',
  port: 3306,  
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  console.log()
});
connection.query("INSERT INTO Users (username, password, firstName, lastName, email, points, failedAttempts, isAdmin) \
VALUES ('drlang2','password','Duncan','Lang','drlang2@asu.edu','0','0','0')", function(err, rows, fields) 
{
  if (err) throw err;

  console.log(rows[0]);
});


// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host: '107.180.1.16',
//   host: 'a2plcpnl0046.prod.iad2.secureserver.net',
//   user: 'springa2023team7',
//   password: "",
//   database: 'springa2023team7',
//   port: 3306,
  
// });
// connection.connect();

// connection.query('SELECT * FROM Users', function(err, rows, fields) 
// {
//   if (err) throw err;

//   console.log(rows[0]);
// });

// connection.end();

// $host="107.180.1.16";
// $port=3306;
// $socket="";
// $user="springa2023team7";
// $password="";
// $dbname="springa2023team7";

//$con->close();

// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host: '107.180.1.16',
//   host: 'a2plcpnl0046.prod.iad2.secureserver.net',
//   user: 'springa2023team7',
//   password: 'springa2023team7',
//   database: 'Users',
//   port: 3306,
  
// });
// connection.connect();

// connection.query('SELECT * FROM Users', function(err, rows, fields) 
// {
//   if (err) throw err;

//   console.log(rows[0]);
// });

// connection.end();