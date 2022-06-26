// format date
function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day}  ${hours}:${minutes}`;
}

//show weather element
function displayTemperature(responce) {
   
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = responce.data.main.temp;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = responce.data.name;
    descriptionElement.innerHTML = responce.data.weather[0].description;
    humidityElement.innerHTML = responce.data.main.humidity;
    windElement.innerHTML = Math.round(responce.data.wind.speed);
    dateElement.innerHTML = formatDate(responce.data.dt * 1000);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", responce.data.weather[0].description);
}
//search city input
function search(city) {
    let apiKey = "360f33424340a0f95a8c619e705e8605";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}
//submit "search"
function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input")
    search(cityInputElement.value);
}
//converter C-F
function displayFahrenheitTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
//converter F-C
function displayCelsiusTemperature(event) {
    event.preventDefault(); 
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature"); 
    temperatureElement.innerHTML = Math.round(celsiusTemperature);  
}
let celsiusTemperature = null;

//submit form
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


//click F
let fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
//click C
let celsiusLink = document.querySelector("#celsius-link")
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//current position
function currentCity(event) {
  event.preventDefault();
  
  function myPosition(position) {
  let apiKey = "360f33424340a0f95a8c619e705e8605";
  let apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude; 
  axios.get(`${apiUrl}&lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`).then(currentWeather);
}
  navigator.geolocation.getCurrentPosition(myPosition); 
  function currentWeather(responce) {
    document.querySelector("#city").innerHTML = `${responce.data.name}`;
    document.querySelector("#temperature").innerHTML = `${Math.round(responce.data.main.temp)}`;
    document.querySelector("#wind").innerHTML = `${Math.round(responce.data.wind.speed)}`;
    document.querySelector("#humidity").innerHTML = `${responce.data.main.humidity}`;
    document.querySelector("#description").innerHTML = `${responce.data.weather[0].description}`;
    document.querySelector("#icon").setAttribute("src", `https://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`);
    document.querySelector("#icon").setAttribute("alt", responce.data.weather[0].description);
  }
}
document.querySelector("#current").addEventListener("click", currentCity);










search("Kherson");