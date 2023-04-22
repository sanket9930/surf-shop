const Post = require('../models/post');

module.exports = {

    // posts index
    async getPosts(req, res, next){
        let posts = await Post.find({});
        res.render('posts/index' , { posts });
    },

    //  Posts New
    newPost(req, res, next){
        res.render('posts/new');
    },
    // posts Create
    async createPost(req,res,next){
        let posts = await Post.create(req.body);
        res.redirect(`/posts/${posts.id}`);
    },
    // Post Show
    async showPost(req, res, next){
        let post = await Post.findById(req.params.id);
        res.send('SHOW POST')
       // res.render('posts/show', { post });
    }
}