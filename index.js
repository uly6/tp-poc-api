const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const shortid = require("shortid");
const { db } = require("./config");

shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// orders
const getOrderList = (request, response) => {
  const orders = db.get("orders").value();
  response.status(200).json(orders);
};

const getOrderById = (request, response) => {
  const order = db.get("orders").find({ id: request.params.id }).value();
  response.status(200).json(order);
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

const getTasksByOrderId = (request, response) => {
  const tasks =
    db.get("tasks").filter({ orderId: request.params.orderId }).value() || [];

  response.status(200).json(tasks);
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
