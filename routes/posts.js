const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware/index');
const { getPosts,newPost,createPost,showPost,editPost,updatePost ,deletePost} = require('../controllers/posts');

/* GET posts /posts */
router.get('/',asyncErrorHandler(getPosts));

//GET a new post
router.get('/new', newPost);
//POST a new post
router.post('/', asyncErrorHandler(createPost));

//GET post with id
router.get('/:id', asyncErrorHandler(showPost));
//edit a post
router.get('/:id/edit', asyncErrorHandler(editPost));

router.put('/:id', asyncErrorHandler(updatePost));
//delete a post
router.delete('/:id', asyncErrorHandler(deletePost));

module.exports = router;
