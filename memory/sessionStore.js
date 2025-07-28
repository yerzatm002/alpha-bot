// Простая RAM-память для хранения истории диалогов
const sessions = {};

// Возвращает историю сообщений пользователя
function getSessionHistory(userId) {
  if (!sessions[userId]) {
    sessions[userId] = [];
  }

  return sessions[userId];
}

// Обновляет историю сообщений пользователя
function updateSession(userId, history) {
  // Храним только последние 10 сообщений (чтобы не перегружать)
  sessions[userId] = history.slice(-10);
}

module.exports = {
  getSessionHistory,
  updateSession,
};
