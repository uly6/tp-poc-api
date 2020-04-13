const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const shortid = require("shortid");
const { db } = require("./config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// orders
const getOrderList = (request, response) => {
  const result = db.get("orders").value();
  response.status(200).json(result);
};

const getOrderById = (request, response) => {
  const result = db.get("orders").find({ id: request.params.id }).value();
  response.status(200).json(result);
};

const addOrder = (request, response) => {
  const { description, station } = request.body;
  const data = {
    id: shortid.generate(),
    description,
    station,
  };
  const result = db.get("orders").push(data).write();
  response
    .status(201)
    .json({ status: "success", message: "Order added", result });
};

// tasks
const getTasksByOrderId = (request, response) => {
  const result = db
    .get("tasks")
    .find({ orderId: request.params.orderId })
    .value();
  response.status(200).json(result);
};

const addTask = (request, response) => {
  const { orderId, description } = request.body;
  const data = {
    id: shortid.generate(),
    orderId,
    description,
    done: false,
  };
  const result = db.get("tasks").push(data).write();
  response
    .status(201)
    .json({ status: "success", message: "Task added", result });
};

// orders api
app.get("/api/orders", getOrderList);
app.get("/api/orders/:id", getOrderById);
app.post("/api/orders", addOrder);

// tasks api
app.get("/api/tasks/:orderId", getTasksByOrderId);
app.post("/api/tasks", addTask);

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`);
});
