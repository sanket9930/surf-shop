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
    }]
});

PostSchema.pre('deleteOne', { document: true, query: false }, async function(){  //  Pre hook middleware - which will run whenever we deleteOne on a post 
    await Review.deleteMany({       // Remove any reviews which matches the below condition
        _id: { 
            $in: this.reviews  //  $in Operator - The $in operator selects the documents where the value of a field (_id in this case) equals any value in the specified array (this.reviews array)
        }
    })
});

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostSchema);
