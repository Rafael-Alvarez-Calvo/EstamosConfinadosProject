let  button= document.querySelector("#button")
let  form = document.querySelector("#form")
let body = document.querySelector("body")




button.addEventListener("submit",(form) =>{
    let a = form.value

})

async function datos(dt){
    fetch(`https://apifetcher.herokuapp.com/?id=f22c3f43-c5d0-41a4-96dc-719214d56968&q=${dt}`)
    .then(response => response.json())
    .then(data => console.log(data)); 
}

fetch(`https://apifetcher.herokuapp.com/?id=f22c3f43-c5d0-41a4-96dc-719214d56968&q=asdsa`)
.then(response => response.json())
.then(data => console.log(data));
