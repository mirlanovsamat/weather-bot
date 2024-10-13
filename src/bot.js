const TelegramBot = require('node-telegram-bot-api');
const weatherService = require('./weatherService');
const logger = require('./logger');
const config = require('./config');

const bot = new TelegramBot(config.telegramToken, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const welcomeMessage = `Добро пожаловать! Я бот для получения информации о погоде. Просто напишите название города, и я расскажу вам о погоде в нём.`;
    bot.sendMessage(chatId, welcomeMessage);
    logger.info(`Пользователь chatId: ${chatId} использовал команду /start`);
  });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const city = msg.text.trim();

  if (!city) {
    bot.sendMessage(chatId, 'Введите название города');
    logger.warn(`Пользователь не ввел город. chatId: ${chatId}`);
    return;
  }

  weatherService.getWeather(city)
    .then((weatherMessage) => {
      bot.sendMessage(chatId, weatherMessage);
      logger.info(`Погода отправлена пользователю chatId: ${chatId} для города: ${city}`);
    })
    .catch((error) => {
      bot.sendMessage(chatId, 'Не удалось получить данные о погоде. Проверьте название города');
      logger.error(`Ошибка при получении погоды для города ${city}: ${error.message}`);
    });
});

module.exports = { bot };
