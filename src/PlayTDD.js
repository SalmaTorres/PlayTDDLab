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

function DevolverRecomendacionPorCommit(puntajeCommit){
  let recomendacion = "recomendacion"
  
  if (puntajeCommit>=21){
    recomendacion = "Tus prácticas de TDD son sólidas y consistentes. Demuestras un dominio sólido de las mejores prácticas y una comprensión profunda de cómo aplicarlas efectivamente en tu desarrollo."
  }else if (puntajeCommit<=20 && puntajeCommit>10){
    recomendacion = "Tu práctica de TDD muestra un buen nivel de compromiso, pero aún hay margen para mejorar. Considera escribir pruebas más específicas y detalladas para abordar casos límite y asegurar una cobertura más completa."
  } else if (puntajeCommit>=0){
    recomendacion = "Tu uso de TDD podría mejorar. Es importante escribir pruebas más exhaustivas y pensar más cuidadosamente en los casos de prueba para garantizar una mayor confiabilidad en el código."
  }
  return recomendacion
}

export {DevolverTitulo, DevolverDescripcion, AumentarCont, DisminuirCont, AnadirMetricas, eliminarMetrica, obtenerPuntajePruebas, obtenerPuntajeLineas, obtenerPuntajeCobertura, obtenerPuntajePorCommit, DevolverRecomendacionPorCommit};
