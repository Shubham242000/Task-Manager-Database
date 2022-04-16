const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("./db/mongoose");

app.use(express.json()); // it changes incoming JONA to object
app.use(userRouter);
app.use(taskRouter);

const myFun = async () => {
  const password = "fruitsandvegetables";
  const hashedPassword = await bcrypt.hash(password, 8);
  console.log(hashedPassword);
  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log(isMatch);
};
// myFun();
app.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});
