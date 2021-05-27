import mysql from "mysql";

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "taskuser",
  password: "taskdb",
  database: "task_app",
});

connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Connected..!");
  }
});

export default connection;
