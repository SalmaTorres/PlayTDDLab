export function crearBoton(texto, manejador, indice) {
  const boton = document.createElement("button");
  boton.textContent = texto;
  boton.addEventListener("click", (event) => manejador(indice));
  return boton;
}

export function crearCeldaConTexto(fila, texto) {
  const celda = fila.insertCell();
  celda.textContent = texto;
}

export function limpiarTabla(tabla) {
  while (tabla.rows.length > 1) {
    tabla.deleteRow(1);
  }
}

export function agregarFilasMetricas(tabla, metricas, obtenerPuntajeCommit, puntajes, borrarMetrica) {
  metricas.forEach((metrica, index) => {
    const fila = tabla.insertRow();
    metrica.forEach((dato) => crearCeldaConTexto(fila, dato));

    const celdaPuntaje = fila.insertCell();
    const puntajeCommit = obtenerPuntajeCommit(index);
    celdaPuntaje.textContent = puntajeCommit;

    const celdaRecomendacion = fila.insertCell();
    celdaRecomendacion.textContent = puntajes.DevolverRecomendacionPorCommit(puntajeCommit);

    const celdaAcciones = fila.insertCell();
    const botonEliminar = crearBoton("Eliminar", borrarMetrica, index);
    celdaAcciones.appendChild(botonEliminar);
  });
}

export function actualizarPuntajeTotal(puntajes) {
  let puntajeTotalParrafo = document.getElementById("puntajeTotalParrafo");
  if (!puntajeTotalParrafo) {
    puntajeTotalParrafo = document.createElement("p");
    puntajeTotalParrafo.id = "puntajeTotalParrafo";
    document.body.appendChild(puntajeTotalParrafo);
  }
  puntajeTotalParrafo.textContent = "El puntaje total del proyecto es: " + puntajes.obtenerPuntajeTotal();
}

export function actualizarRecomendacionFinal(puntajes, proyectoActual) {
  let mensajeRecomendacion = document.getElementById("mensajeRecomendacion");
  if (!mensajeRecomendacion) {
    mensajeRecomendacion = document.createElement("p");
    mensajeRecomendacion.id = "mensajeRecomendacion";
    divContenedorProyectos.appendChild(mensajeRecomendacion);
  }
  let recomendacionFinal = puntajes.DevolverRecomendacionFinal(puntajes.obtenerPuntajeTotal(), proyectoActual.DevolverCantidadCommits());
  mensajeRecomendacion.textContent = "Recomendacion Final del proyecto: " + recomendacionFinal;
}
