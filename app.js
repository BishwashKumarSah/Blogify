require("dotenv").config();

const userRoutes = require("./server/routes/main");
const adminRoutes = require("./server/routes/admin");

const express = require("express");
const expressLayout = require("express-ejs-layouts");

const connectDB = require("./server/config/connection");

const app = express();

const PORT = process.env.PORT || 3000;

// Connect to the Mongo Database
connectDB();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Templating Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", userRoutes);
app.use("/", adminRoutes);

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
