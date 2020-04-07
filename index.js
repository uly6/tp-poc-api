const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const shortid = require("shortid");
const { db } = require("./config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const getStatusList = (request, response) => {
  const result = db.get("status").find({ id: postId }).value();
  response.status(200).json(result);
};

const getTasksList = (request, response) => {
  const result = db.get("tasks").value();
  response.status(200).json(result);
};

const getTasksById = (request, response) => {
  const result = db.get("tasks").find({ id: request.params.id }).value();
  response.status(200).json(result);
};

const addTask = (request, response) => {
  const { name, status } = request.body;
  const data = {
    id: shortid.generate(),
    name,
    status,
  };
  const result = db.get("tasks").push(data).write();
  response
    .status(201)
    .json({ status: "success", message: "Task added", result });
};

// status api
app.get("/api/status", getStatusList);

// tasks api
app.get("/api/tasks", getTasksList);
app.get("/api/tasks/:id", getTasksById);
app.post("/api/tasks", addTask);

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`);
});
