const sendSMS = require('../../utils/twilio');
const Priority = require('./priority.model');

const getAll = async (req, res) => {
	console.log('Get all Priority Bookings ');
	try {
		const doc = await Priority.find().exec();
		if (!doc) {
			return res.status(200).json({ error: 'Something went wrong' });
		}
		console.log('created document');
		return res
			.status(201)
			.json({ data: doc, message: 'All Priotiyu Bookings' });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

// POST
const createOne = async (req, res) => {
	console.log('Create One Priority hell', req.body);

	try {
		const doc = await Priority.create(req.body);
		if (!doc) {
			return res.status(200).json({ error: 'Something went wrong' });
		}
		const data = doc.toJSON();
		console.log('JSON DATA', data);

		let date = data.date.toString().slice(0, 10);

		console.log('sms in CONTROLLER', data.date);
		const message = `
Hello ${data.title} ${data.firstName},
Thanks for booking your Priority Pass with ShuttleLane.
Your booking reference is: ${data.bookingReference}.     
Destination Airport: ${data.airport}.Flight Number: ${data.flightNumber}.
Service Type: ${data.service} Protocol Service.
Date & Time : ${date} ${data.time}.
Passenger: ${data.title} ${data.firstName} ${data.lastName}.
${data.passengers} passengers in total.
Cabin Class: ${data.cabinClass}.
Contact: ${data.email}, ${data.countryCode}${data.mobile}.
Need assistance? You can reach us on +2349030009452, +2349030009486 or +2349030009108.`;
		sendSMS(
			`${data.countryCode}${data.mobile}`,
			// `Hello, ${data.title} ${data.firstName} ${data.lastName} your Airport booking for ${date} at ${data.time} reference ID: ${data.bookingReference} has been confirmed, Thank you for choosing Shuttlelane`
			message
		);

		// sendMAIL(
		// 	`${data.email}`,
		// 	`Hello, ${data.title} ${data.firstName} ${data.lastName} your Airport booking for ${date} at ${data.time} reference ID: ${data.bookingReference} has been confirmed, Thank you for choosing Shuttlelane`
		// );
		return res.status(201).json({
			data: doc,
			message: 'Booking confirmed, Thank you for choosing shuttlelane.!',
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};
const priorityControllers = {
	getAll,
	createOne,
};
module.exports = priorityControllers;
