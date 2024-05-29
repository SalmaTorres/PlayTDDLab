export class Proyecto {
  constructor(titulo, descripcion) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.metricas = [];
  }
  
  DevolverTitulo() {
    return this.titulo;
  }
  
  DevolverDescripcion() {
    return this.descripcion;
  }

  DevolverMetricas(){
    return this.metricas;
  }

  AnadirMetricas(nro_commit, cant_pruebas, cant_lineas, porc_cobertura) {
    return this.metricas.push([nro_commit, cant_pruebas, cant_lineas, porc_cobertura]);
    //return this.metricas;
  }
  
  eliminarMetrica(index) {
    this.metricas.splice(index, 1);
    return this.metricas;
  }
}
  