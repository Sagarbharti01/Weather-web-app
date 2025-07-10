const apiKey = "b5bf1fdf26210d6888a2ba96d96d9f4b";

async function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city");

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    displayWeather(data);
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p>${error.message}</p>`;
  }
}

async function getWeatherByLocation() {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported");
  }

  navigator.geolocation.getCurrentPosition(async position => {
    const { latitude, longitude } = position.coords;

    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
      const data = await res.json();
      displayWeather(data);
    } catch (error) {
      document.getElementById("weatherResult").innerHTML = `<p>Error fetching weather data.</p>`;
    }
  }, error => {
    document.getElementById("weatherResult").innerHTML = `<p>Location access denied.</p>`;
  });
}

function displayWeather(data) {
  const { name, main, weather } = data;
  const resultHTML = `
    <h2>${name}</h2>
    <p>${weather[0].main} - ${weather[0].description}</p>
    <p>Temperature: ${main.temp}°C</p>
    <p>Humidity: ${main.humidity}%</p>
  `;
  document.getElementById("weatherResult").innerHTML = resultHTML;
}
