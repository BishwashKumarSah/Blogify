require("dotenv").config();

const userRoutes = require("./server/routes/main");
const adminRoutes = require("./server/routes/admin");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const express = require("express");
const expressLayout = require("express-ejs-layouts");

const connectDB = require("./server/config/connection");
const MongoStore = require("connect-mongo");

const app = express();

const PORT = process.env.PORT || 3000;

// Connect to the Mongo Database
connectDB();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: { maxAge: 3 * 24 * 60 * 60 * 1000 },
  })
);

// Templating Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", userRoutes);
app.use("/", adminRoutes);

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
