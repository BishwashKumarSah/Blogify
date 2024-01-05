const adminLayout = "../views/layouts/admin";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const user = require("../models/User");

const handleErrors = (err) => {
  let errors = { username: "", password: "" };
  let loginError = "";

  if (err.message === "Invalid Username or Password") {
    loginError = "Invalid Username or Password";
    return loginError;
  }

  if (err.code === 11000) {
    errors.username = "This user is already taken";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 60 * 60 * 24;

// Create JWT Token
const createJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

// Get Admin Login
const showLogin = async (req, res) => {
  try {
    const local = {
      title: "Login",
      description: "Login Page",
    };
    let loginError = "";
    // const { username, password } = req.body;
    // const user = await user.findOne({ username });
    // if (!user) {
    //   throw new Error("Invalid Username or Password");
    // }
    // const auth = await bcrypt.compare(username, user.password);
    // if (auth) {
    //   const jwt = createJWT(user._id);
    //   res.cookie("jwt", jwt, {
    //     maxAge: maxAge * 1000,
    //     httpOnly: true,
    //   });
    //   res.status(201).render("admin/dashboard");
    // } else {
    //   throw new Error("Invalid Username or Password");
    // }
    res.render("admin/login", { loginError, local, layout: adminLayout });
  } catch (error) {
    // const loginError = handleErrors(error);
    // res.render("admin/login", { loginError, layout: adminLayout });
  }
};

// *Get Register Page

const showRegister = async (req, res) => {
  try {
    const local = {
      title: "Register",
      description: "Register Page",
    };
    let errors = { username: "", password: "" };
    res.render("admin/register", { errors, local, layout: adminLayout });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// *Post Login Page

const postAdminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userData = await user.findOne({ username });
    if (!userData) {
      throw new Error("Invalid Username or Password");
    }
    const auth = await bcrypt.compare(password, userData.password);
    if (auth) {
      const jwt = createJWT(userData._id);
      res.cookie("jwt", jwt, {
        maxAge: maxAge * 1000,
        httpOnly: true,
      });
      res.status(200).render("admin/dashboard");
    } else {
      throw new Error("Invalid Username or Password");
    }
  } catch (e) {
    const loginError = handleErrors(e);
    res.status(400).render("admin/login", { loginError, layout: adminLayout });
  }
};

// *Post Register Page

const postAdminRegister = async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await user.create({ username, password });
    console.log(data._id);
    const jwt = createJWT(data._id);
    res.cookie("jwt", jwt, {
      maxAge: maxAge * 1000,
      httpOnly: true,
    });
    res.status(201).redirect("/");
    console.log(data);
  } catch (error) {
    const errors = handleErrors(error);
    console.log(errors);
    res.status(401).render("admin/register", { errors, layout: adminLayout });
  }
};

// * Get Admin DashBoard
const showDashboard = (req, res) => {
  res.render("admin/dashboard");
};

module.exports = {
  showLogin,
  showRegister,
  postAdminRegister,
  showDashboard,
  postAdminLogin,
};
