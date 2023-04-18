const User = require('../models/user');


//  it requires a database connection 
module.exports = {
    postRegister(req,res,next){
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            image: req.body.image 
        }

        User.register(new User(newUser), req.body.password, (err) => {
            if (err) {
              console.log('error while user register!', err);
              return next(err);
            }
        
            console.log('user registered!');
        
            res.redirect('/');
          });
    }
}