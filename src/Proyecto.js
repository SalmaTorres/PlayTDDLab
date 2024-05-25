export class Proyecto {
    constructor() {
      this.contador = 0;
    }
  
    DevolverTitulo(titulo) {
      this.AumentarCont();
      return titulo;
    }
  
    DevolverDescripcion(descripcion) {
      return descripcion;
    }
  
    AumentarCont() {
      this.contador += 1;
      console.log("Valor del contador:", this.contador);
      return this.contador;
    }
  
    DisminuirCont() {
      this.contador -= 1;
      console.log("Valor del contador:", this.contador);
      return this.contador;
    }
  }
  