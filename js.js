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


function displayTemperature(responce) {
   
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    temperatureElement.innerHTML = Math.round(responce.data.main.temp);
    cityElement.innerHTML = responce.data.name;
    descriptionElement.innerHTML = responce.data.weather[0].description;
    humidityElement.innerHTML = responce.data.main.humidity;
    windElement.innerHTML = Math.round(responce.data.wind.speed);
    dateElement.innerHTML = formatDate(responce.data.dt * 1000);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", responce.data.weather[0].description);
}



let apiKey = "360f33424340a0f95a8c619e705e8605";
let cityName = "Kherson";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

