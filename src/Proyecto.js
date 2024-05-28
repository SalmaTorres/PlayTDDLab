export class Proyecto {
    constructor(titulo, descripcion) {
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.contador = 0;
    }
  
    DevolverTitulo() {
      return this.titulo;
    }
  
    DevolverDescripcion() {
      return this.descripcion;
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
  