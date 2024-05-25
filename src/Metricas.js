export class Metricas {
    constructor() {
      this.metricas = [];
    }
  
    AnadirMetricas(nro_commit, cant_pruebas, cant_lineas, porc_cobertura) {
      this.metricas.push([nro_commit, cant_pruebas, cant_lineas, porc_cobertura]);
      return this.metricas;
    }
  
    eliminarMetrica(index) {
      this.metricas.splice(index, 1);
      return this.metricas;
    }
  }