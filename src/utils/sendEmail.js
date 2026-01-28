// const { SendEmailCommand } = require("@aws-sdk/client-ses");
// const sesClient = require("./sesClient");

// const sendEmail = async ({ to, subject, body }) => {
//   try {
//     const command = new SendEmailCommand({
//       Source: "priyasaha4658000@gmail.com", // MUST be verified in SES
//       Destination: {
//         ToAddresses: [to],
//       },
//       Message: {
//         Subject: {
//           Data: subject,
//           Charset: "UTF-8",
//         },
//         Body: {
//           Text: {
//             Data: body,
//             Charset: "UTF-8",
//           },
//         },
//       },
//     });

//     const response = await sesClient.send(command);
//     console.log("Email sent:", response.MessageId);
//     return true;
//   } catch (error) {
//     console.error("SES email error:", error);
//     return false;
//   }
// };

// module.exports = sendEmail
//

// const { SendEmailCommand } = require("@aws-sdk/client-ses");
// const { sesClient } = require("./sesClients");

// const createSendEmailCommand = (toAddress, fromAddress, subject, body) => {
//   return new SendEmailCommand({
//     Destination: {
//       CcAddresses: [],
//       ToAddresses: [toAddress],
//     },
//     Message: {
//       Body: {
//         Html: {
//           Charset: "UTF-8",
//           Data: `<h1>${body}</h1>`,
//         },
//         Text: {
//           Charset: "UTF-8",
//           Data: "This is the text format email",
//         },
//       },
//       Subject: {
//         Charset: "UTF-8",
//         Data: subject,
//       },
//     },
//     Source: fromAddress,
//     ReplyToAddresses: [
//       /* more items */
//     ],
//   });
// };

// const run = async (subject, body, toEmailId) => {
//   const sendEmailCommand = createSendEmailCommand(
//     "priyasaha4658000@gmail.com",
//     "priya.sot010085@pwioi.com",
//     subject,
//     body,
//   );

//   try {
//     return await sesClient.send(sendEmailCommand);
//   } catch (caught) {
//     if (caught instanceof Error && caught.name === "MessageRejected") {
//       const messageRejectedError = caught;
//       return messageRejectedError;
//     }
//     throw caught;
//   }
// };

// // snippet-end:[ses.JavaScript.email.sendEmailV3]
// module.exports = { run };

// src/utils/sendEmail.js
const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClients"); // match the export above

const sendEmail = async ({ to, from, subject, body }) => {
  const command = new SendEmailCommand({
    Destination: { ToAddresses: [to], CcAddresses: [] },
    Message: {
      Subject: { Data: subject, Charset: "UTF-8" },
      Body: {
        Text: { Data: body, Charset: "UTF-8" },
        Html: { Data: `<h1>${body}</h1>`, Charset: "UTF-8" },
      },
    },
    Source: from, // must be a verified email
  });

  try {
    const response = await sesClient.send(command);
    console.log("Email sent:", response.MessageId);
    return true;
  } catch (error) {
    if (error.name === "MessageRejected") {
      console.warn("Message rejected by SES:", error);
      return false;
    }
    console.error("SES send error:", error);
    return false;
  }
};

module.exports = sendEmail; // ✅ export function directly
