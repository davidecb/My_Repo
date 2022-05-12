import * as React from 'react';
import { Layout } from 'app/shared/components/Layout';
import { ProveedorGestionPedido } from '../hoc/ProveedorGestionPedido';
import { RouteComponentProps } from 'react-router-dom';

const PedidoMainPage: React.FC<RouteComponentProps> = () => {
  return (
    <Layout title="pedido" description="Gestión de pedido">
      <ProveedorGestionPedido />
    </Layout>
  );
};

PedidoMainPage.displayName = 'PedidoMainPage';

export default PedidoMainPage;
