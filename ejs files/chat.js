//Element
const item = document.querySelector("input");
const addbtn = document.querySelector(".btn-add");
const listOfItem = document.querySelector(".list");

//Event Handler
document.addEventListener("DOMContentLoaded",getToDos);
addbtn.addEventListener("click",addItemInList);
listOfItem.addEventListener("click",checkOrDeleteTODO);

//Functions

//Function to add item in the list
function addItemInList(e){
    //prevents default behaviour of browser
    e.preventDefault();

    //creating container for todo
    var divContainer = document.createElement("div");
    divContainer.classList.add('todo-container');
    var todo = document.createElement("li");
    todo.classList.add('todo');

    //creating todo
    todo.innerHTML = item.value;
    putTodoInLocalStorage(todo);
    item.value = "";
    divContainer.appendChild(todo);

    //adding check and trash button in todo
    const checkbtn = document.createElement('button');
    checkbtn.innerHTML = '<i class="fa fa-check"></i>';
    checkbtn.classList.add("btn","btn-checkbtn");
    divContainer.appendChild(checkbtn);

    const trashbtn = document.createElement('button');
    trashbtn.innerHTML = '<i class="fa fa-trash"></i>';
    trashbtn.classList.add('btn','btn-trashbtn');
    divContainer.appendChild(trashbtn);

    //appending todo to the list
    listOfItem.appendChild(divContainer);
}

//Funtion to remove item from the list
function checkOrDeleteTODO(e){
    const todo = e.target;
    if(todo.classList[1]=='btn-trashbtn'){
        const todoParent = todo.parentElement;
        todoParent.classList.add('todo-delete');
        removeTodoFromLocalStorage(todoParent);
        todoParent.addEventListener('transitionend',function(){
            todoParent.remove();
        });
    }
    if(todo.classList[1]=='btn-checkbtn'){
        const todoParent = todo.parentElement;
        todoParent.classList.toggle('todo-done');
    }
}

//Function to get previous todos
function getToDos(e){
    let todos = LocalStorage();

    todos.forEach(function(prevtodo){
        //prevents default behaviour of browser
        e.preventDefault();

        //creating container for todo
        var divContainer = document.createElement("div");
        divContainer.classList.add('todo-container');
        var todo = document.createElement("li");
        todo.classList.add('todo');

        //creating todo
        todo.innerHTML = prevtodo;
        divContainer.appendChild(todo);

        //adding check and trash button in todo
        const checkbtn = document.createElement('button');
        checkbtn.innerHTML = '<i class="fa fa-check"></i>';
        checkbtn.classList.add("btn","btn-checkbtn");
        divContainer.appendChild(checkbtn);

        const trashbtn = document.createElement('button');
        trashbtn.innerHTML = '<i class="fa fa-trash"></i>';
        trashbtn.classList.add('btn','btn-trashbtn');
        divContainer.appendChild(trashbtn);

        //appending todo to the list
        listOfItem.appendChild(divContainer);
    });
}

//adding todos to local storage
function putTodoInLocalStorage(todo){
    let todos = LocalStorage();
    
    let item = todo.innerHTML;
    todos.push(item);
    localStorage.setItem("todos",JSON.stringify(todos));
}

//Removing todos from local storage
function removeTodoFromLocalStorage(todoContainer){
    const todo = todoContainer.children[0].innerText;
    let todos = LocalStorage();

    todos.splice(todos.indexOf(todo),1);
    console.log(todos);
    localStorage.setItem('todos',JSON.stringify(todos));
}

//Function to check local storage
function LocalStorage(){
    if(localStorage.getItem("todos")===null){
        return [];
    }
    return JSON.parse(localStorage.getItem("todos"));
}