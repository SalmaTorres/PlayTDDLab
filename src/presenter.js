import { Puntajes } from "./Puntajes.js";
import { ProyectoRepositorio } from "./ProyectosRepositorio.js";

const titulo = document.querySelector("#titulo-proyecto");
const descripcion = document.querySelector("#descripcion-proyecto");
const formCrear = document.querySelector("#crear-form");
const divProyectos = document.querySelector("#Lista-proyectos");
const divAdmin = document.querySelector("#formulario-administrarProyectos")
const divFormularioMetricas = document.querySelector("#formulario-metricas");
const botonVolverAtras = document.querySelector("#volverAtras");

let proyectosRepositorio = new ProyectoRepositorio();
let puntajes = new Puntajes();
let proyectoActual;

/*
function agregarMetrica() {
  const vCommit = document.getElementById("nro_commit").value;
  const vPruebas = parseInt(document.getElementById("cant_pruebas").value);
  const vLineas = parseInt(document.getElementById("cant_lineas").value);
  const vCobertura = parseInt(document.getElementById("porc_cobertura").value);

  proyectoActual.AnadirMetricas(vCommit, vPruebas, vLineas, vCobertura);
  cantidadCommits++;

  const puntajePruebas = puntajes.obtenerPuntajePruebas(vPruebas);
  const puntajeLineas = puntajes.obtenerPuntajeLineas(vLineas);
  const puntajeCobertura = puntajes.obtenerPuntajeCobertura(vCobertura);

  puntajesPruebas.push(puntajePruebas);
  puntajesLineas.push(puntajeLineas);
  puntajesCobertura.push(puntajeCobertura);
  puntajeTotal += puntajePruebas + puntajeLineas + puntajeCobertura;
  actualizarTabla();
}

function borrarMetrica(index) {
  puntajeTotal = puntajeTotal - puntajesPruebas[index] - puntajesLineas[index] - puntajesCobertura[index];
  puntajesPruebas.splice(index, 1);
  puntajesLineas.splice(index, 1);
  puntajesCobertura.splice(index, 1);

  proyectoActual.eliminarMetrica(index);
  cantidadCommits--;
}

function obtenerPuntajeCommit(index) {
  return puntajes.obtenerPuntajePorCommit(puntajesPruebas[index], puntajesLineas[index], puntajesCobertura[index]);
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
        <th>Puntaje por Commit</th>
        <th>Recomendación por Commit</th>
        <th>Acciones</th>
      </tr>`;
    document.body.appendChild(tabla);
  }

  while (tabla.rows.length > 1) {
    tabla.deleteRow(1);
  }

  proyectoActual.DevolverMetricas().forEach((metrica, index) => {
    var fila = tabla.insertRow();
    metrica.forEach((dato) => {
      var celda = fila.insertCell();
      celda.textContent = dato;
    });

    var celdaPuntaje = fila.insertCell();
    var puntajeCommit = obtenerPuntajeCommit(index);
    celdaPuntaje.textContent = puntajeCommit;

    var celdaRecomendacion = fila.insertCell();
    celdaRecomendacion.textContent = puntajes.DevolverRecomendacionPorCommit(puntajeCommit);

    var celdaAcciones = fila.insertCell();
    var botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", () => {
      borrarMetrica(index);
      actualizarTabla();
    });

    celdaAcciones.appendChild(botonEliminar);
  });

  var puntajeTotalParrafo = document.getElementById("puntajeTotalParrafo");
  if (!puntajeTotalParrafo) {
    puntajeTotalParrafo = document.createElement("p");
    puntajeTotalParrafo.id = "puntajeTotalParrafo";
    document.body.appendChild(puntajeTotalParrafo);
  }
  puntajeTotalParrafo.textContent = "El puntaje total del proyecto es: " + puntajeTotal;

  let mensajeRecomendacion = document.getElementById("mensajeRecomendacion");
  if (!mensajeRecomendacion) {
    mensajeRecomendacion = document.createElement("p");
    mensajeRecomendacion.id = "mensajeRecomendacion";
    divProyectos.appendChild(mensajeRecomendacion);
  }
  let recomendacionFinal = puntajes.DevolverRecomendacionFinal(puntajeTotal, cantidadCommits);
  mensajeRecomendacion.textContent = "Recomendacion Final del proyecto: " + recomendacionFinal;

  console.log("Puntaje Total: " + puntajeTotal);
}
*/
formCrear.addEventListener("submit", (event) => {
  event.preventDefault();

  const tituloV = titulo.value;
  const descripcionV = descripcion.value;

  proyectosRepositorio.AgregarProyecto(tituloV, descripcionV);
  mostrarProyectos();

  titulo.value = "";
  descripcion.value = "";
});

function crearBoton(texto, manejador, indice) {
  const boton = document.createElement("button");
  boton.textContent = texto;
  boton.addEventListener("click", (event) => manejador(event, indice));
  return boton;
}

function mostrarProyectos() {
  divProyectos.innerHTML = "";
  proyectosRepositorio.proyectos.forEach((proyecto, index) => {
    const informacionProyecto = document.createElement("p");
    informacionProyecto.textContent = `${proyecto.DevolverTitulo()} : ${proyecto.DevolverDescripcion()}`;
    informacionProyecto.dataset.index = index;

    const botonEliminar = crearBoton("Eliminar", eliminarProyecto, index);
    const botonMetricas = crearBoton("Ir a métricas", mostrarFormularioMetricas, 5);

    informacionProyecto.appendChild(botonEliminar);
    informacionProyecto.appendChild(botonMetricas);
    divProyectos.appendChild(informacionProyecto);
  });
}

function eliminarProyecto(event, index) {
  const titulo = proyectosRepositorio.proyectos[index].DevolverTitulo();
  const confirmacion = confirm(`¿Estás seguro de eliminar el proyecto "${titulo}"?`);
  if (confirmacion) {
    proyectosRepositorio.EliminarProyectoPorTitulo(titulo);
    mostrarProyectos();
  } else {
    return;
  }
}

function mostrarFormularioMetricas(event, index) {
  divAdmin.style.display = 'none';
  divFormularioMetricas.style.display = 'block';

  proyectoActual = proyectosRepositorio.proyectos[index];
}

botonVolverAtras.addEventListener("click", () => {
  divFormularioMetricas.style.display = 'none';
  divAdmin.style.display = 'block';
});