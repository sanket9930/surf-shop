const express = require('express')
const router = express.Router();


// GET posts index /posts //
router.get('/', (req, res, next) => {
    res.send('SHOW /posts');
});

// GET new posts  /posts/new //
router.get('/new', (req, res, next) => {
    res.send('SHOW /posts/new');
});

// POST new /posts/new //
router.post('/new', (req, res, next) => {
    res.send('CREATE /posts/new');
});

// GET show by id /posts/:id //
router.get('/:id', (req, res, next) => {
    res.send('SHOW index /posts/:id');
});

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
