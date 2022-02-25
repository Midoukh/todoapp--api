const controller = require("../controllers/todos.controller");
const express = require("express");

const route = express.Router();

route.get("/get/:userID", controller.getTodos);
route.delete("/delete/:todoID", controller.deleteATodo);
route.post("/post", controller.createTodo);
route.put("/put/:todoID", controller.updateATodo);

module.exports = route;
