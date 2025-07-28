const axios = require("axios");
const { buildPrompt } = require("./promptBuilder");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const AI_PROVIDER = process.env.AI_PROVIDER || "gemini";

// Универсальная функция вызова AI
async function callAI(userId, history, businessData) {
  if (AI_PROVIDER === "gemini") {
    return await callGeminiAPI(userId, history, businessData);
  } else {
    throw new Error("Unsupported AI provider");
  }
}

// 👉 Gemini (Google) API
async function callGeminiAPI(userId, history, businessData) {
  const promptMessages = buildPrompt(history, businessData);

  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: promptMessages,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const candidates = res.data.candidates;
    const text = candidates?.[0]?.content?.parts?.[0]?.text || "Извините, не понял вопрос.";
    return text;
  } catch (error) {
    console.error("Gemini API error:", error?.response?.data || error.message);
    return "Произошла ошибка при обращении к AI.";
  }
}

module.exports = {
  callAI,
};
