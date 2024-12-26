const express = require("express");
const Routes = express();

userRouter = require("./routes/users");
tableRouter = require("./routes/tables");
menuRouter = require("./routes/menuitems");
categoryRouter = require("./routes/category");

Routes.use("/users", userRouter);
Routes.use("/tables", tableRouter);
Routes.use("/menuitems", menuRouter);
Routes.use("/category", categoryRouter);

module.exports = Routes;
