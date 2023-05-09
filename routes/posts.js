const express = require('express')
const router = express.Router();
const multer = require('multer');
const upload = multer({'dest' : 'uploads/'});
const { 
    postIndex, 
    postNew, 
    postCreate, 
    postShow, 
    postEdit, 
    postUpdate,
    postDestroy
} = require('../controllers/posts');
const { errorHandler } = require('../middleware');


// GET posts index /posts //
router.get('/', postIndex);

// GET new posts  /posts/new //
router.get('/new', postNew);

// POST new /posts/new //
router.post('/new', upload.array('images', 4), postCreate);

// GET (SHOW) post by id /posts/:id //
router.get('/:id', postShow);

// GET posts edit /posts/new //
router.get('/:id/edit', postEdit);

// PUT update post index /posts/new //
router.put('/:id', postUpdate);

//DELETE post /posts/:id //
router.delete('/:id', postDestroy)
  
module.exports = router;
