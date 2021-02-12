'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    title: DataTypes.STRING,
    username: DataTypes.STRING,
    body: DataTypes.STRING,
    PostId: DataTypes.INTEGER
  });


  Comment.associate = function (models) {
    models.Comment.belongsTo(models.Post, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
   };

  return Comment;
};

// Make sure you complete other models fields