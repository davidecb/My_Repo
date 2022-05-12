
/* 
--- las funciones puden tener parametros obligatorios u opcionales.
  Los obligatorios son los que definimos normalmente, como firstname.
  Los opcionales se definen con un signo de pregunta al final del nombre de la variable, como lastname
  Los valores por defecto se ponenc omo upper
*/
  const fullname = ( firstname: string, lastname?: string , upper: boolean = false ) => {
    // es bueno validar que llegue el lastname ya que como es opcional, en ocasiones sera undefined
    return `${ firstname } ${ lastname || '' }`;
  }
/* 
--- Existe algo llamado los rest arguments, que se usan cuando yo no se la cantidad de parametros que me van a enviar
  y recurro a esta sintaxis para guardar estos parametros en un array, sin importarme cuantos parametros
  envien en la funcion
*/
  const fullName = ( firstname: string, ...restArgs: string[] ) => {
    return `${ firstname } ${ restArgs.join(' ') }`;
  }

  
  // --- Para tipar funciones lo hacemos inmediatamente despues del nombre de la funcion asi:

  const myFunction: (age: number, name: string) => string = (age, name) => {
    return name + ': ' + age;
  }
 
  