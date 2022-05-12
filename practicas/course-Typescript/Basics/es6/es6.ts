(() => {
  type Avengers = {
    nick: string;
    ironman: string;
    black: string;
    active: boolean;
    poder: number;
  }
  const avengers: Avengers = {
    nick: 'Samuel Jackson',
    ironman: 'Robert Downey',
    black: 'Scarlett johansson',
    active: true,
    poder: 2000,
  };

  //* destructuracion

  const { poder, black } = avengers;
  console.log( poder.toFixed(2), black.toUpperCase() );

  const printAvenger = ( { ironman, ...rest }:Avengers ) => {
    console.log(ironman, rest, rest.nick)
  };

  //* destructuracion de arreglos
  //* En este caso estoy diciendo que solo me interesan la primera y la tercera posicion
  //* Es recomendable poner siempre el tipado para tener mejor debug en la app
  const averngersArr = ['ironman', 'hulk', 'Cap. America'];
  const [ iron, , capi ] = averngersArr;

})()