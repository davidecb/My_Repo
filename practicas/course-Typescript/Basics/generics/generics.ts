/* 
  Las funciones genericas son funciones que pueden soportar cualquier tipo de variable.
  Realizan funciones muy especificas y por lo general no trascienden, ya que debemos controlar
  el tipado de salida de la funcion dependiendo del tipado de entrada
*/

export const printObject = ( argument: any ) => {
  console.log( argument );
}

// para especificar que la salida es del mismo tipo de la entrada lo hacemos capturando el 
// tipo en una variable <T> y luego poniendo esta como tipo de salida:
export function genericFunction<T>( argument: T ): T {
  return argument;
}

export const genericFnArrow = <T>( argument: T ) => argument;

export const getPokemon = async ( pokemonId: number ): Promise<string> => {
  /* 
    Cuando tengo respuestas http puedo especificar el tipo de la respuesta y asi darme 
    cuenta por ejemplo cuando la respuesta cambia. en la pagina 'quicktype.io' puedo ingresar 
    el json de la respuesta que me da una APi y esta me devolvera las interfaces totalmente 
    ordenadas. En este caso seria la interfaz Pokemon usada en el get<Pokemon>.

    * Tambien existe la extension de quicktype.io muy util para interfaces
  */
  //? const resp = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${ pokemonId }`);
  return 'hhh';
}