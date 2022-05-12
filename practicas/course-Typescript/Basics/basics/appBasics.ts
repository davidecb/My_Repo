/* 
1 --- Instalamos typescript de forma global con: npm install -g typescript 
2 --- al crear el archivos app.ts este contiene lenguaje typescript, pero el navegador entiende
  lenguaje javascript por lo que se debe compilar a .js primero.
3 --- Para hacer esto escribimos en consola: tsc nombreArchivo.ts, en este caso sería
  tsc app.js
4 --- Esto me crea un archivo javascript con el compilado del archivo typescript que puede ser leido
  por el navegador.
5 --- ahora escribimos tsc --init para iniciar un proyecto typescript y crear nuestro archivo tsconfig.json
6 --- En este archivo estara la configuracion de typescript, que tan estricto es en las validaciones, etc
7 --- Con tsc --watch o tsc -w podemos hacer que entre en watch mode, lo que nos facilita la compilacion
  del paso numero 3, ya que si tenemos muchos archivos tendriamos que hacer esto cada que 
  modifiquemos o creemos un archivo. con watch mode se hace automaticamente.
*/

// TIPOS DE DATOS
/* 
--- TODOS LOS TIPOS PERMITIDOS EN JAVASCRIPT SON PERMITIDOS EN TYPESCRIPT
  string
  number
  boolean
*/
const a: number = 10;
const b: string = 'Hola mundo';
const c: boolean = true;

/* 
 cuando no especifico un tipo de dato la variable por defecto será de tipo any, en este tipo de variables
 puedo asignar cualquiera de los tipos antes mencionados, ademas de arrays, objetos y funciones.
 Me da variabilidad pero me resta control, no es recomendable usarlo a no ser que se sepa muy bien lo que esta haciendo.

*/
let d;

d = 10;
d = 'hola';
d = {};
d = [];
d = true;

/* 
--- cuando tengo funciones es recomendable poner el tipo de dato de los argumentos ya que asi ts puede
  ayudarme con la sintaxis y con los metodos de cada tipo.
--- con la opcion: "noImplicitAny": true, del tsconfig me aseguro que no puedo poner estos argumentos sin tipado
  me ayuda a prevenir errores y me permite acceder a las propiedades y metodos de la variable.
*/
function sayHello( msg: Object ) {
  msg.hasOwnProperty('messagge');
}

/* 
--- una funcion autoinvocada es una funcion que se ejecuta inmediatamente sin necesidad de llamarla
  se construye poniendo la funcion dentro de parentesis seguido de otros parentesis: (funcion)()
*/
(() => {
  let isSuperman: boolean = true;
  //  resto de codigo de la funcion
})() 

/* 
--- con TS puedo realizar casteo, que es cuando trato un dato de un tipo como otro tipo diferente
  esto me ayuda a acceder a los metodos del tipo cuando es por ejemplo un tipo any
*/
let avenger: any = 123;
let exists;
let power;

avenger = 'Dr. Strange';
//  forma 1 de hacer casteo
console.log( (avenger as string).charAt(1) );

avenger = 150.14528;
// forma 2
console.log( <number>avenger.toFixed(3) );


// Arrays
// con varios tipos de datos
const numbers0: (string | number | boolean)[] = [1, 2, 3, 4, 5, '6', true, 8, 9, 10];

// unico tipo de datos
const numbers1: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// se pueden crear tuplas, que son arrays en donde los valores en una posicion especifica
// siempre son de un tipo de dato
const hero: [string, number, boolean] = ['Dr. Strange', 100, true];
hero[0] = 'Ironman';
hero[1] = 270;
hero[2] = true;

/* 
--- Las enumeraciones nos sirven cuando tenemos algunos rangos o algunos valores especificos
  que puede tomar una variable, por ejemplo un nivel de audio.
  si no las inicializo tomarían valores como el index de un array: 0,1,2,3,etc
*/
enum AudioLevel {
  min, // tomaria el valor de cero, ya que este es su index
  medium = 7,
  max = 10,
}

let currentAudio = AudioLevel.medium;

/* 
--- Tipo Void
  cuando una funcion no retorna nada, typescript toma el retorno como tipo void por defecto y en su 
  transpilacion a javascript retornaria undefined normalmente. es recomendable ponerle el tipo void 
  a las funciones cuando no retorne nada para ayudarnos a validar posibles errores
*/
function callBatman(): void {
 return;
}

const callSuperman = (): void => {
  return;
}

/* 
--- Tipo never
  Este tipo en una funcion significa que esta funcion nunca debe finalizar exitosamente, es decir, 
  no puede retornar nada ni terminar de ejecutarse. se puede usar por ejemplo para lanzar errores,
  tambien se puede combinar con algun otro tipo de dato
*/
const error = (message: string): (never | number) => {
  if( false ) {
    throw new Error(message);
  }
  return 1;
}

/* 
  Con la propiedad "strictNullChecks": false, de tsconfig puedo permitir la asignacion de undefined y null 
  en otro tipo de variables, lo cual por defecto no es permitido. Lo mas recomendable al trabajar con TS
  es manejar una config lo mas restrictiva posible
*/
