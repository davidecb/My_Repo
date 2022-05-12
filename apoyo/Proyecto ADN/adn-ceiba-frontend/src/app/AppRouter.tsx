import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from 'app/Main';
import { NavigationHeader } from 'app/shared/components/NavigationHeader';
import { PedidoRouter } from 'app/feature/Pedido/PedidoRouter';
import { ProductoRouter } from 'app/feature/Producto/ProductoRouter';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavigationHeader />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/home" component={MainPage} />
        <Route path="/productos" component={ProductoRouter} />
        <Route path="/carrito" component={PedidoRouter} />
      </Switch>
    </BrowserRouter>
  );
};
