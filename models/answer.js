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
      len: [1]
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      len: [1]
    }
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
