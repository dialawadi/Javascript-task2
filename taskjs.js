// Setting Variables 
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
// empty array to store tasks 
let arrayOfTasks = [];

// Cheack if There is Tasks in local storage 
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));

}

// Trigger Get Data From Local Storage 
getDataFromLocalStorage();

// Add Task 
submit.onclick = function () {
if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ''; // Empty Input Field 

    
} 
}

function addTaskToArray(taskText) {
    // Task Data 
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // push Task To Array Of Tasks 
    arrayOfTasks.push(task);
    // Add Tasks To Page
    addElementsToPageFrom(arrayOfTasks);
    // Add Tasks To Local Storage
    addDataToLocalStorageFrom(arrayOfTasks);
    
    


}

// Click On Task Element 
tasksDiv.addEventListener("click", (e) => {
    // Delete Button 
    if (e.target.classList.contains("del")) {
         // remove task from local storage 
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
       // remove  element from page 
    e.target.parentElement.remove();
    }
     // Task Element 
    if (e.target.classList.contains("task")) {
        // Toggle Completed For The Task 
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
       // Toggle Done Class 
        e.target.classList.toggle("done");
    }
})

function addElementsToPageFrom(arrayOfTasks) {
// Empty Tasks Div حتى ما تضيف تاسكات على تاسكات قديمة و يصير عندي تكرار
tasksDiv.innerHTML = "";
// Looping On Array Of Tasks 
arrayOfTasks.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Cheack if the task is done 
    if (task.completed) {
        div.className = "task done";

    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("delete"));
    // append btn to main div
    div.appendChild(span);
    // Add Task Div To Task Container 
    tasksDiv.appendChild(div);
})
}

function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));

}
function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
        
    }
}

function deleteTaskWith(taskId) {
arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
addDataToLocalStorageFrom(arrayOfTasks); // after filltering

}

function toggleStatusTaskWith(taskId) {
    for (let i = 0 ; i< arrayOfTasks.length ; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed = true: arrayOfTasks[i].completed = false; 
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);

}

