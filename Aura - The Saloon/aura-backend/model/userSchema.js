const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  tokens:[
    {
      token:{
        type: String,
        required: true,
      }
    }
  ]
});

// Hashing the Password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

// Generating token
userSchema.methods.generateAuthToken = async function(){
  try {
    let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY) //checking id provided by user is correct by verifying in database
    this.tokens = this.tokens.concat({token:token}); // this will refer the abouve token and concat it with token provided in DB

    await this.save();
    return token;

  } catch (error) {
    console.log(error);
  }
}

// This should be written bellow hashing so that hashing takes place first
const User = mongoose.model("USER", userSchema);

module.exports = User;
