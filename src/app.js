const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/index");
const cors = require('cors')

const server = express();
server.name = "Mercado Solidario API";
const whitelist = ["pf-backend-mercadosolidario-production.up.railway.app"];

server.use(express.json());
server.use(cors({ origin: whitelist }));
server.use(morgan("dev"));

server.use("/", routes);

module.exports = server;
