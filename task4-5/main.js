//slider varibles

var img=document.getElementById('slide');
var images=['img/header1.jpg','img/header2.jpg','img/header3.jpg']
var i=0;


//slider function
function slider(){
   
    // first way

      // setInterval(function(){
      //   img.setAttribute('src',images[i]);
      //   i==2?i=0:i++;
      // },10000);
    
   //second way
   img.setAttribute('src',images[i]);
   i==2?i=0:i++;
  setTimeout('slider()',10000);
  
}

slider();
//********************************************************************************** */

// inputs varibles


var input_pTitle=document.getElementById('product-title');
var input_pCategory=document.getElementById('category');
var input_pBrand=document.getElementById('brand');
var input_pCode=document.getElementById('code');
var addBtn=document.getElementById('add');
var outputTable=document.getElementById('table-body');
var products=[];


//events

addBtn.addEventListener('click',addProduct);

// functions

function addProduct(){
 
  var product={
    title:input_pTitle.value,
    category:input_pCategory.value,
    brand:input_pBrand.value,
    code:input_pCode.value
  }
  products.push(product);
console.log(product);
  writeTable();
   clearInputs();


}

function writeTable(){
  outputTable.innerHTML="";

  for (let i = 0; i< products.length; i++) {
      outputTable.innerHTML+=`
      <tr>
        <td>${products[i].title}</td>
        <td>${products[i].category}</td>
        <td>${products[i].brand}</td>
        <td>${products[i].code}</td>
        <td><button onclick='deleteProduct(${products[i].code})'>Delete</button></td>
      </tr>
 `
      }
}

function clearInputs(){
  input_pBrand.value='';
  input_pCategory.value='';
  input_pCode.value='';
  input_pTitle.value='';
}

function deleteProduct(product_code){

  //first way

  /*for (let i = 0; i < products.length; i++) {
    console.log(product_code,products[i].code)
     if(product_code==products[i].code){
       products.splice(i,1);

     }
    
    
   }
*/


  // second way

  var product_index=products.findIndex(function(p){
   return p.code==product_code;
  });

  products.splice(product_index,1);


  writeTable();
}