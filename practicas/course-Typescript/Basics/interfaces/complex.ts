(() => {
// Cuando tengo objetos complejos como este, es recomendable crear una interfaz para cada 
// objeto que tenga dentro de la interfaz principal:
  /* 
  interface Customer {
    name: string;
    age?: number;
    address: {
      id: number,
      zip: string,
      city: string
    }
  } 
  */
  interface Customer {
    name: string;
    age?: number;
    address: Address;
    // Esta es la forma de declarar metodos en las interfaces
    getFullAddress( id: string ): string;
  }

  interface Address {    
    id: number,
    zip: string,
    city: string
  }

  const customer: Customer = {
    name: 'fernando',
    age: 25,
    address: {
      id: 123,
      zip: 'KY2 SUD',
      city: 'ottawa'
    },
    getFullAddress( id: string ) {
      return 'Hola' + this.address.city;
    },
  }
/* 
  ? Podemos implementar interfaces con las clases para que usen las props y metodos
  ? de la interfaz como plantilla  
*/

  interface Xmen {
    name: string;
    realName: string;
    mutantPower( id: number ): string;
  }

  interface Human {
    age: number;
  }
//! Incluso puedo implementar mas de una interfaz en una clase
  class Mutant implements Xmen, Human {

    constructor(
      public age: number,
      public name: string,
      public realName: string
    ) {}

    mutantPower(id: number): string {
      return this.name;
    }
  }

  // * Tambien puedo usar interfaces para determinar como sera una funcion y que reglas debe seguir
  
  interface AddTwoNumbers {
    (a: number, b: number): number;
  }

  const add: AddTwoNumbers = (a: number, b: number) => {
    return a + b;
  }
})()