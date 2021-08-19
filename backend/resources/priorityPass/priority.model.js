var mongoose = require("mongoose");
const shortid = require("shortid");

const prioritySchema = new mongoose.Schema(
  {
    airport: {
      type: String,
    },
    service: {
      type: String,
    },
    cabinClass: {
      type: String,
    },
    time: {
      type: String,
    },
    date: {
      type: Date,
    },
    passengers: {
      type: Number,
    },
    firstName: {
      required: true,
      type: String,
    },
    lastName: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      match: /.+\@.+\..+/,
    },
    mobile: {
      required: true,
      type: String,
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

const Priority =
  mongoose.model.priority || mongoose.model("priority", prioritySchema);

module.exports = Priority;
