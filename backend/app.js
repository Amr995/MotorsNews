const express = require("express");
const connectToDb = require("./config/connectToDb");
require("dotenv").config();


// Connection To Db
connectToDb();

// init App
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", require("./routers/authRoute"));
app.use("/api/users", require("./routers/usersRoute"));

// Running The Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
