async function getWeather(city) {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=fb240456c5904bbec4f1ec517bf562e9`, {
        mode: 'cors',
      });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('sorry', error);
  }
}

getWeather('Warsaw');
