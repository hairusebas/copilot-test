// Create web server

// Import express
const express = require('express');
const app = express();

// Import cors
const cors = require('cors');
app.use(cors());

// Import body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true });

// Import model
const Comment = require('./models/comment');

// Create new comment
app.post('/api/comments', async (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    try {
        await comment.save();
        res.send(comment);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get all comments
app.get('/api/comments', async (req, res) => {
    try {
        let comments = await Comment.find();
        res.send(comments);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Delete a comment
app.delete('/api/comments/:id', async (req, res) => {
    try {
        await Comment.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Update a comment
app.put('/api/comments/:id', async (req, res) => {
    try {
        let comment = await Comment.findOne({
            _id: req.params.id
        });
        comment.name = req.body.name;
        comment.comment = req.body.comment;
        await comment.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Start server
app.listen(3000, () => console.log('Server listening on port 3000!'));