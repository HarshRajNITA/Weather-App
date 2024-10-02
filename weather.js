const apiKey = "0a82be8aaab22c93fd0106021eba4aeb";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input"); // store user input ie searchBox.value
const searchBtn = document.querySelector(".search button"); // Add eventListener to the button ie click
const weatherIcon = document.querySelector(".weather-icon"); // store weather icon to have change later according to weather

async function checkweather(city) {
    document.querySelector(".error").style.display = "none"; // Hide error message initially
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    // if user input the invalid city name then it shows invalid city name
    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
    } else {
        // if user input the correct city name then it fetch the weather details
        let data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";
        
        // Change image according to weather
        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png";
        }
    }
}

// event for click on search icon (call the function & passes the value given by user)
searchBtn.addEventListener("click", () => {
    checkweather(searchBox.value);
});
