const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path');

const app = express(),
    PORT = process.env.PORT || 1313;

    var mysql = require("mysql");


    var connection = mysql.createConnection({
        host: "wp433upk59nnhpoh.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        port: 3306,
        user: 'y5g3u9vettymi6zx',
        password: 't0s61lmgm5cbqbv4',
        database: 'n18mdd2agt5q1vl3'
    });
    




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
});

var tables = [],
    waitlist = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/tables', (req, res) => {
    res.sendFile(path.join(__dirname, './tables.html'));
});

app.get('/reserve', (req, res) => {
    res.sendFile(path.join(__dirname, './reserve.html'));
});

app.get('/api/tables', (req, res) => res.json(tables));

app.get('/api/waitlist', (req, res) => res.json(waitlist));

app.post('/api/tables', (req, res) => {
    let newReservation = req.body;

    console.log(newReservation);

    if (tables.length < 5) {
        tables.push(newReservation);
        newReservation.confirmed = true;
        res.json(newReservation);
    } else {
        waitlist.push(newReservation);
        newReservation.confirmed = false;
        res.json(newReservation);
    }
});