const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 30,
    },

    gender: {
      type: String,
      enum:{
        values: ["Male", "Female", "others", "male", "female"],
        message: "Gender is not valid"
      }
      // validate(value) {
      //   if (!["Male", "Female", "others", "male", "female"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },

    emailID: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },

    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error ("Password is not strong enough" + value );
        }
      }
    },

    age: {
      type: Number,
      max: 100,
      min: 18

    },

    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value){
        if(!validator.isURL(value)){
          throw new Error ("Photo URL is not valid");
        }
      }
    },

    about: {
      type: String,
      default: "This is a default about of the user!",
      maxlength: 400,
      trim: true,
    },

    skills: {
      type: [String],
      unique: true,
      // validate(value){
      //   if(value.length > 10){
      //     throw new Error ("Skills cannot be more than 10");
      //   }
      // }

    },


  },

  { timestamps: true }
);

userSchema.methods.getJWT = async function() {
  const user = this;
  const token = await jwt.sign({ _id: user._id}, "DEV@TINDER#2004", { expiresIn: "1d" } );

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await  bcrypt.compare(passwordInputByUser, passwordHash);

  return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);
