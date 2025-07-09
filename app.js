const express = require("express");
const app = express();
process.on('warning', (warning) => {
  console.log('⚠️ Warning triggered!');
  console.log(warning.name);     // Should be 'DeprecationWarning'
  console.log(warning.code);     // Should be 'DEP0044'
  console.log(warning.message);  // Full message
  console.trace();               // Print call stack
});

const mongoose = require("mongoose");
const Listings = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./util/wrapAsync.js");
const expressError = require("./util/expressError.js");
const {listingSchema , reviewSchema} = require("./schema.js");
const Reviews = require("./models/review.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js")

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const mongo_url = 'mongodb://127.0.0.1:27017/Wanderlust';

main().then((res) => {console.log("connected to db")
}).catch((err) =>{
    console.log(err);
});
async function main() {
    await mongoose.connect(mongo_url);
}

app.get("/" ,(req,res) =>{
    res.send("done");
})

const sessionOps = {
    secret : "mysupersecretcode",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    }
}

app.use(session(sessionOps));
app.use(flash());

app.use(passport.initialize()); // this is used to initialize our passport and is a middleware
app.use(passport.session());  // this remember the user whlie they are logged in and navigate through different pages
passport.use(new LocalStrategy(User.authenticate())); // this means we are going to use the LocalStratery to authenticate our user. so this is to use static authenticate method of model in localstrategy. authenticate() generates a fucntion in passport to user localstrategy.

passport.serializeUser(User.serializeUser()); // this is used to serialize the user object so that it can be stored in the session
passport.deserializeUser(User.deserializeUser()); // this is destoring the session data



app.use((req,res,next) =>{
    res.locals.success = req.flash("success"); // we here the success is an array, so different success in diff pages
    res.locals.error = req.flash("error");
    next();
})

// app.get("/demouser" , async (req,res) =>{
//     let fakeUser = new User({
//         email : "test@gmail.com",
//         username : "tatemis",
//     })

//     let newUser = await User.register(fakeUser, "tatemis123"); // here the tatemis123 is password
//     res.send(newUser);
// })

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter)
app.use("/", userRouter);


app.all("*path", (req,res,next) => {
    next(new expressError(404,"Not found"));
});

app.use((err,req,res,next) =>{
    let {status = 500, message = "Something went wrong"} = err;
    res.status(status).render("error.ejs",{message});
    // res.status(status).send(message);
})

app.listen(8080, () =>{
    console.log("http://localhost:8080");
    
})