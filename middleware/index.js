module.exports= {
    errorHandler: (fn) =>           //implisit return
    (req,res,next) => {
        Promise.resolve(fn)
            .catch(next)
    }
}