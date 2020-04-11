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
    // the created at date and the updated at date is provided from sequelize. Eventually we should convert to date using moment
    // date: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   len: [1]
    // }
  });

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
