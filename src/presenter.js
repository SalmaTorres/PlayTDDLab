import { Puntajes } from "./Puntajes.js";
import { ProyectoRepositorio } from "./ProyectosRepositorio.js";

const inputTituloProyecto = document.querySelector("#tituloDelProyecto");
const inputDescripcionProyecto = document.querySelector("#descripcionDelProyecto");
const formCrearProyecto = document.querySelector("#formularioCrearProyecto");
const divListaProyectos = document.querySelector("#listaDeProyectos");
const divContenedorProyectos = document.querySelector("#contenedorDeProyectos");
const divContenedorMetricas = document.querySelector("#contenedorDeMetricas");
const botonVolverAProyectos = document.querySelector("#botonVolverAProyectos");
const listaDeMetricas = document.getElementById("listaDeMetricas");

let repositorioDeProyectos = new ProyectoRepositorio();
let proyectoActual;
let puntajes = new Puntajes();

function agregarMetrica() {
  const vCommit = document.getElementById("nro_commit").value;
  const vPruebas = parseInt(document.getElementById("cant_pruebas").value);
  const vLineas = parseInt(document.getElementById("cant_lineas").value);
  const vCobertura = parseInt(document.getElementById("porc_cobertura").value);

  proyectoActual.AnadirMetricas(vCommit, vPruebas, vLineas, vCobertura);
  puntajes.agregarPuntaje(vPruebas, vLineas, vCobertura);

  document.getElementById("nro_commit").value = "";
  document.getElementById("cant_pruebas").value = "";
  document.getElementById("cant_lineas").value = "";
  document.getElementById("porc_cobertura").value = "";
  
  mostrarTablaMetricas();
}

function borrarMetrica(index) {
  proyectoActual.eliminarMetrica(index);
  puntajes.eliminarPuntaje(index);

  actualizarTabla();
}

function obtenerPuntajeCommit(index) {
  return puntajes.obtenerPuntajeCommit(index);
}

function construirFilaMetrica(metrica, indice) {
  const fila = document.createElement("tr");
  metrica.forEach((dato) => {
    const celda = document.createElement("td");
    celda.textContent = dato;
    fila.appendChild(celda);
  });
  const celdaAcciones = document.createElement("td");
  const botonEliminarMetrica = crearBoton("Eliminar Métrica", borrarMetrica, indice);
  celdaAcciones.appendChild(botonEliminarMetrica);
  fila.appendChild(celdaAcciones);;
  return fila;
}

function construirTablaMetricas() {
  const tablaMetricas = document.createElement("table");
  tablaMetricas.innerHTML = `
    <tr>
      <th>Número de Commit</th>
      <th>Cantidad de Pruebas</th>
      <th>Cantidad de Líneas</th>
      <th>Porcentaje de Cobertura</th>
      <th>Acciones</th>
    </tr>`;
  proyectoActual.DevolverMetricas().forEach((metrica, indice) => {
    tablaMetricas.appendChild(construirFilaMetrica(metrica, indice));
  });
  return tablaMetricas;
}

function mostrarTablaMetricas() { 
  listaDeMetricas.innerHTML = "";
  const tablaMetricas = construirTablaMetricas();
  listaDeMetricas.appendChild(tablaMetricas);
}

/*
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
  puntajeTotalParrafo.textContent = "El puntaje total del proyecto es: " + puntajes.obtenerPuntajeTotal();

  let mensajeRecomendacion = document.getElementById("mensajeRecomendacion");
  if (!mensajeRecomendacion) {
    mensajeRecomendacion = document.createElement("p");
    mensajeRecomendacion.id = "mensajeRecomendacion";
    divContenedorProyectos.appendChild(mensajeRecomendacion);
  }
  let recomendacionFinal = puntajes.DevolverRecomendacionFinal(puntajes.obtenerPuntajeTotal(), proyectoActual.DevolverCantidadCommits());
  mensajeRecomendacion.textContent = "Recomendacion Final del proyecto: " + recomendacionFinal;

  console.log("Puntaje Total: " + puntajes.obtenerPuntajeTotal());
}
*/


formCrearProyecto.addEventListener("submit", (event) => {
  event.preventDefault();

  const tituloProyecto = inputTituloProyecto.value;
  const descripcionProyecto = inputDescripcionProyecto.value;
  repositorioDeProyectos.AgregarProyecto(tituloProyecto, descripcionProyecto);
  mostrarProyectos();
  inputTituloProyecto.value = "";
  inputDescripcionProyecto.value = "";
});

function crearBoton(texto, manejador, indice) {
  const boton = document.createElement("button");
  boton.textContent = texto;
  boton.addEventListener("click", (event) => manejador(indice));
  return boton;
}

function mostrarProyectos() {
  divListaProyectos.innerHTML = "";
  repositorioDeProyectos.proyectos.forEach((proyecto, indice) => {
    const informacionProyecto = document.createElement("p");
    informacionProyecto.textContent = `${proyecto.DevolverTitulo()} : ${proyecto.DevolverDescripcion()}`;
    informacionProyecto.dataset.index = indice;
    const botonEliminar = crearBoton("Eliminar", eliminarProyecto, indice);
    const botonIrAMetricas = crearBoton("Ir a Métricas", mostrarFormularioMetricas, indice);
    informacionProyecto.appendChild(botonEliminar);
    informacionProyecto.appendChild(botonIrAMetricas);
    divListaProyectos.appendChild(informacionProyecto);
  });
}

function eliminarProyecto(indice) {
  const tituloDelProyecto = repositorioDeProyectos.proyectos[indice].DevolverTitulo();
  const confirmacionAceptada = confirm(`¿Estás seguro de eliminar el proyecto "${tituloDelProyecto}"?`);
  if (confirmacionAceptada) {
    repositorioDeProyectos.EliminarProyectoPorTitulo(tituloDelProyecto);
    mostrarProyectos();
  } else {
    return;
  }
}

function mostrarFormularioMetricas(indice) {
  divContenedorProyectos.style.display = 'none';
  divContenedorMetricas.style.display = 'block';
  proyectoActual = repositorioDeProyectos.proyectos[indice];

  listaDeMetricas.innerHTML = "";
  document.getElementById("botonAgregarMetrica").addEventListener("click", agregarMetrica);
  mostrarTablaMetricas();

  puntajes = new Puntajes();
}

botonVolverAProyectos.addEventListener("click", () => {
  divContenedorMetricas.style.display = 'none';
  divContenedorProyectos.style.display = 'block';
});