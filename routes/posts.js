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
const { asyncErrorHandler } = require('../middleware');


// GET posts index /posts //
router.get('/', asyncErrorHandler(postIndex));

// GET new posts  /posts/new //
router.get('/new', asyncErrorHandler(postNew));

// POST new /posts/new //
router.post('/new', upload.array('images', 4), asyncErrorHandler(postCreate));

// GET (SHOW) post by id /posts/:id //
router.get('/:id', asyncErrorHandler(postShow));

// GET posts edit /posts/new //
router.get('/:id/edit', asyncErrorHandler(postEdit));

// PUT update post index /posts/new //
router.put('/:id', upload.array('images', 4), asyncErrorHandler(postUpdate));

//DELETE post /posts/:id //
router.delete('/:id', asyncErrorHandler(postDestroy))
  
module.exports = router;
