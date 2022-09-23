const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please Enter Your Name"],
    maxLength: [30, "Name Cannot be More than 30 Character"],
    minLength: [4, "Name Should Have More Than 4 Character"],
  },
  email: {
    type: String,
    require: [true, "Please Enter your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter Valid Email"],
  },
  password: {
    type: String,
    require: [true, "Please Enter Your Password"],
    minLength: [8, "Password Should be More Than 7 Characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPassword: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
});
userSchema.methods.getResetPasswordTokens =  function(){


  // generating token
  const resetToken= crypto.randomBytes(20).toString("hex");

// Hashing and adding resetPAsswordToken to user Schema
this.resetPassword= crypto
.createHash("sha256")
.update(resetToken)
.digest("hex");


this.resetPasswordExpire= Date.now() +15*60*1000;
return resetToken;
}
// event which will occur before saving userSchema for encrypt password
userSchema.pre("save", async function (next) {
  // this condition will check if password is changed or not suring update process
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token
userSchema.methods.getJWTToken = function () {
  return JWT.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_Expire,
  });
};
// Compare Password

userSchema.methods.comparePass= async function(enteredPassword){

    return await bcrypt.compare(enteredPassword,this.password);

}




module.exports = mongoose.model("User", userSchema);
