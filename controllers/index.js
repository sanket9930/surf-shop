const User = require('../models/user');


//  it requires a database connection 
module.exports = {
    async postRegister(req,res,next){
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            image: req.body.image 
        }

        await User.register(new User(newUser), req.body.password);
        res.redirect('/');
    }
}