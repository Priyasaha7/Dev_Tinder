// src/utils/sesClients.js
const { SESClient } = require("@aws-sdk/client-ses");

const sesClient = new SESClient({
  region: process.env.AWS_REGION, // set in your .env
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // set in your .env
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // set in your .env
  },
});

module.exports = { sesClient }; // export as object because sendEmail imports { sesClient }
