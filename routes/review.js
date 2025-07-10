const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../util/wrapAsync.js");
const expressError = require("../util/expressError.js");
const {listingSchema , reviewSchema} = require("../schema.js");
const Listings = require("../models/listing.js");
const Reviews = require("../models/review.js");
const {validateReview} = require("../middleware.js");




// Review requests
router.post("/", validateReview, wrapAsync (async (req,res) =>{
    let listing = await Listings.findById(req.params.id)
    let newRev = new Reviews(req.body.review)

    listing.review.push(newRev)

    await newRev.save()
    await listing.save()
    // res.send("Done");
    req.flash("success","Review added");
    res.redirect(`/listings/${listing._id}`);
    
}));

// Destroy reviews
router.delete("/:reviewId", wrapAsync(async (req,res) =>{
    let {id, reviewId} = req.params;
    await Listings.findByIdAndUpdate(id, {$pull : {review : reviewId }});
    await Reviews.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;