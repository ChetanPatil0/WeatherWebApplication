let weather_city = document.querySelector('#Weather-city');
let weather_date_time = document.querySelector('#date-time');
let weather_type = document.querySelector('#weatehr-type');
let weather_icon = document.querySelector('#weather_icon');
let current_temp = document.querySelector('#current_temp');
let low_temp = document.querySelector('#min-temp');
let high_temp = document.querySelector('#max-temp');
let weather_feels = document.querySelector('#weather-feels');
let weather_humidity = document.querySelector('#weather-humidity');
let weather_wind = document.querySelector('#weather-wind');
let weather_pressure = document.querySelector('#weather-pressure');
let search_city = document.querySelector('#search-city');
let city = 'nashik';
let UserCity = '';

let getLocation = async () => {
  if (navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apiKey = '4f8ff78094ae4898a76836f93ec38e1c';
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      let Ucity = data.results[0].components.city;
      UserCity = Ucity; 
      console.log(UserCity); 

    
      weatherdata();

    } catch (error) {
      console.error('Error fetching location:', error);
      alert("Unable to get location! Please search your city.");
    }
  } else {
    alert("Geolocation is not supported by this browser. Please search your city.");
  }
};

let weatherdata = async () => {
  console.log('UserCity in weatherdata:', UserCity); 

  if (search_city.value.length > 0) {
    city = search_city.value;
  } else {
    city = UserCity; 
      if(city.length == 0){
        alert("Unable to Get Location");
      }
    }
  

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a0b06669a793506ae54060f7df8a5fb6`;
  try {
    let res = await fetch(url);
    let data = await res.json();
    console.log("success", data);

    weather_city.innerHTML = `${data.name}, ${data.sys.country}`;
    let time = new Date();
    weather_date_time.innerHTML = `${time}`;
    weather_type.innerHTML = `${data.weather[0].description}`;
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weather_icon.src = iconUrl;
    weather_feels.innerHTML = `${Math.round(data.main.feels_like - 273)}&#176c`;
    weather_humidity.innerHTML = `${data.main.humidity}%`;
    weather_wind.innerHTML = `${data.wind.speed} m/s`;
    weather_pressure.innerHTML = `${data.main.pressure}`;

    current_temp.innerHTML = `${'Current :' + Math.round(data.main.temp - 273)}&#176c`;
    low_temp.innerHTML = `${'Min :' + Math.round(data.main.temp_min - 273)}&#176c`;
    high_temp.innerHTML = `${'Max :' + Math.round(data.main.temp_max - 273)}&#176c`;

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}



// 🌦️ Excited to share my latest project: a weather application built from scratch using HTML, Tailwind CSS, and JavaScript that displays current weather data! 🌍📱

// Key Features:

// Live Location: Automatically fetches and displays weather details based on the user's current location using Geolocation API.
// City Search: Allows users to search for weather information of any city worldwide.
// Current Weather Data: Provides real-time updates on temperature, humidity, wind speed, atmospheric pressure, and current weather conditions (like sunny, cloudy, etc.).
// Temperature Insights: Shows the current, maximum, and minimum temperatures of the day.
// I integrated the OpenWeather API to fetch accurate and up-to-date weather information, ensuring users receive comprehensive weather updates with a clean and intuitive interface. It was a fantastic learning experience combining front-end technologies with powerful APIs to create a user-friendly weather application.

// Check it out and let me know what you think! 🚀

// #WeatherApp #WebDevelopment #OpenWeatherAPI #HTML #CSS #JavaScript #TailwindCSS #GeolocationAPI #WebDesign #TechProjects #FrontEndDevelopment

