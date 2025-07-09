const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../util/wrapAsync");
const passport = require("passport");

router.get("/signup", (req,res) =>{
    res.render("user/signup.ejs");
})

router.post("/signup", wrapAsync (async (req,res) =>{
    try{
        const {username, email, password} = req.body;
        let newUser = new User({username, email});
        let registered = await User.register(newUser, password);
        req.flash("success", "Welcome to the site!");
        console.log(registered);
        res.redirect("/listings");
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
        
}));

router.get("/login", (req,res) =>{
    res.render("user/login.ejs");
})

router.post("/login", passport.authenticate("local", {failureRedirect : "/login", failureFlash : true} ) , async (req,res) =>{
    req.flash("success","Welcome to the rice fields motherfucker.");
    res.redirect("/listings");
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