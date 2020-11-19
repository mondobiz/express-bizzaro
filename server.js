// dependencies ===============
const express = require('express');
const mongoose = require('mongoose');
const methodOveride = require('method-override');
const app = express();

// env configuration ===============
require('dotenv').config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// mongodb configuration ===============
const db = mongoose.connection;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, 
    useUnifiedTopology: true, useFindAndModify: true });

// mongodb error / success ===============
db.on('error', (err) => console.log(err.message + ' is MondoDB not running?'))
db.on('connected', () => console.log('Mondo Connect'));
db.on('disconnected', () => console.log('Mondo Disconnect'));

// middleware ===============
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOveride('_method'));

// routes ===============
app.get('/', (req, res) => {
    res.send('Hi');
})

// controllers ===============
const postController = require('./controllers/posts');
app.use('/home', postController);

// listener ===============
app.listen(PORT, () => console.log('You are now listening to port ${PORT}'))