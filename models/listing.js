const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema ({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
    },
    image: {
        filename: String,
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1577852852977-30a744a0f652?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }
    },
    price : Number,
    location : String,
    country : String,
    review:[ 
        {
            type : Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

listingSchema.post("findOneAndDelete", async(listing) =>{
    if(listing){
        await Review.deleteMany({_id : {$in : listing.review}})
    }
})

const Listings = mongoose.model("Listings",listingSchema);

module.exports = Listings;