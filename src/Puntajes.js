export class Puntajes {
    obtenerPuntajePruebas(cantidadPruebasPasadas) {
      return cantidadPruebasPasadas === 0 ? 0 : cantidadPruebasPasadas;
    }
  
    obtenerPuntajeLineas(cantidadLineasModificadas) {
      if (cantidadLineasModificadas < 10) {
        return 10;
      } else if (cantidadLineasModificadas >= 10 && cantidadLineasModificadas < 20) {
        return 5;
      } else {
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
  