var mongoose = require("mongoose");
const shortid = require("shortid");

const bookingSchema = new mongoose.Schema(
  {
    formType: {
      type: String,
      required: true,
    },
    carType: {
      required: true,
      type: String,
    },
    pickupAirport: {
      type: String,
    },
    dropoffAddress: {
      type: String,
      trim: true,
    },
    serviceStatusL: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Approved", "Scheduled", "Cancelled", "Completed"],
    },
    pickupAddress: {
      type: String,
    },
    dropoffAirport: {
      type: String,
      trim: true,
    },
    time: {
      type: String,
    },
    pickupDate: {
      type: Date,
    },
    arrivalDate: {
      type: Date,
    },

    passengers: {
      type: Number,
    },
    firstName: {
      required: true,
      type: String,
      trim: true,
    },
    lastName: {
      required: true,
      type: String,
      trim: true,
    },
    email: {
      required: true,
      type: String,
      trim: true,
      match: /.+\@.+\..+/,
    },
    mobile: {
      required: true,
      type: String,
      trim: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Successful", "Pending"],
      default: "Pending",
    },
    bookingReference: {
      type: mongoose.Schema.Types.Mixed,
      default: shortid.generate,
    },
    amount: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    flightNumber: {
      type: String,
    },
    countryCode: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;
