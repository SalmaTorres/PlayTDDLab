import { Proyecto } from "./Proyecto.js";
import { Puntajes } from "./Puntajes.js";
import { ProyectoRepositorio } from "./ProyectosRepositorio.js";

describe("PlayTDD", () => {
  let Clasemetricas, proyecto, puntajes, proyectosRepositorio;
  beforeEach(() => {
    proyecto = new Proyecto("titulo", "descripcion");
    //Clasemetricas = new Metricas();
    puntajes = new Puntajes();
    proyectosRepositorio = new ProyectoRepositorio();
  });
  it("Deberia devolver el titulo", () => {
    expect(proyecto.DevolverTitulo()).toEqual("titulo");
  });

  it("Deberia devolver la descripcion", () => {
    expect(proyecto.DevolverDescripcion()).toEqual("descripcion");
  });

  it("Deberia aumentar el contador", () => {
    expect(proyectosRepositorio.AgregarProyecto("titulo", "descripcion")).toEqual(1);
  });

  it("Deberia disminuir el contador", () => {
    proyectosRepositorio.AgregarProyecto("titulo", "descripcion")
    expect(proyectosRepositorio.EliminarProyectoPorTitulo("titulo")).toEqual(0);
  });

  it("Debería agregar los datos a una matriz vacía", () => {
    proyecto.AnadirMetricas(1, 10, 100, 90);
    expect(proyecto.DevolverMetricas()).toEqual([[1, 10, 100, 90]]);
  });

it("Deberia devolver la cantidad de commits por defecto (0)", () => {
    expect(proyecto.DevolverCantidadCommits()).toEqual(0);
  });

  it("Debería agregar los datos al final de una matriz no vacía", () => {
    proyecto.AnadirMetricas(1, 10, 100, 90);
    proyecto.AnadirMetricas(2, 20, 200, 80);
    expect(proyecto.DevolverMetricas()).toEqual([[1, 10, 100, 90], [2, 20, 200, 80]]);
  });

  it("Debería eliminar una métrica", () => {
    proyecto.AnadirMetricas(1, 10, 100, 90);
    proyecto.AnadirMetricas(2, 20, 200, 0);
    expect(proyecto.DevolverMetricas().length).toEqual(2);

    proyecto.eliminarMetrica(0);

    expect(proyecto.DevolverMetricas().length).toEqual(1);
    expect(proyecto.DevolverMetricas()).toEqual([[2, 20, 200, 0]]); 
});

it("Debería agregar un puntaje", () => {
  puntajes.agregarPuntaje(1, 10, 80);
  expect(puntajes.puntajesPruebas).toEqual([20]);
  expect(puntajes.puntajesLineas).toEqual([5]);
  expect(puntajes.puntajesCobertura).toEqual([10]);
});

it("Debería eliminar un puntaje correctamente", () => {
  puntajes.agregarPuntaje(0, 10, 80);
  puntajes.agregarPuntaje(0, 20, 70);
  puntajes.eliminarPuntaje(0);
  expect(puntajes.puntajesPruebas).toEqual([8]);
  expect(puntajes.puntajesLineas).toEqual([0]);
  expect(puntajes.puntajesCobertura).toEqual([5]);
});

it("Debería eliminar un puntaje de Prueba correctamente", () => {
  puntajes.agregarPuntaje(5, 10, 80);
  puntajes.eliminarPuntaje(0);
  expect(puntajes.puntajesPruebas).toEqual([]);
});

it("Debería obtener el puntaje total correctamente", () => {
  puntajes.agregarPuntaje(1, 10, 80);
  puntajes.agregarPuntaje(1, 20, 70);
  expect(puntajes.obtenerPuntajeTotal()).toEqual(40);
});

it("Debería obtener el puntaje total correctamente", () => {
  puntajes.agregarPuntaje(1, 10, 80);
  puntajes.agregarPuntaje(1, 20, 70);
  puntajes.agregarPuntaje(1, 20, 70);
  puntajes.agregarPuntaje(1, 20, 70);
  puntajes.agregarPuntaje(0, 20, 70);
  expect(puntajes.obtenerPuntajeTotal()).toEqual(51);
});

it("Debería obtener el puntaje total correctamente", () => {
  puntajes.agregarPuntaje(1, 10, 80);
  puntajes.agregarPuntaje(1, 20, 70);
  puntajes.agregarPuntaje(1, 20, 70);
  puntajes.agregarPuntaje(0, 20, 70);
  puntajes.agregarPuntaje(0, 20, 70);
  expect(puntajes.obtenerPuntajeTotal()).toEqual(47);
});

it("Debería obtener el puntaje de un commit correctamente", () => {
  puntajes.agregarPuntaje(0, 10, 80);
  expect(puntajes.obtenerPuntajeCommit(0)).toEqual(23);
});


it("Debería asignar un puntaje de 20 para una cantidad de 1 pruebas pasadas", () => {
  expect(puntajes.obtenerPuntajePruebas(1)).toEqual(20); 
});

it("Debería asignar un puntaje de 8 para una cantidad de 0 pruebas pasadas", () => {
  expect(puntajes.obtenerPuntajePruebas(0)).toEqual(8);
});

it("Debería asignar un puntaje de 10 para una cantidad de <10 lineas modificadas", () => {
  expect(puntajes.obtenerPuntajeLineas(7)).toEqual(10); 
});

it("Debería asignar un puntaje de 5 para una cantidad de >=10 y <20 lineas modificadas", () => {
  expect(puntajes.obtenerPuntajeLineas(14)).toEqual(5);
});

it("Debería asignar un puntaje de 0 para una cantidad de >20 lineas modificadas", () => {
  expect(puntajes.obtenerPuntajeLineas(21)).toEqual(0);
});

it("Debería asignar un puntaje de 10 para una cobertura >=80%", () => {
  expect(puntajes.obtenerPuntajeCobertura(81)).toEqual(10); 
});

it("Debería asignar un puntaje de 5 para una cobertura >=50% y <80%", () => {
  expect(puntajes.obtenerPuntajeCobertura(63)).toEqual(5);
});

it("ebería asignar un puntaje de 0 para una cobertura <50%", () => {
  expect(puntajes.obtenerPuntajeCobertura(32)).toEqual(0);
});

it("Debería asignar un puntaje de 0 para el puntaje por Commit", () => {
  expect(puntajes.obtenerPuntajePorCommit(0,0,0)).toEqual(0);
});

it("Debería asignar un puntaje de 0 sumando los puntajes para el puntaje por Commit", () => {
  expect(puntajes.obtenerPuntajePorCommit(0,0,0)).toEqual(0);
});

it("Debería asignar un puntaje igual a la suma de los puntajes para el puntaje por Commit", () => {
  expect(puntajes.obtenerPuntajePorCommit(5,6,7)).toEqual(18);
});

it("Debería devolver la palabra recomendacion solamente", () => {
  expect(puntajes.DevolverRecomendacionPorCommit(-1)).toEqual("recomendacion");
});

it("Debería devolver el 1mer mensaje de recomendacion si el puntaje es igual a 21", () => {
  expect(puntajes.DevolverRecomendacionPorCommit(21)).toEqual("Tus prácticas de TDD son sólidas y consistentes. Demuestras un dominio sólido de las mejores prácticas y una comprensión profunda de cómo aplicarlas efectivamente en tu desarrollo.");
});

it("Debería devolver el 1mer mensaje de recomendacion si el puntaje es mayor a 21", () => {
  expect(puntajes.DevolverRecomendacionPorCommit(23)).toEqual("Tus prácticas de TDD son sólidas y consistentes. Demuestras un dominio sólido de las mejores prácticas y una comprensión profunda de cómo aplicarlas efectivamente en tu desarrollo.");
});

it("Debería devolver el 2do mensaje de recomendacion si el puntaje es igual a 20", () => {
  expect(puntajes.DevolverRecomendacionPorCommit(20)).toEqual("Tu práctica de TDD muestra un buen nivel de compromiso, pero aún hay margen para mejorar. Considera escribir pruebas más específicas y detalladas para abordar casos límite y asegurar una cobertura más completa.");
});

it("Debería devolver el 2do mensaje de recomendacion si el puntaje es menor a 20 y mayor a 10", () => {
  expect(puntajes.DevolverRecomendacionPorCommit(15)).toEqual("Tu práctica de TDD muestra un buen nivel de compromiso, pero aún hay margen para mejorar. Considera escribir pruebas más específicas y detalladas para abordar casos límite y asegurar una cobertura más completa.");
});

it("Debería devolver el 3er mensaje de recomendacion si el puntaje es igual a 10", () => {
  expect(puntajes.DevolverRecomendacionPorCommit(10)).toEqual("Tu uso de TDD podría mejorar. Es importante escribir pruebas más exhaustivas y pensar más cuidadosamente en los casos de prueba para garantizar una mayor confiabilidad en el código.");
});

it("Debería devolver el 3er mensaje de recomendacion si el puntaje es menor a 10 y mayor o igual que 0", () => {
  expect(puntajes.DevolverRecomendacionPorCommit(5)).toEqual("Tu uso de TDD podría mejorar. Es importante escribir pruebas más exhaustivas y pensar más cuidadosamente en los casos de prueba para garantizar una mayor confiabilidad en el código.");
});
it("Debería devolver el mensaje de recomendacion final solamente", () => {
  expect(puntajes.DevolverRecomendacionFinal(-1)).toEqual("recomendacionFinal");
});
it("Debería devolver el mensaje de recomendacion final si tuvo al menos un 80% de buena practica de TDD en todo el proyecto", () => {
  expect(puntajes.DevolverRecomendacionFinal(58,3)).toEqual("En general apicaste TDD de manera adecuada, felicidades. Las pruebas estan en verde, modificaste pocas lineas de codigo por commit y el porcentaje de cobertura es elevado");
});
it("Debería devolver el mensaje de recomendacion final si tuvo al menos un 50% a 79% de de TDD en todo el proyecto", () => {
  expect(puntajes.DevolverRecomendacionFinal(54,4)).toEqual("En general aplicaste TDD pero hay espacio para mejorar, fijate que las pruebas esten en verde, que tengas un porcentaje de cobertura adecuado y que al modificar o generar codigo para las pruebas siempre vayas de a poco");
});
it("Debería devolver el mensaje de recomendacion final si tuvo menos de 50% de eficacia de TDD en todo el proyecto", () => {
  expect(puntajes.DevolverRecomendacionFinal(40,4)).toEqual("No aplicaste TDD de manera adecuada, hay mucho espacio para mejorar, puede que las pruebas no esten en verde, que escribas lineas de codigo inecesarias y muy genericas desde el principio y tengas muy bajo porcentaje de cobertura, necesitas practica");
});
});
