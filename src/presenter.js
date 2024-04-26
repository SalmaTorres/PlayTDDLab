import {DevolverTitulo, DevolverDescripcion, AumentarCont, DisminuirCont, AnadirMetricas} from "./PlayTDD.js";

const titulo = document.querySelector("#titulo-proyecto");
const descripcion = document.querySelector("#descripcion-proyecto");
const formCrear = document.querySelector("#crear-form");
const divProyectos = document.querySelector("#Lista-proyectos");

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
  const vPruebas = document.getElementById("cant_pruebas").value;
  const vLineas = document.getElementById("cant_lineas").value;
  const vCobertura = document.getElementById("porc_cobertura").value;
  metricas = AnadirMetricas(metricas, vCommit, vPruebas, vLineas, vCobertura);
  var tabla = document.createElement("div");
  tabla.id = "tabla";
  document.body.appendChild(tabla);
  actualizarTabla();
}
 
function actualizarTabla() {
  var tabla = document.getElementById("tabla");
  if (!tabla.querySelector("table")) {
    tabla.innerHTML = `
      <table id="tablaMetricas">
        <tr>
          <th>Número de Commit</th>
          <th>Cantidad de Pruebas</th>
          <th>Cantidad de Líneas</th>
          <th>Porcentaje de Cobertura</th>
        </tr>
      </table>`;
  }
  tabla = document.getElementById("tablaMetricas");
  const pos_ultimaMetrica = metricas.length - 1;
  var pos_nuevaFila = tabla.insertRow();
  for (var i = 0; i < metricas[pos_ultimaMetrica].length; i++) {
    var pos_nuevaCelda = pos_nuevaFila.insertCell(i);
    pos_nuevaCelda.innerHTML = metricas[pos_ultimaMetrica][i];
  }
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