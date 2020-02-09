const clockContainer = document.querySelector(".js-clock");
const yearboard = clockContainer.querySelector(".b-year");
const dateboard = clockContainer.querySelector(".b-date");
const clockboard = clockContainer.querySelector(".b-clock");
const secondboard = clockContainer.querySelector(".b-second");

function getTime(){
    const currentTime = new Date();
    const years = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1;
    const day = currentTime.getDate();
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const second = currentTime.getSeconds();

    yearboard.innerText = `${years}년`;
    dateboard.innerText = `${month<10?`0${month}`:`${month}`}월 ${day<10?`0${day}`:`${day}`}일`;
    clockboard.innerText = `${hour<10?`0${hour}`:`${hour}`}:${minute<10?`0${minute}`:`${minute}`}`;
    secondboard.innerText = `${second<10?`0${second}`:`${second}`}`;
}

function init(){
    getTime();
    setInterval(getTime,1000);
}

init();