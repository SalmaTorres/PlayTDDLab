import {DevolverTitulo, DevolverDescripcion, AumentarCont, DisminuirCont} from "./PlayTDD.js";

describe("PlayTDD", () => {
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
});
