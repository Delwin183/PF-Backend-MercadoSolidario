const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/index");
const cors = require("cors")
const server = express();
server.name = "Mercado Solidario API";

server.use(express.json());
server.use(cors())
server.use(morgan("dev"));

server.use("/", routes);

module.exports = server;
