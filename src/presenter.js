import {DevolverTitulo, DevolverDescripcion, AumentarCont, DisminuirCont} from "./PlayTDD.js";

const titulo = document.querySelector("#titulo-proyecto");
const descripcion = document.querySelector("#descripcion-proyecto");
const formCrear = document.querySelector("#crear-form");
const divProyectos = document.querySelector("#Lista-proyectos");

function eliminarProyecto(event) {
  const proyectoAEliminar = event.target.parentNode;
  proyectoAEliminar.remove();
  DisminuirCont();
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
  botonMetricas.addEventListener("click", irAMetricas);
  nuevoProyecto.appendChild(botonMetricas);

  divProyectos.appendChild(nuevoProyecto);


  titulo.value = "";
  descripcion.value = "";
});

function irAMetricas() {
  window.location.href = "metricas.html";
}