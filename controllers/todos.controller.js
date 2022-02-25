const Todo = require("../models/Todo");
const axios = require("axios");

exports.getTodos = async (req, res) => {
  try {
    // const { userID } = req.params;
    // const todos = await Todo.find({ userID: userID });
    const { userID } = req.params;
    const { authorization } = req.headers;
    const accessToken = authorization.split(" ")[1];
    const todos = await Todo.find({ userID: userID });
    res.status(200).json({
      status: "Sucess",
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      error,
    });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);

    res.status(201).json({
      status: "TODO created Successfully!",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      error,
    });
  }
};
exports.deleteATodo = async (req, res) => {
  const { todoID } = req.params;
  try {
    await Todo.findOneAndDelete({ _id: todoID });

    res.status(204).json({
      message: "TODO deleted!",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      error,
    });
  }
};
exports.updateATodo = async (req, res) => {
  const { todoID } = req.params;
  const { completed } = req.body;
  console.log(req.body, todoID);
  try {
    const response = await Todo.findOneAndUpdate(
      { _id: todoID },
      { completed }
    );
    const message = completed
      ? "TODO set to completed"
      : "TODO is still pending";
    res.status(202).json({
      message,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      error,
    });
  }
};
