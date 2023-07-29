const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');
const mongoosePaginate = require('mongoose-paginate');

const PostSchema = new Schema({
    title : String,
    price : String,
    description : String,
    images : [ { url: String, public_id: String } ],
    location : String,
    coordinates: Array,
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    reviews : [{
        type : Schema.Types.ObjectId,
        ref : 'Review'
    }],
    avgRating : {
        type: Number, 
        default: 0
    }
});

PostSchema.pre('deleteOne', { document: true, query: false }, async function(){  //  Pre hook middleware - which will run whenever we deleteOne on a post 
    await Review.deleteMany({       // Remove any reviews which matches the below condition
        _id: { 
            $in: this.reviews  //  $in Operator - The $in operator selects the documents where the value of a field (_id in this case) equals any value in the specified array (this.reviews array)
        }
    })
});

PostSchema.methods.calculateAverageRating = function(){
    let totalRating = 0;

    if(this.reviews.length){
        this.reviews.forEach(review => {
            totalRating += review.rating;
        });

        this.avgRating = Math.round((totalRating/this.reviews.length)*10)/10;
    }
    else{
        this.avgRating = totalRating;
    }
    const floorRating  = Math.floor(this.avgRating);

    this.save();
    return floorRating;
}

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostSchema);
