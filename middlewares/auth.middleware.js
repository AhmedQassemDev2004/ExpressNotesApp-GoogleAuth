
const authRequired = (req,res,next) => {
    if(req.user) {
        next();
    } else {
        res.status(401).send("Un authorized");
    }
}

module.exports = authRequired;