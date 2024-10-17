const express = require("express");
const Routes = express();

userRouter = require("./routes/users");
tableRouter = require("./routes/tables");
menuRouter = require("./routes/menuitems");

Routes.use("/users", userRouter);
Routes.use("/tables", tableRouter);
Routes.use("/menuitem", menuRouter);

module.exports = Routes;
