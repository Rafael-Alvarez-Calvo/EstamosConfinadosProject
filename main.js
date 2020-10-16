

////Capturadores///

let  button= document.querySelector("#button")
let texto = document.querySelector("#texto")
let body = document.querySelector("body")



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

////////////////////////// MAPA /////////////////////////////////////////////////////////////
let map = L.map('map', {});
L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 20
}).addTo(map);
var browserLat;
var browserLong;  
navigator.geolocation.getCurrentPosition(function(position) {
browserLat =  position.coords.latitude;
browserLong = position.coords.longitude;
marker_actual = L.marker([browserLat,browserLong]).addTo(map);
marker_actual.bindPopup('<b>Hola </b><br>Tu estas aqui').openPopup();
map.setView([browserLat,browserLong], 18);  
console.log(browserLat);
console.log(browserLong); }, 
function(err) {
console.error(err);
});   


