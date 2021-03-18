const express = require('express');
const router = express.Router();

/* GET posts /posts */
router.get('/', function(req, res, next) {
    res.send('/posts');
});

//GET a new post
router.get('/new', function(req, res, next) {
    res.send('/posts/new');
});
//POST a new post
router.post('/', function(req, res, next) {
    res.send('POSt new post');
});

//GET post with id
router.get('/:id', function(req, res, next) {
    res.send('GEt post with id');
});
//edit a post
router.get('/:id/edit', function(req, res, next) {
    res.send('Edit a post');
});
router.put('/:id', function(req, res, next) {
    res.send('Updated the post');
});
//delete a post
router.delete('/:id', function(req, res, next) {
    res.send('delete post with id');
});

module.exports = router;
