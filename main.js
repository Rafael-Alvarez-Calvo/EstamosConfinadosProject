////Capturadores///
let body = document.querySelector("body");
let map = L.map("map", {});
let confinamiento = document.querySelector("#confinamiento");
///Informacion Capturada
var browserLat;
var browserLong;
let result = {};
let TasaIncidenciaAcumulada;
let City; // ciudad
let actualCase = 0; // casos de hoy
class Incidencia {
  constructor(city, TIA) {
    (this.City = city),
      (this.Tia = TIA),
      (this.casos = [])
  }
  //Añade los casos actuales a un array de casos por dias

  pushCasos(registro) {
    this.casos.push(registro);
  }
  // funcion para saber si se esta confinado o no
  confinado(Tia) {
    let h1 = document.createElement("h1");
    if (Tia >= 500 || null) {
      h1.innerText = "SI";

      let parrafo1 = document.createElement("section");
      let parrafo2 = document.createElement("section");
     
      let p1 = document.createElement("p");
      let p2 = document.createElement("p");
      let p3 = document.createElement("p");
      let ul3 = document.createElement("ul");
      let ul3p = document.createElement("p");
      let ul3li1 = document.createElement("li");
      let ul3li2 = document.createElement("li");
      let ul3li3 = document.createElement("li");
      let ul3li4 = document.createElement("li");
      let ul3li5 = document.createElement("li");
      let ul3li6 = document.createElement("li");
      let ul3li7 = document.createElement("li");
      let ul3li8 = document.createElement("li");
      let ul3li9 = document.createElement("li");
      let ul3li10 = document.createElement("li");
      let ul3li11 = document.createElement("li");
      let ul3li12 = document.createElement("li");

      p1.innerText = "¿Que puedo hacer estando confinado?";
      p2.innerText = "Limitación de la libertad de circulación de las personas";
      p3.innerText =
        "La circulación de las personas en tránsito a través de los ámbitos territoriales que constituyen el ámbito de aplicación  no estara sometida a las restricciones establecidas en el apartado anterior.";
      ul3p.innerText =
        "Se restringe la entrada y salida de personas de los municipios recogidos en el artículo 2 a aquellos desplazamientos adecuadamente justificados que se produzcan por alguno de los siguientes motivos:";
      ul3li1.innerText =
        "Asistencia a centros, servicios y establecimientos sanitarios";
      ul3li2.innerText =
        "Cumplimiento de obligaciones laborales, profesionales, empresariales, institucionales o legales";
      ul3li3.innerText =
        "Asistencia a centros universitarios, docentes y educativos, incluidas las escuelas de educación infantil.";
      ul3li4.innerText = "Retorno al lugar de residencia habitual.";
      ul3li5.innerText =
        "Asistencia y cuidado a mayores, menores, dependientes, personas con discapacidad o personas especialmente vulnerables.";
      ul3li6.innerText =
        "Desplazamiento a entidades financieras y de seguros que no puedan aplazarse.";
      ul3li7.innerText =
        "Actuaciones requeridas o urgentes ante los órganos públicos, judiciales o notariales.";
      ul3li8.innerText =
        "Renovaciones de permisos y documentación oficial, así como otros trámites administrativos inaplazables.";
      ul3li9.innerText =
        "Realización de exámenes o pruebas oficiales inaplazables.";
      ul3li10.innerText = "Por causa de fuerza mayor o situación de necesidad.";
      ul3li11.innerText =
        "Cualquier otra actividad de análoga naturaleza, debidamente acreditada.";
      ul3li12.innerText =
        "Quedarse en casa es mas barato.";
      confinamiento.appendChild(h1);
      confinamiento.appendChild(parrafo1);
      confinamiento.appendChild(parrafo2);
      parrafo1.appendChild(p2);
      parrafo1.appendChild(ul3);
      ul3.appendChild(ul3li1);
      ul3.appendChild(ul3li2);
      ul3.appendChild(ul3li3);
      ul3.appendChild(ul3li4);
      ul3.appendChild(ul3li5);
      ul3.appendChild(ul3li6);
      ul3.appendChild(ul3li7);
      ul3.appendChild(ul3li8);
      ul3.appendChild(ul3li9);
      ul3.appendChild(ul3li10);
      ul3.appendChild(ul3li11);
      ul3.appendChild(ul3li12);
      parrafo2.appendChild(p3);
    } else {
      let h1 = document.createElement("h1");
      h1.innerText = "NO";
      let palabraDelSeñor = document.createElement("p");
      palabraDelSeñor.innerText = "Asique divierte pero con precaucion";
      confinamiento.appendChild(h1);
      confinamiento.appendChild(palabraDelSeñor);
    }
  }
}
let prueba = new Incidencia("Madrid",600);


//////////////////////////////////////////// FUNCIONES////////////////////////////////////

