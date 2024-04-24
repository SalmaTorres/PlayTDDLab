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

export {DevolverTitulo, DevolverDescripcion, AumentarCont, DisminuirCont};
