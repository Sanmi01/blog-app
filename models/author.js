'use strict';
module.exports = (sequelize, DataTypes) => {
  var Author = sequelize.define('Author', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    author_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
    }},
  });

  Author.associate = function(models) {
    models.Author.hasMany(models.Post);
  };


  return Author;
};
 