const express = require("express");
const priorityRouter = express.Router();
const priorityControllers = require("./priority.controllers");

console.log("in priority router");
priorityRouter
  .route("/")
  .get(priorityControllers.getAll)
  .post(priorityControllers.createOne);

module.exports = priorityRouter;
