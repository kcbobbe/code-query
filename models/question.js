module.exports = function(sequelize) {
  var Sequelize = require("sequelize");
  var Question = sequelize.define("Question", {
    questionText: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    questionTag: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  //Question table has userId as a Foreignkey and has one to many relationship with Answer
  Question.associate = function(models) {
    Question.hasMany(models.Answer, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      constraints: true
    });
    Question.belongsTo(models.User, {
      foreignKey: {
        allowNull: true,
        onDelete: "SET NULL"
      }
    });
  };

  return Question;
};
