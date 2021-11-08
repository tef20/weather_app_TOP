async function fetchWeatherData(location = "Buenos Aires") {
  const id = "fa2006e072a59ea2d7b87d5c4d8175dc";
  const currentWeatherDataAPI = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${id}`
  );
  const weatherData = await currentWeatherDataAPI.json();

  const locationName = `${weatherData.name}, ${weatherData.sys.country}`;

  const { lat, lon } = { ...weatherData.coord };
  const oneCallAPI = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${id}`
  );
  const oneCallData = await oneCallAPI.json();

  return { locationName, ...oneCallData };
}

function processWeatherData(data) {
  const processed = {
    currentLocation: `📍 ${data.locationName}`,
    currentTempCelsius: `🌡️ ${(+data.hourly[0].temp - 273.15).toFixed(1)}°C`,
    currentTempFahrenheit: `🌡️ ${(+data.hourly[0].temp * 1.8 - 459.67).toFixed(
      1
    )}°F`,
    currentDescription: `🛰️ ${data.hourly[0].weather[0].main}`,
    weatherIcon: `${data.hourly[0].weather[0].icon}`,
    currentChanceRain: `☔ ${(+data.hourly[0].pop * 100).toFixed(0)}%`,
    currentWindSpeed: `🌬️ ${(+data.hourly[0].wind_speed * 3.6).toFixed(0)}km/h`,
    currentWindDirection: `${+data.hourly[0].wind_deg}°`,
  };

  return processed;
}

export { fetchWeatherData, processWeatherData };
