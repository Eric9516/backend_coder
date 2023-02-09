const moment = require("moment");
const timestamp = moment().format("h:mm a");

class Cart {
	constructor(productos) {
		this.timestamp = timestamp;
		this.productos = productos || [];
	}
}

module.exports = Cart;
