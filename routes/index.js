var express = require("express");
var router = express.Router();

require("../models/connection");
require("../models/trips");
require("../models/cart");

const moment = require("moment");

const Trip = require("../models/trips");
const Cart = require("../models/cart");

/* GET home page. */
// router.get("/", function (req, res, next) {
//     res.render("index", { title: "Express" });
// });

// This is made to search a trip with a departue arrival and date$

router.post("/", function (req, res) {
    let departureValue = req.body.departure;
    let arrivalValue = req.body.arrival;
    let dateValue = req.body.date;

    console.log(departureValue);
    console.log(arrivalValue);
    console.log(dateValue);

    if (!req.body.departure || !req.body.arrival || !req.body.date) {
        res.json({ result: false, message: "Trip not found" });
    }

    Trip.find({
        departure: { $regex: new RegExp(req.body.departure, "i") },
        arrival: { $regex: new RegExp(req.body.arrival, "i") },
        date: {
            $gte: moment.utc(req.body.date).startOf("day").toDate(),
            $lt: moment.utc(req.body.date).endOf("day").toDate(),
        },
    }).then((trips) => {
        if (trips.length === 0) {
            res.json({ result: false, message: "Trip not found" });
        } else {
            res.json({ result: true, trips });
        }
       
        Trip.find({ departure: { $regex: new RegExp(req.body.departure, 'i') }, 
                    arrival: { $regex: new RegExp(req.body.arrival, 'i') }, 
                    date: { 
                        $gte: moment.utc(req.body.date).startOf("day").toDate(), 
                        $lt: moment.utc(req.body.date).endOf("day").toDate() 
                        } 
                    })
            .then((trips) => {
                if (trips.length === 0) {
                    res.json({ result: false, message: "Trip not found"});
                } else {
                    let dataTrip = [];
                    for (let i = 0; i < trips.length; i++) {
                        console.log(trips[i]._id)
                        const newObj = {
                            id: trips[i]._id,
                            departure: trips[i].departure,
                            arrival: trips[i].arrival,
                            date: moment.utc(trips[i].date).format("HH:mm"),
                            price: trips[i].price
                        }
                        dataTrip.push(newObj)
                    }
                    res.json({ result: true, dataTrip});
                }
            })
    });
});

<<<<<<< HEAD
router.post("/cart", function (req, res) {
    console.log(req.body.date);

    Cart.find({
        departure: req.body.departure,
        arrival: req.body.arrival,
        date: req.body.date,
    }).then(
        (data) => {
            // console.log(data);
            // console.log(req.body.departure)
            // console.log(req.body.arrival)
            console.log(req.body.date);
            if (data) {
                res.json({ result: false, message: "Trip exist" });
            } else {
                const newCart = new Cart({
                    departure: req.body.departure,
                    arrival: req.body.arrival,
                    date: req.body.date,
                    price: req.body.price,
                });

                newCart.save().then((newTrip) => {
                    res.json({ result: true, newTrip });
                });
            }
        }

        // res.json({ result: true });
    );
});
=======
    router.post("/cart", function (req, res) {
        
        Trip.findById(req.body.tripId)
        .then(data => {
            console.log(data)
            const newCart = new Cart ({
                tripId: data._id
            });
    
            newCart.save().then( data => { 
                res.json({ result: true});
            });
        })
    });
>>>>>>> 63f31c75a19781daf6a472f529f940f3fe1d658a

module.exports = router;
