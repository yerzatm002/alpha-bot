require("dotenv").config();
const express = require("express");
const webhookRoute = require("./routes/webhook");

const app = express();
app.use(express.json());

// Webhook-роут для входящих сообщений от Wazzup
app.use("/webhook", webhookRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Bot server is running on port ${PORT}`);
});
