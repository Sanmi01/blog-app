'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    title: DataTypes.STRING,
    username: DataTypes.STRING,
    body: DataTypes.STRING
  });


  Comment.associate = function (models) {
    models.Comment.belongsTo(models.Post, {
      constraints: true,
      onDelete: 'CASCADE',
      foreignKey: 'post_id'
    });
   };

  return Comment;
};

// Make sure you complete other models fields