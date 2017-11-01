// =============================
//      GENERAL CONFIG
// =============================
// MODULE VARIABLES
var express                 = require("express");
var bodyParser              = require("body-parser");
var mongoose                = require("mongoose");
var flash                   = require("connect-flash");
var passport                = require("passport");
var LocalStrat              = require("passport-local");
var methodOverride          = require("method-override");
var passportLocalMongoose   = require("passport-local-mongoose");
var seedDB                  = require("./seeds");
// END MODULE VARIABLES

// REQUIRING ROUTES
var indexRoutes             = require("./routes/index");
var commentRoutes           = require("./routes/comments");
var campgroundRoutes        = require("./routes/campgrounds");
// END REQUIRING ROUTES

// MODELS
var User                    = require("./models/user");
var Comment                 = require("./models/comment");
var Campground              = require("./models/campground");
// END MODELS

// APP CONFIG
var app = express();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");
// END APP CONFIG

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "monkeygerbil piratemeat pantherdestiny",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrat(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// END PASSPORT CONFIG

// GLOBALS
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});
// END GLOBALS


// USE ROUTES
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
// END USE ROUTES

// SEED THE DB
// seedDB();
// END SEED



// =============================
//      LISTENER
// =============================
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("yelpCamp server up...");
});
// END LISTENER
