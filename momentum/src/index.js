import { Article } from "./js/Article";
import exampleJsonFile from '../data.json';

const time = document.querySelector('.time');
const day = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
let timeOfDay = greeting.textContent;
const name = document.querySelector('.name');
const body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
let randomNum = '';

//Показ времени
function showTime() {
    time.textContent = "Text";
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    getTimeOfDay();
    setTimeout(showTime, 1000);
  };
showTime();

//Показ даты
function showDate() {
    day.textContent = "Date";
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString('en-US', options);
    day.textContent = currentDate;
}


//Приветствие
function getTimeOfDay() {
    const timesOfDay = ['morning', 'afternoon', 'evening', 'night'];
    greeting.textContent = "Text";
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 5 && hours < 12) {
        greeting.textContent = `Good ${timesOfDay[0]}`;
    } else if (hours >= 12 && hours < 16) {
        greeting.textContent = `Good ${timesOfDay[1]}`;
    } else if (hours >= 16 && hours < 23) {
        greeting.textContent = `Good ${timesOfDay[2]}`;
    } else {
        greeting.textContent = `Good ${timesOfDay[3]}`;
    };
    timeOfDay = greeting.textContent;
}

//Сохранение введенного имени на странице
function setLocalStorage() {
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage);


//Генерируем рандомное число от 1 до 20
function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return randomNum = `${randomNum}${(Math.floor(Math.random() * (max - min + 1)) + min)}`.padStart(2, '0');
}

function backgroundChange () {
    if (timeOfDay === 'Good morning') {
        body.style.backgroundImage = `url('https://github.com/EvgenKlo/stage1-tasks/blob/assets/images/morning/${randomNum}.jpg?raw=true')`;
    } else if (timeOfDay === 'Good afternoon') {
        body.style.backgroundImage = `url('https://github.com/EvgenKlo/stage1-tasks/blob/assets/images/afternoon/${randomNum}.jpg?raw=true')`;
    } else if (timeOfDay === 'Good evening') {
        body.style.backgroundImage = `url('https://github.com/EvgenKlo/stage1-tasks/blob/assets/images/evening/${randomNum}.jpg?raw=true')`;
    } else {
        body.style.backgroundImage = `url('https://github.com/EvgenKlo/stage1-tasks/blob/assets/images/night/${randomNum}.jpg?raw=true')`;
    };
}

function setBg () {
    randomNum = '';
    getRandomNum(1, 20);
    backgroundChange();
    setTimeout(setBg, 1.2e+6);
}
setBg();

//Меняем фон при клике на боковые кнопки
slidePrev.addEventListener('click', getSlidePrev);

function getSlidePrev() {
    if (randomNum === '01') {
        randomNum = '20';
    } else {
        randomNum = `${randomNum - 1}`.padStart(2, '0');
    };
    backgroundChange();
    getQuotes()
}

slideNext.addEventListener('click', getSlideNext);

function getSlideNext() {
    if (randomNum === '20') {
        randomNum = '01';
    } else {
        randomNum = `${randomNum * 1 + 1}`.padStart(2, '0');
    };
    backgroundChange();
    getQuotes()
}





//Погода
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const city = document.querySelector('.city');

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=5c42939a2a6f2da623f998d99a9d18c8&units=metric`;
  const res = await fetch(url);
  if(res.status === 404 || res.status === 400) {
    weatherError.textContent = `Error! city not found for ${city.textContent}`;
    weatherIcon.classList.remove(weatherIcon.classList[2]);
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  } else {
    const data = await res.json();
    weatherError.textContent = '';
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
  }
}

function setCity(event) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
    getWeather();
    city.blur();
    }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

//Сохранение введенного города на странице
function setLocalStorageCity() {
    localStorage.setItem('city', city.textContent);
}
window.addEventListener('beforeunload', setLocalStorageCity);

function getLocalStorageCity() {
    if(localStorage.getItem('city')) {
        city.textContent = localStorage.getItem('city');
    }
}
window.addEventListener('load', getLocalStorageCity);





//Фраза дня
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
let randomNumQuote;

changeQuote.addEventListener('click', getQuotes);

//Генерируем рандомное число
function getRandomNumQuote(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return randomNumQuote = Math.floor(Math.random() * (max - min + 1)) + min;
}

//Получаем фразу из файла и меняем когда нужно
async function getQuotes() {  
    const quotes = '../data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    getRandomNumQuote(0, (data.length - 1));
    quote.textContent = data[randomNumQuote].text;
    author.textContent = data[randomNumQuote].author;
    setTimeout(getQuotes, 120000);
}
getQuotes()



//Аудиоплеер
import playList from './js/playList';

//
let playNum = 0;
let isPlay = false;
const playIcon = document.querySelector('.play');
const prevIcon = document.querySelector('.play-prev');
const nextIcon = document.querySelector('.play-next');

//Создаем плейлист
const playListContainer = document.querySelector('.play-list');

function createPlayList() {
    playList.forEach(el => {
        const li = document.createElement('li');
        li.classList.add('play-item');
        li.textContent = el.title;
        playListContainer.append(li);
    });
}
createPlayList();


const playListItems = document.querySelectorAll('li');
playListItems[0].classList.add('item-active');


const audio = new Audio();

playIcon.addEventListener('click', playAudio);

function playAudio() {
    playListItems.forEach(el => {
        el.classList.remove('item-active');
    })
    if(isPlay === false){
        isPlay = true;
        playIcon.classList.toggle('pause');
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        audio.play();
        playListItems[playNum].classList.toggle('item-active');
    } else {
        isPlay = false;
        audio.pause();
        playIcon.classList.toggle('pause');
        playListItems[playNum].classList.toggle('item-active');
    }
    audio.addEventListener('ended', playNext);
}

nextIcon.addEventListener('click', playNext);
function playNext() {
    if(isPlay === true) {
        if(playNum === playList.length - 1){
            playNum = 0;
        } else {
            playNum++;
        };
        isPlay = false;
        playAudio();
        playIcon.classList.add('pause');
    } else {
        if(playNum === playList.length - 1){
            playNum = 0;
        } else {
            playNum++;
        };
        playListItems.forEach(el => {
            el.classList.remove('item-active');
        });
        playListItems[playNum].classList.add('item-active');
    }
}

prevIcon.addEventListener('click', playPrev);
function playPrev() {
    if(isPlay === true) {
        if(playNum === 0){
            playNum = playList.length - 1;
        } else {
            playNum--;
        };
        isPlay = false;
        playAudio();
        playIcon.classList.add('pause');
    } else {
        if(playNum === 0){
            playNum = playList.length - 1;
        } else {
            playNum--;
        };
        playListItems.forEach(el => {
            el.classList.remove('item-active');
        });
        playListItems[playNum].classList.add('item-active');
    }  
}
