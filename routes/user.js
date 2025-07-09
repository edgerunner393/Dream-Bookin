const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../util/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup", (req,res) =>{
    res.render("user/signup.ejs");
})

router.post("/signup", wrapAsync (async (req,res) =>{
    try{
        const {username, email, password} = req.body;
        let newUser = new User({username, email});
        let registered = await User.register(newUser, password);
        req.login(registered, (err) => { // this is used to log in the user after registration consequently no need to login again
            if(err){
                req.flash("error", "Login failed after registration");
                return res.redirect("/signup");
            }
            req.flash("success", "Welcome to the site!");
            // console.log(registered);
            res.redirect("/listings");
        })
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
        
}));

router.get("/login", (req,res) =>{
    res.render("user/login.ejs");
})

router.post("/login",
    saveRedirectUrl, // this is used to save the redirect url in the session so that we can redirect the user to the page they were trying to access after login
    passport.authenticate("local",
        {failureRedirect : "/login",
        failureFlash : true} ),
    async (req,res) =>{
    req.flash("success","Welcome to the rice fields motherfucker.");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
})

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You logged out successfully!!")
        res.redirect("/listings");
    })
})

module.exports = router;