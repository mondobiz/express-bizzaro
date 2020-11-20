// dependencies ===============
const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const Post = require('../models/post');


// INDEX PAGE: get all posts ==============
router.get('/', (req, res) => {
  Post.find({}, (error, allPosts) => {
    res.render('posts/index', {
      posts: allPosts
    })
  })
})

// NEW PAGE: render the new post form ==============
router.get('/new', (req, res) => {
  res.render('posts/new')
})

// DELETE ROUTE: delete post ===============
router.delete('/:id', (req, res) => {
  console.log(req.params.id)
  Post.findByIdAndDelete(req.params.id, (error, deletedPost) => {
    res.redirect('/posts')
  })
})

// UPDATE ROUTE: update post ===============
router.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, (error, updatedPost) => {
    res.redirect(`/posts/${req.params.id}`)
  })
})

// CREATE ROUTE: create new blog post ===============
router.post('/', (req, res) => {
  Post.create(req.body, (error, newPost) => {
    console.log(req.body)
    res.redirect('/posts')
  })
})

// EDIT PAGE: render edit post form ===============
router.get('/edit/:id', (req, res) => {
  Post.findById(req.params.id, (error, foundPost) => {
    res.render('posts/edit', {
      post: foundPost
    })
  })
})

// SHOW PAGE: get single post ===============
router.get('/:id', (req, res) => {
  Post.findById(req.params.id, (error, foundPost) => {
    console.log(foundPost)
    res.render('posts/show', {
      post: foundPost
    })
  })
})


// exports ===============
module.exports = router;