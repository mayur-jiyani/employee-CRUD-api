var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql2');
var bodyParser = require('body-parser');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employeedb'
});


connection.connect(function (err) {
    if (err) throw err
    console.log('You are now connected...')
})

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var server = app.listen(3000, "127.0.0.1", function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

});

//rest api to get all results
app.get('/employees', function (req, res) {
    console.log(req);
    connection.query('select * from empData', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

//rest api to create a new record into mysql database
app.post('/create-employees', function (req, res) {

    // var id = req.body.id;
    var employee_name = req.body.employee_name;
    var employee_salary = req.body.employee_salary;
    var employee_age = req.body.employee_age;

    connection.query(`INSERT INTO empData (employee_name, employee_salary, employee_age) VALUES ("${employee_name}", "${employee_salary}","${employee_age}")`, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

//rest api to get a single employee data
app.get('/employees/:id', function (req, res) {
    connection.query('select * from empData where id=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

//rest api to update record into mysql database
app.put('/employees/update', function (req, res) {
    connection.query('UPDATE `empData` SET `employee_name`=?,`employee_salary`=?,`employee_age`=? where `id`=?', [req.body.employee_name, req.body.employee_salary, req.body.employee_age, req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

//rest api to delete record from mysql database
app.delete('/employees/delete', function (req, res) {
    console.log(req.body);
    connection.query('DELETE FROM `empData` WHERE `id`=?', [req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.end('Record has been deleted!');
    });
});