
const homePage = (req,res)=>{
    const locals = {
        title:"Home Page",
        desc:"Notes app home page"
    }
    res.render("home",{locals});
}

module.exports = {homePage}