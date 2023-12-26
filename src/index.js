function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time + 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = <img src="${response.data.condition.icon.url}" />;
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = ${response.data.temperature.humidity}%;
  windSpeedElement.innerHTML = ${response.data.wind.speed}km/h;
  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let dayOfWeek = days[date.getDay()];
  if (minutes < 10) {
    minutes = 0${minutes};
  }
  return ${dayOfWeek} ${hours}:${minutes};
}

function searchCity(city) {
  let apiKey = "2b01c19b38oc3499eaaaf89100t454aa";
  let apiUrl = "https://api.shecodes.io/weather/v1/forecast?lon={lon}&lat={lat}&key={key} = ${city} &key = $(apiKey) &units = metric";
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");