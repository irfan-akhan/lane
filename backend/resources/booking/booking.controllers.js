const sendSMS = require('../../utils/twilio');
// const sendMAIL = require('../../utils/sendgrid');
const Booking = require('./booking.model');

const getAll = async (req, res) => {
	console.log('Get all Bookings ');
	try {
		const doc = await Booking.find();
		if (!doc) {
			return res.status(200).json({ error: 'Something went wrong' });
		}
		return res.status(201).json({ data: doc, message: 'All Bookings' });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

// POST
const createOne = async (req, res) => {
	console.log('Create One Booking hell', req.body);

	try {
		const doc = await Booking.create(req.body);
		if (!doc) {
			return res.status(200).json({ error: 'Something went wrong' });
		}
		const data = doc.toJSON();
		console.log('JSON DATA', data);
		let date;
		let message = ``;
		if (data.pickupDate) {
			console.log('pickyp');
			date = data.pickupDate.toString().slice(0, 10);
			message = `Hello ${data.title} ${data.firstName},
Thanks for booking your ${data.formType} service with ShuttleLane.
Your booking reference is: ${data.bookingReference}.
Pick-up: ${data.pickupAddress}.
Meeting Point: Proceed to trolley stand behind Baggage Conveyor for your free trolley and porter service.
Drop-off: ${data.dropoffAirport}
Date & Time : ${date} ${data.time}.
Passenger: ${data.title} ${data.firstName} ${data.lastName}.
${data.passengers} passengers in total.
Vehicle Class: ${data.carType}.
Contact: ${data.email}, ${data.countryCode}${data.mobile}.
Need assistance? You can reach us on +2349030009452, +2349030009486 or +2349030009108.`;
		}
		if (data.arrivalDate) {
			console.log('dropoff');
			date = data.arrivalDate.toString().slice(0, 10);
			message = `Hello ${data.title} ${data.firstName},
Thanks for booking your ${data.formType} service with ShuttleLane.
Your booking reference is: ${data.bookingReference}.
Pick-up: ${data.pickupAirport}.
Flight Number: ${data.flightNumber}.
Meeting Point: Proceed to trolley stand behind Baggage Conveyor for your free trolley and porter service.
Drop-off: ${data.dropoffAddress}
Date & Time: ${date} ${data.time}.
Passenger: ${data.title} ${data.firstName} ${data.lastName}.
${data.passengers} passengers in total.
Vehicle Class: ${data.carType}.
Contact: ${data.email} ${data.mobile}.
Need assistance? You can reach us on +2349030009452, +2349030009486 or +2349030009108.`;
		}
		sendSMS(
			`${data.countryCode}${data.mobile}`,
			message
			// `Hello, ${data.title} ${data.firstName} ${data.lastName} your Airport booking for ${date} at ${data.time} reference ID: ${data.bookingReference} has been confirmed, Thank you for choosing Shuttlelane`
		);

		// sendMAIL(
		// 	`${data.email}`,
		// 	`Hello, ${data.title} ${data.firstName} ${data.lastName} your Airport booking for ${date} at ${data.time} reference ID: ${data.bookingReference} has been confirmed, Thank you for choosing Shuttlelane`
		// );
		// res.status(201).json({
		// 	data: doc,
		// 	message: 'Booking confirmed, Thank you for choosing shuttlelane.!',
		// });
		// console.log('sms in CONTROLLER', data.arrivalDate);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};

const updateOne = async (req, res) => {
	const { serviceStatus } = req.body;

	try {
		const doc = await Booking.findOneAndUpdate(
			{ _id: req.params.id },
			{ serviceStatusL: serviceStatus },
			{ new: true }
		);
		if (doc) {
			res.status(200).json({
				data: doc,
				message: 'Updated Successfully',
			});
		} else {
			res.status(200).json({
				data: null,
				message: 'Update Could not be performed',
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ data: null, message: error });
	}
};

const bookingControllers = {
	getAll,
	createOne,
	updateOne,
};
module.exports = bookingControllers;
