var express = require("express");
var router = express.Router();

require("../models/connection");
require("../models/trips");
require("../models/cart");

const moment = require("moment");

const Trip = require("../models/trips");
const Cart = require("../models/cart");


/* GET home page. */
router.get("/", (req, res) => {
    Cart.find()
	.populate('tripId')
	.then(data => {
		console.log(data)
		let dataTrip = [];
		for (let i = 0; i < data.length; i++) {
			const newObj = {
				id: data[i].tripId._id,
				departure: data[i].tripId.departure,
				arrival: data[i].tripId.arrival,
				date: moment.utc(data[i].tripId.date).format("HH:mm"),
				price: data[i].tripId.price,
			};
			dataTrip.push(newObj);
		}
		res.json({result: true, dataTrip });
	});
});

module.exports = router;