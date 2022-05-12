// para tipar objetos de manera correcta se debe tipar con las propiedades del objeto asi:
// Tambien puedo poner propiedades opcionales con ?, como en 'age' y getName
// al hacer esto me permite agregar estas propiedades o metodos despues de que el objeto ha sido creado.

let flash0: { name: string, age?: number, powers: string[], getName?: () => string } = {
  name: 'Barry Allen',
  age: 24,
  powers: ['Super velocidad'],
};

flash0 = {
  name: 'Clark kent',
  age: 24,
  powers: ['Super fuerza'],
  getName() {
    return this.name;
  }
};

let superman0: { name: string, age?: number, powers: string[], getName?: () => string } = {
  name: 'Clark kent',
  age: 24,
  powers: ['Super fuerza'],
};
/*
--- si tuviera mas superheroes, tendria que crear esas mismas propiedades para cada uno de ellos  
  esto resulta poco eficiente ya que si cambio alguna propiedad, o la agrego tendria que cambiarla 
  en todos los superheroes. Para esto podemos crear tipos con typescript.
  De esta manera solo modificamos el 'type' y se vera reflejado en todos los demas elementos
*/

type Hero = {
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