async function pintarGrafico() {
  let apiResponse = await datos(); //Espera el envio de los datos de los datos api (fetch)
  console.log(apiResponse);
  // console.log(apiResponse.result.records);
  // if (apiResponse.result.records.length)

  if(apiResponse.datos === "API"){
  prueba.Tia = apiResponse.result.records[0].casos_confirmados_activos_ultimos_14dias === null ? 600 : apiResponse.result.records[0].casos_confirmados_activos_ultimos_14dias
  apiResponse.result.records.map((record) => {
    prueba.pushCasos({
      city: record.municipio_distrito,
      Ncaso: record.casos_confirmados_ultimos_14dias,
      fecha: record.fecha_informe.split("T")[0],
    }); 
    let coords = localStorage.getItem("distrito")
      coords = prueba;
      localStorage.setItem("distrito",JSON.stringify(coords));  
    })
    Grafico()
    }else{
      prueba.Tia = apiResponse.Tia
      apiResponse.casos.map((caso) => {
        prueba.pushCasos({
          city: caso.city,
          Ncaso: caso.Ncaso,
          fecha: caso.fecha,
          }
        );
      });
    Grafico()
    }
    
  prueba.confinado(prueba.Tia)
  //console.log(apiResponse)
  //console.log(prueba.casos)


};
async function datos() {
 //console.log(localStorage.getItem("distrito"));
  
  let lastfind =  localStorage.getItem("distrito") === null ? undefined : localStorage.getItem("distrito")

  console.log(lastfind)
  let coordenadas = await Coordenadas(browserLat, browserLong)
  console.log(coordenadas)
  let resultado
  let respuesta
  // coordenadas == (lastfind.city == null || undefined) ? "otra cosa" : lastfind.city ? resultado = lastfind :
  if ((lastfind === undefined)  ) {
    respuesta = await  fetch(
      "https://apifetcher.herokuapp.com/?id=f22c3f43-c5d0-41a4-96dc-719214d56968&filters=" +
    JSON.stringify({ municipio_distrito: "Madrid-"+ await Coordenadas(browserLat,browserLong)})   
    )
    resultado = await respuesta.json()
    resultado = {datos : "API",...resultado}
    console.log("la cagaste")

  }else{

    resultado = lastfind;
    resultado ={datos : "biblioteca",...resultado}

  }
  return await resultado;
}
   
  //console.log(resultado)



////////////////////////// MAPA /////////////////////////////////////////////////////////////

function mapa() {
  L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 20
    }
  ).addTo(map);
  
  
  navigator.geolocation.getCurrentPosition(
    function (position) {
      browserLat = position.coords.latitude;
      browserLong = position.coords.longitude;
      marker_actual = L.marker([browserLat, browserLong]).addTo(map);
      marker_actual.bindPopup("<b>Hola </b><br>Tu estas aqui").openPopup();
      map.setView([browserLat, browserLong], 18);
    //   console.log(browserLat);
    //  console.log(browserLong);
      Coordenadas(browserLat,browserLong);
      pintarGrafico();
     
    },
    function (err) {
      console.error(err);
    }
  );
}

async function Coordenadas (browserLat,browserLong){
  //console.log(browserLat, browserLong);
  let response = await fetch (`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${browserLat}&lon=${browserLong}`)
  let data = await response.json();
    console.log(data);
    //console.log(data.address.city_district);
    return data.address.city_district
}



/////// Grafico//////////////////////////////////////////////////////
function Grafico() {

  let dateString = prueba.casos.map((caso) => caso.fecha.substring(5,caso.fecha.length)); 
 
  //console.log(dateString)
 
  let dataChart = {
    labels: dateString.reverse(),
    series: [prueba.casos.map((caso) => caso.Ncaso).reverse()],
  };
  // console.log(dataChart.labels);
  // dataChart.series.unshift(prueba.casos.map((caso) => caso.Ncaso));

  // console.log(prueba.casos)
  // console.log(dataChart)
  // All The Defaul Options of a line chart:

  var options = {
    axisX: {
      // The offset of the labels to the chart area
      offset: 30,
      // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
      position: "end",
      // Allows you to correct label positioning on this axis by positive or negative x and y offset.
      labelOffset: {
        x: -20,
        y: 0,
      },
      // If labels should be shown or not
      showLabel: true,
      // If the axis grid should be drawn or not
      showGrid: true,
      // Interpolation function that allows you to intercept the value from the axis label
      labelInterpolationFnc: Chartist.noop,
      // Set the axis type to be used to project values on this axis. If not defined, Chartist.StepAxis will be used for the X-Axis, where the ticks option will be set to the labels in the data and the stretch option will be set to the global fullWidth option. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
      type: undefined,
    },
    // Options for Y-Axis
    axisY: {
      // The offset of the labels to the chart area
      offset: 20,
      // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
      position: "start",
      // Allows you to correct label positioning on this axis by positive or negative x and y offset.
      labelOffset: {
        x: 0,
        y: 0,
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
      onlyInteger: true,
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
      left: 20,
    },
    // When set to true, the last grid line on the x-axis is not drawn and the chart elements will expand to the full available width of the chart. For the last label to be drawn correctly you might need to add chart padding or offset the last label with a draw event handler.
    fullWidth: true,
    // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
    reverseData: false,
    // Override the class names that get used to generate the SVG structure of the chart
    classNames: {
      chart: "ct-chart-line",
      label: "ct-label",
      labelGroup: "ct-labels",
      series: "ct-series",
      line: "ct-line",
      point: "ct-point",
      area: "ct-area",
      grid: "ct-grid",
      gridGroup: "ct-grids",
      vertical: "ct-vertical",
      horizontal: "ct-horizontal",
      start: "ct-start",
      end: "ct-end",
    },
  };

  // All you need to do is pass your configuration as third parameter to the chart function
  new Chartist.Line(".ct-chart", dataChart, options);
// });
}
mapa();
