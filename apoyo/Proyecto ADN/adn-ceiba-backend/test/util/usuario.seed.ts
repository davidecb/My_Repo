import { getConnection } from 'typeorm';
import { UsuarioEntidad } from '../../src/infraestructura/usuario/entidad/usuario.entidad';

export const usuarioSeed = async () => {
  const connection = await getConnection();
  const entityManager = connection.createEntityManager();

  entityManager.insert<UsuarioEntidad>(UsuarioEntidad, {
    'nombre': 'testingUser',
    'clave': '123456'
  });
  entityManager.insert<UsuarioEntidad>(UsuarioEntidad, {
    'nombre': 'testingUser2',
    'clave': '123456'
  });
};