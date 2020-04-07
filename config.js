require("dotenv").config();

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

// set some defaults
const statusData = [
  { id: 1, description: "To Do" },
  { id: 2, description: "In Progress" },
  { id: 3, description: "Done" },
];

// save to database
db.defaults({ tasks: [], status: statusData }).write();

module.exports = { db };
