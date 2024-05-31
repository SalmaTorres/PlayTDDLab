import { Puntajes } from "./Puntajes.js";
import { ProyectoRepositorio } from "./ProyectosRepositorio.js";
import { crearBoton, limpiarTabla, agregarFilasMetricas, actualizarPuntajeTotal, actualizarRecomendacionFinal } from "./helper.js";

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
  
  actualizarTabla();
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
  let tablaMetricas = document.getElementById("tablaMetricas");
  if (!tablaMetricas) {
    tablaMetricas = document.createElement("table");
    tablaMetricas.id = "tablaMetricas";
    const header = tablaMetricas.createTHead();
    const row = header.insertRow();
    const headers = ["Número de Commit", "Cantidad de Pruebas", "Cantidad de Líneas", "Porcentaje de Cobertura", "Puntaje por Commit", "Recomendación por Commit", "Acciones"];
    headers.forEach(headerText => {
      const th = document.createElement("th");
      th.textContent = headerText;
      row.appendChild(th);
    });
    divContenedorMetricas.appendChild(tablaMetricas);
  }
  return tablaMetricas;
}

function mostrarTablaMetricas() { 
  let tablaMetricas = document.getElementById("tablaMetricas");

  if (!tablaMetricas) {
    tablaMetricas = construirTablaMetricas();
    listaDeMetricas.appendChild(tablaMetricas);
  } else {

    limpiarTabla(tablaMetricas);
  }

  proyectoActual.DevolverMetricas().forEach((metrica, indice) => {
    const filaMetrica = construirFilaMetrica(metrica, indice);
    tablaMetricas.appendChild(filaMetrica);
  });
}

function actualizarTabla() {
  let tablaMetricas = document.getElementById("tablaMetricas");
  if (!tablaMetricas) {
    tablaMetricas = construirTablaMetricas();
    listaDeMetricas.appendChild(tablaMetricas);
  }

  limpiarTabla(tablaMetricas);

  agregarFilasMetricas(
    tablaMetricas,
    proyectoActual.DevolverMetricas(),
    obtenerPuntajeCommit,
    puntajes,
    borrarMetrica
  );

  actualizarPuntajeTotal(puntajes);
  actualizarRecomendacionFinal(puntajes, proyectoActual, divContenedorProyectos);
}


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
    const botonEditar = crearBoton("Editar", editarProyecto, indice);
    informacionProyecto.appendChild(botonEliminar);
    informacionProyecto.appendChild(botonIrAMetricas);
    informacionProyecto.appendChild(botonEditar);
    divListaProyectos.appendChild(informacionProyecto);
  });
}

function editarProyecto(indice) {
  
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