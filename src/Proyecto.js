export class Proyecto {
  constructor(titulo, descripcion) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.metricas = [];
    this.cantidadCommits = 0;
  }
  
  DevolverCantidadCommits() {
    return this.cantidadCommits;
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

  AnadirMetricas(nro_commit, cant_pruebas, cant_lineas, porc_cobertura, fecha_commit) {
    this.cantidadCommits++;
    return this.metricas.push([nro_commit, cant_pruebas, cant_lineas, porc_cobertura,fecha_commit]);
    //return this.metricas;
  }
  
  eliminarMetrica(index) {
    this.cantidadCommits--;
    this.metricas.splice(index, 1);
    return this.metricas;
  }
}
  