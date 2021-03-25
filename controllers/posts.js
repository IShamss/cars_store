const Post = require('../models/post');
module.exports = {
    async getPosts(req,res,next) {
        let posts = await Post.find({});
        res.render('posts/index',{posts})
    },
    //render the form to add a new form
    newPost(req, res, next) {
        res.render('posts/new');
    },
    //create a new post and add it to the database
    async createPost(req,res,next) {
        let newPost = await Post.create(req.body.post);
        res.redirect(`/posts/${newPost.id}`);
    },
    //show a post having a certain id
    async showPost(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/show', { post });
    },
    //editing a post
    async editPost(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/edit', { post });
    },
    //updatign a post
    async updatePost(req, res, next) {
        let post = await Post.findByIdAndUpdate(req.params.id, req.body.post);
        res.redirect(`/posts/${post.id}`);
    },
    //delete a post with id
    async deletePost(req, res, next) {
        await Post.findByIdAndRemove(req.params.id);
        res.redirect('/posts');
    }
}