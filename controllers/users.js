const {
    render
} = require('ejs');
const express = require('express');
const router = express.Router();
const User = require('../models/users');

// INDEX PAGE: get all users ==============
router.get('/', (req, res) => {
    User.find({}, (error, allUsers) => {
        res.render('users/index', {
            users: allUsers
        })
    })
})

// NEW PAGE
router.get('/new', (req, res) => {
    res.render('users/new')
})

// UPDATE ROUTE: update user ===============
router.put('/:id', (req, res) => {
    console.log('FUCK!')
    console.log(req.params.id)
    User.findByIdAndUpdate(req.params.id, req.body, (error, updatedUser) => {
      res.redirect(`/users/${req.params.id}`)
    })
  })

// DELETE ROUTE: delete user ===============
router.delete('/:id', (req, res) => {
    console.log(req.params.id)
    User.findByIdAndDelete(req.params.id, (error, deletedUser) => {
      res.redirect('/users')
    })
  })

// EDIT PAGE: render edit user form ===============
router.get('/edit/:id', (req, res) => {
    User.findById(req.params.id, (error, foundUser) => {
      res.render('users/edit', {
        user: foundUser
      })
    })
  })

// SHOW PAGE: get single user ===============
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (error, foundUser) => {
        console.log(foundUser)
        res.render('users/show', {
            user: foundUser
        })
    })
})

// CREATE ROUTE: create new user ===============
router.post('/', (req, res) => {
    User.create(req.body, (error, newUser) => {
        console.log(req.body)
        res.redirect('/users')
    })
})

// exports ===============
module.exports = router;