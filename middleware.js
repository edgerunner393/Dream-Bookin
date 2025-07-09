module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.flash("error","You must be logged in to create a listing");
        return res.redirect("/login"); // yahan pe return lagana zaroori hai warna next line bhi execute ho jaayegi, or maybe error bhi aayega, login.ejs nhi likhna h bas login likhna h
    }
    next();
}