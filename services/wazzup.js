const axios = require("axios");

const WAZZUP_TOKEN = process.env.WAZZUP_TOKEN;
const WAZZUP_CHANNEL_ID = process.env.WAZZUP_CHANNEL_ID;

// Отправка сообщения через Wazzup
async function sendMessage(phone, text) {
  try {
    const res = await axios.post(
      "https://api.wazzup24.com/v3/message",
      {
        channelId: WAZZUP_CHANNEL_ID,
        phone: phone,
        text: text,
      },
      {
        headers: {
          Authorization: `Bearer ${WAZZUP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`✅ Отправлено сообщение клиенту ${phone}: "${text}"`);
  } catch (error) {
    console.error("❌ Ошибка при отправке через Wazzup:", error?.response?.data || error.message);
  }
}

module.exports = {
  sendMessage,
};
