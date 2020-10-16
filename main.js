
////Capturadores///

let  button= document.querySelector("#button")
let texto = document.querySelector("#texto")
let body = document.querySelector("body")
let map = document.querySelector("#map")


///Informacion Capturada
let result = {};


let tasaIncidenciaAcumulada

button.addEventListener("click", async() =>{
    
    let envio = texto.value;
    console.log(envio)
    result = await datos(envio);
})

async function datos(dt){
    fetch(`https://apifetcher.herokuapp.com/?id=f22c3f43-c5d0-41a4-96dc-719214d56968&q=${dt}`)
    .then(response => response.json())
    .then(data => console.log(data)); 
}


console.log(result)



