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
  var formulario = document.createElement("div");
  formulario.id = "formulario";
  formulario.innerHTML = `
    <form id="metricasForm">
      <label for="commit">Número de Commit:</label>
      <input type="text" id="commit" name="commit"><br><br>
      <label for="pruebas">Cantidad de Pruebas:</label>
      <input type="text" id="pruebas" name="pruebas"><br><br>
      <label for="lineas">Cantidad de Líneas:</label>
      <input type="text" id="lineas" name="lineas"><br><br>
      <label for="cobertura">Porcentaje de Cobertura:</label>
      <input type="text" id="cobertura" name="cobertura"><br><br>
      <button type="button" id="agregarBtn">Agregar</button>
    </form>
  `;
  document.body.appendChild(formulario);
  document.getElementById("agregarBtn").addEventListener("click", function() {
    var commit = document.getElementById("commit").value;
    var pruebas = document.getElementById("pruebas").value;
    var lineas = document.getElementById("lineas").value;
    var cobertura = document.getElementById("cobertura").value;
    metricas = AnadirMetricas(metricas, commit, pruebas, lineas, cobertura);
    actualizarTabla();
  });
  var tabla = document.createElement("div");
  tabla.id = "tabla";
  document.body.appendChild(tabla);
}
 
function actualizarTabla() {
  var tabla = document.getElementById("tabla");
  if (!tabla.querySelector("table")) {
    tabla.innerHTML = `
      <table id="metricasTabla">
        <tr>
          <th>Número de Commit</th>
          <th>Cantidad de Pruebas</th>
          <th>Cantidad de Líneas</th>
          <th>Porcentaje de Cobertura</th>
        </tr>
      </table>`;
  }

  tabla = document.getElementById("metricasTabla");
  var index = metricas.length - 1;
  var newRow = tabla.insertRow();
  for (var i = 0; i < metricas[index].length; i++) {
    var cell = newRow.insertCell(i);
    cell.innerHTML = metricas[index][i];
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
  botonMetricas.addEventListener("click", mostrarFormulario());
  nuevoProyecto.appendChild(botonMetricas);

  divProyectos.appendChild(nuevoProyecto);


  titulo.value = "";
  descripcion.value = "";
});