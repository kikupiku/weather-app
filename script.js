let code = '02d';

async function getWeather(city) {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=fb240456c5904bbec4f1ec517bf562e9`, {
        mode: 'cors',
      });
    const data = await response.json();
    populateContainer(data);
    return {
      data,
    };
  } catch (error) {
    console.log('sorry', error);
  }
}

getWeather('Neuss');

function populateContainer(data) {
  const body = document.querySelector('body');
  const weatherIcon = document.getElementById('weather-icon');
  const cityName = document.getElementById('city-name');
  const temperature = document.getElementById('temperature');
  const tempFeel = document.getElementById('temp-feel');
  const description = document.getElementById('description');
  const minTemp = document.getElementById('min-temp');
  const maxTemp = document.getElementById('max-temp');
  const humidity = document.getElementById('humidity');
  const wind = document.getElementById('wind');
  const pressure = document.getElementById('pressure');

  code = data.weather[0].icon;
  console.log(code);
  switch (code) {
    case '01d':
      body.style.backgroundImage = 'url(\'https://media1.giphy.com/media/VxbvpfaTTo3le/giphy.gif\')';
    break;
    case '02d':
      body.style.backgroundImage = 'url(\'https://media1.giphy.com/media/pRQmCJ4pMXftS/giphy.gif\')';
    break;
    case '03d':
      body.style.backgroundImage = 'url(\'https://data.whicdn.com/images/272241949/original.gif\')';
    break;
    case '04d':
      body.style.backgroundImage = 'url(\'https://data.whicdn.com/images/311386781/original.gif\')';
    break;
    case '09d':
      body.style.backgroundImage = 'url(\'https://i.pinimg.com/originals/a4/fa/12/a4fa1253438edb2146cb1c6458d7d9dc.gif\')';
    break;
    case '10d':
      body.style.backgroundImage = 'url(\'https://i.pinimg.com/originals/6f/2c/9f/6f2c9fdd7de3223063ad01bd53670a5d.gif\')';
    break;
    case '11d':
      body.style.backgroundImage = 'url(\'https://data.whicdn.com/images/303275638/original.gif\')';
    break;
    case '13d':
      body.style.backgroundImage = 'url(\'https://media.giphy.com/media/lMr6k5bqTTioM/giphy.gif\')';
    break;
    case '50d':
      body.style.backgroundImage = 'url(\'https://thumbs.gfycat.com/LightHospitableDoe-size_restricted.gif\')';
    break;
    case '01n':
      body.style.backgroundImage = 'url(\'https://data.whicdn.com/images/303306624/original.gif\')';
    break;
    case '02n':
      body.style.backgroundImage = 'url(\'https://media.giphy.com/media/AtK6cr1n21uY8/giphy.gif\')';
    break;
    case '03n':
      body.style.backgroundImage = 'url(\'https://i.pinimg.com/originals/bd/2f/d5/bd2fd5e1c0dc8e485b184546a2e4c000.gif\')';
    break;
    case '04n':
      body.style.backgroundImage = 'url(\'https://thumbs.gfycat.com/ExcitableImperturbableEmperorshrimp-size_restricted.gif\')';
    break;
    case '09n':
      body.style.backgroundImage = 'url(\'https://media2.giphy.com/media/RHjyppvaMzJGU/source.gif\')';
    break;
    case '10n':
      body.style.backgroundImage = 'url(\'https://i.pinimg.com/originals/52/46/2a/52462a9f57dad91c7d80384bf737346c.gif\')';
    break;
    case '11n':
      body.style.backgroundImage = 'url(\'https://media0.giphy.com/media/3o7TKs9TQX323TdQeA/source.gif\')';
    break;
    case '13n':
      body.style.backgroundImage = 'url(\'https://media2.giphy.com/media/Jr0uBlFYhqNA4/giphy.gif\')';
    break;
    case '50n':
      body.style.backgroundImage = 'url(\'https://media1.giphy.com/media/2AlpjchqgwIuc/giphy.gif\')';
    break;
  }
  weatherIcon.src = `http://openweathermap.org/img/wn/${code}@2x.png`;
  cityName.innerHTML = data.name + ', ' + data.sys.country;

  let systemCorF = 'celsius';
  const active = document.getElementById('active');
  const celsius = document.getElementById('celsius');
  const fahrenheit = document.getElementById('fahrenheit');
  const systems = [celsius, fahrenheit];

  systems.forEach((system) => {
    system.addEventListener('click', () => {
      if (system === systems[1]) {
        active.style.transform = 'translateX(40px)';
        let fahrenheitTemp = celsiusToFahrenheit(data.main.temp).fahrenheit;
        temperature.innerHTML =  roundTemperatureDigits(fahrenheitTemp).rounded + '&deg;F';
        let fahrenheitFeel = celsiusToFahrenheit(data.main.feels_like).fahrenheit;
        tempFeel.innerHTML = 'Feels like ' + roundTemperatureDigits(fahrenheitFeel).rounded + '&deg;F';
        let fahrenheitMin = celsiusToFahrenheit(data.main.temp_min).fahrenheit;
        minTemp.innerHTML = 'Minimum: ' + roundTemperatureDigits(fahrenheitMin).rounded + '&deg;F';
        let fahrenheitMax = celsiusToFahrenheit(data.main.temp_max).fahrenheit;
        maxTemp.innerHTML = 'Maximum: ' + roundTemperatureDigits(fahrenheitMax).rounded + '&deg;F';
      } else {
        active.style.transform = 'translateX(0px)';
        systemCorF = 'celsius';
        temperature.innerHTML = roundTemperatureDigits(data.main.temp).rounded + '&deg;C';
        tempFeel.innerHTML = 'Feels like ' + roundTemperatureDigits(data.main.feels_like).rounded + '&deg;C';
        minTemp.innerHTML = 'Minimum: ' + roundTemperatureDigits(data.main.temp_min).rounded + '&deg;C';
        maxTemp.innerHTML = 'Maximum: ' + roundTemperatureDigits(data.main.temp_max).rounded + '&deg;C';
      }
    });
  });

  if (systemCorF === 'celsius') {
    temperature.innerHTML = roundTemperatureDigits(data.main.temp).rounded + '&deg;C';
    tempFeel.innerHTML = 'Feels like ' + roundTemperatureDigits(data.main.feels_like).rounded + '&deg;C';
    minTemp.innerHTML = 'Minimum: ' + roundTemperatureDigits(data.main.temp_min).rounded + '&deg;C';
    maxTemp.innerHTML = 'Maximum: ' + roundTemperatureDigits(data.main.temp_max).rounded + '&deg;C';
  }

  description.innerHTML = data.weather[0].description;
  humidity.innerHTML = 'Humidity: ' + data.main.humidity + '%';
  wind.innerHTML = 'Wind: ' + data.wind.speed + 'm/s';
  pressure.innerHTML = 'Atmospheric pressure: ' + data.main.pressure + 'hPa';
}

function roundTemperatureDigits(num) {
  let rounded = Math.round(num * 10) / 10;
  return { rounded };
}

function celsiusToFahrenheit(num) {
  let fahrenheit = (Number(num) * 9 / 5 + 32);
  return { fahrenheit };
}

function toggleTempSystem() {

  return { systemCorF };
}
