const session = require("express-session");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
require("dotenv").config();
const Routes = require("./Routes");

const {PORT, MONGO_URI, SESSION_SECRET} = process.env;

const app = express();

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("Connected to DB");
	})
	.catch((err) => {
		console.error(err);
	});

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/public", express.static("public"));

app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

const passportConfig = require("./config/passportConfig");
passportConfig(passport);

app.use("/api", Routes);

app.use("/qrcodes", express.static("public/qrcodes"));

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
