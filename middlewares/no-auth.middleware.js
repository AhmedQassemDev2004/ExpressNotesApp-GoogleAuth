
const noAuth = (req,res,next) => {
    if(req.user) {
        return res.redirect("/dashboard");
    }

    next();
}


module.exports = noAuth