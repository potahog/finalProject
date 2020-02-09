const body = document.querySelector("body");

const IMG_NUMBER = 5;

function loadEndImage(event){
    image = event.path[0];
    image.classList.add("bgImage");
    body.prepend(image);
}

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.addEventListener("load", loadEndImage);
}

function genRandom(){
    const number = Math.floor(Math.random() * 1000) % IMG_NUMBER;
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();