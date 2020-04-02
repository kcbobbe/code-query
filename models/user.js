module.exports = function(sequelize, DataTypes){
    //define has two arguments: name of model and object with model's schema
    var User = sequelize.define("User", {
        //name
        //email
        //password
//datatypes link https://sequelize.org/master/manual/model-basics.html#data-types        
//validation link: https://sequelize.org/master/manual/validations-and-constraints.html   
//associations link: https://sequelize.org/master/manual/assocs.html
});

    return User;
};