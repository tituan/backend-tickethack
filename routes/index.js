var express = require("express");
var router = express.Router();
require("../models/connection");
require("../models/trips");
const moment = require("moment");

const Trip = require("../models/trips");

/* GET home page. */
// router.get("/", function (req, res, next) {
//     res.render("index", { title: "Express" });
// });

router.get("/trips", function (req, res) {
    let departureValue = req.body.departure
    let arrivalValue = req.body.arrival
    let dateValue = req.body.date

    Trip.find()
        .then((trips) => {

            const matchingTrips = trips.filter(
            (dataTrip) =>
                dataTrip.departure.toLowerCase() === departureValue.toLowerCase() &&
                dataTrip.arrival.toLowerCase() === arrivalValue.toLowerCase() &&
                moment(dataTrip.date).format("YYYY-MM-DD") === moment(dateValue).format("YYYY-MM-DD")
            )
            // console.log(matchingTrips.length)

            if (matchingTrips.length > 0) {
                res.json({ allTrips: matchingTrips });
            } else {
                res.json({ message: "Aucun voyage trouvé correspondant aux critères fournis."})
            }
        })
    });


module.exports = router;
