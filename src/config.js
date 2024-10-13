require('dotenv').config();

if (!process.env.TELEGRAM_TOKEN || !process.env.WEATHER_API_KEY) {
  console.error('Ошибка: Отсутствуют необходимые переменные окружения!');
  process.exit(1);
}

module.exports = {
  telegramToken: process.env.TELEGRAM_TOKEN,
  weatherApiKey: process.env.WEATHER_API_KEY,
};
