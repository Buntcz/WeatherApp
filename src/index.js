import './style.css'
import { apiKey } from './APIKey';
import day from "./images/day.jpg"
import night from "./images/night.jpg"

const cityName = document.querySelector(".cityName");
const cityTemp = document.querySelector(".cityTemp");
const feelsLike = document.querySelector(".feelsLike");
const weatherName = document.querySelector(".weatherName")
const changeF = document.querySelector(".changeToF");
const changeC = document.querySelector(".changeToC");
const searchBar = document.getElementById("search");
const img = document.querySelector(".weatherIcon");
const humidity = document.querySelector(".humidity")
const wind = document.querySelector(".wind");
const form = document.querySelector("form")
const body = document.querySelector("body")

form.addEventListener("submit", checkWeather);
changeF.addEventListener("click", changeToF);
changeC.addEventListener("click", changeToC);



async function checkWeather() {
    let searchValue = searchBar.value;
    if(!searchValue) {
        searchValue = "london"
    }     

    event.preventDefault();

    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=`+searchValue);
    const weather = await response.json()
    
    cityName.textContent = weather.location.name;
    cityTemp.textContent = weather.current.temp_c + "ºC";
    feelsLike.textContent = `feels like: ${weather.current.feelslike_c} ºC`
    weatherName.textContent = weather.current.condition.text;
    img.src = `https:${weather.current.condition.icon}`
    wind.textContent = `${weather.current.wind_kph} km/h`;
    humidity.textContent = `${weather.current.humidity}%`
    console.log(weather);


    if(weather.current.is_day === 0) {
        body.style.backgroundImage = night;
    } else if(weather.current.is_day === 1) {
        body.style.backgroundImage = day;
    }
}
 
async function changeToF() {
    let searchValue = searchBar.value;
    if(!searchValue) {
        searchValue = "london"
    }

    const response = await fetch("https://api.weatherapi.com/v1/current.json?key=f45c84f6ed644db6b2d160937241604&q="+searchValue);
    const weather = await response.json()

    cityTemp.textContent = weather.current.temp_f + "ºF"
    feelsLike.textContent = `feels like: ${weather.current.feelslike_f} ºF`
   
    changeF.style.display = "none";
    changeC.style.display = "flex";
}

async function changeToC() {
    let searchValue = searchBar.value;
    if(!searchValue) {
        searchValue = "london"
    }

    const response = await fetch("https://api.weatherapi.com/v1/current.json?key=f45c84f6ed644db6b2d160937241604&q="+searchValue);
    const weather = await response.json()

    cityTemp.textContent = weather.current.temp_c + "ºC"
    feelsLike.textContent = `feels like: ${weather.current.feelslike_c} ºC`
    
    changeC.style.display = "none";
    changeF.style.display = "flex";
}

window.onload = () => {
    checkWeather();
}
