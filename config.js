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

const tasks = orders
  .map((order) => {
    return [
      {
        id: shortid.generate(),
        orderId: order.id,
        description: "Check general conditions are good",
        completed: false,
      },
      {
        id: shortid.generate(),
        orderId: order.id,
        description: "Check if labels are in the correct place",
        completed: false,
      },
      {
        id: shortid.generate(),
        orderId: order.id,
        description: "Check if voltage is correct",
        completed: false,
      },
    ];
  })
  .flat();

// save to database
db.defaults({ orders, tasks }).write();

module.exports = { db };
