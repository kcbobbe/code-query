module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define("Answer", {
    answerText: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  //Answer table has userId and questionId Foreignkeys
  Answer.associate = function(models) {
    Answer.belongsTo(models.Question, {
      foreignKey: {
        allowNull: true,
        onDelete: "SET NULL"
      }
    });
    Answer.belongsTo(models.User, {
      foreignKey: {
        allowNull: true,
        onDelete: "SET NULL"
      }
    });
  };

  return Answer;
};
