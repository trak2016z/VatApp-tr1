/*
 * Author: Thulu Software
 *           
 */
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(require('./auth'));

app.use(bodyParser.json());
app.use('/api/posts', require('./controlles/api/posts'));

app.use('/api/sessions', require('./controlles/api/sessions'));
app.use('/api/users', require('./controlles/api/users'));


app.use('/', require('./controlles/static'));

app.listen(3000, function () {
    console.log('Serwer wystartował na porcie numer', 3000);
});