const apiKey = "e2ef9a7267d228b75ffb558a1d527bc4"; // Yahan apni OpenWeatherMap API key dalen
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const weatherIcon = document.querySelector("#weatherIcon");

async function checkWeather(city) {
    if (!city) return;

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status == 404) {
            alert("City not found! Please check the spelling.");
            return;
        }

        const data = await response.json();

        // HTML elements ko update karna
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector("p.humidity").innerHTML = data.main.humidity + "%";
        document.querySelector("p.wind").innerHTML = data.wind.speed + " km/h";

        // Weather condition ke hisaab se image update karna
        const mainWeather = data.weather[0].main;
        
        if (mainWeather === "Clouds") {
            weatherIcon.src = "./assets/clouds.png";
        } else if (mainWeather === "Clear") {
            weatherIcon.src = "./assets/clear.png";
        } else if (mainWeather === "Rain") {
            weatherIcon.src = "./assets/rain.png";
        } else if (mainWeather === "Drizzle") {
            weatherIcon.src = "./assets/drizzle.png";
        } else if (mainWeather === "Mist") {
            weatherIcon.src = "./assets/mist.png";
        } else if (mainWeather === "Snow") {
            weatherIcon.src = "./assets/snow.png";
        } else {
            weatherIcon.src = "./assets/clear.png"; // Default fallback
        }
    } catch (error) {
        console.error("Error fetching weather data: ", error);
        alert("Something went wrong!");
    }
}

// Button click par search
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// 'Enter' press karne par search
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

// App open hone par default location (e.g. Lahore/Karachi ya apki pasand ka) show kare
checkWeather("Karachi");
