var express = require("express");
var router = express.Router();
require("../models/connection");
require("../models/trips");
const Trip = require("../models/trips");

/* GET home page. */
// router.get("/", function (req, res, next) {
//     res.render("index", { title: "Express" });
// });

router.get("/trips", function (req, res) {
    Trip.find().then((trips) => res.json({ allTrips: trips }));
    // res.render("index", { title: "Express" });
});

module.exports = router;
