// //ajax  async js and xml

// // activeXObject

// //2005  xmlhttpReq
// /**
//  * method
//  *
//  * get ==> get data
//  * post ==> send data
//  * put ==> update data
//  * patch ==>update
//  * delete ==> delete
//  *
//  *
//  *
//  * readystate = 0  ==> connection not stableshed
//  * readystate = 1  ==> con stablshed
//  * readystate = 2  ==> receved req
//  * readystate = 3  ==> processing req
//  * readystate = 4  ==>  success response ready
//  *
//  *
//  * status == 404 (not found)
//  *
//  * status == 403 (forbidden)
//  *
//  * status == 500 (inernal server error)
//  *
//  * status == 200 (ok)
//  *
//  *
//  *
//  *
//  */

// //sync

// var alldata = [];

// function getPizza() {

//   return new Promise(function(callback){

//   var req = new XMLHttpRequest();

//   req.open("GET", "https://forkify-api.herokuapp.com/api/search?q=pizza"); //make connection

//   req.send(); //send request

//   //async
//   req.addEventListener("readystatechange", function () {
//     if (req.readyState == 4 && req.status == 200) {
//       //console.log(req.response);

//       console.log("pizza");

//       alldata = JSON.parse(req.response).recipes;

//       displayData();

//       callback();
//     }
//   });

//   })

// }

// function getSalad(callback) {
//   var req = new XMLHttpRequest();

//   req.open("GET", "https://forkify-api.herokuapp.com/api/search?q=salad"); //make connection

//   req.send(); //send request

//   //async
//   req.addEventListener("readystatechange", function () {
//     if (req.readyState == 4 && req.status == 200) {
//       //console.log(req.response);

//       console.log("salad");

//       alldata = JSON.parse(req.response).recipes;

//       displayData();

//       callback();
//     }
//   });
// }

// function getPasta() {
//   return new Promise(function (callback,callback2) {
//     var req = new XMLHttpRequest();

//     req.open("GET", "https://forkify-api.herokuapp.com/api/search?q=pasta"); //make connection

//     req.send(); //send request

//     //async
//     req.addEventListener("readystatechange", function () {
//       if (req.readyState == 4 && req.status == 200) {
//         //console.log(req.response);

//         console.log("pasta");

//         alldata = JSON.parse(req.response).recipes;

//         displayData();

//         callback();
//       }
//       else{
//         callback2();
//       }
//     });
//   });
// }

// //getPasta().then(()=>{ getPizza()}).catch(function(){console.log("error")})

// //callbacks hell

// //promise

// getPasta(() => {
//   getPizza(() => {
//     getSalad(function () {
//       viewMessage();
//     });
//   });
// });

// //async await

// // getPasta().then(function(){
// //   getPizza().then(function(){
// //     getSalad();
// //   })
// // })

// function viewMessage() {
//   console.log("view message");
// }

// // h1.addEventListener("click",function(){
// //   nextSlide();
// // })

// //async

let alldata = [];

let links = document.getElementsByClassName("nav-link");

let linksArray = [...links];

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", (eventInfo) => {
    let query = eventInfo.target.innerHTML;

    getRecipes(query);
  });
}

async function getRecipes(klma) {
  let req = await fetch(
    `https://forkify-api.herokuapp.com/api/search?q=${klma}`
  );
  let responseBody = await req.json();

  alldata = responseBody.recipes;

  displayData();

  console.log("salad");
}

let recipeDetails = {};

async function getSingleRecipe(id) {
  let req = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
  let responseBody = await req.json();
  recipeDetails = responseBody.recipe;
displaySingleRecipe();
  console.log(recipeDetails);
}




var rowData = document.getElementById("rowData");

function displayData() {
  var str = "";
  for (var i = 0; i < alldata.length; i++) {
    str += `<div class="col-md-3">
    <div class="item">
    <img src="${alldata[i].image_url}" 
    data-toggle="modal" data-target="#exampleModal" 
     onclick="getSingleRecipe('${alldata[i].recipe_id}')"  class="w-100" >
      <h1>${alldata[i].title}</h1>
      <p>${alldata[i].publisher}</p>
      <p>${alldata[i].recipe_id}</p>

    </div>

  </div>`;
  }

  rowData.innerHTML = str;
}

getRecipes("pizza");

// ( async function(){
// await getPasta();
// await getPizza();
// await getSalad();
// })();



function displaySingleRecipe(){

let lis='';
  for(let i=0;i<recipeDetails.ingredients.length;i++){
    lis+=`<li>${recipeDetails.ingredients[i]}</li>`
  }

  let str=`
  <div>
    <img src="${recipeDetails.image_url}" alt="">
    <h2>${recipeDetails.title}</h2>
    <p>${recipeDetails.publisher}</p>
    <ol>${lis}</ol>

  </div>
   `

   document.getElementById("recipeDetails").innerHTML = str;
}