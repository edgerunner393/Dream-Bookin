const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../util/wrapAsync.js");
const {listingSchema , reviewSchema} = require("../schema.js");
const expressError = require("../util/expressError.js");
const Listings = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");

const validateListing = (req,res,next) =>{
    let {error}= listingSchema.validate(req.body);
    // console.log(result); 
    if(error){
        let errMsg = error.details.map((el) => el.message).join(", ");
        throw new expressError(400,error)
    }
    next();
};


//INDEX ROUTE
router.get("/", wrapAsync ( async (req,res) =>{
    const allListings = await Listings.find();
    res.render("listings/index.ejs",{allListings});
}));

// NEW FORM
router.get("/new",isLoggedIn,(req,res) =>{ //isko hum id wale se uppar rakhhe h taaki jab route pe jaaye toh id wale ki wajas se error na aaye
    // console.log(req.user); // req.user is set by passport.js, it contains the user information if logged in    
    res.render("listings/new.ejs");
})

// NEW ROUTE
router.post("/",validateListing, isLoggedIn, wrapAsync ( async (req,res,next) =>{
    let newListing = Listings(req.body.listing);
    if(!newListing.image.url){
        newListing.image.url = "https://images.unsplash.com/photo-1577852852977-30a744a0f652?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    };
    await newListing.save();
    req.flash("success","New listing created");
    res.redirect("/listings");
   
})
);

// EDIT ROUTE
router.get("/:id/edit" , validateListing, isLoggedIn, wrapAsync ( async (req,res) =>{
    let { id }= req.params;
    const listing = await Listings.findById(id);
    if(!listing){
        req.flash("error","No such listing found");
        res.redirect("/listings");
    }else{
        res.render("listings/edit.ejs",{listing});
    }
}));

// SHOW ROUTE
router.get("/:id", wrapAsync ( async (req,res) =>{
    let { id }= req.params;
    const listing = await Listings.findById(id).populate("review");
    if(!listing){
        req.flash("error","No such listing found");
        res.redirect("/listings");
    }else{
    res.render("listings/show.ejs",{listing});
    }
}));



// UPDATE ROUTE
router.put("/:id",validateListing, isLoggedIn, wrapAsync ( async (req,res) =>{
    // if(!req.body.listing){
    //     throw new expressError(400, "Send valid data");
    // }
    let {id} = req.params;
    await Listings.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);
}));

// DESTROY ROUTE
router.delete("/:id", isLoggedIn, wrapAsync ( async (req,res) =>{
    let { id } = req.params;
    let deleteIt = await Listings.findByIdAndDelete(id);
    req.flash("success","Listing deleted");
    res.redirect("/listings");
    console.log(deleteIt);
}));

module.exports = router;