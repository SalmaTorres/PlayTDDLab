import {DevolverTitulo, DevolverDescripcion} from "./PlayTDD.js";

const titulo = document.querySelector("#titulo-proyecto");
const descripcion = document.querySelector("#descripcion-proyecto");
const formCrear = document.querySelector("#crear-form");
const divProyectos = document.querySelector("#Lista-proyectos");

formCrear.addEventListener("submit", (event) => {
  event.preventDefault();

  const tituloV = titulo.value;
  const descripcionV = descripcion.value;

  divProyectos.innerHTML = "<p>" + DevolverTitulo(tituloV) +" : "+ DevolverDescripcion(descripcionV) + "</p>";
});
