import { axiosIntance } from '../config/AxiosConfig';

export const ProductoRepositorio = {
  consultarPorPagina: async (page: number) => axiosIntance.get('/productos')
};
