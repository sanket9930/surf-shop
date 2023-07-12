const { json } = require("body-parser");
const Post = require("../models/post");
const Review = require("../models/review");

module.exports = {
  // review Create
  async reviewCreate(req, res, next) {
    let post = await Post.findById(req.params.id).populate({path: 'reviews'}).exec();
    
    let isReviewCreated = post.reviews.filter(review =>{
      return review.author.equals(req.user._id);  //  filter() -> Returns the element(review) if the callback func return true, otherwise move to next element 
    });

    if(isReviewCreated.length){
      req.session.error = 'You can only create one review per post';
      return res.redirect(`/posts/${post.id}`);
    }

    req.body.review.author = req.user._id;
    let review = await Review.create(req.body.review); // I can't edit review after the creation
    
    post.reviews.push(review); //   post.reviews is an Array
    
    post.save();
    req.session.success = 'Review Created Successfully';
    res.redirect(`/posts/${post.id}`);
  },

  //  review update
  async reviewUpdate(req, res, next) {
    await Review.findByIdAndUpdate(req.params.review_id, req.body.review);

    req.session.success = "Review Updated Successfully";
    res.redirect(`/posts/${req.params.id}`);
  },

  // review Destroy
  async reviewDestroy(req, res, next) {
    await Post.findByIdAndUpdate(req.params.id, {
      $pull: { reviews: req.params.review_id } // Go inside post then pull out or remove the review which matched the condition
    });

    await Review.findByIdAndDelete(req.params.review_id);
    req.session.success = "Review Deleted Successfully";
    res.redirect(`/posts/${req.params.id}`);
  },
};



