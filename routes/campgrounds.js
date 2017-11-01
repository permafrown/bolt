var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var middleware  = require("../middleware");
var geocoder    = require("geocoder");

// INDEX ROUTE | /campgrounds + GET | show all campgrounds
router.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds: allCampgrounds, page: "campgrounds"});
        }
    });
});
// END INDEX ROUTE

// NEW ROUTE | /campgrounds/new + GET | show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new");
});
// END NEW ROUTE

// CREATE ROUTE | /campgrounds + POST | add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
    // get data from form && add to campgrounds array
    var name = req.body.name;
    var cost = req.body.cost;
    var imageURL = req.body.imageURL;
    var desc = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, cost: cost, image: imageURL, desc: desc, author: author};
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            req.flash("error", "Couldn't create the new campground...");
            console.log("there was an error with newlyCreated campground");
            res.redirect("back");
        } else {
            req.flash("success", "Successfully created the new campground!");
            console.log(req.user.username + " created campground '" + req.body.name + "' in the DB");
            res.redirect("/campgrounds");
        }
    });
});
// END CREATE ROUTE

// SHOW ROUTE = /campgrounds/:id + GET | show info on one campground
router.get("/:id", function(req, res) {
    //find CG with selected ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            req.flash("error", "couldn't find a campground by that ID");
            console.log(err);
            res.redirect("back");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});
// END SHOW ROUTE

// EDIT ROUTE
router.get("/:id/edit", middleware.checkCGOwn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            req.flash("error", "Couldn't edit the campground...");
            res.redirect("back");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});
// END EDIT ROUTE

// UPDATE ROUTE
router.put("/:id", middleware.checkCGOwn, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
      if(err) {
          req.flash("error", "Couldn't update the campground...");
          res.redirect("back");
      } else {
          req.flash("success", "Successfully updated the campground!");
          res.redirect("/campgrounds/" + req.params.id);
      }
  });
});
// END UPDATE ROUTE

// DESTROY ROUTE
router.delete("/:id", middleware.checkCGOwn, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            req.flash("error", "Couldn't delete the campground...");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Successfully deleted the campground :(");
            console.log(req.user.username + " deleted a campground from the DB");
            res.redirect("/campgrounds");
        }
    });
});
// END DESTROY ROUTE


// =============================
//     END CAMPGROUNDS ROUTES
// =============================


module.exports = router;