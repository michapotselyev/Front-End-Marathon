const api = {
    key: "303332f795ec198811841aeb73fc22e2",
    base: "https://api.openweathermap.org/data/2.5/",
    image: "http://openweathermap.org/img/wn/"
}

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let body = document.getElementById('body');
let city = document.getElementById('city');
let today = document.getElementById('today');
let temp = document.getElementById('temp');
let currentImage = document.getElementById('currentImage');
let forecastDate = document.getElementsByClassName('forecastDate');
let forecastImage = document.getElementsByClassName('forecastImage');
let forecastTemp = document.getElementsByClassName('forecastTemp');

fetch(`${api.base}forecast?q=${'Kharkiv'}&units=metric&APPID=${api.key}`)
    .then(weather => { return weather.json(); }).then(displayCurrent);

function displayCurrent(weather) {    
    city.innerText = 'Kharkiv, UA';
    let now = new Date();
    today.innerHTML = dateBuilder(now);
    currentImage.src = `${api.image}${weather.list[0].weather[0].icon}@4x.png`;
    temp.innerText = `${Math.round(weather.list[0].main.temp)}°C`;
    let forecast = [8, 16, 24, 32, 39];
    for(let i = 0; i < forecast.length; i++) {
        let now = new Date(weather.list[forecast[i]].dt_txt);
        forecastDate[i].innerHTML = dateBuilder(now);
        forecastTemp[i].innerHTML = `${Math.round(weather.list[forecast[i]].main.temp)}°C`;
        forecastImage[i].src = `${api.image}${weather.list[forecast[i]].weather[0].icon}@4x.png`;
    }
}

function dateBuilder(now) { 
    let day = days[now.getDay()];
    let date = now.getDate();
    let month = months[now.getMonth()];
    return `${day} ${date}<br>${month}`;
}

