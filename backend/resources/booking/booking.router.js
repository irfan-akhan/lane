const express = require("express");
const bookingRouter = express.Router();
const bookingControllers = require("./booking.controllers");

console.log("in Booking router");
bookingRouter
  .route("/")
  .get(bookingControllers.getAll)
  .post(bookingControllers.createOne);
bookingRouter.route("/:id").put(bookingControllers.updateOne);

module.exports = bookingRouter;
