const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

// importing files
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");

// Define Global Variables
const app = express();
const log = console.log;
const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/auth",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, conn) =>
    console.log(conn ? "succesfully connected" : "failed to connect to db")
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("sanketauth"));

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

app.use("/", indexRouter);
app.use("/users", userRouter);

if (process.env.NODE_ENV === "production" || true) {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
  });
}

app.listen(PORT, () => {
  log(`Server is starting at PORT: ${PORT}`);
});
