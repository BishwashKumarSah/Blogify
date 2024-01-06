const adminLayout = "../views/layouts/admin";

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(301).redirect("/admin/login");
  } else {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.USER_ID = user.id;
      next();
    } catch (error) {
      res.status(301).redirect("/admin/login");
    }
  }
};

module.exports = { authMiddleware };
