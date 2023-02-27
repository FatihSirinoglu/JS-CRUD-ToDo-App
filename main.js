let formEl = document.getElementById("form")
let textInputEl = document.getElementById("textInput")
let msgEl = document.getElementById("msg")
let dateInputEl = document.getElementById("dateInput")
let textAreaEl = document.getElementById("textArea")
let tasksEl = document.getElementById("tasks")
let addEl = document.getElementById("add")

formEl.addEventListener("submit", (e)=>{
    e.preventDefault()
    formValidation();
})

let formValidation=()=>{
    if (textInputEl.value === "") {
        console.log("failed")
        msgEl.innerHTML = "This area cannot be empty!"
    } else {
        console.log("success")
        msgEl.innerHTML = ""
        acceptData();

        // Form element has 2 buttons: add and close. We need close button's attribute that gives itself close function so we need this function on add button as well. To give this attribute to Add button;
        addEl.setAttribute("data-bs-dismiss","modal")

        // setAttribute() has 2 element ;firs one attribute and second is value.
        //  after those actions add button closing but after double clicking. The add button takes attribute after first click and this attribute works after second click. Because of this situation we need artificle click.
        addEl.click()
    }   
}

// let data = {}
// to set local storage
// data is an object here but if we want to store all the data we need array that includes objects
let data = []
// data is an object so we can use map function
// accept data could send in data.map function
// data.map(x,y) x means every ocject that returns, y means index number 0,1,2,3,4,5...
 
let acceptData = () => {
    // data["text"] = textInputEl.value
    // data["date"] = dateInputEl.value
    // data["desc"] = textAreaEl.value
    // we need to awoke this function only formValidation is true situation.

    data.push({
        text : textInputEl.value,
        date : dateInputEl.value,
        desc : textAreaEl.value,
    });

    localStorage.setItem("data", JSON.stringify(data));
    console.log(data)
    createTasks();
}

let createTasks = () => {
    tasksEl.innerHTML = ""
    data.map((x,y)=>{
        return tasksEl.innerHTML += 
        `
        <div id=${y}>
        <span class="fw-bold">${x.text}</span>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.desc}</p>
        <span class="options">
            <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
            <i onClick="deleteTask(this)" class="fa-solid fa-trash"></i>
        </span>
        </div>
    
        `
    })
    // tasksEl.innerHTML is not gonna replace, it ll be added to list, so we use +=
    
    resetForm();
}

let deleteTask = (e) => {
    e.parentElement.parentElement.remove()
    data.splice(e.parentElement.parentElement.id, 1)
    // Local storage should update yourself at this point
    localStorage.setItem("data", JSON.stringify(data));
}
let editTask = (e) => {
    // when this function works , first it removes the old task and then brings the form 
    let selectedTask= e.parentElement.parentElement
    // selectedTask points task div and input is it's first children we need to give old inputText to this child.
    textInputEl.value = selectedTask.children[0].innerHTML
    dateInputEl.value = selectedTask.children[1].innerHTML
    textAreaEl.value = selectedTask.children[2].innerHTML

    // after move all old inputs to edited input , the old unedited one should be remove

    // selectedTask.remove() should uptade like below line
    deleteTask(e);
}


// we need to reset the form after new task saved. We need a reset function

let resetForm = () => {
    textInputEl.value = ""
    dateInputEl.value = ""
    textAreaEl.value = ""
}


// IIFE (Immediately Inwoke Functional Expression)
// This function works every time page refreshes or loads

(()=>{
    data = JSON.parse(localStorage.getItem("data")) || []
    // When the page loaded first time createTasks() starts to work it throws an error : map function cannot read. Local storage has no objects when the page first load.So the data.map function cannot read.The solution is add || [] an or state and an empty array.
    console.log(data);
    createTasks();
})()