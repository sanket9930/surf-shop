const express = require('express')
const router = express.Router({ mergeParams: true });


// GET reviews index /post/:id/reviews //
router.get('/', (req, res, next) => {
    res.send('SHOW reviews posts/:id/reviews');
});

router.post('/', (req,res,next) => {
    res.send('CRETAE review posts/:id/reviews');
})

// GET reviews edit posts/:id/reviews/:review_id/edit  //
router.get('/:review_id/edit', (req, res, next) => {
    res.send('EDIT review index posts/:id/review/:review_id/edit');
});

// PUT update post index posts/:id/reviews/:review_id //
router.put('/:review_id', (req, res, next) => {
    res.send('UPDATE review posts/:id/reviews/:review_id');
});

//DELETE post posts/:id/reviews/:review_id //
router.delete('/:review_id', (req,res,next) => {
    res.send("DELETE review /post/:id/review/:review_id")
})
  
module.exports = router;
