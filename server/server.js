const session = require("express-session");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const {PORT, MONGO_URI, SESSION_SECRET} = process.env;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/public", express.static("public"));

app.use(
	session({secret: SESSION_SECRET, resave: false, saveUninitialized: false})
);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
