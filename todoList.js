const todoContainer = document.querySelector(".js-todos")
    , todoForm = todoContainer.querySelector(".input_default")
    , todoInput = todoForm.querySelector("input")
    , pendingList = todoContainer.querySelector(".pendingList").querySelector("ul")
    , finishedList = todoContainer.querySelector(".finishedList").querySelector("ul");

const PENDING = "PENDING",
    FINISHED = "FINISHED";

let pendings = []
    , finisheds = [];

function saveTodo() {
    localStorage.setItem(PENDING, JSON.stringify(pendings));
    localStorage.setItem(FINISHED, JSON.stringify(finisheds));
}

function handleSwitch(event) {
    const btn = event.target;
    const li = btn.parentNode;

    const selPending = pendings.filter(function (pending) {
        return pending.id === parseInt(li.id);
    });

    const selFinished = finisheds.filter(function (finished) {
        return finished.id === parseInt(li.id);
    });

    handleDelete(event);

    if (selFinished.length > 0) {
        pendings.push(selFinished[0]);
        paintPending(selFinished[0]);
    }
    if (selPending.length > 0) {
        finisheds.push(selPending[0]);
        paintFinished(selPending[0]);
    }

    saveTodo();
}

function handleDelete(event) {
    const btn = event.target;
    const li = btn.parentNode;

    const cleanPending = pendings.filter(function (pending) {
        return pending.id !== parseInt(li.id);
    });

    const cleanFinisheds = finisheds.filter(function (finished) {
        return finished.id !== parseInt(li.id);
    });

    if (pendingList.contains(li)) {
        pendingList.removeChild(li);
    }
    if (finishedList.contains(li)) {
        finishedList.removeChild(li);
    }

    pendings = cleanPending;
    finisheds = cleanFinisheds;

    saveTodo();
}

function handleSubmit(event) {
    event.preventDefault();
    const id = new Date().getTime();
    const text = todoInput.value;
    const pending = {
        id: id,
        text: text
    }
    paintPending(pending);
    pendings.push(pending);
    todoInput.value = "";
    saveTodo();
}

function createList(todo, sBtnIcon){
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerText = todo.text;
    const delBtn = document.createElement('button');
    delBtn.innerText = "❌";
    delBtn.addEventListener('click', handleDelete);
    const switchBtn = document.createElement('button');
    switchBtn.innerText = sBtnIcon;
    switchBtn.addEventListener('click', handleSwitch);

    li.id = todo.id;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(switchBtn);

    return li;
}

function paintFinished(todo) {
    finishedList.appendChild(createList(todo, "⏪"));
}

function paintPending(todo) {
    pendingList.appendChild(createList(todo, "✔"));
}

function loadTodoList() {
    const loadedPending = localStorage.getItem(PENDING);
    const loadedFinished = localStorage.getItem(FINISHED);

    if (loadedPending !== null) {
        pendings = JSON.parse(loadedPending);
        pendings.forEach(function (pending) {
            paintPending(pending);
        });
    }

    if (loadedFinished !== null) {
        finisheds = JSON.parse(loadedFinished);
        finisheds.forEach(function (finished) {
            paintFinished(finished);
        })
    }
}


function init() {
    if (todoForm) {
        todoForm.addEventListener('submit', handleSubmit);
    }

    if (todoInput) {
        todoInput.placeholder = "Write a to do";
    }
    loadTodoList();
}

init();