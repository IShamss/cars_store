const Post = require('../models/post');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'ishamss',
    api_key: '763372858651651',
    api_secret: process.env.CLOUDINARY_SECRET
});
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
    async createPost(req, res, next) {
        req.body.post.images = [];
        //for every req.files is an array of files containing the images
        for (const file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.post.images.push({
                url: image.secure_url,
                public_id: image.public_id
            });
        }
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
        //find the post by its id
        let post = await Post.findById(req.params.id);
        //check if there are images to be deleted
        if (req.body.deleteImages && req.body.deleteImages.length) {
            let deleteImages = req.body.deleteImages;
            //loop over the array
            for (const imageIdToDelete of deleteImages) {
                //delete the image from cloudinary
                await cloudinary.v2.uploader.destroy(imageIdToDelete);
                //here image refers to the public id of the image to be deleted from cloudinary
                //then delete this image from post images in the database
                for (const image of post.images) {
                    if (image.public_id === imageIdToDelete) {
                        let index = post.images.indexOf(image);
                        post.images.splice(index, 1);
                    }
                }
            }
        }
        //check if there are new images to be uploaded
        if (req.files) {
            for (const file of req.files) {
                let image = await cloudinary.v2.uploader.upload(file.path);
                //add the image to the array of images of this post
                post.images.push({
                    url: image.secure_url,
                    public_id: image.public_id
                });
            }
        }
        //update the post with any new properties
        post.title = req.body.post.title;
        post.description = req.body.post.description;
        post.price = req.body.post.price;
        post.location = req.body.post.location;
        //then update the database
        await post.save();
        res.redirect(`/posts/${post.id}`);
    },
    //delete a post with id
    async deletePost(req, res, next) {
        let post = await Post.findById(req.params.id);
        //delete the images form cloudinary
        for (const image of post.images) {
            await cloudinary.v2.uploader.destroy(image.public_id);
        }
        //then delete the post from the database
        await post.remove();
        res.redirect('/posts');
    }
}