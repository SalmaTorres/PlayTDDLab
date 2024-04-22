import {DevolverTitulo, DevolverDescripcion} from "./PlayTDD.js";

describe("PlayTDD", () => {
  it("Deberia devolver el titulo", () => {
    expect(DevolverTitulo("titulo")).toEqual("titulo");
  });

  it("Deberia devolver la descripcion", () => {
    expect(DevolverDescripcion("descripcion")).toEqual("descripcion");
  });
});
