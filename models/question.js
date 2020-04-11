module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    questionText: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    questionTag: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  //Question table has userId as a Foreignkey and has one to many relationship with Answer
  Question.associate = function(models) {
    Question.hasMany(models.Answer, {
      onDelete: "cascade"
    });
    Question.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Question;
};
