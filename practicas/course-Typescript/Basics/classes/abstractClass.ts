(() => {

  abstract class Mutante {
    constructor(
      public name: string,
      public realName: string,
    ) {}
  }
// Una clase abstracta es una clase de la que no puedo crear instancias.
// Me sirven principalmente como plantillas de las que yo puedo heredar otras clases
  //! const wolverine = new Mutante();

  class Xmen extends Mutante {
    salvarMundo() {
      return 'Mundo salvado!!';
    }
  }

  class Rebel extends Mutante {
    conquistarMundo() {
      return 'Mundo conquistado!!';
    }
  }

  const wolverine = new Xmen('Wolverine', 'Logan');
  wolverine.salvarMundo();
  const magneto = new Rebel('Magneto', 'Erik');
  magneto.conquistarMundo();
})()