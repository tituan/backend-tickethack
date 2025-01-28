var express = require("express");
var router = express.Router();
require("../models/connection");
require("../models/trips");
const moment = require("moment");
const fetch = require('node-fetch');

const Trip = require("../models/trips");

/* GET home page. */
// router.get("/", function (req, res, next) {
//     res.render("index", { title: "Express" });
// });


// This is made to search a trip with a departue arrival and date
router.get("/trips", function (req, res) {
    let departureValue = req.body.departure
    let arrivalValue = req.body.arrival
    let dateValue = req.body.date

    console.log(departureValue)
    console.log(arrivalValue)
    console.log(dateValue)

   
    Trip.find({ departure: { $regex: new RegExp(departureValue, 'i') }, 
                arrival: { $regex: new RegExp(arrivalValue, 'i') }, 
                 date: { $gte: dateValue, $lte: dateValue } })
        .then((trips) => {
            if (departureValue && arrivalValue && dateValue) {
                res.json({ allTrips : trips});
            } else {
                res.json({ message: "Aucun voyage trouvé correspondant aux critères fournis."})
            }
        })
    });

    // 2025-01-28T18:54:38.908Z
module.exports = router;
