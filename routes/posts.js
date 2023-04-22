const express = require('express')
const router = express.Router();
const { getPosts, newPost, createPost, showPost } = require('../controllers/posts');
const { errorHandler } = require('../middleware');


// GET posts index /posts //
router.get('/', getPosts);

// GET new posts  /posts/new //
router.get('/new', newPost);

// POST new /posts/new //
router.post('/new', createPost);

// GET (SHOW) post by id /posts/:id //
router.get('/:id', showPost);

// GET posts edit /posts/new //
router.get('/:id/edit', (req, res, next) => {
    res.send('SHOW new index /posts/new');
});

// PUT update post index /posts/new //
router.put('/:id', (req, res, next) => {
    res.send('UPDATE /posts/new');
});

//DELETE post /posts/:id //
router.delete('/:id', (req,res,next) => {
    res.send("DELETE post /post/:id")
})
  
module.exports = router;
