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

   
    Trip.find({
        types: {
            $elemMatch: {
                departure: { $regex: departureValue, $options: "i" }, 
                arrival: { $regex: arrivalValue, $options: "i" },     
                date: { $regex: dateValue }                        
            }
        }
    })
    // departure: { $regex: "^Par", $options: "i" },
    //   arrival: { $in: ["London", "Rome"] },
    //   date: { $gte: "2025-01-01", $lte: "2025-12-31" } 
        .then((trips) => {
            console.log(trips)
            res.json({ trips: trips });
            // const matchingTrips = trips.filter(
            // (dataTrip) =>
            //     dataTrip.departure.toLowerCase() === departureValue.toLowerCase() &&
            //     dataTrip.arrival.toLowerCase() === arrivalValue.toLowerCase() &&
            //     moment(dataTrip.date).format("YYYY-MM-DD") === moment(dateValue).format("YYYY-MM-DD")
            // )
            // if (matchingTrips.length > 0) {
            //     res.json({ allTrips: matchingTrips });
            // } else {
            //     res.json({ message: "Aucun voyage trouvé correspondant aux critères fournis."})
            // }
        })
    });


module.exports = router;
