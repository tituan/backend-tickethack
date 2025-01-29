var express = require("express");
var router = express.Router();

require("../models/connection");
require("../models/trips");
require("../models/cart");

const Trip = require("../models/trips");
const Cart = require("../models/cart");


/* GET home page. */
router.get("/", (req, res) => {
    Cart.find()
	.populate('tripId')
	.then(data => {
		// for (const element of data) {
			// console.log(element)
			res.json({data});
		// }
	});
});

module.exports = router;