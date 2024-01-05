const express = require("express");
const router = express.Router();

const {
  showLogin,
  showRegister,
  postAdminLogin,
  postAdminRegister,
  showDashboard,
} = require("../controllers/admin");

// Get Admin Login
router.get("/admin/login", showLogin);
router.get("/admin/register", showRegister);

// Post Admin Register
router.post("/admin/login", postAdminLogin);
router.post("/admin/signup", postAdminRegister);

// Get Admin DashBoard
router.get("/admin/dashboard", showDashboard);

module.exports = router;
