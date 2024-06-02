export class Puntajes {
  constructor() {
    this.puntajesPruebas = [];
    this.puntajesLineas = [];
    this.puntajesCobertura = [];
    this.puntajeTotal = 0;
    this.commitsConPruebas = 0;
    this.totalCommits = 0;
  }

  agregarPuntaje(vPruebas, vLineas, vCobertura) {
    this.totalCommits++;

    const puntajePruebas = this.obtenerPuntajePruebas(vPruebas);
    const puntajeLineas = this.obtenerPuntajeLineas(vLineas);
    const puntajeCobertura = this.obtenerPuntajeCobertura(vCobertura);

    this.puntajesPruebas.push(puntajePruebas);
    this.puntajesLineas.push(puntajeLineas);
    this.puntajesCobertura.push(puntajeCobertura);

    if (vPruebas >= 1) {
      this.commitsConPruebas++;
    }

    this.puntajeTotal = this.calcularPuntajeTotal();
  }

  eliminarPuntaje(index) {
    if (this.puntajesPruebas[index] > 8) {
      this.commitsConPruebas--;
    }

    this.puntajeTotal -= this.puntajesPruebas[index] + this.puntajesLineas[index] + this.puntajesCobertura[index];
    this.puntajesPruebas.splice(index, 1);
    this.puntajesLineas.splice(index, 1);
    this.puntajesCobertura.splice(index, 1);
    this.totalCommits--;
    this.puntajeTotal = this.calcularPuntajeTotal();
  }

  obtenerPuntajeCommit(index) {
    return this.puntajesPruebas[index] + this.puntajesLineas[index] + this.puntajesCobertura[index];
  }

  obtenerPuntajeTotal() {
    return this.puntajeTotal;
  }

  calcularPuntajeTotal() {
    let total = 0;
    for (let i = 0; i < this.puntajesPruebas.length; i++) {
      total += this.puntajesLineas[i] + this.puntajesCobertura[i];
    }

    const porcentajeCommitsConPruebas = (this.commitsConPruebas / this.totalCommits) * 100;
    let puntajePorcentajePruebas = 0;
    if (porcentajeCommitsConPruebas >= 100) {
      puntajePorcentajePruebas = 20;
    } else if (porcentajeCommitsConPruebas >= 80) {
      puntajePorcentajePruebas = 16;
    } else if (porcentajeCommitsConPruebas >= 60) {
      puntajePorcentajePruebas = 12;
    } else {
      puntajePorcentajePruebas = 8;
    }
    total += puntajePorcentajePruebas;

    return total;
  }

  obtenerPuntajePruebas(vPruebas) {
    if (vPruebas >= 1) {
      return 20;
    } else {
      return 8;
    }
  }
  
  obtenerPuntajeLineas(cantidadLineasModificadas) {
    if (cantidadLineasModificadas < 20) {
      return 20;
     }else {
       return 0;
    }
   }
  
   

    obtenerPuntajeCobertura(porcentajeCobertura) {
      if (porcentajeCobertura >= 80) {
        return 10;
      } else if (porcentajeCobertura >= 50 && porcentajeCobertura < 80) {
        return 5;
      } else {
        return 0;
      }
    }
  
    obtenerPuntajePorCommit(puntajePruebas, puntajeLineas, puntajeCobertura) {
      return puntajePruebas + puntajeLineas + puntajeCobertura;
    }
  
    DevolverRecomendacionPorCommit(puntajeCommit) {
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
  
    DevolverRecomendacionFinal(puntajeTotal, cantidadCommits) {
        let recomendacion = "recomendacionFinal";
        let porcentaje=(puntajeTotal/(cantidadCommits*21))*100;
        if(porcentaje>=80)
        {
          recomendacion="En general apicaste TDD de manera adecuada, felicidades. Las pruebas estan en verde, modificaste pocas lineas de codigo por commit y el porcentaje de cobertura es elevado"
        }
        else if(porcentaje>=50 && porcentaje<80)
        {
          recomendacion="En general aplicaste TDD pero hay espacio para mejorar, fijate que las pruebas esten en verde, que tengas un porcentaje de cobertura adecuado y que al modificar o generar codigo para las pruebas siempre vayas de a poco";
        }
        else if(porcentaje<50)
        {
          recomendacion="No aplicaste TDD de manera adecuada, hay mucho espacio para mejorar, puede que las pruebas no esten en verde, que escribas lineas de codigo inecesarias y muy genericas desde el principio y tengas muy bajo porcentaje de cobertura, necesitas practica";
        }
        return recomendacion;
    }
  }
  