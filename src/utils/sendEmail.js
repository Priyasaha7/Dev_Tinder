const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClients");

const VERIFIED_EMAILS = new Set([
  "priyasaha4658000@gmail.com",
  "priya.sot010085@pwioi.com",
]);

module.exports = async function sendEmail(subject, body, toEmailId) {
  if (!VERIFIED_EMAILS.has(toEmailId)) {
    console.log("Skipping unverified email:", toEmailId);
    return false;
  }

  const command = new SendEmailCommand({
    Destination: { ToAddresses: [toEmailId] },
    Message: {
      Subject: { Data: subject, Charset: "UTF-8" },
      Body: {
        Text: { Data: body, Charset: "UTF-8" },
        Html: { Data: `<h2>${body}</h2>`, Charset: "UTF-8" },
      },
    },
    Source: "priya.sot010085@pwioi.com",
  });

  try {
    const res = await sesClient.send(command);
    console.log("Email sent:", res.MessageId);
    return true;
  } catch (err) {
    if (err.name === "MessageRejected") {
      console.log("Email rejected (not verified):", toEmailId);
      return false;
    }
    console.error("Error sending email:", err);
    throw err;
  }
};
