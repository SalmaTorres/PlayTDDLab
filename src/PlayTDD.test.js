import {DevolverTitulo, DevolverDescripcion, AumentarCont, DisminuirCont, AnadirMetricas, eliminarMetrica, obtenerPuntajePruebas} from "./PlayTDD.js";

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
  

});
