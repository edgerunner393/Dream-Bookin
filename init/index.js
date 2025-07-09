const mongoose = require("mongoose");
const initData = require("./data.js");
const Listings = require("../models/listing.js");

const mongo_url = 'mongodb://127.0.0.1:27017/Wanderlust';

main().then((res) => {console.log("connected to db")
}).catch((err) =>{
    console.log(err);
});
async function main() {
    await mongoose.connect(mongo_url);
}

const dbData = async () => {
    await Listings.deleteMany({});
    initData.data = initData.data.map((obj) =>({
        ...obj,
        owner : '6867cb465bc2c467d661b1c6'
    }))
    await Listings.insertMany(initData.data);
    console.log("data was initilized");
}

dbData();