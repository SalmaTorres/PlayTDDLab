import {DevolverTitulo, DevolverDescripcion, AumentarCont, DisminuirCont, AnadirMetricas, eliminarMetrica, obtenerPuntajePruebas, obtenerPuntajeLineas, obtenerPuntajeCobertura, obtenerPuntajePorCommit, DevolverRecomendacionPorCommit, DevolverRecomendacionFinal} from "./PlayTDD.js";

describe("PlayTDD", () => {
  let metricas;
  beforeEach(() => {
    metricas = [];
  });
  it("Deberia devolver el titulo", () => {
    expect(DevolverTitulo("titulo")).toEqual("titulo");
  });

  it("Deberia devolver la descripcion", () => {
    expect(DevolverDescripcion("descripcion")).toEqual("descripcion");
  });

  it("Deberia aumentar el contador", () => {
    expect(AumentarCont()).toEqual(2);
  });

  it("Deberia disminuir el contador", () => {
    expect(DisminuirCont()).toEqual(1);
  });

  it("Debería agregar los datos a una matriz vacía", () => {
    AnadirMetricas(metricas, 1, 10, 100, 90);
    expect(metricas).toEqual([[1, 10, 100, 90]]);
  });
  it("Debería agregar los datos al final de una matriz no vacía", () => {
    metricas.push([1, 10, 100, 90]);
    AnadirMetricas(metricas, 2, 20, 200, 80);
    expect(metricas).toEqual([[1, 10, 100, 90], [2, 20, 200, 80]]);
  });

  it("Debería eliminar una métrica", () => {
    metricas.push([1, 10, 100, 90]);
    metricas.push([2, 20, 200, 0]);
    expect(metricas.length).toEqual(2);

    eliminarMetrica(metricas, 0);

    expect(metricas.length).toEqual(1);
    expect(metricas).toEqual([[2, 20, 200, 0]]); 
});

it("Debería asignar un puntaje de 0 para una cantidad de 0 pruebas pasadas", () => {
  expect(obtenerPuntajePruebas(0)).toEqual(0); 
});

it("Debería asignar un puntaje de 0 para una cantidad de 1 pruebas pasadas", () => {
  expect(obtenerPuntajePruebas(1)).toEqual(1);
});

it("Debería asignar un puntaje de 0 para una cantidad de 2 pruebas pasadas", () => {
  expect(obtenerPuntajePruebas(2)).toEqual(2);
});
  

it("Debería asignar un puntaje de 10 para una cantidad de <10 lineas modificadas", () => {
  expect(obtenerPuntajeLineas(7)).toEqual(10); 
});

it("Debería asignar un puntaje de 5 para una cantidad de >=10 y <20 lineas modificadas", () => {
  expect(obtenerPuntajeLineas(14)).toEqual(5);
});

it("Debería asignar un puntaje de 0 para una cantidad de >20 lineas modificadas", () => {
  expect(obtenerPuntajeLineas(21)).toEqual(0);
});

it("Debería asignar un puntaje de 10 para una cobertura >=80%", () => {
  expect(obtenerPuntajeCobertura(81)).toEqual(10); 
});

it("Debería asignar un puntaje de 5 para una cobertura >=50% y <80%", () => {
  expect(obtenerPuntajeCobertura(63)).toEqual(5);
});

it("ebería asignar un puntaje de 0 para una cobertura <50%", () => {
  expect(obtenerPuntajeCobertura(32)).toEqual(0);
});

it("Debería asignar un puntaje de 0 para el puntaje por Commit", () => {
  expect(obtenerPuntajePorCommit(0,0,0)).toEqual(0);
});

it("Debería asignar un puntaje de 0 sumando los puntajes para el puntaje por Commit", () => {
  expect(obtenerPuntajePorCommit(0,0,0)).toEqual(0);
});

it("Debería asignar un puntaje igual a la suma de los puntajes para el puntaje por Commit", () => {
  expect(obtenerPuntajePorCommit(5,6,7)).toEqual(18);
});

it("Debería devolver la palabra recomendacion solamente", () => {
  expect(DevolverRecomendacionPorCommit(-1)).toEqual("recomendacion");
});

it("Debería devolver el 1mer mensaje de recomendacion si el puntaje es igual a 21", () => {
  expect(DevolverRecomendacionPorCommit(21)).toEqual("Tus prácticas de TDD son sólidas y consistentes. Demuestras un dominio sólido de las mejores prácticas y una comprensión profunda de cómo aplicarlas efectivamente en tu desarrollo.");
});

it("Debería devolver el 1mer mensaje de recomendacion si el puntaje es mayor a 21", () => {
  expect(DevolverRecomendacionPorCommit(23)).toEqual("Tus prácticas de TDD son sólidas y consistentes. Demuestras un dominio sólido de las mejores prácticas y una comprensión profunda de cómo aplicarlas efectivamente en tu desarrollo.");
});

it("Debería devolver el 2do mensaje de recomendacion si el puntaje es igual a 20", () => {
  expect(DevolverRecomendacionPorCommit(20)).toEqual("Tu práctica de TDD muestra un buen nivel de compromiso, pero aún hay margen para mejorar. Considera escribir pruebas más específicas y detalladas para abordar casos límite y asegurar una cobertura más completa.");
});

it("Debería devolver el 2do mensaje de recomendacion si el puntaje es menor a 20 y mayor a 10", () => {
  expect(DevolverRecomendacionPorCommit(15)).toEqual("Tu práctica de TDD muestra un buen nivel de compromiso, pero aún hay margen para mejorar. Considera escribir pruebas más específicas y detalladas para abordar casos límite y asegurar una cobertura más completa.");
});

it("Debería devolver el 3er mensaje de recomendacion si el puntaje es igual a 10", () => {
  expect(DevolverRecomendacionPorCommit(10)).toEqual("Tu uso de TDD podría mejorar. Es importante escribir pruebas más exhaustivas y pensar más cuidadosamente en los casos de prueba para garantizar una mayor confiabilidad en el código.");
});

it("Debería devolver el 3er mensaje de recomendacion si el puntaje es menor a 10 y mayor o igual que 0", () => {
  expect(DevolverRecomendacionPorCommit(5)).toEqual("Tu uso de TDD podría mejorar. Es importante escribir pruebas más exhaustivas y pensar más cuidadosamente en los casos de prueba para garantizar una mayor confiabilidad en el código.");
});
it("Debería devolver el mensaje de recomendacion final solamente", () => {
  expect(DevolverRecomendacionFinal(-1)).toEqual("recomendacionFinal");
});
});
