// dependencies ===============
const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// INDEX PAGE: get all posts ==============
router.get('/', (req, res) => {
  Post.find({}, (error, allPosts) => {
    res.render('home', {
      posts: allPosts
    })
  })
})

// NEW PAGE: render the new post form ==============
router.get('/new', (req, res) => {
  res.render('new')
})

// DELETE ROUTE: delete post ===============
router.delete('/:id', (req, res) => {
  Post.findByIdAndDelete(req.params.id, (error, deletedPost) => {
    res.redirect('/home')
  })
})

// UPDATE ROUTE: update post ===============
router.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, (error, updatedPost) => {
    res.redirect(`/home/${req.params.id}`)
  })
})

// CREATE ROUTE: create new blog post ===============
router.post('/', (req, res) => {
  Post.create(req.body, (error, newPost) => {
    res.redirect('/home')
  })
})

// EDIT PAGE: render edit post form ===============
router.get('/edit/:id', (req, res) => {
  Post.findById(req.params.id, (error, foundPost) => {
    res.render('edit', {
      post: foundPost
    })
  })
})

// SHOW PAGE: get single post ===============
router.get('/:id', (req, res) => {
  Post.findById(req.params.id, (error, foundPost) => {
    res.render('show', {
      post: foundPost
    })
  })
})


// exports ===============
module.exports = router;