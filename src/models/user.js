const mongoose = require("mongoose");
const validator = require("validator");

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
    },

    gender: {
      type: String,
      required: true,
      validate(value) {
        if (!["Male", "Female", "others", "male", "female"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
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
      select: false,
    //   validate(value) {
    //     if (!validator.isStrongPassword(value)) {
    //       throw new Error("Enter a strong password");
    //     }
    //   },
    },

    age: {
      type: Number,
      min: 18,
    },

    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
    },

    about: {
      type: String,
      default: "This is a default about of the user!",
      maxlength: 200,
    },

    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
