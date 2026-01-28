// const { SendEmailCommand } = require("@aws-sdk/client-ses");
// const { sesClient } = require("./sesClients"); // match the export above

// const sendEmail = async ({ to, from, subject, body }) => {
//   const command = new SendEmailCommand({
//     Destination: { ToAddresses: [to], CcAddresses: [] },
//     Message: {
//       Subject: { Data: subject, Charset: "UTF-8" },
//       Body: {
//         Text: { Data: body, Charset: "UTF-8" },
//         Html: { Data: `<h1>${body}</h1>`, Charset: "UTF-8" },
//       },
//     },
//     Source: from, // must be a verified email
//   });

//   try {
//     const response = await sesClient.send(command);
//     console.log("Email sent:", response.MessageId);
//     return true;
//   } catch (error) {
//     if (error.name === "MessageRejected") {
//       console.warn("Message rejected by SES:", error);
//       return false;
//     }
//     console.error("SES send error:", error);
//     return false;
//   }
// };

// module.exports = sendEmail; // ✅ export function directly

// emailSender.js

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
