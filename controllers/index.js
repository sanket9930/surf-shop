const User = require('../models/user');
const passport = require('passport');


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
    },

    postLogin(req,res,next) {               // Here the name to function has been given so no need to use =
        passport.authenticate('local',{
            successRedirect: '/',
            failureRedirect: '/login' 
        })(req,res,next);                   //calling passport.authenticate
    },

    getLogout(req,res,next) {
        req.logout( () =>{} );          //req.logout() requires a callback so passing an empty callback function.
        res.redirect('/');
    }
}