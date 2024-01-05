const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


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

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
