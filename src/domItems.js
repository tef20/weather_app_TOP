import { events } from "./pubSub";

function renderPage() {
  const contentContainer = document.getElementById("content");

  removeAllChildNodes(contentContainer);
  renderSearchPanel(contentContainer);
  renderDashboard(contentContainer);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function updateDashboard(processedData) {
  Object.keys(processedData).forEach((id) => {
    const item = document.getElementById(id);
    if (item && !(item.id === "weatherIcon")) {
      item.textContent = `${processedData[id]}`;
    } else if (item) {
      item.src = `https://openweathermap.org/img/wn/${processedData[id]}@2x.png`;
    } else {
      console.log(id);
    }
  });
}

// search panel
function renderSearchPanel(container) {
  const searchPanel = document.createElement("section");
  searchPanel.classList.add("searchPanel");
  container.appendChild(searchPanel);

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

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (searchBar.value) {
      console.log(searchBar.value);
      events.emit("formSubmit", searchBar.value);
      searchBar.value = "";
    }
  });
}

// dashboard
function renderDashboard(container) {
  const dashboard = document.createElement("section");
  dashboard.classList.add("dashboard");
  container.appendChild(dashboard);

  // INFO PANEL
  const infoPanel = document.createElement("div");
  infoPanel.classList.add("infoPanel");
  dashboard.appendChild(infoPanel);

  // current location
  const currentLocation = document.createElement("h1");
  currentLocation.id = "currentLocation";
  currentLocation.textContent = "London, GB";
  infoPanel.appendChild(currentLocation);

  const currentTemp = document.createElement("h1");
  const currentTempCelsius = document.createElement("span");
  currentTempCelsius.id = "currentTempCelsius";
  currentTempCelsius.textContent = "10°C";
  currentTemp.appendChild(currentTempCelsius);
  const currentTempFahrenheit = document.createElement("span");
  currentTempFahrenheit.id = "currentTempFahrenheit";
  currentTempFahrenheit.textContent = "50°F";
  currentTempFahrenheit.classList.add("hidden");
  currentTemp.appendChild(currentTempFahrenheit);

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
}

export { renderPage, updateDashboard };
