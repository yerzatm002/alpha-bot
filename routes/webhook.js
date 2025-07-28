const express = require("express");
const router = express.Router();

const { callAI } = require("../services/ai");
const { sendMessage } = require("../services/wazzup");
const { getSessionHistory, updateSession } = require("../memory/sessionStore");
const businessData = require("../prompts/salon.json");

router.post("/", async (req, res) => {
  try {
    const message = req.body?.message;

    // Проверка: есть ли сообщение от клиента
    if (!message || !message.text || !message.from?.phone) {
      return res.sendStatus(200); // Wazzup требует 200 даже если пусто
    }

    const userId = message.from.phone;
    const userMessage = message.text;

    console.log(`📩 Новое сообщение от ${userId}: "${userMessage}"`);

    // Получаем историю диалога
    const history = getSessionHistory(userId);
    history.push({ role: "user", content: userMessage });

    // Вызываем AI
    const aiResponse = await callAI(userId, history, businessData);
    console.log(`🤖 Ответ AI: ${aiResponse}`);

    // Обновляем историю
    history.push({ role: "assistant", content: aiResponse });
    updateSession(userId, history);

    // Отправляем ответ через Wazzup
    await sendMessage(userId, aiResponse);

    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Ошибка в webhook:", error.message);
    res.sendStatus(500);
  }
});

module.exports = router;
