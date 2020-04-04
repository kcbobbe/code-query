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
      len: [1]
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      len: [1]
    }
  });

  Question.associate = function(models) {
    Question.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Question.associate = function(models) {
    Question.hasMany(models.Answer, {
      onDelete: "cascade"
    });
  };

  return Question;
};
