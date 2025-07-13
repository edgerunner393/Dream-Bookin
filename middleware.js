const Listings = require("./models/listing");
const Reviews = require("./models/review.js")
const {listingSchema , reviewSchema} = require("./schema.js");
const expressError = require("./util/expressError.js");

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
module.exports.isOwner = async (req,res,next) =>{
    let {id} = req.params;
    let listing = await Listings.findById(id);
    if(!listing.owner._id.equals(req.user._id)){
        req.flash("error","You are not authorized to edit this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req,res,next) =>{
    let {error}= listingSchema.validate(req.body);
    // console.log(result); 
    if(error){
        let errMsg = error.details.map((el) => el.message).join(", ");
        throw new expressError(400,error)
    }
    next();
};

module.exports.validateReview = (req,res,next) =>{
    let {error}= reviewSchema.validate(req.body);
    // console.log(result); 
    if(error){
        let errMsg = error.details.map((el) => el.message).join(", ");
        throw new expressError(400,error)
    }
    next();
};


module.exports.isReviewer= async (req,res,next) =>{
    let {id, reviewId} = req.params;
    let review = await Reviews.findById(reviewId);
    if(!review.author._id.equals(req.user._id)){
        req.flash("error","You are not authorized to delete this review.");
        return res.redirect(`/listings/${id}`);
    }
    next();
}