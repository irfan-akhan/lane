const sendSMS = require('../../utils/twilio');
const sendMAIL = require('../../utils/sendgrid');
const Car = require('./car.model');

// controllers

const getAll = async (req, res) => {
	console.log('Get all Car Hiring ');
	try {
		const doc = await Car.find();
		if (!doc) {
			return res.status(200).json({ error: 'Something went wrong' });
		}
		return res.status(201).json({ data: doc, message: 'All cars' });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

// POST
const createOne = async (req, res) => {
	console.log('Create One car hire', req.body);

	try {
		const doc = await Car.create(req.body);
		if (!doc) {
			return res.status(200).json({ error: 'Something went wrong' });
		}
		res.status(201).json({
			data: doc,
			message: 'Booking confirmed, Thank you for choosing shuttlelane.!',
		});
		const data = doc.toJSON();
		let date = data.date.toString().slice(0, 10);
		const message = `
Hello ${data.title} ${data.firstName},
Thanks for booking your Car Hire Service with ShuttleLane.
Your booking reference is: ${data.bookingReference}.
Pickup: ${data.pickupAddress}.
Destination: ${data.destination}.
Date & Time : ${date} ${data.time}.
Duration: ${data.days} Days.
Passenger: ${data.title} ${data.firstName} ${data.lastName}.
Prefered Car: ${data.carType}.
Contact: ${data.email}, ${data.countryCode}${data.mobile}.
Need assistance? You can reach us on +2349030009452, +2349030009486 or +2349030009108.`;
		sendSMS(
			`${data.countryCode}${data.mobile}`,
			message
			// `Hello, ${data.title} ${data.firstName} ${data.lastName} your car booking for ${date} at ${data.time} has been confirmed, reference ID: ${data.bookingReference} Thank you for choosing Shuttlelane`
		);
		sendMAIL(
			`${data.email}`,
			message
			// `Hello, ${data.title} ${data.firstName} ${data.lastName} your car booking for ${date} at ${data.time} has been confirmed, reference ID: ${data.bookingReference} Thank you for choosing Shuttlelane`
		);
		console.log('sms in CONTROLLER', data.arrivalDate);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};

const updateOne = async (req, res) => {
	const { serviceStatus } = req.body;

	try {
		const doc = await Car.findOneAndUpdate(
			{ _id: req.params.id },
			{ serviceStatus: serviceStatus },
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
const carControllers = {
	getAll,
	createOne,
	updateOne,
};
module.exports = carControllers;
