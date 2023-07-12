const express = require('express');
const { 
    reviewCreate, 
    reviewDestroy, 
    reviewUpdate 
} = require('../controllers/review');

const { 
    asyncErrorHandler,
    asyncisAuthorCheck
} = require('../middleware');
const router = express.Router({ mergeParams: true });


// GET reviews index /post/:id/reviews //
router.post('/', asyncErrorHandler(reviewCreate));

// PUT update post index posts/:id/reviews/:review_id //
router.put('/:review_id', asyncisAuthorCheck, asyncErrorHandler(reviewUpdate));

//DELETE post posts/:id/reviews/:review_id //
router.delete('/:review_id', asyncisAuthorCheck, asyncErrorHandler(reviewDestroy));
  
module.exports = router;
