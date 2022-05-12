(() => {
/* 
  Un constructor privado me permite controlar como se crean las instancias de la clase y 
  estas solo se pueden crear desde adentro de la clase.
  Se usa mucho para crear singleton, es decir que solo se ejecute una instancia de esta clase
  en toda la aplicacion
*/
  class Apocalipsis {
    static instance: Apocalipsis;

    private constructor( public name: string) {}

    static callApocalipsis(name: string): Apocalipsis {
      if (!Apocalipsis.instance) {
        Apocalipsis.instance = new Apocalipsis(name);
      }
      return Apocalipsis.instance;
    }

    changeName( newName: string): void {
      this.name = newName;
    }
     
  }

  //! ERROR --> const apocalipsis = new Apocalipsis('apocalipsis');
  // Todos apuntaran a la misma instancia, la primera que se creo que fue apocalipsis1
  const apocalipsis1 = Apocalipsis.callApocalipsis('apocalipsis1');
  const apocalipsis2 = Apocalipsis.callApocalipsis('apocalipsis2');
  const apocalipsis3 = Apocalipsis.callApocalipsis('apocalipsis3');
})()