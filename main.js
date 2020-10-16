////Capturadores///

let  button= document.querySelector("#button")
let texto = document.querySelector("#texto")
let body = document.querySelector("body")
let map = L.map('map', {});

///Informacion Capturada
let result = {};
let TasaIncidenciaAcumulada
let City
let actualCase
class Incidencia{
     construtor(City,TIA){
        this.City = City;
        this.TIA = TIA
        this.casos =[
            {   
                city : this.City,
                fecha : moment().subtract(1, 'days').calendar() ,
                casos : 500
            },
            
        ]
     }
     //Añade los casos actuales a un array de casos por dias
    PushNcasos(actualCase) {
         let a = {fecha:moment().format('MMMM Do YYYY, h:mm:ss a'), caso: actualCase}
         this.casos.push(a)
     }
}
let prueba = new Incidencia("Madrid",600)
console.log(prueba.casos)
//////////////////////////////////////////// FUNCIONES////////////////////////////////////
button.addEventListener("click", async() =>{
    
    let envio = texto.value;
    console.log(envio)
    result = await datos(envio);
})
async function datos(dt){
    console.log(dt);
    fetch("https://apifetcher.herokuapp.com?id=f22c3f43-c5d0-41a4-96dc-719214d56968&filters="
    + JSON.stringify({"municipio_distrito": "Madrid-Moratalaz"})
    )
    .then(d => d.json())
    .then(d => console.log(d))
}



////////////////////////// MAPA /////////////////////////////////////////////////////////////
function mapa() {
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
// console.log(browserLat);
// console.log(browserLong);
 }, 
function(err) {
console.error(err);
});   
}
/////// Grafico//////////////////////////////////////////////////////
function Grafico() {
  

fetch('https://api.covid19tracking.narrativa.com/api/2020-10-16/country/spain/region/madrid')
.then(response => response.json())
.then(data => {
    
    let open_cases = data.dates["2020-10-16"].countries.Spain.today_open_cases;

    let dateString = data.dates["2020-10-16"].countries.Spain.date;
    console.log(dateObj)
    let dateObj = new Date(dateString);
    let momentObj = moment(dateObj);
    let momentString = momentObj.format('DD/MM')

    let dataChart = {
    labels: ['02/10', '03/10', '04/10', '05/10', '06/10', '07/10', '08/10','09/10','10/10','11/10','12/10','13/10','14/10',momentString,'16/10'],
    series: [

      [0, 3, 5, 8, 10, -20,0, 3, 5, 8, 10, -20,0, open_cases, 5],
      
    ]
  };
  
  // All The Defaul Options of a line chart:
  
  var options = {
  axisX: {
      // The offset of the labels to the chart area
      offset: 30,
      // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
      position: 'end',
      // Allows you to correct label positioning on this axis by positive or negative x and y offset.
      labelOffset: {
        x: -20,
        y: 0
      },
      // If labels should be shown or not
      showLabel: true,
      // If the axis grid should be drawn or not
      showGrid: true,
      // Interpolation function that allows you to intercept the value from the axis label
      labelInterpolationFnc: Chartist.noop,
      // Set the axis type to be used to project values on this axis. If not defined, Chartist.StepAxis will be used for the X-Axis, where the ticks option will be set to the labels in the data and the stretch option will be set to the global fullWidth option. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
      type: undefined
    },
    // Options for Y-Axis
    axisY: {
      // The offset of the labels to the chart area
      offset: 20,
      // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
      position: 'start',
      // Allows you to correct label positioning on this axis by positive or negative x and y offset.
      labelOffset: {
        x: 0,
        y: 0
      },
      // If labels should be shown or not
      showLabel: true,
      // If the axis grid should be drawn or not
      showGrid: true,
      // Interpolation function that allows you to intercept the value from the axis label
      labelInterpolationFnc: Chartist.noop,
      // Set the axis type to be used to project values on this axis. If not defined, Chartist.AutoScaleAxis will be used for the Y-Axis, where the high and low options will be set to the global high and low options. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
      type: undefined,
      // This value specifies the minimum height in pixel of the scale steps
      scaleMinSpace: 20,
      // Use only integer values (whole numbers) for the scale steps
      onlyInteger: true
    },
    // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
    width: undefined,
    // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
    height: undefined,
    // If the line should be drawn or not
    showLine: true,
    // If dots should be drawn or not
    showPoint: true,
    // If the line chart should draw an area
    showArea: true,
    // The base for the area chart that will be used to close the area shape (is normally 0)
    areaBase: 0,
    // Specify if the lines should be smoothed. This value can be true or false where true will result in smoothing using the default smoothing interpolation function Chartist.Interpolation.cardinal and false results in Chartist.Interpolation.none. You can also choose other smoothing / interpolation functions available in the Chartist.Interpolation module, or write your own interpolation function. Check the examples for a brief description.
    lineSmooth: true,
    // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
    low: undefined,
    // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
    high: undefined,
    // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
    chartPadding: {
      top: 35,
      right: 25,
      bottom: 5,
      left: 20
    },
    // When set to true, the last grid line on the x-axis is not drawn and the chart elements will expand to the full available width of the chart. For the last label to be drawn correctly you might need to add chart padding or offset the last label with a draw event handler.
    fullWidth: true,
    // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
    reverseData: false,
    // Override the class names that get used to generate the SVG structure of the chart
    classNames: {
      chart: 'ct-chart-line',
      label: 'ct-label',
      labelGroup: 'ct-labels',
      series: 'ct-series',
      line: 'ct-line',
      point: 'ct-point',
      area: 'ct-area',
      grid: 'ct-grid',
      gridGroup: 'ct-grids',
      vertical: 'ct-vertical',
      horizontal: 'ct-horizontal',
      start: 'ct-start',
      end: 'ct-end'
    }
  };
  
  // All you need to do is pass your configuration as third parameter to the chart function
  new Chartist.Line('.ct-chart', dataChart, options);

})

}
mapa()
