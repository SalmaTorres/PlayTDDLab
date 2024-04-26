import {DevolverTitulo, DevolverDescripcion, AumentarCont, DisminuirCont, AnadirMetricas} from "./PlayTDD.js";

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
});
