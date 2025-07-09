module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl; // this is used to redirect the user to the page they were trying to access after login
        req.flash("error","You must be logged in to create a listing");
        return res.redirect("/login"); // yahan pe return lagana zaroori hai warna next line bhi execute ho jaayegi, or maybe error bhi aayega, login.ejs nhi likhna h bas login likhna h
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl; // this is used to save the redirect url in the locals so that it can be used in the login page
        // delete req.session.redirectUrl; // we delete it after saving it to locals so that it is not used again
        
    }
    next();
}