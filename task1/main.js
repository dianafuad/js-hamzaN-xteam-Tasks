
// TASK
// Create Function that print your name in browser
// Create p element in html and set name into it
// print name if x = 2

var x=0;
function printName(str,x){
    var name=document.getElementById('name');

    if(x===2){
    name.innerHTML=str;
    }
    else{
        name.innerHTML="not allowed"
    }
}
printName("diana",2);
//printName("diana",1);
