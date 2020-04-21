require("dotenv").config();
const shortid = require("shortid");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);

// set some sample data
const orders = [
  {
    id: shortid.generate(),
    description: "Tower routine maintenance",
    station: "KRR - Karori",
    createdAt: new Date().toISOString(),
  },
  {
    id: shortid.generate(),
    description: "Fix station access",
    station: "ARO - Te Aro",
    createdAt: new Date().toISOString(),
  },
  {
    id: shortid.generate(),
    description: "Check fault generator",
    station: "MRM - Miramar",
    createdAt: new Date().toISOString(),
  },
];

const tasks = orders
  .map((order) => {
    return [
      {
        id: shortid.generate(),
        orderId: order.id,
        description: "Check general conditions are good",
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: shortid.generate(),
        orderId: order.id,
        description: "Check if labels are in the correct place",
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: shortid.generate(),
        orderId: order.id,
        description: "Check if voltage is correct",
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ];
  })
  .flat();

// save to database
db.defaults({ orders, tasks }).write();

module.exports = { db };
