var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var Request = require("request");


app = express();
port = process.env.PORT || 3000;

/*-----------------------------Cross-origin resource sharing Start-------------------------*/ 
var cors = require('cors')

var originsWhitelist = [
    'http://localhost:4200',      //this is my front-end url for development
    'http://localhost:3000'
];
var corsOptions = {
    origin: function (origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
}

app.use(cors(corsOptions))
/*-----------------------------Cross-origin resource sharing End-------------------------*/



console.log('todo list RESTful API server started : ' + port);



/*-----------------------------connection configurations-------------------------*/

const mc = mysql.createConnection({
    host: '192.168.1.104',
    user: 'root',
    password: 'root',
    database: 'nodejs'
});

/*-----------------------------connect to database-------------------------*/
mc.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/routes/approutes'); //importing route
routes(app); //register the route