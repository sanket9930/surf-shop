
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title : String,
    description : String,
    price : String,
    image : [String],
    location : String,
    lat : Number,
    lng : Number,
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    reviews : [{
        type : Schema.Types.ObjectId,
        ref : 'review'
    }]
});

module.export = mongoose.model('Post', PostSchema);

/*
Post :
title - string
description - string
price - string
image - array of string         ->(could be multiple image on a single post)
location - string
lat - number
lng - number
author - object id(ref User)    ->(single author for a post)
review - array object           ->(multiple reviews on single post)
*/