// validation.js
const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailID, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Please enter a valid name");
  }
  if (!validator.isEmail(emailID)) {
    throw new Error("Email ID is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "about",
    "gender",
    "password",
    "age",
    "photoUrl",
    "skills",
  ];

  const isAllowed = Object.keys(req.body).every((k) =>
    allowedEditFields.includes(k),
  );

  if (!isAllowed) {
    throw new Error("Invalid edit fields");
  }

  return isAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };
