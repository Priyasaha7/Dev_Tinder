const { SendEmailCommand } = require("@aws-sdk/client-ses");
const sesClient = require("./sesClient");

const sendEmail = async ({ to, subject, body }) => {
  try {
    const command = new SendEmailCommand({
      Source: "your_verified_email@gmail.com", // MUST be verified in SES
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: body,
            Charset: "UTF-8",
          },
        },
      },
    });

    const response = await sesClient.send(command);
    console.log("Email sent:", response.MessageId);
    return true;
  } catch (error) {
    console.error("SES email error:", error);
    return false;
  }
};

module.exports = sendEmail;
