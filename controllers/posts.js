require('dotenv').config();
const Post = require("../models/post");


const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.TOKEN });

const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dfpdtprws",
  api_key: "824425684416273",
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = {
  

  // posts index
  async postIndex(req, res, next) {
    
    let posts = await Post.paginate({}, {
      page: req.query.page || 1,
      limit: 10
    });
    posts.page = Number(posts.page);
    res.render("posts/index", { posts });
  },
  
  //  Posts New
  postNew(req, res, next) {
    res.render("posts/new");
  },

  // posts Create
  async postCreate(req, res, next) {
    req.body.post.images = [];
    for (const file of req.files) {
      let image = await cloudinary.v2.uploader.upload(file.path);
      req.body.post.images.push({
        url: image.secure_url,
        public_id: image.public_id,
      });
    }
    //  Add the geolocation
    let response = await geocodingClient.
    forwardGeocode({
      query: req.body.post.location,
      limit: 1,
    }).send();
    req.body.post.coordinates = response.body.features[0].geometry.coordinates;
    let posts = await Post.create(req.body.post);
    req.session.success = "POst Created Successfully";
    res.redirect(`/posts/${posts.id}`);
  },

  // Post Show
  async postShow(req, res, next) {
    // Whenever in the schema of one collection we provide a reference (in any field) to a document from any other collection, we need a populate() method to fill the field with that document.
    let post = await Post.findById(req.params.id).
    populate({
      path: 'reviews', // Populationg the reviews of the post, Post - Review 1 level
      options : { sort : { '_id' : -1 }},
      populate : {   // Populating author of the review(need to go n review to find the author), Review to User 2 level
        path: 'author',
        model: 'User'
      }
    });
    
    res.render("posts/show", { post });
  },

  // Post Edit
  async postEdit(req, res, next) {
    let post = await Post.findById(req.params.id);
    post.id = req.params.id;
    res.render("posts/edit", { post });
  },

  //  Post update
  async postUpdate(req, res, next) {
    //find the post by id
    let post = await Post.findById(req.params.id);
    //check if there's any images for deletion
    if (req.body.deleteImages && req.body.deleteImages.length) {
      //   deleteImages is the checkbox from edit form
      //    assign deleteImages to it's own variable
      let deleteImages = req.body.deleteImages;
      //    loop over deleteImages
      for (const public_id of deleteImages) {
        // We are passing public_id as value in the checkbox (deleteImages[])
        //        delete images from cloudinary
        await cloudinary.v2.uploader.destroy(public_id);
        //        delete images from post.images array for which the public id matches
        for (const image of post.images) {
          //  post.images is an array of public id's of images which needs to be deleted.
          if (image.public_id === public_id) {
            let index = post.images.indexOf(image);
            post.images.splice(index, 1);
          }
        }
      }
    }

    //  check if there are any new images to be uploaded i.e if user has provided any files(check in req.files)
    if(req.files){
      //  upload the new images
      for (const file of req.files) { //  Use for of loop if need to work with async await inside the loop.
        let image = await cloudinary.v2.uploader.upload(file.path);
        //  add image to post.images
        post.images.push({    //  we used post.images instead of req,body.post.images because we had access to the post in the begning.
          url: image.secure_url,
          public_id: image.public_id,
        });
          // console.log(image);    //    Uncomment if want to know the prperties of the obk=ject returned from cloudinary after successfull promise resolution.
      }
    }
    if(post.location !== req.body.post.location){
      let response = await geocodingClient.
      forwardGeocode({
        query: req.body.post.location,
        limit: 1,
      }).send();
      post.coordinates = response.body.features[0].geometry.coordinates;
      post.location = req.body.post.location;
    }
    //    update the post with new properties if any(location, description, title, price)
    post.title = req.body.post.title;
    post.price = req.body.post.price;
    post.description = req.body.post.description;

    //    save the updated post into the db
    post.save();
    //    redirect to show page of the post
    req.session.success = "POst Updated Successfully";
    res.redirect(`/posts/${post.id}`);
  },

  // Post Destroy
  async postDestroy(req, res, next) {
    const post = await Post.findById(req.params.id);
    for(const image of post.images){
      await cloudinary.v2.uploader.destroy(image.public_id);
    }
    await post.deleteOne();
    req.session.success = "Post Deleted Successfully";
    res.redirect("/posts");
  },
};



