var express     = require("express");
var router      = express.Router();
var User        = require("../models/user");
var passport    = require("passport");

// ROOT ROUTE
router.get("/", function(req, res){
    res.render('landing');
});
// END ROOT ROUTE

// =============================
//     AUTH ROUTES
// =============================

// AUTH NEW ROUTE
router.get("/reg", function(req, res) {
    res.render("reg", {page: 'reg'});
});

// AUTH CREATE ROUTE
router.post("/reg", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("reg");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Successfully registered! Welcome " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// =============================
//     LOGIN ROUTES
// =============================

// LOGIN NEW ROUTE
router.get("/login", function(req, res) {
    res.render("login", {page: 'login'});
});

// LOGIN CREATE ROUTE
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function(req, res) {
});

// LOGOUT ROUTE
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged out...");
    res.redirect("/campgrounds");
});

module.exports = router;