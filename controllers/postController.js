var Post = require('../models/post');
var models = require('../models');
var async = require('async');

// Display post create form on GET.
exports.post_create_get = async function(req, res, next) {
        // renders a post form
        const authors = await models.Author.findAll();
        res.render('forms/post_form', { title: 'Create Post', authors: authors, layout: 'layouts/main'});
        console.log("Post form renders successfully");
};

// Handle post create on POST.
exports.post_create_post = async function(req, res, next) {
    let author_id = req.body.author_id;
     // create a new post based on the fields in our post model
     // I have create two fields, but it can be more for your model
      const post = await models.Post.create({
            post_title: req.body.post_title,
            post_body: req.body.post_body,
            author_id: req.body.author_id
        }).then(function() {
            console.log("Post created successfully");
           // check if there was an error during post creation
            res.redirect('/blog/posts');
      });
};

// Display post delete form on GET.
exports.post_delete_get = function(req, res, next) {
       models.Post.destroy({
            // find the post_id to delete from database
            where: {
              id: req.params.post_id
            }
          }).then(function() {
           // If an post gets deleted successfully, we just redirect to posts list
           // no need to render a page
            res.redirect('/blog/posts');
            console.log("Post deleted successfully");
          });
};

// Handle post delete on POST.
exports.post_delete_post = function(req, res, next) {
          models.Post.destroy({
            // find the post_id to delete from database
            where: {
              id: req.params.post_id
            }
          }).then(function() {
           // If an post gets deleted successfully, we just redirect to posts list
           // no need to render a page
            res.redirect('/blog/posts');
            console.log("Post deleted successfully");
          });

 };

// Display post update form on GET.
exports.post_update_get = function(req, res, next) {
        // Find the post you want to update
        console.log("ID is " + req.params.post_id);
        models.Post.findById(
                req.params.post_id
        ).then(function(post) {
               // renders a post form
               res.render('forms/post_form', { title: 'Update Post', post: post, layout: 'layouts/main'});
               console.log("Post update get successful");
          });
        
};

// Handle post update on POST.
exports.post_update_post = function(req, res, next) {
        console.log("ID is " + req.params.post_id);
        models.Post.update(
        // Values to update
            {
                post_title: req.body.post_title,
                post_body: req.body.post_body
            },
          { // Clause
                where: 
                {
                    id: req.params.post_id
                }
            }
        //   returning: true, where: {id: req.params.post_id} 
         ).then(function() { 
                // If an post gets updated successfully, we just redirect to posts list
                // no need to render a page
                res.redirect("/blog/posts");  
                console.log("Post updated successfully");
          });
};

// Display detail page for a specific post.
exports.post_detail = async function(req, res, next) {
  const authors = await models.Author.findAll();
        // find a post by the primary key Pk
        models.Post.findById(
                req.params.post_id
        ).then(function(post) {
        // renders an inividual post details page
        res.render('pages/post_detail', { title: 'Post Details', post: post, authors:authors, layout: 'layouts/main'} );
        console.log("Post details renders successfully");
        });
};


// Display list of all posts.
exports.post_list = async function(req, res, next) {
  const authors = await models.Author.findAll();
        // controller logic to display all posts
        models.Post.findAll(
        ).then(function(posts) {
        // renders a post list page
        console.log("rendering post list");
        res.render('pages/post_list', { title: 'Post List', posts: posts, authors: authors, layout: 'layouts/list'} );
        console.log("Posts list renders successfully");
        });
        
};

// This is the blog homepage.
exports.index = function(req, res) {

      // find the count of posts in database
      models.Post.findAndCountAll(
      ).then(function(postCount) {
          models.Author.findAndCountAll(
      ).then(function(authorCount) {
          models.Comment.findAndCountAll(
      ).then(function(commentCount) {
          models.Category.findAndCountAll(
      ).then(function(categoryCount) {
          
       
        // find the count of authors in database
 
        // find the count of comments in database
 
        // find the count of categories in database
 
        res.render('pages/index', {title: 'Homepage', postCount: postCount, authorCount: authorCount, commentCount:commentCount, categoryCount:categoryCount, layout: 'layouts/main'});
        
        // res.render('pages/index_list_sample', { title: 'Post Details', layout: 'layouts/list'});
        // res.render('pages/index_detail_sample', { page: 'Home' , title: 'Post Details', layout: 'layouts/detail'});
      })
      })
      })
      })
    
    
    };


 