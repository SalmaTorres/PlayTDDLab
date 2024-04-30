import {DevolverTitulo, DevolverDescripcion, AumentarCont, DisminuirCont, AnadirMetricas, eliminarMetrica, obtenerPuntajePruebas, obtenerPuntajeLineas, obtenerPuntajeCobertura, obtenerPuntajePorCommit} from "./PlayTDD.js";

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

});
