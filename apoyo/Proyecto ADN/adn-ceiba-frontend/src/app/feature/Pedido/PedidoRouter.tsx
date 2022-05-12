import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LazyFallback } from 'app/shared/components/LazyFallback';

const PedidoMainPage = React.lazy(() => import('./pages/Main'));

export const PedidoRouter = () => (
  <React.Suspense fallback={<LazyFallback />}>
    {/* Layout compartido entre las rutas va aquí */}
    <Switch>
      <Route path="/" component={PedidoMainPage}></Route>
    </Switch>
  </React.Suspense>
);
