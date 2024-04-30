let contador=0

function DevolverTitulo(titulo){
  AumentarCont()
  return titulo
}

function DevolverDescripcion(descripcion){
  return descripcion
}

function AumentarCont(){
  contador=contador+1
  console.log("Valor del contador:", contador)
  return contador
}

function DisminuirCont(){
  contador=contador-1
  console.log("Valor del contador:", contador)
  return contador
}

function AnadirMetricas(metricas, nro_commit, cant_pruebas, cant_lineas, porc_cobertura){
  metricas.push([nro_commit, cant_pruebas, cant_lineas, porc_cobertura]);
  return metricas;
}

function eliminarMetrica(metricas, index) {
  metricas.splice(index, 1);
  return metricas;
}

function obtenerPuntajePruebas(cantidadPruebasPasadas) {
  if (cantidadPruebasPasadas === 0) {
    return 0;
  }
  return cantidadPruebasPasadas;
}

function obtenerPuntajeLineas(cantidadLineasModificadas) {
  if (cantidadLineasModificadas < 10) {
    return 10;
  } else if (cantidadLineasModificadas >= 10 && cantidadLineasModificadas < 20) {
    return 5;
  } else {
    return 0;
  }
}

function obtenerPuntajeCobertura(porcentajeCobertura) {
  if (porcentajeCobertura >= 80) {
    return 10;
  } else if (porcentajeCobertura >= 50 && porcentajeCobertura < 80) {
    return 5;
  } else {
    return 0; 
  }
}

function obtenerPuntajePorCommit(puntajePruebas,puntajeLineas,puntajeCobertura){
  return puntajePruebas + puntajeLineas + puntajeCobertura
} 

export {DevolverTitulo, DevolverDescripcion, AumentarCont, DisminuirCont, AnadirMetricas, eliminarMetrica, obtenerPuntajePruebas, obtenerPuntajeLineas, obtenerPuntajeCobertura, obtenerPuntajePorCommit};
