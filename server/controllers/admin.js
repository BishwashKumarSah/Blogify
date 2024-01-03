const adminLayout = "../views/layouts/admin";

const user = require("../models/User");

const handleErrors = (err) => {
  let errors = { username: "", password: "" };

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
    let errors = { username: "", password: "" };
    res.render("admin/register", { errors,local, layout: adminLayout });
  } catch (e) {
    console.log(e);
  }
};

// Post Admin

const postAdminRegister = async (req, res) => {
  try {    
    const { username, password } = req.body;
    const data = await user.create({ username, password });
    res.status(201).redirect("/");
    console.log(data);
  } catch (error) {
    const errors = handleErrors(error);
    console.log(errors);
    res.status(401).render("admin/register", { errors, layout: adminLayout });
  }
};

module.exports = { showLogin, showRegister, postAdminRegister };
