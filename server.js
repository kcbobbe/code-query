var express = require("express");
var db = require("./models");

var PORT = process.env.PORT || 8888;
var app = express();


//sync to connect to database to create tables using models
db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log("listening on port: ", PORT);
    });
});