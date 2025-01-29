var express = require("express");
var router = express.Router();

require("../models/connection");
require("../models/trips");
require("../models/cart");

const Trip = require("../models/trips");
const Cart = require("../models/cart");


/* GET home page. */
router.get("/carts", (req, res) => {
    Cart.find()
	.populate('tripId')
	.then(data => {
		res.json({ cartTrip : data });
	});
});

module.exports = router;