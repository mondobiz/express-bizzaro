// dependencies ===============
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

// env configuration ===============
require('dotenv').config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// mongodb configuration ===============
const db = mongoose.connection;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// mongodb error / success ===============
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// middleware ===============
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// routes ===============
app.get('/', (req, res) => {
  res.send('hello world');
})

// controllers ===============
const postController = require('./controllers/posts');
app.use('/posts', postController);

// app.use('/*', (req, res) => {
//   res.send(`404 error, cannot find page ${req.baseUrl}`)
// })

// listener ===============
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))