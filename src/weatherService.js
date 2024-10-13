const axios = require('axios');
const logger = require('./logger');
const config = require('./config');

const getWeather = (city) => {
  const url = 'https://api.openweathermap.org/data/2.5/weather';

  return axios.get(url, {
    params: {
      q: city,
      appid: config.weatherApiKey,
      units: 'metric',
      lang: 'ru',
    },
  })
  .then((response) => {
    const weatherData = response.data;
    const weatherDesc = weatherData.weather[0].description;
    const temp = weatherData.main.temp;
    const feelsLike = weatherData.main.feels_like;

    return `Погода в городе ${city}:\n${weatherDesc}\nТемпература дня: ${temp}°C\nОщущается как: ${feelsLike}°C`;
  })
  .catch((error) => {
    logger.error(`Ошибка API при запросе погоды для города ${city}: ${error.message}`);
    throw error;
  });
};

module.exports = { getWeather };
