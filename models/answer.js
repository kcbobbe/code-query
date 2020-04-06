module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define("Answer", {
    answerText: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    answerTag: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
      }
    }
    // the created at date and the updated at date is provided from sequelize. Eventually we should convert to date using moment
    // date: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   len: [1]
    // }
  });

  Answer.associate = function(models) {
    Answer.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Answer.associate = function(models) {
    Answer.belongsTo(models.Question, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Answer;
};
