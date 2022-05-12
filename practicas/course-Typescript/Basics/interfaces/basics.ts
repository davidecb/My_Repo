(() => {

/* 
  una interfaz funciona de forma muy similar a como funciona un type, no tiene traspilacion 
  a JS, solo nos ayuda en typescript a restringir como lucen cierto tipo de objetos.
  La diferencia ocn los types radica en que a una interfaz se le pueden adicionar metodos 
  y propiedades despues de creada mientras que a los types no
*/

interface Hero {
  name: string;
  age?: number;
  powers: string[];
  getName?: () => string;
};

let flash: Hero = {
  name: 'Barry Allen',
  age: 24,
  powers: ['Super velocidad'],
};

let superman: Hero = {
  name: 'Clark kent',
  age: 24,
  powers: ['Super fuerza'],
};


})()