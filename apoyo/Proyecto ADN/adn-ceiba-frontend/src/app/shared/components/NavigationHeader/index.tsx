import * as React from 'react';
import { HeaderNav } from './styles';
import Logo3D from 'assets/img/3d-logo.jpg';
import { NavBrand } from './NavBrand';
import { NavList } from './NavList';

export const NavigationHeader: React.FC = () => {
  const routes = [
    { label: 'Home', url: '/home' },
    { label: 'Productos', url: '/productos' },
    { label: '🛒', url: '/carrito' },
  ];
  return (
    <HeaderNav>
      <NavBrand imgSrc={Logo3D} text="Ceiba"></NavBrand>
      <NavList items={routes} />
    </HeaderNav>
  );
};
