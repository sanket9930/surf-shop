const Post = require('../models/post');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: "dfpdtprws",
    api_key: "824425684416273",
    api_secret: process.env.CLOUDINARY_SECRET,
});


module.exports = {

    // posts index
    async postIndex(req, res, next){
        let posts = await Post.find({});
        res.render('posts/index' , { posts });
    },
    //  Posts New
    postNew(req, res, next){
        res.render('posts/new');
    },
    // posts Create
    async postCreate(req,res,next){
        req.body.post.images = [];
        for(const file of req.files){
            let image = await cloudinary.v2.uploader.upload(file.path);
            
            req.body.post.images.push({
                url: image.secure_url,
                public_id: image.public_id
            });
        }
        let posts = await Post.create(req.body.post);
        res.redirect(`/posts/${posts.id}`);
    },
    // Post Show
    async postShow(req, res, next){
        let post = await Post.findById(req.params.id);
        res.render('posts/show', { post });
    },
    // Post Edit
    async postEdit(req, res, next){
        let post = await Post.findById(req.params.id);
        // post.id = req.params.id;
        res.render('posts/edit', { post });
    },
    //  Post update
    async postUpdate(req, res, next){
        let post = await Post.findByIdAndUpdate(req.params.id, req.body.post);
        res.redirect(`/posts/${post.id}`);
    },
    // Post Destroy
    async postDestroy(req, res, next){
    await Post.findByIdAndRemove(req.params.id);
    res.redirect('/posts');
    }
}
