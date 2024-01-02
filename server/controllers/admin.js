const adminLayout = "../views/layouts/admin";

const user = require("../models/User");

const handleErrors = (err) => {
  console.log("message", err.message);
  console.log("code", err.code);
};

// Get Admin Login
const showLogin = async (req, res) => {
  try {
    const local = {
      title: "Login",
      description: "Login Page",
    };
    res.render("admin/login", { local, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
};

const showRegister = async (req, res) => {
  try {
    const local = {
      title: "Register",
      description: "Register Page",
    };
    res.render("admin/register", { local, layout: adminLayout });
  } catch (e) {
    console.log(e);
  }
};

// Post Admin

const postAdminRegister = async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await user.create({ username, password });
    res.redirect("/admin/register");
    console.log(data);
  } catch (error) {
    const err = handleErrors(error);
    res.json({ err });
  }
};

module.exports = { showLogin, showRegister, postAdminRegister };
