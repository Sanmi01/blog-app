'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    post_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      }
    },
    post_body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      }
    },
    AuthorId: DataTypes.INTEGER
  });

  Post.associate = function(models) {
    models.Post.hasMany(models.Comment);
  };

  Post.associate = function (models) {
    models.Post.belongsTo(models.Author, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

    models.Post.belongsToMany(models.Category,{ 
      as: 'categories', 
      through: 'PostCategories',
      foreignKey: 'post_id'
    });

   };



  return Post;
};

// Make sure you complete other models fields