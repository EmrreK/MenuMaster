const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = function (passport) {
	passport.use(
		new LocalStrategy(
			/* {usernameField: "email"} */ async (username, password, done) => {
				try {
					const user = await User.findOne({username: username});
					if (!user) {
						return done(null, false, {
							message: "No user with that username",
						});
					}

					const isMatch = await bcrypt.compare(
						password,
						user.password
					);
					if (isMatch) {
						return done(null, user);
					} else {
						return done(null, false, {
							message: "Incorrect Password",
						});
					}
				} catch (err) {
					console.error(err);
				}
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id)
			.then((user) => {
				done(null, user);
			})
			.catch((err) => {
				console.error(err);
			});
	});
};
