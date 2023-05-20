
module.exports = {
    asyncErrorHandler : (fn) => (req,res,next) => {
        return Promise
            .resolve(fn(req, res, next)) // pass the req, res and next parameters 
            .catch(next);
    }
}



