const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close-modal");
const addTaskBtn = document.getElementById("addTask");
const deleteTimeBtn=document.getElementById("addTask");
const todoContainer = document.querySelector(".todo-container");
const inputTask = document.querySelector(".modal input");
const delTimeBtn = document.getElementById("delete-time");

const colors = [
  "#50bfe9",
  "#f74e52",
  "#24cc8f",
  "#ff944c",
  "#f19595",
  "#a9dcf6",
];
let c = 0;
let time;
let task = "";
let taskbox;
let localS_time = "";
let tasks = [];
let edited_text = "";
let target_text='';
let edited_timeSlot_localStorage='';
let chosenTime=6;
//******************************** */

const startApp = () => {



  let count = localStorage.taskscount
    ? JSON.parse(localStorage.taskscount)
    : 10;
  for (time = chosenTime; time < count; time++) {
    localS_time = time.toFixed(2) + "";

    if (localStorage.getItem(localS_time) != null) {
      tasks = JSON.parse(localStorage.getItem(localS_time));

      drawTask(time.toFixed(2), colors[c]);

      let uls = document.querySelectorAll("ul");

      for (let i = 0; i < tasks.length; i++) {
        uls[time - chosenTime].innerHTML += `<li><span class="text">${tasks[i]}</span>
            <span class="actions"><button class="delete"><i class="fa-solid fa-trash"></i></button><button class="edit"><i
                        class="fa-solid fa-pen-to-square"></i></button></span></li>`;
      }
    } else {
      drawTask(time.toFixed(2), colors[c]);
    }

    c == 5 ? (c = 0) : c++;
  }

  addDeleteEventListner();
  addEditEventListner();
  
};
startApp();
//****************************************************** */


let addBns = document.querySelectorAll(".add");

//***************add task********************
addBns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    taskbox = e.target.parentElement.nextElementSibling.firstElementChild;
    localS_time = e.target.nextElementSibling.innerHTML;
    openModal();
    window.scrollTo(0, 0);
  });
});
//get task  from input
addTaskBtn.addEventListener("click", function () {
  //***Add****
  if (addTaskBtn.innerHTML == "Add") {
    tasks = [];
    //get previous tasks of chosen time slot
    if (localStorage.getItem(localS_time)) {
      tasks = JSON.parse(localStorage.getItem(localS_time));
    }
    task = inputTask.value;
    taskbox.innerHTML += `
     <li><span class="text">${task}</span>
     <span class="actions"><button class="delete"><i class="fa-solid fa-trash"></i></button><button class="edit"><i
                 class="fa-solid fa-pen-to-square "></i></button></span></li>`;
    inputTask.value = "";
    tasks.push(task);

    localStorage.setItem(localS_time, JSON.stringify(tasks));
    addDeleteEventListner();
    addEditEventListner();
  }
  //****Edit****
  else {
    edited_text = inputTask.value;
    inputTask.value='';
    closeModal();
    let oldText=target_text.textContent;
    target_text.textContent=edited_text;

      //edit local storage
      // 1-get the array from local storage
      tasks = JSON.parse(localStorage.getItem(edited_timeSlot_localStorage));
      // 2- fet the index of the edited item
     let index = tasks.indexOf(oldText);
     // 3- edit the array
     tasks[index]=edited_text;
    // 4- save the edited array in local storage
      localStorage.setItem(edited_timeSlot_localStorage, JSON.stringify(tasks));
      addTaskBtn.innerHTML='Add';
      document.querySelector('.modal h1').innerHTML='Add a new TASK😍';
   
  }
});


closeBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);


function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  addTaskBtn.innerHTML='Add';
  document.querySelector('.modal h1').innerHTML='Add a new TASK😍';
}
function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

//add new time slot

function addtime() {
  drawTask(time.toFixed(2), colors[c]);
  window.scrollTo(0, document.body.scrollHeight);
  tasks = [];
  localStorage.setItem(time.toFixed(2) + "", JSON.stringify(tasks));

  c == 5 ? (c = 0) : c++;
  time++;

  localStorage.setItem("taskscount", time + "");

  let addBns = document.querySelectorAll(".add");

  //add event listner to the new add button

  addBns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      taskbox = e.target.parentElement.nextElementSibling.firstElementChild;
      localS_time = e.target.nextElementSibling.innerHTML;
      openModal();
      window.scrollTo(0, 0);
    });
  });
}
//delTimeBtn.addEventListener('click',deleteTime);
function deleteTime(){
    let allTimeSlot=document.querySelectorAll('.timeslot');
    let lastTimeSlot=allTimeSlot[allTimeSlot.length-1];

    localStorage.removeItem((time-1).toFixed(2));
    lastTimeSlot.remove();
    time--;
    localStorage.setItem('taskscount',time);

}
// add event listners to delete btns
function addDeleteEventListner() {
  let deletBtns = document.querySelectorAll(".delete");

  deletBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      let deleted_item = "";
      let deleted_item_localStorage = "";
      let deleted_text = "";
      if (e.target.parentElement.classList.contains("delete")) {
        deleted_item = e.target.parentElement.parentElement.parentElement;

        deleted_item_localStorage =
          e.target.parentElement.parentElement.parentElement.parentElement
            .parentElement.previousElementSibling.children[1].textContent;
        deleted_text = deleted_item.firstElementChild.textContent;
        // delete from local storage
        tasks = JSON.parse(localStorage.getItem(deleted_item_localStorage));
        let index = tasks.indexOf(deleted_text);
        tasks.splice(index, 1);
        localStorage.setItem(deleted_item_localStorage, JSON.stringify(tasks));
        // delete from html
        deleted_item.remove();
      }
    });
  });
}
// add event listners to edit btns
function addEditEventListner() {
  let editBtns = document.querySelectorAll(".edit");

  editBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      addTaskBtn.innerHTML = "Edit";
      document.querySelector('.modal h1').innerHTML='Edit your task 📝';

      target_text = e.target.parentElement.parentElement.parentElement.firstElementChild;

      edited_timeSlot_localStorage =e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.previousElementSibling.children[1].textContent;

    
     openModal();
    
    });
  });
}

// draw task at html
function drawTask(time, color) {
  todoContainer.innerHTML += ` 
             
    <div class="timeslot">
        
        <div class="left" style="background-color: ${color};" >
            <button class="add">+</button>
            <div class="time">${time}</div>
            
        </div>
        <div class="tasks">
            <ul>
    
            </ul>
        </div>

   </div>
     `;
}








//delete task

//  document.addEventListener('click',function(e){
//      let deleted_item='';
//      let deleted_item_localStorage='';
//      let deleted_text='';
//      if(e.target.parentElement.classList.contains('delete')){

//          deleted_item= e.target.parentElement.parentElement.parentElement;
//          deleted_item_localStorage= e.target.parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.children[1].textContent;
//         deleted_text=deleted_item.firstElementChild.textContent;
//         // delete from local storage
//         tasks=JSON.parse( localStorage.getItem(deleted_item_localStorage));
//        let index= tasks.indexOf(deleted_text);
//        tasks.splice(index,1);
//        localStorage.setItem(deleted_item_localStorage,JSON.stringify(tasks))
//        // delete from html
//       deleted_item.remove();

//         }
//  })
