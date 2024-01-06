const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/admin");

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

// Get Admin DashBoard
router.get("/admin/dashboard/",authMiddleware, showDashboard);

// Post Admin Register
router.post("/admin/login", postAdminLogin);
router.post("/admin/signup", postAdminRegister);


module.exports = router;
