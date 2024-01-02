const express = require("express");
const router = express.Router();

const {
  showLogin,
  showRegister,
  postAdminRegister,
} = require("../controllers/admin");

// Get Admin Login
router.get("/admin/login", showLogin);
router.get("/admin/register", showRegister);

// Post Admin Register
router.post("/admin/signup", postAdminRegister);

module.exports = router;
