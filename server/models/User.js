const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Enter The Username"],
    unique: [true, "Username Already Exists"],
  },
  password: {
    type: String,
    required: [true, "Please Enter The Password"],
    minLength: [6, "Password Should Be Greater Than 6 characters"],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
