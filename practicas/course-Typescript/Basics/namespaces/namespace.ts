/* 
  normalmente es algo que cuando usamos un framework se usa mucho bajo la mesa, 
  es decir sin darnos cuenta, aunque en la programacion sin framework se usa mas bien poco.
  Se puede usar para agrupar por ejemplo funciones con un fin determinado, como hacer validaiones,
  formatear fechas y numeros, etc
*/

namespace Validations {
  // Si quiero utilizar un metodo fuera del namespace debo ponerle 'export'
  export const validateText = ( text: string): boolean => {
    return (text.length > 3) ? true : false;
  }
  
  const validateDate = ( myDate: Date): boolean => {
    return (isNaN(myDate.valueOf())) ? false : true;
  }
}

console.log( Validations.validateText('12345') );

/* 
  Puedo usar export default para exportar algun elemento por defecto, esto sirve para que a la
  hora de importarlo no tenga que desctructurar y pueda, ademas, ponerle cualquier nombre:
  ? import loQueSea from './namespace';

  si no uso el export default sino el export debo llamarlo destructurando y con el mismo nombre:
  ? import { validateText, validateDate } from './namespace';
*/