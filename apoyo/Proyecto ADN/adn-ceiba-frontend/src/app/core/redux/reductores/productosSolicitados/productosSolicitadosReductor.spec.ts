import { agregarProductoSolicitado, eliminarProductoSolicitado, listarProductosSolicitados } from 'app/core/redux/acciones/productosSolicitados/ProductosSolicitadosAcciones';
import { EstadoProductoSolicitado } from './../../modelo/EstadoProductoSolicitado';
import { ProductoSolicitado } from './../../../../feature/Producto/models/ProductoSolicitado';
import reductorProductosSolicitados from './productosSolicitadosReductor';

describe('Reductor productos', () => {
  it('debería agregar productos solicitados', () => {
    // Arrange
    const estadoInicial: EstadoProductoSolicitado = {
      cantidadTotalProductoSolicitado: 2,
      productosSolicitados: [],
    };
    const nuevoProductoSolicitado: ProductoSolicitado = {
      id: 1,
      material: 'PLA',
      color: 'negro',
      acabado: {
        pulido: false,
        pintado: true,
        barnizado: false
      },
      urgencia: false,
      cantidad: 2,
      producto: 1,
    };
    const estadoEsperado: EstadoProductoSolicitado = {
      ...estadoInicial,
      productosSolicitados: [nuevoProductoSolicitado],
    };

    // Act
    const nuevoEstado = reductorProductosSolicitados(
      estadoInicial,
      agregarProductoSolicitado(nuevoProductoSolicitado)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);
  });
  
  it('debería eliminar productos solicitados', () => {
    // Arrange
    const estadoInicial: EstadoProductoSolicitado = {
      cantidadTotalProductoSolicitado: 2,
      productosSolicitados: [{
        id: 1,
        material: 'PLA',
        color: 'negro',
        acabado: {
          pulido: false,
          pintado: true,
          barnizado: false
        },
        urgencia: false,
        cantidad: 2,
        producto: 1,
      }],
    };
    const idProductoEliminar: number = 1;
    const estadoEsperado: EstadoProductoSolicitado = {
      ...estadoInicial,
      productosSolicitados: [],
    };

    // Act
    const nuevoEstado = reductorProductosSolicitados(
      estadoInicial,
      eliminarProductoSolicitado(idProductoEliminar)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);
  });
  
  it('debería listar productos solicitados', () => {
    // Arrange
    const estadoInicial: EstadoProductoSolicitado = {
      cantidadTotalProductoSolicitado: 2,
      productosSolicitados: [
        {
          id: 1,
          material: 'PLA',
          color: 'negro',
          acabado: {
            pulido: false,
            pintado: true,
            barnizado: false
          },
          urgencia: false,
          cantidad: 2,
          producto: 1,
        },
        {
          id: 2,
          material: 'PLA',
          color: 'madera',
          acabado: {
            pulido: false,
            pintado: true,
            barnizado: false
          },
          urgencia: false,
          cantidad: 1,
          producto: 2,
        }
      ],
    };

    // Act
    const nuevoEstado = reductorProductosSolicitados(
      estadoInicial,
      listarProductosSolicitados(estadoInicial.productosSolicitados, estadoInicial.cantidadTotalProductoSolicitado)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoInicial);
  });
});
