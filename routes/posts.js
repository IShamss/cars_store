const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware/index');
const { getPosts, newPost, createPost, showPost, editPost, updatePost, deletePost } = require('../controllers/posts');
const multer = require('multer');
const upload = multer({'dest':'uploads/'})

/* GET posts /posts */
router.get('/',asyncErrorHandler(getPosts));

//GET a new post
router.get('/new', newPost);
//POST a new post
router.post('/',upload.array('images',5), asyncErrorHandler(createPost));

//GET post with id
router.get('/:id', asyncErrorHandler(showPost));
//edit a post
router.get('/:id/edit', asyncErrorHandler(editPost));

router.put('/:id',upload.array('images',5), asyncErrorHandler(updatePost));
//delete a post
router.delete('/:id', asyncErrorHandler(deletePost));

module.exports = router;
