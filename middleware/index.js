const Review = require('../models/review')

module.exports = {
    asyncErrorHandler : (fn) => (req,res,next) => {
        return Promise
            .resolve(fn(req, res, next)) // pass the req, res and next parameters 
            .catch(next);
    },

    asyncisAuthorCheck : async (req, res, next) =>{
        let review = await Review.findById(req.params.review_id);
        if(review.author.equals(req.user._id)){
            return next(); //   Go to the next middleware function
        }
        req.session.error = "Cant edit the review of different user";
        res.redirect('/');
    }
}



