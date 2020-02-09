const userContainer = document.querySelector(".js-user")
    , userForm = userContainer.querySelector(".input_default")
    , userInput = userForm.querySelector("input")
    , userName = userContainer.querySelector("#name");

const USERNAME = "USER_NAME";

function handleSubmit(event){
    event.preventDefault();
    localStorage.setItem(USERNAME, userInput.value);
    loadedUserName();
}

function loadedUserName(){
    const loadName = localStorage.getItem(USERNAME);
    if(loadName !== null){
        userForm.classList.add("input_hide");
        userName.innerText = `Hello! ${loadName}`;
    }
}

function init(){
    if(userForm){
        userForm.addEventListener("submit", handleSubmit);
    }

    if(userInput){
        userInput.placeholder="Enter the your name";
    }
    loadedUserName();
}

init();