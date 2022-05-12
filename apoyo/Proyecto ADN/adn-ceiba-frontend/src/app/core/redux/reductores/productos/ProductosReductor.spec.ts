import { agregarNuevoProducto, eliminarProducto, listarProductos } from 'app/core/redux/acciones/productos/ProductosAcciones';
import { EstadoProducto } from 'app/core/redux/modelo/EstadoProducto';
import { Producto } from 'app/feature/Producto/models/Producto';
import reductorProductos from './productosReductor';

describe('Reductor productos', () => {
  
  it('debería agregar productos', () => {
    // Arrange
    const estadoInicial: EstadoProducto = {
      cantidadTotalProducto: 2,
      productos: [],
    };
    const nuevoProducto: Producto = {
      id: 1,
      nombre: 'nuevo producto',
      costo: 10000,
      tiempo: 10,
      imagen: 'imagen.jpg'
    };
    const estadoEsperado: EstadoProducto = {
      ...estadoInicial,
      productos: [nuevoProducto],
    };

    // Act
    const nuevoEstado = reductorProductos(
      estadoInicial,
      agregarNuevoProducto(nuevoProducto)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);
  });
  
  it('debería eliminar productos', () => {
    // Arrange
    const estadoInicial: EstadoProducto = {
      cantidadTotalProducto: 2,
      productos: [{
          id: 1,
          nombre: 'nuevo producto',
          costo: 10000,
          tiempo: 10,
          imagen: 'imagen.jpg'
        },
        {
          id: 2,
          nombre: 'otro producto',
          costo: 10000,
          tiempo: 10,
          imagen: 'imagen.png'
        }
      ],
    };
    const productoEliminar: Producto = {
      id: 2,
      nombre: 'otro producto',
      costo: 10000,
      tiempo: 10,
      imagen: 'imagen.png'
    };
    const productoSobrante: Producto = {
      id: 1,
      nombre: 'nuevo producto',
      costo: 10000,
      tiempo: 10,
      imagen: 'imagen.jpg'
    };
    const estadoEsperado: EstadoProducto = {
      ...estadoInicial,
      productos: [productoSobrante],
    };

    // Act
    const nuevoEstado = reductorProductos(
      estadoInicial,
      eliminarProducto(productoEliminar)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);
  });
  
  it('debería listar productos', () => {
    // Arrange
    const estadoInicial: EstadoProducto = {
      cantidadTotalProducto: 2,
      productos: [{
          id: 1,
          nombre: 'nuevo producto',
          costo: 10000,
          tiempo: 10,
          imagen: 'imagen.jpg'
        },
        {
          id: 2,
          nombre: 'otro producto',
          costo: 10000,
          tiempo: 10,
          imagen: 'imagen.png'
        }
      ],
    };

    // Act
    const nuevoEstado = reductorProductos(
      estadoInicial,
      listarProductos(estadoInicial.productos, estadoInicial.cantidadTotalProducto)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoInicial);
  });
});
