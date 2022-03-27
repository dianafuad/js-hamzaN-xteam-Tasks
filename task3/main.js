//varibles
let studentName = document.getElementById("student-name");
let stClass = document.getElementById("student-class");
let stId = document.getElementById("student-id");
let addBtn = document.getElementById("add");
let showBtn = document.getElementById("show");
let names_ul = document.getElementById("names");
let classes_ul = document.getElementById("classes");
let ids_ul = document.getElementById("ids");
let studentTable = document.getElementById("student-table");
let infoMsg= document.getElementById('info-msg');
let currentDate=document.getElementById('current-date');
let isDateSaved=false;
let studentsArr = [];

currentDate.innerHTML=setDate();

setInterval(myTimer, 1000);

function myTimer() {
  const d = new Date();
  document.getElementById("current-time").innerHTML = d.toLocaleTimeString();
}
//eventListners

addBtn.addEventListener("click", addStudents);
showBtn.addEventListener("click", showList);

//functions
function setDate(){
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

return date



}

function addStudents() {
 if(!isDateSaved)
  {
    document.getElementById('date').innerHTML+=currentDate.innerHTML;
  isDateSaved=true;
}

  if(studentName.value && stId.value){
  let student = {
    name: studentName.value,
    class: stClass.value,
    id:stId.value
  };
  studentsArr.push(student);
  studentName.value = "";
  stId.value="";

  console.log(studentsArr);
  showMsg('Student has been added','bg-dark');

  setTimeout(function(){
    infoMsg.innerHTML="";
    infoMsg.classList.remove('bg-dark');
  },2000);

}
else{
  showMsg('Fill the EMPTY feilds','bg-danger');
  
  setTimeout(function(){
    infoMsg.innerHTML="";
    infoMsg.classList.remove('bg-danger');
  },2000);

}
}
function add_li_element(st_name, st_class,st_id) {
  let st_name_li = document.createElement("li");
  let st_name_text = document.createTextNode(st_name);
  st_name_li.appendChild(st_name_text);
  names_ul.appendChild(st_name_li);

  let st_class_li = document.createElement("li");
  let st_class_text = document.createTextNode(st_class);
  st_class_li.appendChild(st_class_text);
  console.log(st_class_li);
  classes_ul.appendChild(st_class_li);

  
  let st_id_li = document.createElement("li");
  let st_id_text = document.createTextNode(st_id);
  st_id_li.appendChild(st_id_text);
  console.log(st_id_li);
   ids_ul.appendChild(st_id_li);

}
function showList() {
  
  
    classes_ul.innerHTML = "";
    names_ul.innerHTML = "";
    ids_ul.innerHTML="";
  
    for (let i = 0; i < studentsArr.length; i++) {
        console.log(studentsArr[i].name, studentsArr[i].class,studentsArr[i].id);
      add_li_element(studentsArr[i].name, studentsArr[i].class,studentsArr[i].id);
    
  }
}

function showMsg(text,type){

    infoMsg.innerHTML=text;
    infoMsg.classList.add(type)

}

