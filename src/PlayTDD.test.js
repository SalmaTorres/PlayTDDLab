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
  puntajes.agregarPuntaje(1, 10, 94);
  expect(puntajes.puntajesPruebas).toEqual([20]);
  expect(puntajes.puntajesLineas).toEqual([20]);
  expect(puntajes.puntajesCobertura).toEqual([20]);
});

it("Debería eliminar un puntaje correctamente", () => {
  puntajes.agregarPuntaje(0, 10, 80);
  puntajes.agregarPuntaje(0, 20, 96);
  puntajes.eliminarPuntaje(0);
  expect(puntajes.puntajesPruebas).toEqual([8]);
  expect(puntajes.puntajesLineas).toEqual([16]);
  expect(puntajes.puntajesCobertura).toEqual([20]);
});

it("Debería eliminar un puntaje de Prueba correctamente", () => {
  puntajes.agregarPuntaje(5, 10, 80);
  puntajes.eliminarPuntaje(0);
  expect(puntajes.puntajesPruebas).toEqual([]);
});

it("Debería obtener el puntaje total correctamente", () => {
  puntajes.agregarPuntaje(1, 10, 80);
  puntajes.agregarPuntaje(1, 20, 70);
  expect(puntajes.obtenerPuntajeTotal()).toEqual(50);
});

it("Debería obtener el puntaje total correctamente", () => {
  puntajes.agregarPuntaje(1, 10, 80);
  puntajes.agregarPuntaje(1, 20, 70);
  puntajes.agregarPuntaje(1, 20, 70);
  puntajes.agregarPuntaje(1, 20, 70);
  puntajes.agregarPuntaje(0, 20, 70);
  expect(puntajes.obtenerPuntajeTotal()).toEqual(44.8);
});

it("Debería obtener el puntaje total correctamente con un total de 90 lineas", () => {
  puntajes.agregarPuntaje(1, 10, 80);
  puntajes.agregarPuntaje(1, 20, 70);
  puntajes.agregarPuntaje(1, 20, 70);
  puntajes.agregarPuntaje(0, 20, 70);
  puntajes.agregarPuntaje(0, 20, 70);
  expect(puntajes.obtenerPuntajeTotal()).toEqual(40.8);
});

it("Debería obtener el puntaje de un commit correctamente", () => {
  puntajes.agregarPuntaje(0, 10, 80);
  expect(puntajes.obtenerPuntajeCommit(0)).toEqual(44);
});


it("Debería asignar un puntaje de 20 para una cantidad de 1 pruebas pasadas", () => {
  expect(puntajes.obtenerPuntajePruebas(1)).toEqual(20); 
});

it("Debería asignar un puntaje de 8 para una cantidad de 0 pruebas pasadas", () => {
  expect(puntajes.obtenerPuntajePruebas(0)).toEqual(8);
});

it("Debería asignar un puntaje de 20 para una cantidad de <20 lineas modificadas", () => {
  expect(puntajes.obtenerPuntajeLineas(7)).toEqual(20); 
});

it("Debería asignar un puntaje de 16 para una cantidad de <40 lineas modificadas", () => {
  expect(puntajes.obtenerPuntajeLineas(34)).toEqual(16); 
});

it("Debería asignar un puntaje de 12 para una cantidad de <60 lineas modificadas", () => {
  expect(puntajes.obtenerPuntajeLineas(55)).toEqual(12); 
});

it("Debería asignar un puntaje de 8 para una cantidad de >60 lineas modificadas", () => {
  expect(puntajes.obtenerPuntajeLineas(65)).toEqual(8); 
});

it("Debería asignar un puntaje de 20 para una cobertura >90%", () => {
  expect(puntajes.obtenerPuntajeCobertura(97)).toEqual(20); 
});

it("Debería asignar un puntaje de 16 para una cobertura >=80%", () => {
  expect(puntajes.obtenerPuntajeCobertura(88)).toEqual(16); 
});

it("Debería asignar un puntaje de 12 para una cobertura >=70%", () => {
  expect(puntajes.obtenerPuntajeCobertura(77)).toEqual(12); 
});

it("Debería asignar un puntaje de 8 para una cobertura <70%", () => {
  expect(puntajes.obtenerPuntajeCobertura(60)).toEqual(8); 
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

it("si la complejidad del codigo es excelente, es decir es con baja complejidad en cambios, deberia tener una puntuacion de 20", () => {
  expect(puntajes.obtenerPuntajeComplejidad("excelente")).toEqual(20);
});
it("si la complejidad del codigo es buena, es decir la complejidad del codigo es moderada, deberia tener una puntuacion de 16", () => {
  expect(puntajes.obtenerPuntajeComplejidad("bueno")).toEqual(16);
});
it("si la complejidad del codigo es regular, es decir la complejidad del codigo es alta, deberia tener una puntuacion de 12", () => {
  expect(puntajes.obtenerPuntajeComplejidad("regular")).toEqual(12);
});

it("si la complejidad del codigo es deficiente, es decir la complejidad del codigo es muy alta deberia tener una puntuacion de 8", () => {
  expect(puntajes.obtenerPuntajeComplejidad("deficiente")).toEqual(8);
});
it("dado un vector de fechas devuelve la suma de la diferencia de días entre commits", () => {
  expect(puntajes.obtenerSumaDiferenciasEnDias(["12/04/2024-08:24", "13/04/2024-09:45", "14/04/2024-09:45", "15/04/2024-09:45"])).toEqual(3);
});
it("si mi cantidad de dias promedio entre commits es menor que 2 recibe un puntaje de 20", () => {
  expect(puntajes.obtenerPuntajeFrecuenciaCommits(2)).toEqual(20);
});
it("si mi cantidad de dias promedio entre commits es mayor a 2 y menor o igual a 3 recibe un puntaje de 16", () => {
  expect(puntajes.obtenerPuntajeFrecuenciaCommits(3)).toEqual(16);
});
it("si mi cantidad de dias promedio entre commits es mayor a 2 y menor o igual a 3 recibe un puntaje de 16", () => {
  expect(puntajes.obtenerPuntajeFrecuenciaCommits(3)).toEqual(16);
});
it("si mi cantidad de dias promedio entre commits es mayor a 3 y menor o igual a 4 recibe un puntaje de 12", () => {
  expect(puntajes.obtenerPuntajeFrecuenciaCommits(4)).toEqual(12);
});
it("si mi cantidad de dias promedio entre commits es mayor a 4 recibe un puntaje de 8", () => {
  expect(puntajes.obtenerPuntajeFrecuenciaCommits(6)).toEqual(8);
});
});
