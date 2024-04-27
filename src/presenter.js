import {DevolverTitulo, DevolverDescripcion, AumentarCont, DisminuirCont, AnadirMetricas, eliminarMetrica, obtenerPuntajePruebas, obtenerPuntajeLineas} from "./PlayTDD.js";

const titulo = document.querySelector("#titulo-proyecto");
const descripcion = document.querySelector("#descripcion-proyecto");
const formCrear = document.querySelector("#crear-form");
const divProyectos = document.querySelector("#Lista-proyectos");

let puntajeTotal = 0;
let puntajesPruebas = [];
let puntajesLineas = [];

function eliminarProyecto(event) {
  const proyectoAEliminar = event.target.parentNode;
  proyectoAEliminar.remove();
  DisminuirCont();
}

var metricas = [];

function mostrarFormulario() {
  const form_metricas = document.createElement("div");
  form_metricas.id = "formulario";
  form_metricas.innerHTML = `
    <form id="metricasForm">
      <label for="nro_commit">Número de Commit:</label>
      <input type="number" id="nro_commit" name="nro_commit"><br><br>
      <label for="cant_pruebas">Cantidad de Pruebas:</label>
      <input type="number" id="cant_pruebas" name="cant_pruebas"><br><br>
      <label for="cant_lineas">Cantidad de Líneas:</label>
      <input type="number" id="cant_lineas" name="cant_lineas"><br><br>
      <label for="porc_cobertura">Porcentaje de Cobertura:</label>
      <input type="number" id="porc_cobertura" name="porc_cobertura"><br><br>
      <button type="button" id="agregarMetrica">Agregar</button>
    </form>
  `;
  document.body.appendChild(form_metricas);
  document.getElementById("agregarMetrica").addEventListener("click", agregarMetrica); 
}

function agregarMetrica() {
  const vCommit = document.getElementById("nro_commit").value;
  const vPruebas = parseInt(document.getElementById("cant_pruebas").value);
  const vLineas = parseInt(document.getElementById("cant_lineas").value);
  const vCobertura = document.getElementById("porc_cobertura").value;
  metricas = AnadirMetricas(metricas, vCommit, vPruebas, vLineas, vCobertura);

  const puntajePruebas = obtenerPuntajePruebas(vPruebas);
  const puntajeLineas = obtenerPuntajeLineas(vLineas);
  

  puntajesPruebas.push(puntajePruebas);
  puntajesLineas.push(puntajeLineas)
  puntajeTotal += puntajePruebas + puntajeLineas;

  actualizarTabla(); 
}
 
function borrarMetrica(index) {
  puntajeTotal = puntajeTotal - puntajesPruebas[index] - puntajesLineas[index];
  puntajesPruebas.splice(index, 1);
  puntajesLineas.splice(index, 1);

  metricas = eliminarMetrica(metricas, index);
}

function actualizarTabla() {
  var tabla = document.getElementById("tablaMetricas");
  if (!tabla) {
    tabla = document.createElement("table");
    tabla.id = "tablaMetricas";
    tabla.innerHTML = `
      <tr>
        <th>Número de Commit</th>
        <th>Cantidad de Pruebas</th>
        <th>Cantidad de Líneas</th>
        <th>Porcentaje de Cobertura</th>
        <th>Acciones</th>
      </tr>`;
    document.body.appendChild(tabla);
  }

  while (tabla.rows.length > 1) {
    tabla.deleteRow(1);
  }

  
  metricas.forEach((metrica, index) => {
    var fila = tabla.insertRow();
    metrica.forEach((dato) => {
      var celda = fila.insertCell();
      celda.textContent = dato;
    });

    var celdaAcciones = fila.insertCell();
    var botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", () => {
      borrarMetrica(index);
      actualizarTabla();
    });
    celdaAcciones.appendChild(botonEliminar);
  });

  console.log("Puntaje Total: " + puntajeTotal);

}




formCrear.addEventListener("submit", (event) => {
  event.preventDefault();

  const tituloV = titulo.value;
  const descripcionV = descripcion.value;

  const nuevoProyecto = document.createElement("p");
  nuevoProyecto.textContent = DevolverTitulo(tituloV) + " : " + DevolverDescripcion(descripcionV);
  
  const botonEliminar = document.createElement("button");
  botonEliminar.textContent = "Eliminar";
  botonEliminar.addEventListener("click", eliminarProyecto);
  nuevoProyecto.appendChild(botonEliminar);

  const botonMetricas = document.createElement("button");
  botonMetricas.textContent = "Ir a métricas";
  botonMetricas.addEventListener("click", mostrarFormulario);
  nuevoProyecto.appendChild(botonMetricas);

  divProyectos.appendChild(nuevoProyecto);

  titulo.value = "";
  descripcion.value = "";
});