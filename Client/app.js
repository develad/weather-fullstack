import { myIcons } from './icons.js';
const degree = document.getElementById('degree');
const descrption = document.querySelector('.description');
const timeZone = document.querySelector('.locationTimezone');
const weatherImg = document.querySelector('#wheatherImg');
const updateTime = document.querySelector('#updateTime');
const unit = document.querySelector('#unit');
const refresh = document.querySelector('#refresh');
const year = document.querySelector('#year');

window.addEventListener('load', getWeather);
refresh.addEventListener('click', getWeather);

function getWeather() {
  let long;
  let lat;
  let time = '';

  timeZone.textContent = 'Loading...';
  weatherImg.classList.remove('move');
  weatherImg.src = './spinner.gif';
  descrption.textContent = '';
  unit.textContent = '';
  updateTime.textContent = '';
  degree.textContent = '';
  unit.textContent = '';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      const date = new Date(position.timestamp);
      // console.log(lat, long);
      year.innerHTML = date.getFullYear();
      console.log(position);
      fetch('https://weather-app-vanillajs.herokuapp.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lat, long }),
      }).then(async (data) => {
        const newData = await data.json();
        console.log(newData);
        const dayData = newData.consolidated_weather[0];
        degree.textContent = Number(dayData.the_temp).toFixed(1);
        descrption.textContent = dayData.weather_state_name;
        weatherImg.src = `${myIcons[dayData.weather_state_abbr]}`;
        weatherImg.classList.add('move');
        timeZone.textContent = newData.title;
        time = newData.time;
        let timeArray = time.split('T');
        timeArray[1] = timeArray[1].split('.')[0];
        updateTime.innerHTML = `Last update: ${timeArray[1]}`;
        unit.innerHTML = `&#176;C`;
      });
    });
  }
}
