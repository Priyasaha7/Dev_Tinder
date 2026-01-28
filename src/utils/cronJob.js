const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequest = require("../models/connectionRequest");
const sendEmail = require("../utils/sendEmail");

// Runs every day at 8 AM
cron.schedule("0 8 * * *", async () => {
  try {
    const yesterday = subDays(new Date(), 1);

    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await ConnectionRequest.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(
        pendingRequests
          .filter((req) => req?.toUserId?.email)
          .map((req) => req.toUserId.email),
      ),
    ];

    for (const email of listOfEmails) {
      try {
        await sendEmail.run(
          `New connection request pending`,
          `You have pending connection requests. Please open the app to review them.`,
          email,
        );
      } catch (err) {
        console.log("Email failed for:", email);
      }
    }
  } catch (err) {
    console.log("Cron job failed:", err);
  }
});
