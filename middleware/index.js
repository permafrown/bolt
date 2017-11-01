// =============================
//      MIDDLEWARE
// =============================

var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCGOwn = function (req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if(err) {
                req.flash("error", "Couldn't find that campground...");
                res.redirect("/campgrounds");
            } else {
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    console.log("Unauthorized user attempted to edit a campground!");
                    req.flash("error", "Please login as the correct user...");
                    res.redirect("/login");
                }
            }
        });
    } else {
        console.log("Unauthenticated user attempted to edit a campground!");
        req.flash("error", "Please login...");
        res.redirect("/login");
    }
};

middlewareObj.checkCommentOwn = function (req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err) {
                req.flash("error", "Couldn't find that comment...");
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    console.log("Unauthorized user attempted to edit a comment!");
                    req.flash("error", "Please login as the correct user...");
                    res.redirect("/login");
                }
            }
        });
    } else {
        console.log("Unauthenticated user attempted to edit a comment!");
        req.flash("error", "Please login...");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login...");
    res.redirect("/login");
};

module.exports = middlewareObj;