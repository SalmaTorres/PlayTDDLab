let contador=0

function DevolverTitulo(titulo){
  AumentarCont()
  return titulo
}

function DevolverDescripcion(descripcion){
  return descripcion
}

function AumentarCont(){
  return contador=contador+1
}

function DisminuirCont(){
  return contador=contador-1
}

export {DevolverTitulo, DevolverDescripcion, AumentarCont, DisminuirCont};
