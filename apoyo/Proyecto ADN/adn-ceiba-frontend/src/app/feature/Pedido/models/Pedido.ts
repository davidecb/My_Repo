export interface Pedido {
  id: number,
  numeroPedido: string;
  direccion: string;
  cliente: string;
  estado: string;
  costo: number;
  tiempo: number;
  productosSolicitados: Array<object>;
}
