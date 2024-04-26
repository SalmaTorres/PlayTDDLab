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

export {DevolverTitulo, DevolverDescripcion, AumentarCont, DisminuirCont, AnadirMetricas};
