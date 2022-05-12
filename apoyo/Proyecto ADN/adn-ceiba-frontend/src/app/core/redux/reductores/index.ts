import { combineReducers } from 'redux';
import pedido from './pedido/pedidoReductor';
import productos from './productos/productosReductor';
import productosSolicitados from './productosSolicitados/productosSolicitadosReductor';

export default combineReducers({ productos, productosSolicitados, pedido });
