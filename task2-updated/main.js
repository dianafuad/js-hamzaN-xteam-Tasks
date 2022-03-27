

//varibles

var input=document.getElementById('input');
var addBtn=document.getElementById('addBtn');
var tasks=document.getElementById('tasks-list');
var error=document.getElementById('error-msg');
error.style.display='none';

//events
addBtn.onclick=addTask;

//functions

function addTask(){
    error.style.display='none';
    var newTask=input.value;
if(newTask){
  
    console.log(newTask);
    tasks.innerHTML+=`<li>${newTask}  <button class="delete"><i class="fa-solid fa-trash-can"></i></button></li>`;
    input.value="";
    
}
else{
    error.style.display='block';
    error.innerHTML=`you should enter data <i class="fa-solid fa-triangle-exclamation"></i> `;

}

document.addEventListener('click',function(e){
   
    if(e.target.parentNode.className === "delete"){
        e.target.parentNode.parentNode.remove();
    }
});
   
}




