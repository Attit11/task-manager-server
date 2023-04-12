const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Please enter a valid age!");
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email Address!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.toLowerCase() === "password") {
        throw new Error("Password cannot contain 'password'");
      }
      if (value.length < 6) {
        throw new Error("Password length must be greater than 6");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//hash the user password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

//generate auth token
//methods are accessible on the instances
userSchema.methods.generateAuthToken = async function () {
  try {
    //not necessary but makes life easier
    const user = this;
    //create a token
    const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");
    //adding the token in user instance
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  } catch (e) {
    console.log("❌Error generating auth token!", e);
    throw new Error({ e });
  }
};

//statics function are accessible to model
userSchema.statics.findByCredentials = async (email, password) => {
  //finding user by the email address
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login!");
  }
  //comparing user entered password with the stored password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login!");
  }
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
