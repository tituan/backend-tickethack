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
        let departureValue = req.body.departure
        let arrivalValue = req.body.arrival
        let dateValue = req.body.date
    
        console.log(departureValue)
        console.log(arrivalValue)
        console.log(dateValue)

        if(!req.body.departure || !req.body.arrival || !req.body.date) {
            res.json({ result: false, message: "Trip not found"});
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
                    res.json({ result: true, trips});
                }
            })
    });

    router.post("/cart", function (req, res) {
        
        console.log(req.body.date)
        
        Cart.find({ 
                departure: req.body.departure,
                // arrival: req.body.arrival,
                // date: req.body.date 
                })
        .then(data => {
            console.log(data)
            // console.log(req.body.departure)
            // console.log(req.body.arrival)
            // console.log(req.body.date)
            // if (data) {
            //     res.json({ result: false, message: "Trip exist"});
            // } else {
                const newCart = new Cart ({
                    departure: req.body.departure,
                    arrival: req.body.arrival,
                    date: req.body.date,
                    price: req.body.price,
                });
        
                newCart.save().then( newTrip => { 
                    res.json({ result: true, newTrip});
                });
                
            // }
        })
        
           
        // res.json({ result: true });
    });

module.exports = router;
