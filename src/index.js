import "./reset.css";
import "./style.css";
import "core-js";
import "regenerator-runtime";

// content
const content = document.createElement("div");
content.className = "content";
document.body.appendChild(content);

// search panel
const searchPanel = document.createElement("section");
searchPanel.classList.add("searchPanel");
content.appendChild(searchPanel);

// form
const form = document.createElement("form");
searchPanel.appendChild(form);

// search bar
const searchBar = document.createElement("input");
searchBar.type = "text";
form.appendChild(searchBar);

// search button
const searchButton = document.createElement("button");
form.appendChild(searchButton);
const searchIcon = document.createElement("span");
searchIcon.classList.add("material-icons-outlined");
searchIcon.textContent = "search";
searchButton.appendChild(searchIcon);

// dashboard
const dashboard = document.createElement("section");
dashboard.classList.add("dashboard");
content.appendChild(dashboard);

// INFO PANEL
const infoPanel = document.createElement("div");
infoPanel.classList.add("infoPanel");
dashboard.appendChild(infoPanel);

// current location
const currentLocation = document.createElement("h1");
currentLocation.id = "currentLocation";
currentLocation.textContent = "London, CA";
infoPanel.appendChild(currentLocation);

const currentTemp = document.createElement("h1");
currentTemp.id = "currentTemp";
currentTemp.textContent = "10°C";
infoPanel.appendChild(currentTemp);

const currentDescription = document.createElement("h1");
currentDescription.id = "currentDescription";
currentDescription.textContent = "Cloudy";
infoPanel.appendChild(currentDescription);

const currentChanceRain = document.createElement("h1");
currentChanceRain.id = "currentChanceRain";
currentChanceRain.textContent = "60%";
infoPanel.appendChild(currentChanceRain);

const currentWindSpeed = document.createElement("h1");
currentWindSpeed.id = "currentWindSpeed";
currentWindSpeed.textContent = "11mph";
infoPanel.appendChild(currentWindSpeed);

// ICON PANEL
const iconPanel = document.createElement("div");
iconPanel.classList.add("iconPanel");
dashboard.appendChild(iconPanel);

const weatherIcon = document.createElement("img");
weatherIcon.id = "weatherIcon";
iconPanel.appendChild(weatherIcon);
weatherIcon.src =
  "https://cdn0.iconfinder.com/data/icons/weather-line-19/32/Light_Rain-512.png";
// time / date / timezone
// > sunrise / sunset
// temp
// > celsius / farenheit
// > max / min
// weather
// wind
// > speed / direction
// humidity

async function fetchWeatherInfo(location = "London") {
  const id = "fa2006e072a59ea2d7b87d5c4d8175dc";
  const results = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${id}`
  );
  const weatherData = await results.json();
  updateInfo(weatherData);
}

function updateInfo(data) {
  const newLoc = `${data.name}, ${data.sys.country}`;

  const currLoc = document.querySelector("#currentLocation");
  currLoc.textContent = newLoc;
}

fetchWeatherInfo();
