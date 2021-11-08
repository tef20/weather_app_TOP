import "./reset.css";
import "./style.css";
import "core-js";
import { events } from "./pubSub.js";
import "regenerator-runtime";
import { renderPage, updateDashboard } from "./domItems.js";
import { fetchWeatherData, processWeatherData } from "./weatherApp.js";

// content
const content = document.createElement("div");
content.id = "content";
document.body.appendChild(content);

renderPage();
events.on("formSubmit", (requestedLocation) =>
  fetchWeatherData(requestedLocation).then((resolve) => {
    console.log("1: ", resolve);
    const data = processWeatherData(resolve);
    updateDashboard(data);
  })
);

fetchWeatherData().then((resolve) => {
  // console.log("1: ", resolve);
  const data = processWeatherData(resolve);
  updateDashboard(data);
});

// (async () => {
//   const weatherData = await fetchWeatherData();
//   console.log("2: ", weatherData);
//   updateInfo(weatherData);
// })();

// function updateInfo(data) {
//   const newLoc = `${data.name}, ${data.sys.country}`;

//   const currLoc = document.querySelector("#currentLocation");
//   currLoc.textContent = newLoc;

//   const iconCode = data.weather[0].icon;
//   console.log(iconCode);
//   const weatherIc = document.querySelector("#weatherIcon");
//   weatherIc.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
// }
