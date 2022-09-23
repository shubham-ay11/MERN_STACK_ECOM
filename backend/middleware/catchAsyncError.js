module.exports = errorFun => (req,res,next) => {
    Promise.resolve(errorFun(req,res,next)).catch(next);
}