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

module.exports = { validateSignUpData };
