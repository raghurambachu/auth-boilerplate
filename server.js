const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// importing files
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const complaintRouter = require("./routes/complaints");

// Define Global Variables
const app = express();
const log = console.log;
const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/auth",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err, conn) =>
    console.log(conn ? "succesfully connected" : "failed to connect to db")
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("sanketauth"));
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use((req, body, next) => {
  console.log(req.url);
  next();
});

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/complaints", complaintRouter);

if (process.env.NODE_ENV === "production" || true) {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
  });
}

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  return res.json({ error: "Error" });
});

app.listen(PORT, () => {
  log(`Server is starting at PORT: ${PORT}`);
});
