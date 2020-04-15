require("dotenv").config();
const shortid = require("shortid");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

// set some sample data
const orders = [
  {
    id: shortid.generate(),
    description: "Tower routine maintenance",
    station: "KRR - Karori",
  },
  {
    id: shortid.generate(),
    description: "Fix station access",
    station: "ARO - Te Aro",
  },
  {
    id: shortid.generate(),
    description: "Check fault generator",
    station: "MRM - Miramar",
  },
];

const tasks = [
  {
    id: shortid.generate(),
    orderId: orders[0].id,
    description: "Task 01",
    done: false,
  },
  {
    id: shortid.generate(),
    orderId: orders[0].id,
    description: "Task 02",
    done: false,
  },
  {
    id: shortid.generate(),
    orderId: orders[0].id,
    description: "Task 03",
    done: false,
  },
  {
    id: shortid.generate(),
    orderId: orders[1].id,
    description: "Task 01",
    done: false,
  },
  {
    id: shortid.generate(),
    orderId: orders[1].id,
    description: "Task 02",
    done: false,
  },
  {
    id: shortid.generate(),
    orderId: orders[1].id,
    description: "Task 03",
    done: false,
  },
  {
    id: shortid.generate(),
    orderId: orders[2].id,
    description: "Task 01",
    done: false,
  },
  {
    id: shortid.generate(),
    orderId: orders[2].id,
    description: "Task 02",
    done: false,
  },
  {
    id: shortid.generate(),
    orderId: orders[2].id,
    description: "Task 03",
    done: false,
  },
];

// save to database
db.defaults({ orders, tasks }).write();

module.exports = { db };
