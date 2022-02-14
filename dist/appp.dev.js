"use strict";

var express = require('express');

var port = process.env.PORT || 2425;

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var path = require('path');

var app = express();
var templatePath = path.join(__dirname, 'views');
var static_path = path.join(__dirname, 'public');
app.set('views', templatePath);
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser);
app.use(express["static"](static_path));
app.get('/', function (req, res) {
  res.render("index");
});
app.listen(port, function () {
  console.log("Server started on http://localhost:".concat(port));
});