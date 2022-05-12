import { crearPedido, eliminarPedido, finalizarPedido, listarPedido } from 'app/core/redux/acciones/pedido/PedidoAcciones';
import { EstadoPedido } from './../../modelo/EstadoPedido';
import { Pedido } from './../../../../feature/Pedido/models/Pedido';
import reductorPedido from './pedidoReductor';

describe('Reductor pedidos', () => {

  it('debería agregar un pedido', () => {
    // Arrange
    const estadoInicial: EstadoPedido = {
      cantidadTotalPedido: 1,
      pedido: {
        id: 0,
        numeroPedido: '',
        direccion: '',
        cliente: '',
        estado: '',
        costo: 0,
        tiempo: 0,
        productosSolicitados: []
      },
    };
    const nuevoPedido: Pedido = {
      id: 1,
      numeroPedido: '123456789',
      direccion: '',
      cliente: '',
      estado: 'inicializando',
      costo: 0,
      tiempo: 0,
      productosSolicitados: []
    };
    const estadoEsperado: EstadoPedido = {
      ...estadoInicial,
      pedido: nuevoPedido,
    };

    // Act
    const nuevoEstado = reductorPedido(
      estadoInicial,
      crearPedido(nuevoPedido)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);
  });
  
  it('debería eliminar un pedido', () => {
    // Arrange
    const estadoInicial: EstadoPedido = {
      cantidadTotalPedido: 1,
      pedido: {
        id: 1,
        numeroPedido: '123456789',
        direccion: '',
        cliente: '',
        estado: 'inicializando',
        costo: 0,
        tiempo: 0,
        productosSolicitados: []
      },
    };
    const pedidoEliminar: Pedido = {
      id: 1,
      numeroPedido: '123456789',
      direccion: '',
      cliente: '',
      estado: 'inicializando',
      costo: 0,
      tiempo: 0,
      productosSolicitados: []
    };
    const estadoEsperado: EstadoPedido = {
      ...estadoInicial,
      pedido: {
        id: 0,
        numeroPedido: '',
        direccion: '',
        cliente: '',
        estado: '',
        costo: 0,
        tiempo: 0,
        productosSolicitados: []
      },
    };

    // Act
    const nuevoEstado = reductorPedido(
      estadoInicial,
      eliminarPedido(pedidoEliminar)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);
  });
  
  it('debería finalizar un pedido', () => {
    // Arrange
    const estadoInicial: EstadoPedido = {
      cantidadTotalPedido: 1,
      pedido: {
        id: 1,
        numeroPedido: '123456789',
        direccion: '',
        cliente: '',
        estado: 'inicializando',
        costo: 0,
        tiempo: 0,
        productosSolicitados: []
      },
    };
    const pedidoFinalizar: Pedido = {
      id: 1,
      numeroPedido: '123456789',
      direccion: 'Avenida siempre viva',
      cliente: 'Homer J. Simpson',
      estado: 'inicializando',
      costo: 10000,
      tiempo: 30,
      productosSolicitados: []
    };
    const estadoEsperado: EstadoPedido = {
      ...estadoInicial,
      pedido: pedidoFinalizar,
    };

    // Act
    const nuevoEstado = reductorPedido(
      estadoInicial,
      finalizarPedido(pedidoFinalizar)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);
  });
  
  it('debería listar un pedido', () => {
    // Arrange
    const estadoInicial: EstadoPedido = {
      cantidadTotalPedido: 1,
      pedido: {
        id: 1,
        numeroPedido: '123456789',
        direccion: 'Avenida siempre viva',
        cliente: 'Homer J. Simpson',
        estado: 'inicializando',
        costo: 10000,
        tiempo: 30,
        productosSolicitados: []
      },
    };
    
    // Act
    const nuevoEstado = reductorPedido(
      estadoInicial,
      listarPedido(estadoInicial.pedido, estadoInicial.cantidadTotalPedido)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoInicial);
  });
});
