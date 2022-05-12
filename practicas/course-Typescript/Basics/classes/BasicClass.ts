(() => {
  class Avenger {
    /* 
      Cuando no ponemos si es publica o privada, sera publica por defecto,
      aunque es buena practica especificar el acceso de variable que se esta usando.
    */
     
    //? FORMA LARGA DE CREAR CLASES
    /*
    private name: string;
    private team: string;
    public realName?: string;
    static avgAge: number = 35;

    constructor( name: string, team: string, realName?: string) {
      this.name = name;
      this.team = team;
      this.realName = realName;
    } 
    */

    //? FORMA CORTA 
    static avgAge: number = 35;
    static getAvgAge() {

    };

    constructor(  
      public name: string,
      private team: string,
      public realName?: string
    ) {}

//! Al poner private indico que ese metodo o propiedad 
//! solo puede ser accedido desde la misma clase, no desde las clases hijas.
    // private getFullName() {
    //   return `${ this.name } ${ this.realName }`
    // }
//! Al poner protected indico que ese metodo 
//! puede ser accedido desde la misma clase o desde las clases hijas.  
    protected getFullName() {
      return `${ this.name } ${ this.realName }`;
    }
  }  

  //  Se crea una instancia de la clase
  const antman: Avenger = new Avenger('Antman', 'Capitan');

  //  accedo a propiedades publicas
  console.log(antman.realName)

  //  accedo a propiedades estaticas por medio de la clase, no de la instancia
  console.log(Avenger.avgAge)

  //! Para acceder a props privadas se debe hacer por medio de getters y setters

  // Aunque aca me sale un error, en javascript no existe el concepto de private o protected
  // por lo que al compilarse igual este codigo se ejecutara sin marcar error a no ser que
  // especifiquemos desde el tsconfig que no permita compilar si hay errores de este tipo
  //! ERROR --> console.log(antman.getFullName());

  class Xmen extends Avenger {
  // Si en esta clase no tengo un constructor, o este no recibe parametros,
  // no debo llamar al super() ya que typescript llama autom. al constructor padre.
    constructor(
  // si no pongo public ni private se creara como una variable y no como una prop de la clase
      name: string,
      realName: string,
      public isMutant: boolean
    ) {
      super(name, realName);
      //! uso metodo heredado desde Avengers '.getFullName()'
      console.log(super.getFullName());
    }
  //TODO: Se crean getter para acceder a propiedades específicas o metodos 
  //todo: de la clase principal o de la hija
    get fullName() {
      return this.getFullName();
    }

  //TODO: Se crean setter para modificar propiedades especificas
    set setName(name: string) {
      if ( name.length < 3 ) {
        throw new Error('Nombre muy corto');
      }
      this.name = name;
    }
  }

  const wolverine = new Xmen('Wolverine', 'Logan', true);
  // Al llamar un getter o un setter  --> NO, NUNCA, JAMAS <-- debo poner los parentesis al final. 
  // cambiar - setter
  wolverine.name = 'Lobezno'
  // llamar - getter
  console.log(wolverine.fullName)
})()