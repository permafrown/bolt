var express     = require("express");
var router      = express.Router({mergeParams: true});
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
var middleware   = require("../middleware");

// COMMENTS NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            req.flash("error", "Something went wrong...");
            console.log(err);
            res.redirect("back");
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});
// END COMMENTS NEW ROUTE

// COMMENTS CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            req.flash("error", "Something went wrong...");
            console.log(err);
            res.redirect("back");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    req.flash("error", "Couldn't create the comment...");
                    console.log(err);
                } else {
                    //add UN and ID to the comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save the comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully created the comment!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});
// END COMMENTS CREATE ROUTE

// COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwn, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            req.flash("error", "Couldn't find that comment...");
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});
// END COMMENTS EDIT ROUTE

// COMMENTS UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwn, function(req, res) {
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
       if(err) {
           req.flash("error", "Couldn't update the comment...");
           res.redirect("back");
       } else {
           req.flash("success", "Successfully updated the comment!");
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});
// END COMMENTS UPDATE ROUTE

// COMMENTS DELETE ROUTE
router.delete("/:comment_id", middleware.checkCommentOwn, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            req.flash("error", "Couldn't delete the comment...");
            res.redirect("back");
        } else {
            console.log(req.user.username + " deleted a comment from " + req.params.id);
            console.log(req.params);
            req.flash("success", "Successfully deleted the comment :(");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
// END COMMENTS DELETE ROUTE

module.exports = router;